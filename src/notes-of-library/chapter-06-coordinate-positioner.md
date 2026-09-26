# 📘 Chapter 6 — `coordinate-positioner.ts`

## Part 14 — From Grid Coordinates to Real Positions

Until now, Midgard has lived in an **abstract coordinate world**.

We can say that a hexagon exists at:

**(2,2)**

or:

**(4,2)**

and we know how those coordinates relate to one another.

But imagine that we now want to draw the grid in SVG.

SVG does not understand what a “Midgard coordinate” is.

It needs ordinary geometric positions:

**x = 200 pixels**  
**y = 150 pixels**

We therefore need a bridge between two different worlds:

🔢 **Midgard coordinate**  
**(x, y)**

⬇️

📐 **Geometric point**  
**(x, y)**

The numbers have the same names, but they mean very different things.

That conversion is the responsibility of:

**`CoordinatePositioner`**.

---

# 📍 Part 15 — Two Different Kinds of x and y

This distinction is extremely important.

A Midgard coordinate such as:

**(4,2)**

does **not** mean:

**4 pixels from the left and 2 pixels from the top.**

Instead, it describes a logical position in our hexagonal coordinate system.

`CoordinatePositioner` takes that logical coordinate and calculates the actual geometric **center point** of the corresponding hexagon.

So we really have:

🔷 **Coordinate**  
“Which hexagon are we talking about?”

and:

📍 **Point**  
“Where is the center of that hexagon geometrically?”

Later, `HexagonGeometry` will use that center point to calculate the six corners of the actual hexagon.

This gives us a very clean progression:

**Coordinate**

⬇️

**Center Point**

⬇️

**Six Corner Points**

⬇️

**Drawable Hexagon**

---

# 🧭 The Positioner Needs to Know the Orientation

When a `CoordinatePositioner` is created, it receives a `GridOrientation`.

It stores that orientation inside the object.

Why?

Because positioning works differently for:

↔️ **x-dominated grids**

and:

↕️ **y-dominated grids**

The public method `getCenterPosition()` therefore makes a decision.

If the orientation is:

`x-dominated`

it uses the x-dominated calculation.

Otherwise it uses the y-dominated calculation.

We have now seen this pattern before.

`NeighbourCalculator` works in much the same way:

> **One public operation → choose the correct calculation based on orientation.**

This gives the programmer one simple concept while allowing the library to handle both grid orientations internally.

---

# ↔️ Part 16 — Positioning an X-Dominated Hexagon

For an x-dominated grid, the supplied dimension represents the **complete width of one hexagon**.

Suppose the width is:

**100**

The first calculation is the corresponding hexagon height.

The code calculates:

**hexagonHeight = (width × 2) / √3**

For a width of 100, that gives approximately:

**115.47**

So our hexagon is:

↔️ **100 wide**  
↕️ **115.47 high**

Why aren't width and height equal?

Because this is the geometry of a regular hexagon in this orientation. The horizontal width and the total vertical point-to-point height are different measurements.

---

## 📏 Calculating the movement between coordinates

Next the positioner calculates two step sizes:

**xStep = width / 2**

and:

**yStep = (hexagonHeight × 3) / 4**

With our width of 100:

**xStep = 50**

and approximately:

**yStep = 86.60**

These numbers tell us how far one Midgard coordinate unit moves geometrically.

---

## 🔢 Why is `xStep` only half the hexagon width?

This becomes much clearer when we remember our coordinate system.

Straight horizontal neighbours are **two coordinate units apart**.

For example:

**(2,2) → (4,2)**

The coordinate difference is:

**2**

But one coordinate unit corresponds to half the hexagon width:

**100 / 2 = 50**

Therefore:

**2 × 50 = 100**

So the centers of those two horizontally neighbouring hexagons end up exactly one complete hexagon width apart.

This is a beautiful connection between the Midgard coordinate system and the geometry.

The earlier decision to use coordinate steps of two now starts to make geometric sense.

---

# 📍 Calculating the final center

Once we know the step sizes, the calculation becomes remarkably simple.

The geometric x-position is:

**coordinate.x × xStep**

and the geometric y-position is:

**coordinate.y × yStep**

Suppose we have:

**Coordinate = (4,2)**

and:

**hexagon width = 100**

Then:

**x = 4 × 50 = 200**

and approximately:

**y = 2 × 86.60 = 173.20**

So the abstract Midgard coordinate:

🔢 **(4,2)**

has become approximately:

📍 **(200, 173.20)**

That second pair is now an actual geometric center position.

---

# ↕️ Part 17 — Positioning a Y-Dominated Hexagon

For a y-dominated grid, we turn the idea around.

Now the supplied dimension represents the **complete height** of the hexagon.

Suppose:

**height = 100**

The corresponding width is calculated as:

**hexagonWidth = (height × 2) / √3**

which gives approximately:

**115.47**

This time:

↕️ **height = 100**  
↔️ **width ≈ 115.47**

---

## 📏 The y-dominated step sizes

The calculations now become:

**xStep = (hexagonWidth × 3) / 4**  
**yStep = height / 2**

So with a height of 100:

**xStep ≈ 86.60**  
**yStep = 50**

Notice how the logic has essentially rotated.

In an x-dominated grid:

**xStep = half width**

In a y-dominated grid:

**yStep = half height**

That matches what we learned from `NeighbourCalculator`.

Straight neighbours in a y-dominated grid are two y-units apart.

Therefore:

**2 × 50 = 100**

So two straight vertical neighbours are positioned one complete hexagon height apart.

---

# 🧠 The coordinate system and geometry fit together

We can now see something very important about the architecture.

Earlier, the coordinate rules might have seemed artificial:

**Why do straight neighbours move by 2?**

**Why do diagonal neighbours move by 1 in both axes?**

Now we can see that those logical coordinate rules are designed to cooperate with the geometry.

The coordinate system describes **relationships**.

The positioner translates those relationships into **physical spacing**.

---

# 🔗 What `CoordinatePositioner` does NOT do

Just as important is what this class does not do.

It does not:

❌ create coordinate ranges  
❌ find neighbours  
❌ calculate the six corners of a hexagon  
❌ draw SVG  
❌ decide rendering order

Its job is much narrower:

> 🎯 **Take one Midgard coordinate and calculate the geometric center of its hexagon.**

That focused responsibility makes the class easier to understand and easier to reuse.

---

# 🗺️ Where we are in the journey

We have now crossed an important boundary.

Previously:

🔷 **(4,2)**

was simply a logical Midgard coordinate.

Now `CoordinatePositioner` can transform it into something like:

📍 **(200, 173.20)**

which is a geometric position.

But that still gives us only the **center** of the hexagon.

We cannot draw a hexagon from its center alone.

To create the actual polygon, we need to calculate:

🔺 **the top corner**  
↗️ **the upper-right corner**  
↘️ **the lower-right corner**  
🔻 **the bottom corner**  
↙️ **the lower-left corner**  
↖️ **the upper-left corner**

That is the responsibility of our next class.
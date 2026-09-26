# 📘 Chapter 7 — `geometry.ts`

## Part 18 — Turning a Center Point Into a Hexagon

We have now reached the file that deals with the **actual shape of the hexagon**.

`CoordinatePositioner` gave us the center:

📍 **Where is this hexagon?**

`HexagonGeometry` answers the next question:

⬡ **What does the hexagon look like around that center?**

The file contains two important types before we reach the class itself:

🔹 `Point`  
🔹 `Bounds`

Then we have the main class:

🔷 **`HexagonGeometry`**

---

# 📍 Part 19 — The `Point` Type

A `Point` is deliberately simple.

It contains:

**x** — horizontal geometric position  
**y** — vertical geometric position

We have already encountered this type indirectly.

When `CoordinatePositioner` calculates the center of a hexagon, it returns a `Point`.

But now `HexagonGeometry` will use the same type for something else:

**the six corners of the hexagon.**

So `Point` is a general geometric concept.

A point might represent:

📍 **the center of a hexagon**

or:

🔺 **one of its corners**

This is different from `Coordinate`.

Remember:

🔢 **Coordinate** = position inside the logical Midgard grid  
📍 **Point** = position in geometric space

Keeping those concepts separate is extremely important.

---

# 📦 Part 20 — The `Bounds` Type

The second type is:

`Bounds`

It describes the rectangular area surrounding a collection of geometric points.

It contains six values:

**minX** — leftmost position  
**minY** — highest/topmost position  
**maxX** — rightmost position  
**maxY** — lowest/bottommost position  
**width** — total width  
**height** — total height

Imagine drawing an invisible rectangle around an entire hexagonal grid.

`Bounds` describes that rectangle.

This will later be useful when we want to know:

📏 **How wide is the complete grid?**  
📏 **How high is it?**  
📍 **Where does its geometry begin and end?**

---

# ⬡ Part 21 — `HexagonGeometry`

Now we reach the class itself.

`HexagonGeometry` calculates geometric values for Midgard hexagons.

Like several classes we have already studied, it receives a `GridOrientation` when it is constructed and stores that orientation.

Again we see the same architectural pattern:

> **Create the object with an orientation once.**

Then let the object use that knowledge whenever calculations are performed.

The orientation matters because our two hexagon shapes are rotated relative to one another.

---

# ↔️ Part 22 — The X-Dominated Hexagon

Let's begin with:

`getXDominatedHexagonPoints()`

This method receives two things:

📍 the **center point**  
📏 the complete **width** of the hexagon

Its job is to return the six corner points.

---

## 📐 Three useful measurements

The method first calculates:

**halfWidth = width / 2**  
**radius = width / √3**  
**halfRadius = radius / 2**

Suppose:

**width = 100**

Then approximately:

**halfWidth = 50**  
**radius = 57.74**  
**halfRadius = 28.87**

These three measurements are enough to calculate every corner.

---

## 🎯 Start from the center

Imagine our center is:

📍 **(200, 200)**

The method does not calculate six completely unrelated points.

Instead, every corner is calculated as an **offset from the center**.

That is the key idea.

---

## 🔺 The top point

The top point keeps the same x-position:

**x = center.x**

but moves upward by one radius:

**y = center.y − radius**

So approximately:

🔺 **(200, 142.26)**

---

## ↗️ The upper-right point

Now we move:

➡️ half the width to the right

and:

⬆️ half a radius upward.

So:

**x = center.x + halfWidth**  
**y = center.y − halfRadius**

Approximately:

↗️ **(250, 171.13)**

---

## ↘️ The lower-right point

The x-position remains:

**center.x + halfWidth**

but now we move downward:

**center.y + halfRadius**

Approximately:

↘️ **(250, 228.87)**

---

## 🔻 The bottom point

The bottom is the opposite of the top.

Its x-position remains centered:

**x = center.x**

while y moves down by one full radius:

**y = center.y + radius**

Approximately:

🔻 **(200, 257.74)**

---

## ↙️ The lower-left point

Now we move left:

**x = center.x − halfWidth**

and downward:

**y = center.y + halfRadius**

Approximately:

↙️ **(150, 228.87)**

---

## ↖️ The upper-left point

Finally:

**x = center.x − halfWidth**  
**y = center.y − halfRadius**

Approximately:

↖️ **(150, 171.13)**

These six calculations are exactly how the method constructs the six points.

---

# ⬡ The finished shape

Conceptually, we now have:

　　　　　🔺  
　　　　**top**

↖️ **upper-left**　　**upper-right** ↗️

　　　　📍 **center**

↙️ **lower-left**　　**lower-right** ↘️

　　　 **bottom**  
　　　　　🔻

The method finally returns these six points in order around the hexagon:

> **top → upper-right → lower-right → bottom → lower-left → upper-left**

That ordering is useful because a rendering system such as SVG can connect the points sequentially to form a polygon.

---

# ↕️ Part 23 — The Y-Dominated Hexagon

The y-dominated version is the rotated counterpart.

The method:

`getYDominatedHexagonPoints()`

receives:

📍 a center  
📏 a complete **height**

This time the important measurements are:

**halfHeight = height / 2**  
**radius = height / √3**  
**halfRadius = radius / 2**

---

## 🔄 Notice what has changed

The x-dominated hexagon had:

🔺 a point at the top  
🔻 a point at the bottom

The y-dominated hexagon instead has:

⬅️ a point on the left  
➡️ a point on the right

Its top and bottom are flat.

So the six corners become:

↖️ **upper-left**  
↗️ **upper-right**  
➡️ **right**  
↘️ **lower-right**  
↙️ **lower-left**  
⬅️ **left**

---

## 🧠 Same principle, rotated geometry

This is worth noticing.

We have not invented a completely different geometric system.

The same basic ideas remain:

📍 **begin with a center**  
📏 **calculate useful distances**  
➕ or ➖ **those distances from the center**  
⬡ **produce six corner points**

The orientation changes **how those offsets are applied**.

---

# 🚦 Part 24 — `getHexagonPoints()`

We now have two specialized methods:

↔️ `getXDominatedHexagonPoints()`  
↕️ `getYDominatedHexagonPoints()`

But a programmer should not necessarily have to choose the correct one manually every time.

So `HexagonGeometry` provides:

`getHexagonPoints()`

This method already knows the orientation stored inside the object.

If the geometry is x-dominated, it calls the x-dominated method.

Otherwise it calls the y-dominated method.

This is the same useful pattern we have now seen several times:

**Public general method**

⬇️

🧭 **inspect orientation**

↙️　　　　　　　　　↘️

**x-specific calculation**　**y-specific calculation**

The caller can simply say:

> **“Give me the hexagon points.”**

The object decides how.

---

# 📦 Part 25 — Calculating Bounds

The final responsibility of `HexagonGeometry` is slightly different.

The method:

`getBounds()`

does not create a hexagon.

Instead, it receives an array of geometric points and asks:

> **What is the smallest rectangle that contains all these points?**

---

## 🕳️ What if there are no points?

The method first looks for the first point.

If the array is empty, there is no geometry to measure.

So it returns bounds where everything is zero:

**minX = 0**  
**minY = 0**  
**maxX = 0**  
**maxY = 0**  
**width = 0**  
**height = 0**

This gives the method a sensible result even for an empty collection.

---

# 🔎 Finding the outermost points

If points do exist, the method begins by using the first point as its initial values:

**minX**  
**minY**  
**maxX**  
**maxY**

It then loops through every point.

For each point it asks four questions:

⬅️ **Is this x smaller than minX?**  
If yes, update `minX`.

⬆️ **Is this y smaller than minY?**  
If yes, update `minY`.

➡️ **Is this x larger than maxX?**  
If yes, update `maxX`.

⬇️ **Is this y larger than maxY?**  
If yes, update `maxY`.

After examining every point, we know the extreme edges of the entire collection.

---

# 📏 Width and height become very simple

Once we know:

**minX and maxX**

the width is:

**maxX − minX**

And once we know:

**minY and maxY**

the height is:

**maxY − minY**

So the method returns both:

📍 **the outer positions**

and:

📏 **the total dimensions**

---

# 🧠 The geometric journey so far

We can now follow one hexagon through several layers of the library.

Suppose we begin with:

🔢 **Midgard coordinate (4,2)**

`CoordinatePositioner` converts that into:

📍 **center point**

Then `HexagonGeometry` takes that center and produces:

🔺 ↗️ ↘️ 🔻 ↙️ ↖️

**six geometric corner points**

Those six points describe the actual polygon.

And if we collect the points from many hexagons, `getBounds()` can determine:

📦 **the outer rectangle surrounding the complete geometry.**

---

# 🎯 A very important separation

At this stage we can see a strong division between the classes.

🔢 **Coordinate-related classes** answer:

> **Which hexagons exist and how are they related?**

📍 **`CoordinatePositioner`** answers:

> **Where is each hexagon's center?**

⬡ **`HexagonGeometry`** answers:

> **Where are its six corners, and what are the outer bounds?**

None of these classes has to understand the entire library.

Each solves its own part of the problem.

But when we eventually combine them, we can create complete renderable hexagons.
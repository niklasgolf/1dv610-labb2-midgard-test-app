# 📘 Chapter 8 — `coordinate-layer.ts`

## Part 26 — Preparing Coordinates for Rendering

We can now create coordinates, expand them into a complete grid, position the hexagons and calculate their geometry.

But there is another practical problem.

When several hexagons are drawn on top of or close to one another, **rendering order matters**.

A hexagon that should visually appear behind another one should generally be rendered first. A later row may need to appear above an earlier row.

Midgard therefore introduces another concept:

🎨 **rendering layers**

That responsibility belongs to:

`CoordinateLayer`

---

# 🧱 Part 27 — `LayeredCoordinate`

Before looking at the class, the file introduces a new type:

`LayeredCoordinate`

It contains:

🔹 **x**  
🔹 **y**  
🔹 **zIndex**

So it is essentially a Midgard coordinate with one additional piece of information:

> **Which rendering layer should this coordinate belong to?**

The library uses a simple rule:

**Lowest y-row → z-index 100**  
**Next y-row → z-index 200**  
**Next y-row → z-index 300**

…and so on.

---

## 🎨 Why add a z-index?

Imagine that our grid contains coordinates on several rows:

**y = 1**  
**y = 2**  
**y = 3**

When these eventually become graphical hexagons, we may want the lower rows to have progressively higher rendering layers.

So Midgard transforms:

**Coordinate**

into:

**LayeredCoordinate**

Conceptually:

**`{ x, y }`**

becomes:

**`{ x, y, zIndex }`**

The logical grid position remains unchanged.

We simply attach information useful for rendering.

---

# 📋 Part 28 — The `CoordinateLayer` Class

`CoordinateLayer` receives an array of coordinates in its constructor.

The class stores its **own copy** of that array.

That small detail is worth understanding.

The class does not need to take ownership of the caller's original array and rearrange it directly.

Instead, it works with its own collection.

This becomes particularly useful because the next thing the class needs to do is **sort the coordinates**.

---

# 🔀 Part 29 — `sortCoordinates()`

Before assigning layers, Midgard needs the coordinates in a predictable order.

The method:

`sortCoordinates()`

sorts them using two rules:

### 1️⃣ Sort by y first

Coordinates with a smaller y-value come first.

### 2️⃣ If y is equal, sort by x

Within the same row, smaller x-values come first.

---

## 🔎 An example

Imagine that coordinates arrive in this order:

**(6,4)**  
**(4,2)**  
**(2,4)**  
**(2,2)**  
**(4,4)**  
**(6,2)**

After sorting, we get:

**(2,2)**  
**(4,2)**  
**(6,2)**

then:

**(2,4)**  
**(4,4)**  
**(6,4)**

So we now have a natural reading order:

➡️ **across the first row**

⬇️

➡️ **across the second row**

---

# 🧠 Why sort by y and then x?

Because our z-index system is based on **rows**.

If coordinates with different y-values were mixed together, assigning one z-index to each row would be unnecessarily complicated.

Sorting first gives us a very useful property:

> **All coordinates belonging to the same y-row are next to each other.**

Then the layer calculation becomes simple.

---

# 🛡️ Sorting without changing the original array

There is another nice detail inside `sortCoordinates()`.

Before sorting, the method creates a copy of the coordinates.

It sorts the copy rather than directly sorting the array stored by the class.

This avoids an unnecessary side effect.

The purpose of the method is:

> **“Give me the coordinates in sorted order.”**

It does not need to permanently rearrange the underlying collection just to achieve that.

---

# 🎚️ Part 30 — `getLayeredCoordinates()`

Now we reach the main operation of the class.

`getLayeredCoordinates()`

has two jobs:

🔀 **sort the coordinates**

and:

🎨 **assign a z-index to each row**

The method first obtains the sorted coordinates.

Then it prepares two pieces of state:

**previousY**

and:

**zIndex**

---

## 🧠 What does `previousY` mean?

As we move through the sorted coordinates, we need to detect when we have entered a **new row**.

Suppose our sorted coordinates have y-values:

**2, 2, 2, 4, 4, 4, 6, 6**

We need to recognize these transitions:

**2 → 4**

and:

**4 → 6**

`previousY` lets the method remember the y-value from the previous coordinate.

Then it can ask:

> **“Is the current y different from the previous y?”**

If yes:

⬇️ **We have entered a new row.**

---

# 💯 Part 31 — Increasing the z-index

The z-index begins at:

**0**

But when the first coordinate is encountered, its y-value differs from the initial `previousY`.

Therefore the method increases the z-index by:

**100**

The first row consequently receives:

**zIndex = 100**

When the y-value changes again:

**100 + 100 = 200**

The second row receives:

**zIndex = 200**

Then:

**300**  
**400**

and so on.

---

## 📊 Example

Suppose the sorted coordinates are:

**(2,2)**  
**(4,2)**  
**(6,2)**  
**(2,4)**  
**(4,4)**  
**(6,4)**

The result becomes:

**(2,2) → z-index 100**  
**(4,2) → z-index 100**  
**(6,2) → z-index 100**

⬇️ **new y-row**

**(2,4) → z-index 200**  
**(4,4) → z-index 200**  
**(6,4) → z-index 200**

All coordinates on the same y-row receive the same layer.

---

# 🔄 Part 32 — Transforming One Type Into Another

There is another programming idea hidden inside this method.

We begin with an array of:

**Coordinate**

and return an array of:

**LayeredCoordinate**

The original coordinate contains:

**x**  
**y**

The new object contains:

**x**  
**y**  
**zIndex**

So we are **transforming** each coordinate into a richer representation.

The original spatial information is preserved, and new rendering information is added.

This distinction will become important when we reach `HexGrid`.

There we will perform another transformation:

**LayeredCoordinate**

⬇️

**LayeredHexagon**

The coordinate will eventually gain:

📍 **a center**  
⬡ **six geometric points**  
🎨 **a z-index**

At that point it will contain almost everything an application needs to render the hexagon.

---

# 🧩 A Subtle Architectural Point

Notice that `CoordinateLayer` does **not** calculate geometry.

It does not care how wide the hexagons are.

It does not calculate center positions.

It does not calculate polygon corners.

It simply understands:

> **coordinates + rows + rendering order**

This means rendering information and geometry remain separate concerns.

🎨 `CoordinateLayer`

> **“Which layer?”**

📍 `CoordinatePositioner`

> **“Where is the center?”**

⬡ `HexagonGeometry`

> **“Where are the corners?”**

This separation keeps each class relatively easy to reason about.

---

# 🗺️ Where We Are Now

We have now studied almost all of the smaller building blocks.

Our journey looks like this:

🔷 **Coordinate**  
defines one logical position.

⬇️

🧭 **GridOrientation**  
defines how the grid faces.

⬇️

🐝 **NeighbourCalculator**  
finds neighbouring positions.

⬇️

🦴 **CoordinateRange**  
creates a skeleton.

⬇️

🌱 **CoordinateRangeFiller**  
expands the skeleton.

⬇️

📍 **CoordinatePositioner**  
turns coordinates into geometric centers.

⬇️

⬡ **HexagonGeometry**  
calculates the actual hexagon shapes.

⬇️

🎨 **CoordinateLayer**  
sorts coordinates and gives the rows rendering layers.

---

# 🌟 We Are Ready for the Main Class

Until now, each class has solved **one part of the problem**.

That leaves an obvious question:

> **Who puts all these pieces together?**

That is the responsibility of the most important high-level class in the library:

# 🔷 `HexGrid`

`HexGrid` is where the architecture starts to make complete sense.

It imports and coordinates almost every component we have studied: validation, neighbours, geometry, positioning, ranges, filling and layering.

Instead of forcing another programmer to manually combine all those classes, `HexGrid` provides convenient high-level operations such as:

**create one hexagon**

and:

**create an entire filled grid ready for rendering.**
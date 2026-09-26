# 📘 MIDGARD HEX GRID

## Part 1 — What Are We Building?

### 🌍 A library, not an application

Midgard Hex Grid is a **TypeScript library**.

That is an important starting point. We are not primarily building something that an end user opens and uses directly. Instead, we are building functionality that **another programmer can use inside their own application**.

That application could later be a game, a map, a strategy tool, a terrain editor or something completely different.

Our library should not care.

Its responsibility is the hexagonal grid itself.

The programmer should be able to ask Midgard to create hexagons and grids without having to understand all the mathematics and internal calculations behind them.

For example, the public `HexGrid` class eventually brings together coordinate generation, positioning, geometry and rendering order into one convenient interface.

---

### 🎯 The main design goal

The central idea of the library can be expressed very simply:

> **Complexity inside the library should create simplicity for the programmer using the library.**

Internally, creating a hexagonal grid requires quite a few steps.

We need to know which coordinates exist.

We need to know which hexagons are neighbours.

We need to calculate where every hexagon is positioned.

We need to calculate its six corners.

We need to create larger areas of connected hexagons.

And finally, we need to arrange them in a useful rendering order.

But the programmer using Midgard should not have to perform all those steps manually.

**The library does that work.**

---

### 🧩 Building the library from small pieces

Instead of creating one enormous class that does everything, Midgard divides the problem into smaller responsibilities.

Conceptually, the library grows like this:

**Coordinates**

⬇️

**Orientation and neighbours**

⬇️

**Coordinate ranges and filling**

⬇️

**Positioning**

⬇️

**Hexagon geometry**

⬇️

**Rendering order and layers**

⬇️

**HexGrid — the convenient high-level interface**

Each part has a reasonably focused job.

For example, `CoordinatePositioner` converts a Midgard coordinate into a geometric center position that can later be used in something such as SVG. It does not need to know how an entire grid is constructed.

`HexagonGeometry`, on the other hand, deals with geometric information such as the six corner points of a hexagon and its outer bounds.

This is an important object-oriented idea:

> **Different classes are given different responsibilities.**

They can then cooperate to solve the larger problem.

---

### 🔢 The Midgard coordinate system

Everything begins with coordinates.

A normal square grid might contain every combination of x and y:

**(0,0)　(1,0)　(2,0)**  
**(0,1)　(1,1)　(2,1)**  
**(0,2)　(1,2)　(2,2)**

Midgard works differently.

A valid Midgard coordinate must have x and y with the **same parity**.

That gives us one simple rule:

🟢 **even + even = valid**  
🟢 **odd + odd = valid**  
🔴 **even + odd = invalid**  
🔴 **odd + even = invalid**

So:

**(0,0)** ✅  
**(2,0)** ✅  
**(1,1)** ✅  
**(3,1)** ✅  
**(2,2)** ✅

But:

**(1,0)** ❌  
**(2,1)** ❌  
**(3,2)** ❌

The library defines a coordinate simply as an x-value and a y-value, while its validator enforces this parity rule together with the requirement that both values are non-negative integers.

---

### 🐝 Why deliberately remove half the coordinates?

At first, this can seem strange.

Why create a coordinate system in which many coordinates do not exist?

Because we are not describing a square grid.

We are describing **hexagons**.

Every hexagon has six neighbours. By using the even-even / odd-odd system, those six relationships can be expressed with very simple coordinate changes.

For example, in an x-dominated grid, the two horizontal neighbours are two x-units away. The four diagonal neighbours differ by one in both x and y.

So the unusual coordinate rule is not an arbitrary limitation.

**It is what makes the rest of the Midgard system elegant.**

---

### 🧭 Two orientations

There is one more fundamental idea we need before entering the individual files.

Midgard supports two orientations.

↔️ **x-dominated**  
Straight movement between neighbouring hexagons is horizontal.

↕️ **y-dominated**  
Straight movement between neighbouring hexagons is vertical.

This choice will later influence several parts of the library: neighbour calculations, positioning and hexagon geometry.

But importantly, it does **not** create two completely separate systems.

**The same library supports both.**

---

### 🏗️ The big picture

We can now see what Midgard Hex Grid is trying to accomplish.

We begin with a special coordinate system designed for hexagons.

From those coordinates we can determine relationships between hexagons.

From those relationships we can construct larger grids.

Then mathematics converts the abstract coordinates into actual geometric positions and hexagon shapes.

Finally, `HexGrid` brings those pieces together behind a much simpler public interface.

That journey—from a tiny `{ x, y }` coordinate to a complete renderable hexagonal grid—is what the rest of this book will explain.
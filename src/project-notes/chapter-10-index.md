# 📘 Chapter 10 — `index.ts`

## Part 58 — The Front Door of the Library

We have reached the final source file:

`index.ts`

Compared with `hex-grid.ts`, this file is tiny. It contains almost no calculations and no complicated algorithms.

Yet for a reusable library, it has a very important job:

🚪 **It defines the public entrance to the package.**

Everything we have built lives in separate files:

🔢 `coordinate.ts`  
🧭 `orientation.ts`  
🐝 `neighbours.ts`  
🦴 `coordinate-range.ts`  
🌱 `coordinate-range-fill.ts`  
📍 `coordinate-positioner.ts`  
⬡ `geometry.ts`  
🎨 `coordinate-layer.ts`  
🔷 `hex-grid.ts`

`index.ts` brings the things we want to expose together in one place.

---

# 📦 Part 59 — Think of the Library as a Building

A useful analogy is to imagine Midgard Hex Grid as a building.

Inside the building are many rooms:

🏠 **Coordinate validation**  
🏠 **Neighbour calculation**  
🏠 **Range generation**  
🏠 **Geometry**  
🏠 **Positioning**  
🏠 **Layering**  
🏠 **Grid creation**

But someone installing our package should not need to know the physical location of every room.

They should have one main entrance:

🚪 **`index.ts`**

The index file says, in effect:

> **“These are the things this package makes available to you.”**

---

# 🌍 Why This Matters to Another Programmer

Suppose Midgard is installed as an npm package.

We want another programmer to think in terms of the package:

**`midgard-hex-grid`**

rather than having to understand our internal source-file structure.

That distinction is important.

The internal organization exists because it makes **our library maintainable**.

The public package interface exists because it makes **their programming convenient**.

`index.ts` helps separate those two concerns.

---

# 🏷️ Part 60 — The Version Constant

At the beginning of the file we have:

**`MIDGARD_HEX_GRID_VERSION = '1.0.0'`**

This is exported, which means a programmer using the library can access the version information programmatically.

Conceptually, the library can answer:

> **“Which Midgard Hex Grid version am I working with?”**

At this stage the value is:

🎉 **1.0.0**

---

# 📤 Part 61 — Exporting Coordinates

Next, `index.ts` exports things from `coordinate.ts`.

That includes:

🔢 **`Coordinate`**

and:

🛡️ **`CoordinateValidator`**

This means coordinate concepts are not trapped inside the implementation.

A programmer can use the same `Coordinate` type that Midgard itself uses.

That is particularly useful because many of the library's methods accept or return coordinates.

---

# 🧭 Exporting Orientation

The file also exports:

**`GridOrientation`**

This makes sense because orientation is part of the public vocabulary of Midgard.

A programmer needs to be able to express:

↔️ **x-dominated**

or:

↕️ **y-dominated**

when creating a grid.

---

# 🐝 Exporting Neighbour Functionality

Next comes:

**`NeighbourCalculator`**

This is interesting because it shows that Midgard does not force everyone to use only the high-level `HexGrid`.

The lower-level specialist is available too.

A programmer who specifically wants neighbour calculations can work directly with that part of the library.

---

# 📐 Part 62 — Exporting Geometry

From `geometry.ts`, the index exposes:

📍 **`Point`**  
📦 **`Bounds`**  
⬡ **`HexagonGeometry`**

Again we can see two kinds of exports.

There are **types** describing data:

`Point`  
`Bounds`

And there is a **class** performing work:

`HexagonGeometry`

This distinction appears throughout the library.

---

# 📍 Exporting the Positioner

The public API also includes:

**`CoordinatePositioner`**

So programmers can directly perform the transformation:

🔢 **logical Midgard coordinate**

➡️

📍 **geometric center**

without necessarily asking `HexGrid` to do it for them.

---

# 🦴 Part 63 — Exporting Coordinate Ranges

From `coordinate-range.ts`, the index exports:

`CoordinateRange`

along with:

`CoordinateRangeConfig`

and:

**`CoordinateRangeOptions`**

Then it also exports:

🌱 **`CoordinateRangeFiller`**

So the complete lower-level range system is accessible.

A programmer can work directly with:

🦴 **skeleton creation**

and:

🌱 **filling**

if their application requires more control than the high-level `createGrid()` operation provides.

---

# 🎨 Part 64 — Exporting Layering

The index exports:

`LayeredCoordinate`

and:

**`CoordinateLayer`**

That gives programmers access to the rendering-order system as another independent part of Midgard.

Again, this reinforces an important characteristic of our public API:

> **Midgard can be used at different levels.**

A programmer can ask for a complete grid, or they can work with the individual building blocks.

---

# 🌟 Part 65 — Exporting `HexGrid`

Finally, we reach the main high-level API.

The index exports:

🔷 **`HexGrid`**

along with its related public types:

`HexGridRange`  
`SingleHexagonOptions`  
`HexGridOptions`  
`Hexagon`  
`LayeredHexagon`

This gives another programmer both:

⚙️ **the class they use**

and:

🧾 **the TypeScript types describing its inputs and outputs**

---

# 🧠 Part 66 — `export` Versus `export type`

There is a useful TypeScript concept visible throughout this file.

Some things are exported normally:

**classes**  
**constants**

Other things use:

`export type`

for example:

`Coordinate`  
`GridOrientation`  
`Point`  
`Bounds`  
`Hexagon`

and others.

Why the distinction?

---

## ⚙️ Classes and constants exist at runtime

Something like:

`HexGrid`

becomes actual JavaScript functionality.

A program can create an object from it while the application is running.

Likewise:

`MIDGARD_HEX_GRID_VERSION`

is an actual runtime value.

---

## 🧾 TypeScript types are different

Something like:

`Coordinate`

exists to help TypeScript understand the structure of our data during development and compilation.

The type information does not need to become a JavaScript object at runtime.

So `export type` communicates clearly:

> **“This export is TypeScript type information.”**

---

# 🚪 Part 67 — `index.ts` as the Public Surface

There is a broader design idea here.

A library can contain many files without making every internal detail part of its public interface.

The index file acts as a deliberate **public surface**.

Imagine that someday we added:

🔧 **internal helper classes**  
🧪 **experimental utilities**  
⚙️ **implementation-specific functions**

Those would not automatically need to become part of the package's intended public API.

We could simply leave them out of `index.ts`.

So the index file is more than a convenient collection of exports.

It is also a place where the library author can decide:

> **“What do I want users of this package to see?”**

---

# 🧩 Part 68 — The Complete Architecture

We can now look at all ten source files as one system.

### 🔢 `coordinate.ts`

Defines what a Midgard coordinate is and whether it is valid.

⬇️

### 🧭 `orientation.ts`

Defines the two possible grid orientations.

⬇️

### 🐝 `neighbours.ts`

Defines how coordinates relate to their six neighbours.

⬇️

### 🦴 `coordinate-range.ts`

Creates rectangular skeletons of Midgard coordinates.

⬇️

### 🌱 `coordinate-range-fill.ts`

Expands those skeletons with surrounding neighbours.

⬇️

### 📍 `coordinate-positioner.ts`

Converts logical coordinates into geometric center positions.

⬇️

### ⬡ `geometry.ts`

Calculates the six corners of hexagons and geometric bounds.

⬇️

### 🎨 `coordinate-layer.ts`

Sorts coordinates and assigns rendering layers.

⬇️

### 🔷 `hex-grid.ts`

Coordinates all these components and provides convenient high-level operations.

⬇️

### 🚪 `index.ts`

Exposes the intended library functionality to programmers using the package.

---

# 🌐 Part 69 — From One Idea to a Reusable Library

At the beginning, Midgard's central idea was quite abstract:

> **A hexagonal coordinate system where valid coordinates follow a parity rule.**

From that simple rule, we gradually built layers of functionality.

First:

🔢 **Which coordinates can exist?**

Then:

🐝 **Which coordinates are neighbours?**

Then:

🦴 **How do we create groups of coordinates?**

Then:

🌱 **How do we expand them into useful grids?**

Then:

📍 **Where should they appear geometrically?**

Then:

⬡ **What should each hexagon look like?**

Then:

🎨 **How should they be ordered for rendering?**

Finally:

🔷 **How can another programmer use all of this without needing to understand every internal step?**

That last question is what turns a collection of algorithms into a **library**.

---

# 🎓 Part 70 — One of the Most Important Lessons From the Project

There is a larger software-design lesson in the structure we have just studied.

A good abstraction does not mean that the complexity disappears.

The geometry is still complex.

The coordinate rules still exist.

Neighbour calculations still have to happen.

Skeletons still need filling.

Rendering layers still need calculating.

Instead, abstraction means:

> ✨ **The complexity is placed in appropriate components and presented through simpler interfaces.**

That is exactly what happens when a programmer can ask:

> **create a grid**

while Midgard quietly coordinates all the lower-level work behind that request.

---

# 🎉 End of the `src` Section

We have now worked through **all ten source files** and followed the library from its smallest foundational type all the way to its public package entrance.

But we have only studied one side of a serious library.

We now understand:

> **what the code is supposed to do.**

The next question is:

🧪 **How do we prove that it actually does it?**

That brings us naturally to the **tests**.
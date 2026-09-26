# 📘 Chapter 9 — `hex-grid.ts`

## Part 33 — The Class That Brings Everything Together

We have finally reached the central class of the library:

```
HexGrid
```

This file is much larger than the previous files because its purpose is different.
Most of the classes we have studied are **specialists**.
🐝 `NeighbourCalculator` knows about neighbours.
🦴 `CoordinateRange` knows about skeletons.
🌱 `CoordinateRangeFiller` knows how to fill around skeletons.
📍 `CoordinatePositioner` knows how to calculate center positions.
⬡ `HexagonGeometry` knows how to calculate hexagon shapes.
🎨 `CoordinateLayer` knows about rendering order.
`HexGrid` sits **above these smaller components** and coordinates their work. We can see this immediately from its imports: it brings in the validator, neighbour calculator, geometry, positioner, range, filler and layering classes.
This makes `HexGrid` the natural class for a programmer using the library to interact with.

# 🎭 A High-Level Interface

Imagine that another programmer wants to create a hexagon.
Without `HexGrid`, they might need to understand several internal steps:
**1. Create a coordinate**
⬇️
**2. Calculate its center**
⬇️
**3. Create a geometry object**
⬇️
**4. Calculate its six points**
⬇️
**5. Assemble all the information**
That is possible, but it exposes a lot of internal machinery.
Instead, `HexGrid` can offer the much simpler idea:
**“Create a single hexagon for me.”**
Likewise, instead of asking the programmer to manually create a skeleton, fill it, sort it, assign layers and calculate every hexagon's geometry, we can offer:
**“Create a complete grid for me.”**
This is one of the most important design ideas in the entire library:
✨ **The smaller classes do the specialized work.** **`HexGrid`** **makes that work convenient to use.**

# 🧭 Part 34 — A `HexGrid` Has an Orientation

The `HexGrid` class stores one important property:
**orientation**
When a `HexGrid` is constructed, the programmer chooses:
↔️ **x-dominated**
or:
↕️ **y-dominated**
and that orientation is stored inside the object.
This is powerful because the orientation now becomes part of the **identity of that grid object**.
If we have an x-dominated `HexGrid`, then:
🐝 neighbour calculations use x-dominated rules
📍 positioning uses x-dominated mathematics
⬡ geometry uses x-dominated hexagons
🦴 ranges inherit the same orientation
The programmer does not have to repeatedly supply the orientation to every operation.
They choose it once when creating the grid.

# 🧾 Part 35 — The Types at the Top of `hex-grid.ts`

Before the `HexGrid` class begins, the file defines several types.
These types describe the information that enters and leaves the high-level interface.
Understanding them makes the methods much easier to understand.

## 🦴 `HexGridRange`

Earlier, `CoordinateRangeConfig` required:
**width**
**height**
**orientation**
But a `HexGrid` already knows its orientation.
So why should a programmer have to provide it again?
They shouldn't.
The file therefore defines:

```
HexGridRange
```

using TypeScript's `Omit` utility type. It takes `CoordinateRangeConfig` but removes the `orientation` property.
Conceptually:
**CoordinateRangeConfig**
\= width + height + orientation
while:
**HexGridRange**
\= width + height
The orientation comes from the `HexGrid` object itself.
This avoids duplicated information.

# ⬡ Part 36 — `SingleHexagonOptions`

To create one hexagon, the library only needs one piece of information:
📏 **`hexDiameter`**
That is exactly what `SingleHexagonOptions` contains.
This is a good example of keeping a public interface small.
To create one hexagon, we do not ask the programmer for:
❌ starting coordinate
❌ center position
❌ six corner points
❌ fill settings
❌ orientation again
The grid already knows or calculates those things.
The programmer supplies only the information that is actually needed:
**How large should the hexagon be?**

# 🌐 Part 37 — `HexGridOptions`

Creating an entire grid requires slightly more information.
`HexGridOptions` contains:
📏 **hexDiameter**
↔️ **skeletonWidth**
↕️ **skeletonHeight**.
The names are important.
We deliberately call them:
**skeletonWidth**
and:
**skeletonHeight**
rather than simply `width` and `height`.
Why?
Because these values describe the dimensions of the **skeleton**, not the number of hexagons in the finished filled grid.
For example:
**skeletonWidth = 1**
**skeletonHeight = 1**
does not necessarily mean:
**one finished hexagon**
When used by `createGrid()`, that single skeleton coordinate is filled around and becomes a complete seven-hexagon area.
The names help communicate what the values really mean.

# ⬡ Part 38 — The `Hexagon` Type

Now we reach one of the most useful types in the public API:

```
Hexagon
```

A `Hexagon` contains three things:
🔢 **coordinate**
📍 **center**
⬡ **points**.
This type represents the moment when several earlier concepts finally come together.

## 🔢 `coordinate`

This tells us:
**Where does this hexagon belong in the logical Midgard grid?**
For example:
**(4,2)**

## 📍 `center`

This tells us:
**Where is the center of this hexagon geometrically?**
For example:
**x = 200**
**y = 173.2**

## ⬡ `points`

This contains the six geometric corner points.
Those points can be used to construct the actual polygon.
So a `Hexagon` combines:
**logical position + geometric position + geometric shape**
That makes it far more useful to an application than a coordinate alone.

# 🎨 Part 39 — `LayeredHexagon`

For a complete grid, we need one more piece of information:
**zIndex**
So the library defines:

```
LayeredHexagon
```

as a `Hexagon` with an additional:
🎨 **zIndex**.
Conceptually:
**Hexagon**
contains:
🔢 coordinate
 📍 center
 ⬡ points
while:
**LayeredHexagon**
contains:
🔢 coordinate
 📍 center
 ⬡ points
 🎨 zIndex

## 🧠 TypeScript's intersection operator

The definition uses:

```
Hexagon & { zIndex: number }
```

The `&` means that the new type must contain **everything from both sides**.
So we are saying:
**A LayeredHexagon is a Hexagon AND it has a zIndex.**
This is a neat way of reusing the existing `Hexagon` definition instead of repeating all its properties.

# 🌉 We Can Now See the Purpose of `HexGrid`

The types at the beginning of the file reveal the architecture.
The programmer gives the library something simple:
📏 dimensions
The library produces something much richer:
🔢 coordinate
📍 center
⬡ six polygon points
🎨 rendering layer
This is the transformation we have been building toward throughout the entire book:
**Simple request from the programmer**
⬇️
⚙️ **Midgard's internal classes cooperate**
⬇️
**Rich result ready for the application**

# 🧩 The Smaller Classes Have Not Become Unnecessary

There is an important object-oriented lesson here.
Because `HexGrid` can do all this, it might be tempting to think:
**“Why didn't we just put all the code directly inside** **`HexGrid`****?”**
Because then `HexGrid` would need to personally know how to:
calculate neighbours,
validate coordinates,
create skeletons,
fill ranges,
position coordinates,
calculate polygons,
calculate bounds,
sort coordinates,
and assign rendering layers.
It would become one huge class with many unrelated responsibilities.
Instead, `HexGrid` acts more like an **orchestrator**.
It asks specialized objects to perform specialized work.
That means the high-level interface can be simple **without making the internal design one giant class**.

# 🚪 We Are Now at the Entrance to the Main Operations

So far in `hex-grid.ts`, we have understood:
🧭 what a `HexGrid` represents
🧾 what information its public API accepts
⬡ what a complete `Hexagon` contains
🎨 what makes a `LayeredHexagon` different
Now we are ready for the first major high-level operation:
✨ **`createSingleHexagon()`**
This method is especially interesting because something that looks extremely simple from outside actually causes several parts of the library to cooperate internally.
We will follow that process **step by step**, from the request for one hexagon all the way to its finished coordinate, center and six corner points.

# 🎨 Part 40 — `createSingleHexagon()`: From One Simple Request to a Complete Hexagon

We are now going to follow one operation **all the way through the library**.
The programmer wants exactly one hexagon.
Not a skeleton with surrounding neighbours.
Not a grid.
Just:
⬡ **one hexagon**
This is what `createSingleHexagon()` provides.

# 🎯 The Public Request Is Deliberately Simple

The method receives a `SingleHexagonOptions` object.
As we saw earlier, this contains only:
📏 **hexDiameter**
So from the programmer's perspective, the request is essentially:
**“Give me one hexagon of this size.”**
Everything else is Midgard's responsibility.
The programmer does not need to specify:
❌ a coordinate
❌ a center position
❌ six polygon points
❌ whether neighbours should be added
The library handles those details.

# 🦴 Part 41 — Creating a 1 × 1 Coordinate Range

The first thing `createSingleHexagon()` does is call:

```
this.getCoordinateRange()
```

It requests:
**width = 1**
**height = 1**
and explicitly specifies:
**fillAround = false**.
This is where our earlier chapters become useful.
We already know what a 1 × 1 `CoordinateRange` produces.
Every skeleton starts at:
📍 **(2,2)**
So the skeleton contains exactly one coordinate:
🔷 **(2,2)**
And because:
**fillAround = false**
the six neighbours are **not added**.
The result remains:
**[(2,2)]**
This is how `createSingleHexagon()` guarantees that it really creates **one** hexagon rather than the seven-hexagon filled version of a 1 × 1 skeleton.

# 🧠 Why Reuse the Range System?

We could imagine simply writing:
**coordinate = (2,2)**
directly inside `createSingleHexagon()`.
But the current design instead uses the same coordinate-range machinery that the rest of the library uses.
That means the high-level method obtains its coordinate through the library's existing coordinate-generation system rather than introducing a separate way of producing it.
The flow remains consistent:
**HexGrid**
⬇️
**CoordinateRange**
⬇️
**CoordinateRangeFiller**
⬇️
**Coordinate[]**
We will shortly see exactly how `getCoordinateRange()` performs this cooperation.

# 🔎 Part 42 — Taking the First Coordinate

`getCoordinateRange()` returns an array of coordinates.
For this operation we expect:
**[(2,2)]**
`createSingleHexagon()` therefore takes:
**coordinates[0]**.
That gives us our single coordinate.

# 🛡️ Defensive Error Handling

The method then performs an interesting safety check.
It asks:
**What if** **`coordinates[0]`** **is undefined?**
Under the intended logic, our 1 × 1 range should produce a coordinate.
But the method does not blindly assume that everything worked.
If no coordinate exists, it throws an `Error` explaining that the single hexagon coordinate could not be created.
This is defensive programming.
Instead of allowing an undefined value to travel deeper into the library and cause a confusing error somewhere else, the method detects the unexpected situation close to where it matters.

# 🏭 Part 43 — `createHexagon()`

Once we have our coordinate, `createSingleHexagon()` calls an important private method:

```
createHexagon()
```

It supplies:
🔢 the coordinate
and:
📏 the requested `hexDiameter`.
This private method is one of the most useful pieces of `HexGrid`.
Its job is:
**Take one coordinate and turn it into a complete** **`Hexagon`****.**
The method appears near the bottom of the class because it is an internal helper rather than part of the public API.

# 📍 Part 44 — First Calculate the Center

Inside `createHexagon()`, the first step is:

```
getCenterPosition()
```

It receives:
🔢 the coordinate
📏 the hex diameter.
We already know what happens conceptually.
`CoordinatePositioner` translates:
🔢 **logical Midgard coordinate**
into:
📍 **geometric center point**
So our:
**(2,2)**
becomes a geometric location determined by the orientation and requested diameter.

# ⬡ Part 45 — Then Calculate the Six Corners

Once the center exists, `createHexagon()` calls:

```
getHexagonPoints()
```

and supplies:
📍 the center
📏 the hex diameter.
Again, we already understand this system.
`HexagonGeometry` takes:
**center + size + orientation**
and calculates the six corner points.
So we now have:
🔢 coordinate
📍 center
⬡ six corner points

# 🎁 Part 46 — Assemble the Finished `Hexagon`

Finally, `createHexagon()` returns an object containing:
**coordinate**
**center**
**points**.
That object satisfies our `Hexagon` type.
So the complete transformation is:
📏 **hexDiameter**
⬇️
🦴 **1 × 1 range**
⬇️
🔷 **coordinate (2,2)**
⬇️
📍 **center position**
⬇️
⬡ **six corner points**
⬇️
🎁 **complete Hexagon**

# 🌟 This Is Exactly What a Library Should Hide

From inside Midgard, several things happened.
Ranges were involved.
Coordinates were generated.
Geometry was calculated.
Orientation influenced the mathematics.
A complete object was assembled.
But from outside the library, the programmer only needed to express:
**“I want one hexagon with this diameter.”**
That difference between the **simple public request** and the **more complex internal implementation** is one of the central design ideas of Midgard.

# 🔒 Why Is `createHexagon()` Private?

Notice that `createHexagon()` is declared:
**private**.
This means it is an internal helper belonging to `HexGrid`.
The public API offers more meaningful operations such as:
⬡ **createSingleHexagon()**
and:
🌐 **createGrid()**
Internally, both operations need the ability to turn a coordinate into a complete geometric hexagon.
So instead of duplicating that logic, they can share:

```
createHexagon()
```

This gives us two benefits:
♻️ **Reuse** — the same creation logic can be used in several places.
🔒 **Encapsulation** — an internal implementation detail does not have to become another high-level operation for the library user.

# 🌐 Part 47 — `createGrid()`

Now we can move from the smallest possible result:
⬡ **one hexagon**
to the main purpose of the library:
🌐 **a complete Midgard grid**
`createGrid()` receives:
📏 `hexDiameter`
↔️ `skeletonWidth`
↕️ `skeletonHeight`
and returns an array of:
🎨 **`LayeredHexagon`** **objects**.

# 🦴 Step 1 — Create the Skeleton and Fill Around It

`createGrid()` begins by calling:

```
getLayeredCoordinateRange()
```

It passes:
**width = skeletonWidth**
**height = skeletonHeight**
and importantly:
**fillAround = true**.
This means a normal grid is always created as a **filled Midgard grid around its skeleton**.
So if we ask for:
**skeletonWidth = 1**
**skeletonHeight = 1**
we begin with:
🔷 **(2,2)**
but filling adds its six neighbours.
The result is therefore:
⬡ ⬡
 ⬡ ⬡ ⬡
 ⬡ ⬡
**7 hexagons**
This is fundamentally different from `createSingleHexagon()`.

### ⬡ `createSingleHexagon()`

**1 × 1 skeleton + no fill**
➡️ **1 hexagon**

### 🌐 `createGrid()`

**1 × 1 skeleton + fill**
➡️ **7 hexagons**
That distinction is deliberately encoded in the two high-level methods.

# 🎨 Step 2 — The Coordinates Are Already Layered

Notice that `createGrid()` does not call:

```
getCoordinateRange()
```

directly.
It calls:

```
getLayeredCoordinateRange()
```

That means the coordinates are not only generated and filled.
They are also:
🔀 sorted by y and then x
and:
🎨 assigned z-index values.
The method's documentation explicitly states that the returned hexagons are sorted for rendering and include calculated z-index values.

# 🔄 Part 48 — `map()` Turns Coordinates Into Hexagons

At this stage, `createGrid()` has an array of `LayeredCoordinate` objects.
Each one contains:
**x**
**y**
**zIndex**
But we want an array of `LayeredHexagon` objects.
So the method uses `map()`.
This is a very appropriate use of `map()`.
Conceptually:
**For every layered coordinate, create one layered hexagon.**
The number of items stays the same.
What changes is the representation.

# 🏭 Reusing `createHexagon()`

For every coordinate, the method calls our private helper:

```
createHexagon()
```

again.
So the same method used by `createSingleHexagon()` is now reused for every hexagon in the complete grid.
That helper gives us:
🔢 coordinate
📍 center
⬡ points
Then `createGrid()` adds:
🎨 **zIndex**
from the `LayeredCoordinate`.
The result is:
**LayeredHexagon**
containing:
🔢 coordinate
 📍 center
 ⬡ points
 🎨 zIndex

# 🧠 One `map()` Represents the Final Transformation

This is a nice place to see the whole architecture coming together.
Before `map()`:
**LayeredCoordinate**
After `map()`:
**LayeredHexagon**
Or conceptually:
🔢 **Where does the hexagon belong?**

-


🎨 **Which rendering layer?**
⬇️
add:
📍 **Where is its center?**

-


⬡ **What is its shape?**
⬇️
🌟 **Complete renderable grid data**

# 🔗 The Full `createGrid()` Journey

We can now follow the high-level operation through the architecture:
🌐 **createGrid()**
⬇️
🦴 **create the requested skeleton**
⬇️
🐝 **find neighbours around the skeleton**
⬇️
🌱 **fill the complete coordinate area**
⬇️
🔀 **sort the coordinates**
⬇️
🎨 **assign z-index by row**
⬇️
📍 **calculate every center**
⬇️
⬡ **calculate every hexagon's six corners**
⬇️
🎁 **return** **`LayeredHexagon[]`**

# 💡 Why This Is the Heart of the Library

`createGrid()` itself is actually quite short.
Yet it causes nearly the entire Midgard architecture to work together.
That is a sign of what we were aiming for with the design:
**The high-level method describes what should happen.**
The specialized classes contain the details of **how each individual part happens**.
And this is why understanding the earlier files was worthwhile.
When we now read `createGrid()`, it is no longer mysterious.
We know what lies behind every step.

# 🐝 Part 49 — The Lower-Level Public API

We have now studied the two most convenient operations in `HexGrid`:
⬡ **`createSingleHexagon()`**
🌐 **`createGrid()`**
These are high-level methods. They combine several smaller operations and give the programmer a nearly finished result.
But `HexGrid` also exposes a collection of **lower-level public methods**.
Why?
Because a library should not only support the exact situations we imagined when creating it.
Another programmer may want to use Midgard in a completely different way.
Perhaps they only want the neighbour system.
Perhaps they want coordinates but will create their own graphics.
Perhaps they want the geometry but not the automatic grid creation.
So `HexGrid` gives them access to useful building blocks as well.

# 🐝 Part 50 — `getNeighbours()`

The first of these methods is:

```
getNeighbours()
```

It receives one `Coordinate` and returns its six neighbouring coordinates.
But notice what `HexGrid` itself does.
It does **not** contain the neighbour mathematics.
Instead, it creates:

```
NeighbourCalculator
```

using the grid's orientation.
Then it delegates the calculation to:
**`neighbourCalculator.getNeighbours()`**.

## 🤝 Delegation

This introduces a useful word:
**delegation**
Delegation means that one object receives a request but lets another, more specialized object perform the actual work.
Here:
🔷 `HexGrid`
receives:
**“Give me the neighbours.”**
Then it delegates to:
🐝 `NeighbourCalculator`
which actually knows how neighbour mathematics works.
This allows `HexGrid` to provide a convenient unified API without duplicating the logic of the specialized classes.

# 🛡️ Part 51 — `isValidCoordinate()`

The same pattern appears in:

```
isValidCoordinate()
```

The programmer supplies a coordinate.
`HexGrid` creates a:

```
CoordinateValidator
```

and asks it whether the coordinate is valid.
Again:
🔷 `HexGrid`
provides the convenient public doorway.
🛡️ `CoordinateValidator`
contains the specialized knowledge.
So if somebody asks:
**Is (4,4) valid?**
the answer should be:
✅ **true**
while:
**Is (4,5) valid?**
returns:
❌ **false**
The rules themselves still belong to the validator we studied at the beginning of the book.

# 📍 Part 52 — `getCenterPosition()`

Next we have:

```
getCenterPosition()
```

This method receives:
🔢 a Midgard coordinate
📏 a size
and returns:
📍 a geometric `Point`.
Once again, `HexGrid` does not personally contain the positioning mathematics.
It creates:

```
CoordinatePositioner
```

using its own orientation.
Then it delegates:
**coordinate + size**
to that object.

## 📏 What does `size` mean?

This is orientation-dependent.
For:
↔️ **x-dominated**
the size represents the complete **width** of the hexagon.
For:
↕️ **y-dominated**
the size represents the complete **height**.
This is the same convention we encountered inside `CoordinatePositioner`.
`HexGrid` does not invent another interpretation. It preserves the rules of the lower-level component.

# ⬡ Part 53 — `getHexagonPoints()`

The next method is:

```
getHexagonPoints()
```

It receives:
📍 a center point
📏 a size
and returns:
⬡ **six** **`Point`** **objects**
representing the corners of the hexagon.
Internally, `HexGrid` creates:

```
HexagonGeometry
```

using the grid's orientation.
Then it delegates the calculation to:
**`geometry.getHexagonPoints()`**.
The pattern should now feel very familiar:
🔷 **HexGrid = gateway**
⬇️
⬡ **HexagonGeometry = specialist**

# 📦 Part 54 — `getGridBounds()`

Now we reach a slightly more involved method:

```
getGridBounds()
```

Its purpose is to determine the outer geometric bounds of several hexagons.
It receives:
🔢 an array of Midgard coordinates
and:
📏 the hexagon size.
It returns a:
**`Bounds`** object.

## 🔄 This Operation Requires Several Steps

Unlike some of the previous wrapper methods, `getGridBounds()` has to coordinate more than one operation.
It begins by creating a:
⬡ **`HexagonGeometry`**
Then it creates an empty array:
📋 **`points`**
This array will eventually contain the corner points from **every hexagon**.

# 🔁 Part 55 — Visit Every Coordinate

The method loops through every coordinate.
For each one, it first calls:

```
getCenterPosition()
```

So:
🔢 coordinate
becomes:
📍 center.
Then it asks the geometry object for that hexagon's six corner points:
📍 center
⬇️
⬡ six points.
Those six points are added to the common `points` array.
Then the loop continues with the next coordinate.

# 📚 One Large Collection of Geometry

Imagine that we have three hexagons.
Each hexagon has:
**6 corner points**
So the collection can contain:
**3 × 6 = 18 points**
For ten hexagons:
**10 × 6 = 60 points**
Some points might geometrically coincide, but that does not matter for this calculation.
We simply need all the points so we can find:
⬅️ the smallest x
➡️ the largest x
⬆️ the smallest y
⬇️ the largest y

# 📦 Finding the Final Bounds

After collecting all the corner points, `getGridBounds()` calls:
**`geometry.getBounds(points)`**.
We studied this method in the previous chapter.
It searches all the points for:
**minX**
**minY**
**maxX**
**maxY**
and then calculates:
**width = maxX − minX**
**height = maxY − minY**
So `getGridBounds()` is a nice example of several library operations being combined into a larger operation.

# 🧠 Notice the Different Levels of Responsibility

`HexagonGeometry.getBounds()` understands:
**How do I calculate bounds from geometric points?**
But it does not know anything about Midgard coordinates.
`HexGrid.getGridBounds()` understands:
**I need to convert these Midgard coordinates into geometric hexagons before asking for their bounds.**
That distinction is subtle but important.
The lower-level class solves the **general geometry problem**.
The higher-level class connects that geometry problem to the **Midgard grid problem**.

# 🦴 Part 56 — `getCoordinateRange()`

Next we reach one of the most important connecting methods:

```
getCoordinateRange()
```

It receives:
🦴 a `HexGridRange`
and optionally:
⚙️ `CoordinateRangeOptions`.
It returns:
**`Coordinate[]`**.
This method connects `HexGrid` with the two range classes we studied earlier.

## 🏗️ First Create the `CoordinateRange`

Remember that `HexGridRange` contains only:
**width**
**height**
It does not contain orientation.
Why?
Because the `HexGrid` already knows its orientation.
So `getCoordinateRange()` creates a new `CoordinateRange` by combining:
**the supplied range**
with:
**this.orientation**.
Conceptually:
**width + height**
from the caller
➕
**orientation**
from the `HexGrid`
⬇️
🦴 **complete** **`CoordinateRangeConfig`**

# 🌱 Then Create the Filler

The method next creates:

```
CoordinateRangeFiller
```

and gives it the newly created `CoordinateRange`.
We already know what happens from there.
The filler:
🦴 gets the skeleton
❓ checks whether filling is required
🐝 calculates neighbours
🔍 avoids duplicates
🌱 returns the complete coordinate collection
Finally, `HexGrid` returns that result to the caller.

# 🎨 Part 57 — `getLayeredCoordinateRange()`

The final public method is:

```
getLayeredCoordinateRange()
```

This takes the coordinate-range process one step further.
Instead of returning:
**Coordinate[]**
it returns:
**LayeredCoordinate[]**.

## 🦴 First Get the Normal Coordinates

The method begins by calling its own:

```
getCoordinateRange()
```

So it reuses the process we just studied.
That means it does not duplicate the range-generation logic.
It simply says:
**“First give me the normal coordinates.”**

## 🎨 Then Add the Layering

Once the coordinates exist, the method creates:

```
CoordinateLayer
```

and gives it those coordinates.
Then it calls:

```
getLayeredCoordinates()
```

which:
🔀 sorts by y and then x
and:
🎨 assigns z-index values by row.
The resulting `LayeredCoordinate[]` is returned.

# 🪜 The API Has Different Levels

We can now see that `HexGrid` offers several levels of abstraction.
At the highest level:
🌐 **`createGrid()`**
“Give me the complete grid.”
A little lower:
🎨 **`getLayeredCoordinateRange()`**
“Give me the coordinates prepared with rendering layers.”
Lower again:
🦴 **`getCoordinateRange()`**
“Give me the logical coordinates.”
And then we have focused operations:
🐝 **`getNeighbours()`**
🛡️ **`isValidCoordinate()`**
📍 **`getCenterPosition()`**
⬡ **`getHexagonPoints()`**
📦 **`getGridBounds()`**
This gives another programmer flexibility.
They can use Midgard as a complete grid generator, or they can use smaller pieces of its functionality.

# 🌟 The Architecture of `HexGrid`

Now that we have studied the entire class, we can summarize its role.
`HexGrid` is **not where all the difficult algorithms live**.
Instead, it connects the algorithms.
When it needs validation:
➡️ **CoordinateValidator**
When it needs neighbours:
➡️ **NeighbourCalculator**
When it needs ranges:
➡️ **CoordinateRange**
When it needs filling:
➡️ **CoordinateRangeFiller**
When it needs positions:
➡️ **CoordinatePositioner**
When it needs geometry:
➡️ **HexagonGeometry**
When it needs rendering layers:
➡️ **CoordinateLayer**
This makes `HexGrid` the **high-level coordinator of the library**.

# 🧭 The Complete Journey Through Midgard

We can now trace almost the entire library from beginning to end:
🔢 **Coordinate rules**
⬇️
🧭 **Orientation**
⬇️
🐝 **Neighbour relationships**
⬇️
🦴 **Skeleton generation**
⬇️
🌱 **Grid filling**
⬇️
🎨 **Coordinate ordering and layers**
⬇️
📍 **Geometric positioning**
⬇️
⬡ **Hexagon geometry**
⬇️
🔷 **HexGrid combines everything**
⬇️
🌐 **Complete renderable grid data**
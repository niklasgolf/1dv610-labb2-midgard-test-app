## Chapter 14 — `DemoAreaNeighbours.ts`

### 🔗 Part 346 — From static graphics to interaction

`DemoAreaNeighbours.ts` introduces something fundamentally new.

The previous demos mostly followed this pattern:

📦 **Midgard creates data**

⬇️

🎨 **test app renders it**

⬇️

👁️ **reader looks at the result**

The Neighbours demo adds another direction:

👤 **reader interacts with the SVG**

⬇️

🖱️ **browser detects the interaction**

⬇️

🎨 **the DOM changes visually**

The demonstration uses a specific home coordinate:

```
{ x: 4, y: 6 }
```

and asks Midgard to calculate its six neighbouring coordinates. DemoAreaNeighbours

When the home hexagon is hovered, those six neighbours are highlighted.

This creates the first clearly interactive Midgard demonstration.

---

# 🏠 Part 347 — The home coordinate is application state

The class stores:

```
homeCoordinate = { x: 4, y: 6 }
```

This coordinate has a special meaning inside this particular demo.

To Midgard:

📍 `(4,6)`

is simply a valid coordinate.

To the application:

🏠 `(4,6)`

is the **home hexagon**.

This is another example of the distinction introduced in the terrain chapter:

📦 **library supplies domain structure**

⬇️

🎮 **application assigns meaning**

The library does not need a concept called “home”.

---

# 🔒 Part 348 — Why the home coordinate can be `readonly`

The selected home coordinate does not change during this demonstration.

The demo is designed around one fixed cell.

So it makes sense for this value to be readonly.

That communicates:

> 🏠 **This coordinate is part of the demo's fixed configuration, not changing interaction state.**

The hover state changes visually, but the identity of the home hexagon remains constant.

---

# ↕️ Part 349 — Building the demonstration grid

The demo creates a:

↕️ **y-dominated**

grid using:

📏 **hexDiameter 100**

🦴 **skeletonWidth 4**

🦴 **skeletonHeight 5**. DemoAreaNeighbours

This produces a grid large enough for the home coordinate to sit among surrounding cells.

The purpose is not simply to display a map.

The grid provides the spatial context needed to demonstrate a library operation:

🔗 **finding neighbours**

---

# 🧠 Part 350 — The important library call

The central Midgard operation is:

**`grid.getNeighbours(this.homeCoordinate)`**. DemoAreaNeighbours

This is a strong example of what a library method should allow a consumer to express.

The application does not say:

> “Subtract 2 from this coordinate, then add 2 there, then calculate four diagonals according to orientation rules…”

Instead it says:

> 📦 **Midgard, give me the neighbours of this coordinate.**

That expresses the application intention directly.

---

# 🔗 Part 351 — The six returned neighbours

For the y-dominated home coordinate:

```
(4,6)
```

Midgard returns these six neighbours:

⬆️ **`(4,4)`**

⬇️ **`(4,8)`**

↖️ **`(3,5)`**

↗️ **`(5,5)`**

↙️ **`(3,7)`**

↘️ **`(5,7)`**

The exact geometric meaning comes from Midgard's y-dominated neighbour rules.

The test application does not hardcode these six coordinates as its neighbour algorithm.

It asks the library for them.

That distinction is essential.

---

# 🧪 Part 352 — A demo of behaviour, not duplicated logic

Suppose the demo manually listed the six neighbour coordinates.

It could still make the correct cells light up.

But it would no longer genuinely demonstrate:

```
getNeighbours()
```

Instead, it would merely imitate the expected result.

The current architecture is stronger:

🏠 home coordinate

⬇️

📦 **Midgard `getNeighbours()`**

⬇️

📍 six returned coordinates

⬇️

🎨 highlight those coordinates

So the visible behaviour is actually driven by the library API being demonstrated.

---

# 📝 Part 353 — Showing the returned coordinates

The page also creates a textual list of the neighbour coordinates.

This follows the same philosophy as the earlier grid demos:

👁️ show the visual result

and:

🧠 show the underlying data

So a reader can see both:

🔗 which hexagons become highlighted

and:

📍 which coordinates Midgard actually returned.

This is especially useful when learning a non-standard coordinate system.

---

# 🗺️ Part 354 — The SVG rendering foundation is familiar

The method that creates the SVG begins with concepts already encountered:

📚 receive `LayeredHexagon[]`

⬇️

📍 gather all points

⬇️

📐 calculate global bounds

⬇️

🖼️ create SVG with suitable viewBox

⬇️

🔁 create one polygon per hexagon. DemoAreaNeighbours

This repetition is useful because it shows that interaction can be layered on top of the same basic rendering architecture.

The geometry-rendering foundation does not need to be reinvented.

---

# 🆔 Part 355 — Coordinate-derived IDs return

The technique from the CSS Styling demo becomes even more important here.

Each polygon receives an ID derived from its Midgard coordinate.

Conceptually:

📍 `(4,6)`

⬇️

🏷️ **`hex-4-6`**

and:

📍 `(3,5)`

⬇️

🏷️ **`hex-3-5`**

Previously, IDs were mainly used to connect coordinates to CSS.

Now they become a bridge between:

📦 **Midgard coordinates**

and:

🖱️ **interactive DOM manipulation**

---

# 🧰 Part 356 — `createHexagonId()` centralizes the naming rule

The file contains a helper for creating these IDs:

**`createHexagonId()`**. DemoAreaNeighbours

This is a good small abstraction.

Instead of repeating the ID format throughout the class, one method owns the convention:

📍 coordinate

⬇️

🏷️ hexagon DOM ID

If the naming rule ever changed, the logic would have one clear home.

This also gives the transformation a meaningful name.

---

# 🔒 Part 357 — A naming convention becomes a contract inside the app

Once multiple methods rely on coordinate-derived IDs, the naming convention becomes important.

For example:

🎨 polygon creation

and:

🔍 neighbour highlighting

must agree about what ID represents coordinate `(3,5)`.

If one part produced:

```
hex-3-5
```

while another searched for:

```
cell-3-5
```

the interaction would fail.

Centralizing ID creation helps maintain consistency.

So even a small string-formatting helper can protect an internal application contract.

---

# 📚 Part 358 — Turning neighbour coordinates into IDs

The demo receives neighbours from Midgard as coordinates.

But DOM interaction needs to identify rendered SVG elements.

So the application performs a translation:

📦 **Midgard result**

```
Coordinate[]
```

⬇️

🏷️ **DOM identities**

```
hex-x-y
```

This is the same architectural bridge seen earlier:

📍 domain identity

⬇️

🏷️ presentation identity

But this time the derived identity is used programmatically during interaction.

---

# 🧺 Part 359 — A `Set` stores neighbour IDs

The SVG creation logic uses a **`Set`** of neighbour IDs. DemoAreaNeighbours

A JavaScript `Set` is a collection designed to hold unique values.

Conceptually:

🧺 **Set**

contains:

```
hex-4-4
hex-4-8
hex-3-5
hex-5-5
hex-3-7
hex-5-7
```

A Set is particularly useful when the main question is:

> ❓ **Does this value belong to the collection?**

---

# 🆚 Part 360 — Array versus Set

An array and a Set can both contain multiple values, but they emphasize different operations.

### 📚 Array

Useful when:

🔢 order matters

🔁 every item will be processed

📍 numeric positions are useful

### 🧺 Set

Useful when:

🔒 values should be unique

🔍 membership checking is important

In this demo, neighbour identity is naturally set-like:

> 🔗 **These are the IDs belonging to the neighbour group.**

---

# 🔍 Part 361 — Membership is the important question

During highlighting, the application needs to distinguish:

🔗 neighbour hexagons

from:

⬡ ordinary hexagons

A Set allows the logic to ask conceptually:

> 🔍 **Is this polygon's ID one of the neighbour IDs?**

This is a very natural use of the data structure.

The choice of collection can communicate the intended operation.

---

# 🌱 Part 362 — Terrain still exists underneath the interaction

The demo also gives the grid a simple terrain appearance.

The home coordinate receives:

🟫 **`#c58b3a`**

Water receives:

🌊 **`#4f9fcf`**

Other terrain receives:

🌱 **`#6f9f58`**. DemoAreaNeighbours

This makes the map more visually meaningful while keeping the main focus on neighbour interaction.

The terrain system is simpler than the detailed SVG Terrain demo.

That is appropriate because this page is demonstrating a different concept.

---

# 🌊 Part 363 — Water coordinates are represented as coordinate strings

The demo has a set of coordinates that should be treated as water.

A useful technique is to represent a coordinate in a stable textual form.

Conceptually:

📍 `(3,5)`

⬇️

🧵 **`3,5`**

A Set can then contain those coordinate keys.

The program can derive the same key from any coordinate and check whether it belongs to the water set.

This is another example of **derived identity**.

---

# 🧠 Part 364 — Objects are not automatically equal by value

Why might a string representation be useful?

In JavaScript, two separately created objects containing the same properties are still different object references.

Conceptually:

```
{ x: 3, y: 5 }
```

and another:

```
{ x: 3, y: 5 }
```

look identical in value, but they are not automatically the same object reference.

For coordinate membership, the application often wants:

> 📍 **same x and same y**

rather than:

> 🔗 **literally the same object instance**

A stable string key is one simple way to represent value-based identity.

---

# ⚖️ Part 365 — `isSameCoordinate()` expresses value equality

The class also contains a helper:

**`isSameCoordinate()`**. DemoAreaNeighbours

Its purpose is conceptually:

> 📍 **Do these two coordinates contain the same x and y values?**

This makes the intended comparison explicit.

Instead of relying on object reference identity, the program compares the meaningful domain properties.

So:

x values equal

**and**

y values equal

⬇️

📍 **same logical coordinate**

---

# 🧠 Part 366 — Reference equality versus value equality

This distinction is fundamental in JavaScript.

### 🔗 Reference equality

Are these two variables pointing to the exact same object?

### 📍 Value equality

Do these two coordinate objects represent the same logical position?

For Midgard coordinates, value equality is usually the meaningful question.

Two separately created coordinate objects can still represent the same grid location.

The helper method makes that domain interpretation clear.

---

# 🏠 Part 367 — Finding the home polygon

As the grid is rendered, the demo can compare each hexagon's coordinate with:

```
homeCoordinate
```

using coordinate value comparison.

When the matching polygon is found, that polygon receives special interactive behaviour.

So:

📚 iterate through grid

⬇️

📍 compare coordinate

⬇️

🏠 home found

⬇️

🖱️ attach event listeners

The interaction is therefore attached to one specific DOM element based on its Midgard coordinate.

---

# 🖱️ Part 368 — Event-driven programming

The demo introduces browser events.

Instead of the program running one fixed sequence and finishing, it waits for something to happen.

For example:

👤 pointer enters home hexagon

⬇️

📣 browser emits event

⬇️

⚙️ registered function runs

This is **event-driven programming**.

Modern browser applications rely heavily on this model.

The program defines:

> 🧠 **When this event happens, perform this behaviour.**

---

# 🖱️ Part 369 — `mouseenter`

The home polygon listens for:

```
mouseenter
```

This event occurs when the pointing device enters the element.

Conceptually:

🖱️ pointer outside home

⬇️ moves onto home

🏠

⬇️

📣 **mouseenter**

⬇️

✨ highlight neighbours

This creates the interactive response visible in the demo.

---

# 🖱️ Part 370 — `mouseleave`

The polygon also listens for:

```
mouseleave
```

This is the opposite transition.

🖱️ pointer over home

⬇️ moves away

📣 **mouseleave**

⬇️

🎨 restore neighbour appearance

Together the two events create a temporary hover state:

outside

➡️ normal

inside

➡️ highlighted

outside again

➡️ normal

---

# 🔄 Part 371 — Interaction is a state transition

Even though there is no explicit property such as:

```
isHovering = true
```

the interface still has two visual states:

### ⚪ Normal state

Neighbours use ordinary terrain styling.

### ✨ Highlighted state

Neighbours become visually emphasized.

Mouse events cause transitions:

⚪ normal

⬇️ `mouseenter`

✨ highlighted

⬇️ `mouseleave`

⚪ normal

This can be understood as a tiny state machine driven by browser events.

---

# ✨ Part 372 — `highlightNeighbours()` changes the DOM

The helper `highlightNeighbours()` performs the visual update. DemoAreaNeighbours

The highlighted neighbours receive effects including:

✨ increased brightness/saturation

🟨 yellow stroke

📏 thicker stroke width

When the highlight is removed, those properties are restored.

This is direct DOM/SVG manipulation.

The SVG already exists.

The application modifies properties of existing elements rather than rebuilding the whole grid.

---

# 🔄 Part 373 — Update versus rerender

This is an important contrast with `DemoArea`.

When switching demos, `DemoArea` uses:

```
replaceChildren()
```

to replace the displayed content.

Neighbour highlighting does not need such a large operation.

The grid structure remains unchanged.

Only a few visual properties change.

So the program performs a targeted update:

⬡ existing polygon

⬇️

🎨 change attributes/styles

rather than:

🗺️ destroy entire grid

⬇️

🏗️ rebuild entire grid

This is more appropriate for a small hover interaction.

---

# 🔍 Part 374 — Domain result → DOM lookup → visual effect

The complete interaction crosses several layers.

📦 Midgard says:

**these coordinates are neighbours**

⬇️

🖥️ test app derives:

**these SVG IDs represent those coordinates**

⬇️

🌳 DOM provides:

**these polygon elements**

⬇️

🎨 renderer applies:

**these visual effects**

So:

📍 **domain data**

becomes:

🏷️ **presentation identity**

becomes:

🌳 **DOM element**

becomes:

✨ **visible interaction**

This is one of the most complete data flows in the test application.

---

# 🧠 Part 375 — The neighbour algorithm stays in one place

The most important architectural success is that the test app does not duplicate Midgard's neighbour mathematics.

Imagine otherwise:

📦 library has neighbour rules

and:

🖥️ demo separately has neighbour rules

Now there would be two implementations of the same domain logic.

If one changed and the other did not, they could disagree.

Instead:

📦 **Midgard owns neighbour calculation**

🖥️ **test app owns neighbour visualization**

That gives each rule one clear home.

---

# 🎯 Part 376 — The demo turns an abstract API into something tangible

A method called:

```
getNeighbours()
```

is understandable in code.

But the visual demonstration makes its meaning immediate.

Hover:

🏠

and see:

　　　✨\
　✨　🏠　✨\
　✨　　　✨\
　　　✨

The API result becomes spatially visible.

This is particularly valuable for grid libraries because coordinate relationships can be difficult to understand from numbers alone.

---

# 🧩 Part 377 — Interaction without changing the library

Notice again how much functionality has been added purely in the consumer.

The demo now contains:

🖱️ mouse events

✨ hover highlighting

🌊 terrain

🏠 home semantics

🏷️ SVG IDs

🔍 DOM targeting

Yet Midgard still only needs to answer:

> 🔗 **Which coordinates are neighbours?**

This demonstrates a strong library boundary.

A reusable library does not need to implement every possible interaction its consumers might build.

It should provide the domain capabilities that allow those interactions to be built.

---

# 🎮 Part 378 — How this could grow into game behaviour

The same architectural pattern could support future game mechanics.

For example:

🏠 selected unit

⬇️

📦 get neighbouring coordinates

⬇️

🎮 application checks terrain/movement rules

⬇️

✨ legal destination hexagons highlighted

Or:

🏰 selected city

⬇️

📦 determine nearby coordinates

⬇️

🎨 show influence area

The current demo is intentionally small, but the pattern is already useful for larger interactive systems.

---

# 🧱 Part 379 — Three layers of responsibility

The Neighbours demo can be divided into three clear layers.

### 📦 Domain layer — Midgard

Answers:

> Which coordinates are neighbours?

### 🌳 Representation layer — SVG/DOM

Answers:

> Which polygon represents each coordinate?

### 🖱️ Interaction layer — test application

Answers:

> What should happen when the home polygon is hovered?

The separation is:

📦 **relationship**

⬇️

🌳 **representation**

⬇️

🖱️ **interaction**

Each layer solves a different problem.

---

# 🧰 TypeScript, JavaScript and DOM concepts introduced in Chapter 14

### 🧺 `Set`

A collection of unique values, particularly useful for membership tests.

### 📍 Value equality

Two coordinate objects can represent the same position even when they are different object instances.

### 🔗 Reference equality

Object identity is different from equality of the values stored inside objects.

### 🖱️ Event-driven programming

Code can run in response to browser events rather than only in one predetermined sequence.

### 📣 `mouseenter`

Runs behaviour when the pointer enters an element.

### 📣 `mouseleave`

Runs behaviour when the pointer leaves an element.

### 🔄 State transition

Interaction can move the interface between normal and highlighted visual states.

### 🎨 Targeted DOM update

Existing elements can be modified without rebuilding the entire component.

### 🏷️ Derived DOM identity

Coordinates can be translated into predictable element IDs.

---

# 🎯 Chapter 14 — The central idea

`DemoAreaNeighbours.ts` connects one of Midgard's domain operations directly to browser interaction.

The complete flow is:

🏠 **home coordinate `(4,6)`**

⬇️

📦 **`getNeighbours()`**

⬇️

📍 **six neighbour coordinates**

⬇️

🏷️ **coordinate-derived SVG IDs**

⬇️

🌳 **matching SVG polygons**

⬇️

🖱️ **mouseenter**

⬇️

✨ **highlight neighbours**

⬇️

🖱️ **mouseleave**

⬇️

🌱 **restore normal appearance**

The most important architectural boundary remains clear:

> 📦 **Midgard decides which coordinates are neighbours. The test application decides what being a neighbour should look like and how the user interacts with that information.**

At this point, all eight files in `src/demos/` have been covered.

The final chapter of the current source-code tour moves to the application's visual foundation:

🎨 **`style.css`**

There the separate DOM structures created by `Header`, `Navigation`, `DemoArea` and the demo classes are turned into one coherent application layout.
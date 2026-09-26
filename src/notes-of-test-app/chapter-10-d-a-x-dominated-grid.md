## Chapter 10 — `DemoAreaXDominatedGrid.ts`

### ↔️ Part 223 — From one hexagon to a complete grid

`DemoAreaXDominatedGrid.ts` takes the idea from the previous chapter and expands it.

`DemoAreaSingleHex` asked Midgard to create:

⬡ **one hexagon**

This demo asks Midgard to create:

⬡⬡⬡ **an entire x-dominated grid**

The overall architecture remains familiar:

🧩 implements `Demo`

⬇️

📦 creates a Midgard `HexGrid`

⬇️

🗺️ calls `createGrid()`

⬇️

📚 receives multiple hexagons

⬇️

🎨 renders them as SVG polygons

But a grid introduces several new concepts:

📚 **arrays of hexagons**

🔁 **iteration**

🦴 **skeleton dimensions**

📐 **bounds across multiple shapes**

🏷️ **coordinate information**

🪜 **z-index layering**

This demo therefore moves from rendering a single geometric object to rendering a **collection of related objects**.

---

# ↔️ Part 224 — What does x-dominated mean here?

The grid is created using the orientation:

`x-dominated`

This means the Midgard geometry follows the x-dominated interpretation of hexagon size and positioning.

The important architectural point is that the test app does not implement those rules itself.

It simply creates:

📦 **HexGrid**

configured as:

↔️ **x-dominated**

The library then takes responsibility for producing the correct coordinates, centers and polygon points.

So once again:

🖥️ **test app expresses intention**

⬇️

📦 **library performs geometry**

---

# 🏗️ Part 225 — The demo follows the same `Demo` contract

Even though this file is considerably larger than `DemoAreaHome`, it still satisfies exactly the same interface:

🧩 **Demo**

⬇️

🎨 **render()**

⬇️

🌳 **HTMLElement**

This reinforces an important idea from Chapters 7 and 8.

The complexity inside a concrete demo can increase dramatically without changing the contract used by `DemoArea`.

From the outside:

🏠 Home

⬡ Single Hex

↔️ X-Dominated Grid

are all simply:

🧩 **Demo**

That is the practical value of the abstraction.

---

# 🦴 Part 226 — Creating a 3 × 2 skeleton

This demo asks the library for a grid based on:

`skeletonWidth: 3`

and:

`skeletonHeight: 2`

with:

**`hexDiameter: 100`**.

This does **not** mean that the final Midgard grid consists of only six hexagons.

The 3 × 2 values describe the **skeleton**.

Conceptually:

🦴 **3 × 2 skeleton**

⬇️

📦 Midgard applies its grid rules

⬇️

⬡ **filled Midgard grid**

This distinction is important because `skeletonWidth` and `skeletonHeight` describe the structure from which the full grid is generated.

---

# 🧠 Part 227 — Why the word `skeleton` matters

A generic grid API might use names such as:

**width**

and:

**height**

But Midgard specifically uses:

`skeletonWidth`

`skeletonHeight`

That terminology communicates a domain rule.

The supplied dimensions are not simply the final rectangular number of rendered cells.

They describe the underlying skeleton that Midgard expands around.

This is an example of good domain terminology:

> 🧠 **A name should communicate what a value means in the system, not merely what primitive type it contains.**

`3` is just a number.

`skeletonWidth: 3` expresses a concept.

---

# 📏 Part 228 — A smaller diameter for a larger structure

The single-hex demo used:

`hexDiameter: 300`

This grid demo uses:

**`hexDiameter: 100`**.

That makes sense visually.

A single hexagon can occupy a large area.

A grid contains many hexagons, so each individual hexagon needs to be smaller if the whole structure is to fit comfortably on the page.

The important point is that both demos use the same public concept:

📏 **hexDiameter**

Only the configuration value changes.

---

# 🏭 Part 229 — `createGrid()` is the high-level operation

The demo uses Midgard's high-level:

`createGrid()`

method.

Conceptually, the call says:

> 📦 **Create an x-dominated Midgard grid with 100-unit hexagons based on a 3 × 2 skeleton.**

The test application does not manually:

❌ create every coordinate

❌ fill around the skeleton

❌ calculate every center

❌ calculate every polygon

❌ assign layering

Instead, the library returns complete grid data ready for a consumer to use.

This is precisely what a high-level library API should provide.

---

# 📚 Part 230 — The result is now an array

This is a major difference from the previous chapter.

`createSingleHexagon()` returns:

⬡ **one Hexagon**

`createGrid()` returns:

📚 **multiple LayeredHexagons**

So the consumer now works with a collection.

Conceptually:

**single hex**

➡️ one object

**grid**

➡️ array of objects

This changes the rendering problem.

The application can no longer create one polygon and finish.

It must process every hexagon in the returned array.

---

# 🧩 Part 231 — `LayeredHexagon`

The grid does not merely return ordinary hexagons.

The objects are typed as:

`LayeredHexagon`

A `LayeredHexagon` contains the ordinary hexagon information plus:

🪜 **`zIndex`**

So conceptually:

⬡ **Hexagon**

contains:

📍 coordinate

🎯 center

🔷 points

while:

🪜 **LayeredHexagon**

contains all of that

**plus**

🏷️ z-index information.

The layering information becomes useful when deciding visual drawing order.

---

# 🪜 Part 232 — What is z-index conceptually?

The term **z-index** represents ordering along an imaginary third axis.

A two-dimensional screen uses:

↔️ **x**

↕️ **y**

But when objects overlap, another question appears:

> 🪜 **Which object should appear in front?**

That conceptual front-to-back direction is often called:

**z**

So:

**x → horizontal position**

**y → vertical position**

**z → visual depth/order**

Midgard assigns z-index values to its grid rows so consumers can preserve a useful rendering order.

---

# 💯 Part 233 — Midgard's row layering

In the library's current model, each distinct y-row advances the z-index by 100.

Conceptually:

first y-row

➡️ **z-index 100**

next y-row

➡️ **z-index 200**

next y-row

➡️ **z-index 300**

and so on.

The exact values matter less than the ordering.

The important relationship is:

**later visual row**

➡️ **higher layering value**

This gives a rendering system information it can use when objects eventually overlap or extend beyond their own hexagons.

---

# 🌲 Part 234 — Why layering matters in a hex game

The simple outline grid does not contain trees or buildings.

But imagine a later strategy-game map.

A tree may visually extend above the hexagon that owns it.

A tower may overlap part of another tile.

Without consistent ordering, an object that should visually appear behind another could accidentally be drawn on top.

Layer information can help produce:

🌲 background object

⬇️

🏰 foreground object

in the intended order.

So even though this demo is visually simple, it exposes information that becomes important for richer maps.

---

# 📝 Part 235 — The demo shows coordinates and z-index values

The page does not only draw the grid.

It also produces a textual list containing information in the form:

**`(x, y) z-index`**.

This is useful because the demo can reveal information that is not obvious from the drawing alone.

The visual SVG answers:

> 👁️ **What does the grid look like?**

The textual list answers:

> 🧠 **What data did the library actually return?**

This makes the demo a stronger development and teaching tool.

---

# 🔁 Part 236 — Iteration becomes central

Because `createGrid()` returns an array, the demo repeatedly processes hexagons.

Conceptually:

🔁 **for each hexagon**

⬇️

📍 inspect geometry

⬇️

🔷 create polygon

⬇️

🖼️ add polygon to SVG

Iteration is fundamental whenever software moves from:

**one object**

to:

**a collection of objects**

The same pattern will appear repeatedly in the later demos.

---

# 🔁 Part 237 — `for...of` and collections

One useful TypeScript/JavaScript construct for this is:

`for...of`

It means conceptually:

> 🔁 **Take each value from this iterable collection, one at a time.**

For an array of hexagons:

📚 hexagons

⬇️

⬡ first hexagon

⬇️

⬡ second hexagon

⬇️

⬡ third hexagon

⬇️

...

This is different from manually working with array indexes when the actual index is not important.

The code cares about:

**the hexagon**

rather than:

**its numeric array position**.

---

# 📐 Part 238 — One hexagon's bounds are no longer enough

For the Single Hex demo, the SVG bounds could be calculated from six points belonging to one object.

A grid is different.

Now the SVG must contain:

⬡ hexagon 1

⬡ hexagon 2

⬡ hexagon 3

⬡ hexagon 4

⬡ ...

So the bounds must cover the **entire collection**.

The renderer needs the global:

⬅️ minimum x

➡️ maximum x

⬆️ minimum y

⬇️ maximum y

across **all polygon points**.

---

# 🌍 Part 239 — Local geometry versus global geometry

This introduces a useful distinction.

### ⬡ Local geometry

The points belonging to one hexagon.

### 🗺️ Global geometry

The total area occupied by all hexagons together.

For rendering one hexagon:

📍 local geometry is enough.

For rendering a complete grid:

📍📍📍 all local geometries

must contribute to:

🗺️ **global bounds**

The SVG viewBox then uses those global bounds.

---

# 📚 Part 240 — Flattening many point collections

Each hexagon has its own array of points.

But to calculate overall bounds, the renderer conceptually needs one collection containing points from every hexagon.

The structure begins like:

📚 **hexagons**

├── ⬡ hexagon → six points  
├── ⬡ hexagon → six points  
├── ⬡ hexagon → six points  
└── ⬡ hexagon → six points

For global calculations, it is useful to transform that into:

📍 point  
📍 point  
📍 point  
📍 point  
📍 point  
📍 point  
📍 point  
...

This process is often called **flattening**.

---

# 🗺️ Part 241 — `flatMap()` combines mapping and flattening

JavaScript provides:

`.flatMap()`

for this kind of operation.

It can be understood as:

**map**

+

**flatten**

Suppose every hexagon produces an array of points.

Ordinary `.map()` would conceptually produce:

📚 array

containing:

📚 array of points  
📚 array of points  
📚 array of points

But `.flatMap()` can produce:

📚 one array of points

containing:

📍 point  
📍 point  
📍 point  
📍 point  
...

That is exactly the form needed for finding overall minimum and maximum coordinates.

---

# 🔍 Part 242 — Finding bounds from all points

Once all points are available together, the demo can calculate the extremes.

Conceptually:

📍 all grid points

⬇️

⬅️ **minX**

➡️ **maxX**

⬆️ **minY**

⬇️ **maxY**

⬇️

📏 width = maxX − minX

📏 height = maxY − minY

⬇️

🖼️ SVG viewBox

This is the same geometric idea used in the Single Hex demo, but generalized from:

**one shape**

to:

**many shapes**.

---

# 🖼️ Part 243 — The viewBox adapts to the complete grid

The SVG does not need to know beforehand exactly how large the final grid will be.

Instead:

📦 Midgard creates the grid

⬇️

📍 test app examines resulting geometry

⬇️

📐 test app calculates global bounds

⬇️

🖼️ SVG adapts its viewBox

This is another example of **data-driven rendering**.

The geometry determines the visual coordinate space.

The visual coordinate space is not guessed in advance.

---

# 🔷 Part 244 — One polygon per hexagon

After the SVG is prepared, the demo creates one polygon for each returned hexagon.

So the transformation is:

📚 **LayeredHexagon[]**

⬇️

🔁 for every hexagon

⬇️

📍 points

⬇️

🔷 SVG polygon

The final SVG therefore contains many sibling polygon elements.

Conceptually:

🖼️ **SVG**

├── 🔷 polygon  
├── 🔷 polygon  
├── 🔷 polygon  
├── 🔷 polygon  
└── ...

Each polygon corresponds to one Midgard hexagon.

---

# 🧱 Part 245 — Rendering order matters in SVG

SVG has an important characteristic:

> 🎨 **Elements drawn later generally appear above elements drawn earlier when they overlap.**

That means array ordering can affect visual layering.

This makes the library's layered grid ordering useful.

The test app can process the returned hexagons in their intended render order.

So there is a direct relationship:

📦 **Midgard ordering**

⬇️

🔁 **iteration order**

⬇️

🖼️ **SVG DOM order**

⬇️

🪜 **visual stacking**

This is a subtle but important connection between library data and rendering behaviour.

---

# 🎨 Part 246 — The grid remains visually simple

Like the Single Hex demo, this grid uses a deliberately restrained visual style.

The polygons primarily show:

⬡ **shape**

📐 **placement**

🗺️ **overall grid structure**

The goal is not yet to create a game map.

That comes later.

This demo answers a narrower question:

> ↔️ **What does a Midgard x-dominated grid generated from a 3 × 2 skeleton actually look like?**

Keeping this demo simple makes the library behaviour easier to inspect.

---

# 🧪 Part 247 — A demo should isolate the concept being demonstrated

This reflects a useful demonstration principle.

If every demo immediately contained:

🌲 trees

🌊 water

🏰 towers

✨ effects

🖱️ interactions

then it would be harder to understand which behaviour came from which feature.

Instead, the application progresses gradually:

⬡ **Single Hex**

→ basic geometry

↔️ **X Grid**

→ multiple hexagons and layering

🎨 **CSS Styling**

→ visual customization

🌲 **SVG Terrain**

→ complex artwork

🔗 **Neighbours**

→ interaction

Each demo has a clearer educational purpose.

---

# 📊 Part 248 — Visual output plus raw information

The coordinate/z-index list is particularly useful because it exposes the relationship between:

🗺️ **what is drawn**

and:

📦 **what the library returned**

This can help answer questions such as:

> Which coordinate belongs to this row?

> How does y change across the grid?

> Which rows receive which z-index?

A good library demo often benefits from showing both:

👁️ **the result**

and:

🧠 **the underlying data**

That makes invisible rules inspectable.

---

# 🔄 Part 249 — Reuse between Single Hex and Grid demos

There is considerable conceptual reuse between this file and `DemoAreaSingleHex.ts`.

Both need to:

📦 receive Midgard geometry

📐 determine bounds

🖼️ create SVG

🔷 create polygons from points

But there is also an important difference:

### ⬡ Single Hex

One geometry object.

### ↔️ Grid

A collection of layered geometry objects.

This is a common programming progression:

**solve the problem for one value**

then:

**generalize it to many values**.

---

# 🧠 Part 250 — Midgard's output is richer than what this demo uses visually

The returned `LayeredHexagon` contains information such as:

📍 coordinate

🎯 center

🔷 polygon points

🪜 z-index

But the outline drawing does not need to visually represent every property.

This is normal.

A data model can contain more information than one particular view chooses to display.

The demo uses:

🔷 points → SVG polygons

while also exposing:

📍 coordinates + 🪜 z-index → textual information

Another application could use the same objects differently.

That flexibility is one reason for returning structured data rather than pre-rendered graphics.

---

# 🔌 Part 251 — The library remains rendering-independent

This grid demo reinforces the same boundary established in Chapter 9.

Midgard does **not** say:

> “Create 15 SVG polygon elements.”

It says:

> “Here is the grid geometry and layering information.”

The consumer says:

> “I will represent that information using SVG.”

Therefore:

📦 **Library**

⬇️

📊 structured geometric data

⬇️

🖥️ **Consumer**

⬇️

🎨 chosen rendering technology

This keeps Midgard useful beyond this particular Vite application.

---

# 🧰 TypeScript, JavaScript and rendering concepts introduced in Chapter 10

### 📚 Arrays of domain objects

`createGrid()` produces a collection rather than a single hexagon.

### 🔁 Iteration

Collections require repeated processing of their elements.

### 🔁 `for...of`

Provides a clear way to process each value in an iterable collection.

### 🗺️ Global bounds

Rendering multiple shapes requires bounds covering the entire collection.

### 📚 Flattening

Nested collections can be transformed into one flat collection.

### 🗺️ `.flatMap()`

Maps values and flattens the resulting arrays into a single array.

### 🪜 Layering

z-index information represents intended visual ordering.

### 🎨 SVG drawing order

Later SVG elements can visually appear above earlier elements when shapes overlap.

### 🦴 Domain terminology

`skeletonWidth` and `skeletonHeight` express Midgard-specific meaning more precisely than generic width and height.

---

# 🎯 Chapter 10 — The central idea

`DemoAreaXDominatedGrid.ts` generalizes the rendering process from:

⬡ **one hexagon**

to:

🗺️ **a complete grid**

The full flow becomes:

↔️ **x-dominated**

⬇️

📦 **HexGrid**

⬇️

🦴 **3 × 2 skeleton**

⬇️

🏭 **createGrid()**

⬇️

📚 **LayeredHexagon[]**

⬇️

📍 gather points from all hexagons

⬇️

📐 calculate global bounds

⬇️

🖼️ create SVG viewBox

⬇️

🔁 process every hexagon

⬇️

🔷 create one polygon per hexagon

⬇️

🗺️ **complete x-dominated grid**

At the same time, the demo exposes coordinates and z-index values so the reader can inspect the structured information behind the drawing.

The next chapter examines:

↕️ **`DemoAreaYDominatedGrid.ts`**

It is intentionally very similar to this file.

That similarity is itself worth studying, because it demonstrates an important software-design question:

> 🧠 **When is similar code useful for clarity, and when does similarity become duplication that should be abstracted?**
## Chapter 13 — `DemoAreaSvgTerrain.ts`

### 🌲 Part 305 — From hexagon grid to illustrated terrain

`DemoAreaSvgTerrain.ts` is the largest and most visually ambitious demo in the test application.

The earlier demos gradually built up the rendering system:

⬡ **Single Hex** → basic SVG polygon

↔️ **Grid** → many polygons

🎨 **CSS Styling** → individual terrain colors

This demo goes much further.

A hexagon is no longer just a colored polygon. It becomes a small illustrated scene containing things such as:

🌱 grass

🌊 water

🌲 a tree

🏰 a tower

The important architectural idea is that Midgard itself still knows nothing about these graphics.

The flow remains:

📦 **Midgard**

⬇️

📍 coordinates + geometry

⬇️

🎨 **test application**

⬇️

🌲🌊🏰 detailed SVG artwork

So even though the visual complexity increases dramatically, the boundary between **geometry library** and **renderer** remains intact. DemoAreaSvgTerrain

---

# 📏 Part 306 — Why this chapter focuses on structure

The file contains roughly 840 lines.

A large portion of those lines describe individual SVG shapes: paths, circles, ellipses, coordinates and other drawing details.

Explaining every individual drawing coordinate would obscure the more important programming concepts.

The useful questions are instead:

🧠 How is a large rendering class organized?

🎨 How are SVG scenes constructed?

✂️ How is artwork clipped to a hexagon?

🧩 How are helper methods used to control complexity?

🌱 How is terrain type represented?

📦 How does Midgard geometry drive the entire drawing?

The individual artistic coordinates are implementation details of the illustrations.

The architecture behind them is the main lesson.

---

# 📦 Part 307 — Three important Midgard imports

The demo uses:

```
HexGrid
LayeredHexagon
```

and:

**`Point`**.

Each has a different role.

### 🗺️ `HexGrid`

Creates the complete Midgard grid.

### ⬡ `LayeredHexagon`

Represents each generated grid hexagon.

### 📍 `Point`

Represents geometric positions used throughout the SVG drawing code.

This is interesting because the demo does not only use Midgard's finished hexagons.

It also works extensively with the geometric language of **points** when creating its own visual artwork.

---

# 🌱 Part 308 — `TerrainType` introduces a local domain concept

The file defines a local type:

**`TerrainType = 'grass' | 'water' | 'tower'`**. DemoAreaSvgTerrain

This is a string literal union, similar to the `HeaderSection` type encountered earlier.

It means that terrain type may only be one of three recognized values:

🌱 **grass**

🌊 **water**

🏰 **tower**

This is much stronger than using an unrestricted `string`.

An arbitrary value such as:

```
'banana'
```

is not part of the declared terrain model.

---

# 🧠 Part 309 — Types can model the application's own domain

Midgard has its own domain concepts:

📍 Coordinate

⬡ Hexagon

🗺️ Grid

🧭 Orientation

The test application can introduce additional concepts that belong only to the demo:

🌱 Grass

🌊 Water

🏰 Tower

This separation is healthy.

The library does not need a `TerrainType`.

Terrain is not part of Midgard's geometric responsibility.

So:

📦 **library domain**

→ grid geometry

while:

🎮 **application/demo domain**

→ what the hexagons represent visually

This is another example of keeping responsibilities in the correct layer.

---

# 🌐 Part 310 — The SVG namespace becomes a reusable field

This file creates many SVG elements.

Rather than repeatedly writing the SVG namespace throughout the drawing code, the class stores it as a readonly value.

Conceptually:

🌐 **SVG namespace**

→ one known constant

→ reused by every SVG creation operation

The namespace identifies SVG elements as belonging to:

```
http://www.w3.org/2000/svg
```

The important design idea is not merely the string itself.

It is:

> 🧠 **When one constant value is repeatedly required throughout a class, give it a meaningful home instead of scattering duplicated literals everywhere.**

---

# 🔒 Part 311 — Why `readonly` fits a namespace

The SVG namespace should not change while the demo is running.

It is a fixed technical constant.

So `readonly` communicates the intention:

> 🔒 **This value belongs to the object, but it is not mutable application state.**

Compare that with something like a selected terrain cell, which could legitimately change.

The namespace is different.

It is configuration that remains stable.

---

# ↕️ Part 312 — The terrain demo uses a y-dominated grid

The grid is configured as:

↕️ **y-dominated**

with:

📏 **hexDiameter 200**

🦴 **skeletonWidth 1**

🦴 **skeletonHeight 3**. DemoAreaSvgTerrain

The large diameter gives each terrain cell enough space for detailed artwork.

The narrow skeleton produces a compact demonstration rather than a huge map.

Again, Midgard controls the geometry.

The demo controls what is drawn inside that geometry.

---

# 🗺️ Part 313 — `createTerrainSvg()` is the main rendering engine

One of the central methods is:

**`createTerrainSvg()`**. DemoAreaSvgTerrain

Its job is to turn the entire collection of Midgard hexagons into one SVG terrain scene.

At a high level it performs familiar steps:

📚 receive hexagons

⬇️

📍 gather geometric points

⬇️

📐 calculate overall bounds

⬇️

🖼️ create SVG

⬇️

🧰 create SVG definitions

⬇️

🔁 process every hexagon

⬇️

🌱🌊🏰 render terrain

This method coordinates the overall process while more specialized methods handle individual drawing tasks.

---

# 📐 Part 314 — The familiar bounds calculation returns

Despite all the new graphics, the beginning of the rendering process is familiar.

The demo still needs:

⬅️ minimum x

➡️ maximum x

⬆️ minimum y

⬇️ maximum y

across all Midgard polygon points.

From these it derives the complete width and height of the terrain.

That information becomes the SVG viewBox.

So the same geometric foundation supports increasingly sophisticated visual output:

⬡ outline

⬇️

🎨 colored hexagons

⬇️

🌲 detailed terrain

The renderer becomes richer without changing the underlying geometry.

---

# 🧰 Part 315 — The SVG `<defs>` element

This demo introduces an important SVG element:

```
<defs>
```

The name means **definitions**.

It provides a place to define graphical resources that are not necessarily drawn directly when declared.

Conceptually:

🧰 **`<defs>`**

contains reusable or referenced SVG definitions

which other elements can later use.

In this demo, it is particularly important for:

✂️ **clipping paths**

The definition exists in `<defs>`, and terrain groups refer to it later.

---

# ✂️ Part 316 — Why clipping is necessary

Imagine drawing water inside a hexagon.

Some decorative wave lines might naturally extend beyond the hexagon's edges.

Without clipping:

🌊🌊🌊

could spill outside:

⬡

and overlap neighbouring terrain.

The desired rule is:

> ✂️ **Everything belonging to this terrain tile should remain inside this hexagon.**

SVG clipping provides exactly this capability.

---

# ✂️ Part 317 — What is a `clipPath`?

An SVG:

```
<clipPath>
```

defines a visible region.

Anything outside that region is hidden.

For a Midgard terrain tile, the clipping shape is the hexagon itself.

Conceptually:

🎨 large terrain artwork

- \


⬡ hexagon-shaped clipping region

⬇️

✂️ trim everything outside the hexagon

⬇️

⬡ artwork fits perfectly inside tile

This allows the drawing code to be much freer.

A water wave does not need to manually stop at every hexagon edge.

The clipping system handles that.

---

# 🔷 Part 318 — Midgard geometry becomes the clipping shape

This is another elegant connection between the library and SVG.

Midgard already provides the six points defining the hexagon.

Those same points can define:

🔷 the visible border

and:

✂️ the clipping region

So:

📦 **Midgard points**

↙️　　　　　　　　　↘️

🔷 visible polygon　　　✂️ clipPath polygon

The same geometry serves multiple rendering purposes.

No second hexagon calculation is necessary.

---

# 🆔 Part 319 — Each clipping path needs identity

A clipping definition must be referenced by the terrain group that uses it.

So each clip path needs an identifier.

Again, the test application creates rendering-specific identity.

Conceptually:

⬡ terrain hexagon

⬇️

✂️ clipping definition

⬇️

🏷️ unique clip ID

⬇️

🎨 terrain group refers to that ID

This resembles the coordinate-derived SVG IDs from the CSS Styling demo, but now the ID connects SVG elements to other SVG definitions rather than to CSS rules.

---

# 🧩 Part 320 — SVG `<g>` groups related graphics

Another important SVG element is:

```
<g>
```

which means **group**.

A group allows multiple SVG shapes to be treated as one logical unit.

For example, one terrain hexagon may contain:

🌱 base polygon

〰️ grass details

🌲 tree trunk

🌳 tree canopy

🌑 shadow

All of these can belong to one group.

Conceptually:

🎨 **terrain group**

├── base\
├── texture\
├── object\
└── decoration

This makes complex SVG scenes easier to organize.

---

# ✂️ Part 321 — The group receives the clipping rule

Instead of applying clipping separately to every individual tree circle, grass path or wave line, the demo can clip the containing group.

So:

🎨 **group**

├── shape\
├── shape\
├── shape\
├── shape\
└── shape

⬇️ apply one clip path

✂️ **entire group is restricted to the hexagon**

This demonstrates one of the advantages of hierarchical graphics.

A property applied to a parent structure can affect a collection of child graphics together.

---

# 🧱 Part 322 — `createTerrainHexagon()` organizes one tile

The method responsible for an individual terrain hexagon performs a sequence of tasks. DemoAreaSvgTerrain

Conceptually:

⬡ receive one `LayeredHexagon`

⬇️

✂️ define its clipping region

⬇️

🎨 create clipped terrain group

⬇️

🌱 or 🌊 draw terrain base

⬇️

🌲 or 🏰 add terrain object

⬇️

🔷 draw border

This is an important decomposition.

The method understands the **composition of one tile**, while specialized helpers understand how individual objects are drawn.

---

# 🗂️ Part 323 — Determining terrain from coordinates

The demo decides terrain type according to particular Midgard coordinates. DemoAreaSvgTerrain

The current rules include:

🏰 coordinate **(2,4)** → tower

🌊 coordinates such as **(1,3)**, **(1,5)** and **(2,6)** → water

🌱 everything else → grass

So again:

📍 **Midgard coordinate**

⬇️

🧠 **application interpretation**

⬇️

🌱 / 🌊 / 🏰

The coordinate provides location.

The demo assigns meaning to that location.

---

# 🧠 Part 324 — Geometry versus semantics

This reveals an important distinction.

To Midgard:

📍 `(2,4)`

is simply a coordinate.

To this demo:

📍 `(2,4)`

means:

🏰 **tower terrain**

The library provides **geometry**.

The application adds **semantics**.

This distinction appears constantly in software systems.

Raw data gains meaning in the context of a particular application.

---

# 🔀 Part 325 — Terrain type controls rendering behaviour

Once the terrain type is known, the renderer can choose what to draw.

Conceptually:

🌱 `grass`

➡️ draw grass base

🌊 `water`

➡️ draw water base

🏰 `tower`

➡️ draw grass-like terrain plus tower artwork

So `TerrainType` is not merely a label.

It influences control flow.

The data answers:

> ❓ **Which rendering behaviour should be selected?**

This is another example of typed domain data driving program behaviour.

---

# 🌱 Part 326 — `drawGrass()` handles one visual responsibility

The `drawGrass()` helper draws the grass terrain. DemoAreaSvgTerrain

Its responsibility includes:

🌱 the green terrain base

〰️ decorative grass details

The important architectural point is that grass drawing is extracted into a named method.

Instead of `createTerrainHexagon()` containing all grass-specific SVG instructions, it can delegate:

> 🌱 **Draw grass here.**

The method name provides a higher-level description of intent.

---

# 🌊 Part 327 — `drawWater()` encapsulates water artwork

Water receives its own helper.

The method creates:

🌊 blue terrain

〰️ repeated wave details

Again, the tile-building method does not need to understand every individual SVG path used to create the visual effect.

It simply delegates to:

**draw water**

This is decomposition by **visual responsibility**.

---

# 🌲 Part 328 — A tree is composed from SVG primitives

The tree is not an imported bitmap image.

It is constructed from SVG elements.

Its drawing includes pieces such as:

🌑 an ellipse for shadow

🪵 a path for the trunk

🟢 circles for the canopy

✨ an ellipse for a highlight

The final tree is therefore a composition:

**simple shapes**

⬇️

🌲 **complex visual object**

This is one of the strengths of vector graphics.

Complex illustrations can be assembled from basic geometric primitives.

---

# 🧱 Part 329 — Complex objects are built hierarchically

The tree demonstrates a broader graphics principle:

🌑 shadow

- \


🪵 trunk

- \


🌳 canopy

- \


✨ highlight

⬇️

🌲 **tree**

The viewer perceives one object.

The program constructs several shapes.

This is similar to object composition in programming:

> 🧩 **Build a complex whole from smaller focused parts.**

SVG itself encourages this compositional way of thinking.

---

# 🏰 Part 330 — The tower follows the same principle

The tower is also composed from multiple SVG primitives.

Its pieces include concepts such as:

🌑 shadow

🧱 base

🏢 body

🔺 roof

🚪 door

🪟 window

Together they form:

🏰 **one tower**

The important lesson is not the exact coordinates of each path.

It is the construction strategy:

**primitive shapes**

⬇️

**meaningful components**

⬇️

**recognizable illustrated object**

---

# 📍 Part 331 — Objects are positioned relative to the hexagon

The tree and tower need to appear in the correct terrain cell.

Midgard provides the geometric information that allows the demo to position objects relative to the hexagon.

This is important.

The demo does not merely draw a tower at some arbitrary global browser coordinate.

Instead:

⬡ **hexagon geometry**

⬇️

🎯 **local position reference**

⬇️

🏰 **tower placement**

This ties application artwork to library-generated geometry.

---

# 🧠 Part 332 — Relative geometry makes rendering reusable

Suppose a tree were hardcoded to one absolute position in the entire SVG.

Then moving it to another hexagon would require redesigning all of its coordinates.

A better conceptual model is:

> 🌲 **Draw the tree relative to this hexagon's position.**

Then the same tree-building logic can be reused for different cells.

This separates:

🌲 **what the tree looks like**

from:

📍 **where the tree belongs**

That is another form of abstraction.

---

# 🧰 Part 333 — Helper methods reduce cognitive load

The file is large, but imagine if every SVG instruction lived inside one enormous `render()` method.

It would need to handle:

📐 bounds

🖼️ SVG creation

✂️ clipping

🌱 grass

🌊 water

🌲 trees

🏰 towers

🔷 borders

all at once.

Instead, meaningful helper methods create layers of understanding.

A reader can first understand:

**create terrain SVG**

then:

**create terrain hexagon**

then:

**draw water**

then, only if necessary:

**inspect the individual water paths**

This is a major benefit of decomposition:

> 🧠 **A program can be understood at different levels of detail.**

---

# 🔭 Part 334 — Abstraction creates zoom levels

The file can be read almost like a map with zoom levels.

### 🌍 Far away

**Render terrain map**

### 🗺️ Closer

**Render each terrain hexagon**

### 🌲 Closer still

**Draw a tree**

### 🟢 Very close

**Create circles, paths and ellipses**

This is a powerful characteristic of well-structured procedural code inside an object-oriented class.

A reader does not need to absorb every low-level instruction simultaneously.

---

# 🧱 Part 335 — Why the border is drawn last

After the terrain artwork is created, the visible hexagon border is added.

Drawing the border last is significant because SVG uses document order for stacking.

Conceptually:

🌱 terrain

⬇️

🌲 objects

⬇️

🔷 border

If the border is appended last, it appears over the terrain artwork.

That helps preserve a crisp visible separation between neighboring hexagons.

This is a practical use of SVG rendering order.

---

# 🪜 Part 336 — Two kinds of layering are now visible

At this stage, there are actually two related layering ideas.

### 🗺️ Grid-level layering

Midgard provides:

**z-index**

for hexagon rendering order.

### 🎨 Tile-level layering

The SVG code controls the order of shapes inside each tile:

background

⬇️

object

⬇️

border

Both concern visual depth, but at different scales.

This distinction becomes useful in richer game rendering.

---

# 🏭 Part 337 — `createPolygon()` removes repeated SVG mechanics

Near the end of the class is a helper:

**`createPolygon(points)`**. DemoAreaSvgTerrain

Many parts of the demo need SVG polygons.

Rather than repeatedly performing the same low-level operations, the class centralizes them.

Conceptually:

📍 **Point[]**

⬇️

🏭 `createPolygon()`

⬇️

🔷 **SVGPolygonElement**

This is a small factory-like helper for a frequently needed SVG object.

---

# ♻️ Part 338 — Why a tiny helper can matter

`createPolygon()` is much smaller than methods such as `drawTower()`.

Yet extracting it has several benefits.

It prevents repetition of:

🌐 namespace-aware element creation

🧵 point-string formatting

🔷 polygon setup

It also gives the operation a meaningful name.

Instead of repeatedly reading:

> create SVG namespace element, transform points, join coordinates...

the higher-level code can communicate:

> 🔷 **Create polygon.**

This reduces noise.

---

# 🧠 Part 339 — The class contains several abstraction layers

The structure of the file can be summarized as several layers.

### 🧩 Demo layer

```
render()
```

→ builds the page

### 🗺️ Scene layer

```
createTerrainSvg()
```

→ builds the complete SVG terrain

### ⬡ Tile layer

terrain-hexagon logic

→ builds one hexagonal scene

### 🎨 Object layer

```
drawGrass()
drawWater()
drawTree()
drawTower()
```

→ builds visual objects

### 🔧 Primitive layer

polygon/path/circle/ellipse creation

→ creates individual SVG shapes

This layered organization is the main reason an 840-line drawing file remains understandable.

---

# 🎨 Part 340 — SVG is both graphics and structured DOM

One reason this architecture works well is that SVG occupies an interesting position.

It is a graphics format, but in the browser it is also a structured DOM tree.

A terrain scene can therefore have hierarchy:

🖼️ SVG

├── 🧰 defs\
├── 🎨 group\
│　├── 🌱 polygon\
│　├── 🌲 tree shapes\
│　└── 🔷 border\
├── 🎨 group\
│　├── 🌊 polygon\
│　├── 〰️ wave paths\
│　└── 🔷 border\
└── ...

This structure can be created and manipulated using ordinary DOM programming techniques.

---

# 🆚 Part 341 — SVG is not a bitmap painting surface

The demo is not painting pixels one by one.

Instead, it creates persistent vector elements:

🔷 polygon

⭕ circle

⬭ ellipse

〰️ path

These remain individual graphical objects in the SVG DOM.

That means they can potentially be:

🎨 styled

🔍 selected

🖱️ given event listeners

✨ transformed

🗑️ removed

individually.

This is one reason SVG is attractive for a relatively small interactive hex map.

---

# ⚖️ Part 342 — SVG does not automatically mean better performance

SVG has many advantages for this project:

✨ crisp scaling

🌳 DOM integration

🎨 CSS support

🖱️ event support

🧩 structured graphical elements

But it is important not to conclude:

> “SVG is always faster than Canvas.”

A huge SVG map can contain a very large number of DOM elements.

Thousands of hexagons, trees, paths and decorative shapes can become expensive for the browser to manage.

Canvas works differently and can sometimes perform better for extremely large or rapidly redrawn scenes.

So the relevant principle is:

> ⚖️ **Choose a rendering technology according to the application's scale and interaction model, not because one technology is universally superior.**

For this demonstration, SVG offers excellent clarity and flexibility.

---

# 🧠 Part 343 — The library remains unaware of all this complexity

This is perhaps the most important architectural observation in the chapter.

The test application has now introduced:

🌱 terrain

🌊 water

🌲 trees

🏰 towers

✂️ clip paths

🎨 groups

✨ highlights

〰️ waves

But Midgard has not needed to change.

The library still provides:

📍 coordinates

🎯 centers

🔷 polygon points

🪜 layering

That means the library abstraction is successfully supporting much richer application behaviour without absorbing application-specific concerns.

---

# 🧱 Part 344 — A clean boundary enables experimentation

Because Midgard only owns geometry, the consumer can experiment freely.

Today a coordinate may contain:

🌲 tree

Tomorrow it could contain:

🏰 castle

⛰️ mountain

🐉 dragon

🛣️ road

The library does not care.

The application interprets the grid.

This creates a powerful relationship:

📦 **stable geometric foundation**

- \


🎮 **flexible application semantics**

The geometry can remain stable while the game or visualization evolves.

---

# 🧪 Part 345 — The demo tests more than appearance

Visually, the page demonstrates terrain artwork.

Architecturally, however, it also exercises several Midgard capabilities together:

🗺️ grid creation

📍 coordinates

🎯 positioning

🔷 polygon geometry

🪜 rendering order

If the terrain tiles align correctly, borders match, objects appear inside expected cells and clipping follows the hexagon geometry, the demo provides strong visual evidence that several parts of the library integrate coherently.

Again, this complements rather than replaces automated tests.

---

# 🧰 SVG and software-design concepts introduced in Chapter 13

### 🌱 String literal domain types

`TerrainType` restricts terrain to known semantic values.

### 🧰 SVG `<defs>`

Stores definitions that other SVG elements can reference.

### ✂️ `<clipPath>`

Restricts drawing to a defined visible region.

### 🧩 SVG `<g>`

Groups multiple graphical elements into one logical structure.

### 🔷 Vector primitives

Polygons, paths, circles and ellipses can be composed into complex illustrations.

### 📍 Relative positioning

Artwork can be positioned in relation to library-generated geometry.

### 🔭 Abstraction levels

Large methods can be decomposed so the code can be understood from high-level scene construction down to low-level drawing primitives.

### 🪜 Drawing order

SVG element order affects which graphics appear above others.

### 🏭 Small creation helpers

Repeated low-level SVG construction can be hidden behind focused helper methods.

### ⚖️ Rendering trade-offs

SVG provides strong DOM integration and scalability, but it is not universally more performant than alternatives such as Canvas.

---

# 🎯 Chapter 13 — The central idea

`DemoAreaSvgTerrain.ts` demonstrates how far the application can go without changing the responsibility of the Midgard library.

Midgard still provides:

📦 **geometry**

The test app adds:

🎮 **meaning**

and:

🎨 **presentation**

The complete conceptual pipeline is:

📦 **Midgard Hex Grid**

⬇️

⬡ **LayeredHexagon**

⬇️

📍 coordinates + points + centers

⬇️

🧠 **terrain interpretation**

⬇️

🌱 grass　🌊 water　🏰 tower

⬇️

✂️ **hexagonal clipping**

⬇️

🎨 **SVG groups and primitives**

⬇️

🌲🏰🌊 **illustrated terrain map**

The file also demonstrates how a large piece of code can remain understandable through layers of helper methods:

🌍 **scene**

⬇️

⬡ **tile**

⬇️

🌲 **object**

⬇️

⭕🔷〰️ **SVG primitives**

The next chapter moves from rich graphics to **interaction**:

🔗 **`DemoAreaNeighbours.ts`**

There the application asks Midgard for the six neighbours of a coordinate and connects that domain result to SVG IDs, DOM lookup, mouse events and live visual highlighting.
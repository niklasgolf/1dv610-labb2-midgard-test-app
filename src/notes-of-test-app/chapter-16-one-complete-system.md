## Chapter 16 — Understanding the Test App as One Complete System

### 🧠 Part 431 — From individual files to one application

The previous chapters examined the source code **file by file**.

That is useful because each file has a focused responsibility.

But software does not run one file at a time.

When the application is actually used, all these pieces cooperate:

🚀 `main.ts`

⬇️

🏗️ `App.ts`

⬇️

⬛ `Header.ts` + 🧭 `Navigation.ts`

⬇️

📄 `DemoArea.ts`

⬇️

🧩 a concrete `Demo`

⬇️

📦 Midgard Hex Grid

⬇️

🌳 DOM + 🔷 SVG

⬇️

🎨 `style.css`

The purpose of this chapter is therefore to change perspective.

Instead of asking:

> **What does this file do?**

the question becomes:

> **How does the entire application work as one connected system?**



---



# 🏛️ Part 432 — The application's major layers

The test application can be understood as several cooperating layers.

### 🚀 Bootstrap layer

```
main.ts
```

Starts everything.

### 🏗️ Coordination layer

```
App.ts
```

Connects the major components.

### 🧭 Navigation layer

```
Header.ts
Navigation.ts
```

Determines what the user wants to see.

### 📄 Content layer

```
DemoArea.ts
```

Decides what content corresponds to that selection.

### 🧩 Demo layer

The classes under `src/demos/`

Produce the actual demonstrations.

### 📦 Library layer

```
midgard-hex-grid
```

Provides coordinates and geometry.

### 🌳 Browser layer

DOM + SVG

Represent the interface and graphics.

### 🎨 Presentation layer

```
style.css
```

Controls layout and appearance.

The application becomes easier to understand when these layers are seen as cooperating responsibilities rather than one large program.



---



# 🚀 Part 433 — Everything begins in `main.ts`

The browser loads the application.

Vite eventually executes:

```
main.ts
```

Its responsibility is intentionally tiny.

Conceptually:

🌐 Browser

⬇️

🚀 `main.ts`

⬇️

🔍 find `#app`

⬇️

🏗️ create `App`

⬇️

▶️ call `app.start()`

`main.ts` does not need to know how SVG terrain works.

It does not know how navigation is rendered.

It does not know how Midgard calculates coordinates.

Its job is simply:

> 🚀 **Find the application's starting point and start the application.**



---



# 🏗️ Part 434 — `App` becomes the coordinator

Once `main.ts` creates `App`, responsibility moves upward into the application's coordination layer.

`App` creates and connects:

⬛ `Header`

🧭 `Navigation`

📄 `DemoArea`

This makes `App` the central coordinator.

But importantly, it does not perform all of their work itself.

It delegates.

Conceptually:

　　　　　　　🏗️ **App**

　　　　　↙️　　　↓　　　↘️

　　　⬛ Header　🧭 Navigation　📄 DemoArea

`App` knows these components need to cooperate.

Each component knows how to perform its own specialized responsibility.



---



# 🔌 Part 435 — Coordination is different from implementation

A coordinator should not necessarily perform the detailed work.

For example, `App` can say:

> 🧭 **Navigation, switch section.**

without knowing how the navigation list is constructed.

Likewise:

> 📄 **DemoArea, show this MenuItem.**

without knowing how a hexagon becomes an SVG polygon.

This is an important architectural distinction:

### 🏗️ Coordination

Determines **which components should communicate**.

### 🔧 Implementation

Determines **how a component performs its own task**.

Keeping those concerns apart prevents `App.ts` from becoming a giant file containing the entire application.



---



# ⬛ Part 436 — The header controls the highest navigation level

The header represents the application's broadest content choice.

Currently it distinguishes between:

🧪 **Test Page**

and:

📚 **Project Notes**

That selection is represented by the `HeaderSection` type.

The header therefore answers:

> ❓ **Which major area of the application is active?**

It does not decide which concrete demo should be shown.

That belongs to the next navigation level.



---



# 🧭 Part 437 — The sidebar controls the second navigation level

`Navigation.ts` answers a more detailed question:

> ❓ **Which item inside the current section is selected?**

For the Test Page this includes items such as:

🏠 Home

⬡ Single Hex

↔️ X-Dominated Grid

↕️ Y-Dominated Grid

🎨 CSS Styling

🌲 SVG Terrain

🔗 Neighbours

For the notes section, the sidebar instead contains chapter entries.

So there are two navigation levels:

### Level 1

⬛ **Header**

→ choose major section

### Level 2

🧭 **Sidebar**

→ choose item within that section

This is why the header and sidebar are separate components.



---



# 🪪 Part 438 — `MenuItem` is the shared message format

When the sidebar tells the rest of the application what was selected, it uses a simple shared structure:

```
MenuItem
```

containing:

🆔 `id`

🏷️ `label`

This small interface becomes a communication contract.

Conceptually:

🧭 Navigation

⬇️

📨 `{ id, label }`

⬇️

🏗️ App

⬇️

📄 DemoArea

The components do not need to pass an entire button element around.

They communicate using meaningful application data.



---



# 🧠 Part 439 — Data is better than passing UI elements

Imagine if `Navigation` returned the actual clicked HTML button and `DemoArea` had to inspect it.

Then the content system would become coupled to the navigation DOM.

Instead:

🖱️ clicked button

⬇️

🧭 Navigation interprets selection

⬇️

📨 `MenuItem`

⬇️

📄 DemoArea interprets application meaning

This creates a cleaner boundary.

The DOM event is translated into application data before being passed onward.



---



# 🔄 Part 440 — Selecting a Test Page demo

Consider what happens when:

**SVG Terrain**

is selected.

The flow is approximately:

👤 user clicks **SVG Terrain**

⬇️

🧭 `Navigation`

identifies its `MenuItem`

⬇️

🏗️ `App`

receives the selection callback

⬇️

📄 `DemoArea.show(item)`

⬇️

🏭 `createDemo(item.id)`

⬇️

🌲 `new DemoAreaSvgTerrain()`

⬇️

🎨 `demo.render()`

⬇️

🌳 returned element inserted into the page

This is the complete route from user action to visible demo.



---



# 🏭 Part 441 — `DemoArea` translates IDs into implementations

`DemoArea` contains the knowledge needed to map an application ID to a concrete demo.

Conceptually:

```
single-hex
```

➡️ ⬡ `DemoAreaSingleHex`

```
x-dominated-grid
```

➡️ ↔️ `DemoAreaXDominatedGrid`

```
svg-terrain
```

➡️ 🌲 `DemoAreaSvgTerrain`

```
neighbours
```

➡️ 🔗 `DemoAreaNeighbours`

This is why `DemoArea` acts partly like a small factory.

It translates:

🆔 **abstract selection**

into:

🧩 **concrete implementation**



---



# 🧩 Part 442 — The `Demo` interface makes the implementations interchangeable

Once `DemoArea` has created the concrete demo, it does not need a different rendering procedure for every class.

They all satisfy:

```
Demo
```

with:

```
render(): HTMLElement
```

So:

⬡ Single Hex

↔️ X Grid

🌲 SVG Terrain

🔗 Neighbours

can all be treated conceptually as:

🧩 **Demo**

The common operation is:

🎨 **render**

This is polymorphism in practical application architecture.



---



# 🔀 Part 443 — Concrete differences disappear behind the interface

The demos are dramatically different internally.

One may create:

⬡ one polygon

Another:

🗺️ many polygons

Another:

🌲 hundreds of SVG primitives

Another:

🖱️ event listeners

But from `DemoArea`'s perspective:

🧩 Demo

⬇️

🎨 `render()`

⬇️

🌳 HTMLElement

The caller does not need to understand the implementation differences.

That is the power of a useful abstraction boundary.



---



# 📦 Part 444 — Some demos cross into the Midgard library

Several demos then enter another architectural layer.

For example:

🧩 `DemoAreaSingleHex`

⬇️

📦 `HexGrid`

⬇️

⬡ `createSingleHexagon()`

Or:

🧩 `DemoAreaNeighbours`

⬇️

📦 `HexGrid`

⬇️

🔗 `getNeighbours()`

The test app therefore acts as a genuine **consumer** of the Midgard package.

This relationship is fundamental:

🖥️ **test application**

➡️ depends on

📦 **Midgard library**

The dependency does not point backwards.



---



# 🧮 Part 445 — Midgard owns mathematical knowledge

The library is responsible for questions such as:

> Is this coordinate valid?

> Where is this coordinate geometrically?

> What are the six points of this hexagon?

> Which coordinates are neighbours?

> Which coordinates belong to this grid?

> What rendering order should the grid use?

These are **Midgard domain questions**.

The test application should not duplicate their answers.

Instead it asks the library.

This creates one authoritative location for the grid rules.



---



# 🎨 Part 446 — The test app owns presentation knowledge

The test application answers very different questions:

> Should this hexagon be blue?

> Should this coordinate contain a tower?

> What SVG ID should represent this cell?

> What happens when the mouse enters the home hexagon?

> How should the navigation look?

These are application and presentation questions.

So the responsibility boundary is:

📦 **Midgard**

→ what the grid **is**

🖥️ **Test app**

→ how the grid is **shown and interacted with**



---



# 🔷 Part 447 — SVG is an adapter between geometry and the screen

Midgard returns mathematical information:

📍 points

🎯 centers

⬡ hexagons

The browser cannot visually display a TypeScript `Point[]` by itself.

The demo classes translate those structures into:

🔷 SVG polygons

⭕ circles

⬭ ellipses

〰️ paths

So SVG acts as a practical rendering representation:

📦 **Midgard geometry**

⬇️

🎨 **demo translation**

⬇️

🔷 **SVG DOM**

⬇️

👁️ **pixels on screen**

The underlying Midgard geometry remains independent of the rendering technology.



---



# 🏷️ Part 448 — Coordinates connect several layers

Coordinates are particularly important because they travel through many layers.

Consider:

```
(4,6)
```

At the library level:

📍 it is a Midgard coordinate.

At the application level:

🏠 it may represent the home cell.

At the DOM level:

🏷️ it may become `hex-4-6`.

At the interaction level:

🖱️ it may identify the polygon that receives mouse events.

So one domain value can acquire additional meaning as it moves outward through the system.



---



# 🧠 Part 449 — Meaning is added rather than pushed downward

The architecture does not require Midgard to know:

> `(4,6)` is the home.

Instead:

📦 Midgard knows:

📍 `(4,6)`

Then the application adds:

🏠 **home**

Then the renderer adds:

🏷️ **DOM identity**

Then interaction adds:

🖱️ **hover behaviour**

This is a useful direction of dependency.

More specialized layers add meaning to more general data.

The general-purpose library does not need knowledge of those specialized interpretations.



---



# 🎨 Part 450 — CSS forms the outer visual layer

Once TypeScript has constructed the DOM, `style.css` provides the visual system.

For example:

⚙️ `Navigation.ts`

adds:

🏷️ `navigation-item`

and possibly:

🏷️ `is-active`

Then:

🎨 `style.css`

interprets those classes as:

🔘 normal menu item

or:

🟩 active menu item.

Again, one layer communicates state while another decides its appearance.



---



# 🔁 Part 451 — The application contains several data transformations

A useful way to understand the whole program is to look for transformations.

### Navigation transformation

🖱️ click

→ `MenuItem`

### Demo transformation

```
MenuItem.id
```

→ concrete `Demo`

### Library transformation

grid configuration

→ `LayeredHexagon[]`

### Rendering transformation

```
LayeredHexagon
```

→ SVG polygon

### Identity transformation

Coordinate

→ SVG ID

### Styling transformation

CSS selector

→ visible appearance

The application is therefore not one enormous algorithm.

It is a sequence of smaller transformations connected together.



---



# 🧭 Part 452 — The notes system follows a parallel route

The Project Notes use the same outer navigation architecture but eventually take a different route.

Instead of:

```
MenuItem
```

⬇️

🧩 concrete Demo

the selected note becomes:

```
MenuItem
```

⬇️

📄 Markdown string

⬇️

⚙️ `marked.parse(...)`

⬇️

🌐 HTML

⬇️

📄 displayed documentation

So `DemoArea` supports two kinds of content:

🧩 **programmatically rendered demos**

and:

📚 **Markdown documentation**

This is why `DemoArea` is such an important integration point.



---



# 📄 Part 453 — Vite makes Markdown behave like source data

The note files are imported with:

```
?raw
```

That tells Vite to provide their contents as text rather than trying to treat Markdown as TypeScript.

Conceptually:

📄 `.md`

⬇️ Vite `?raw`

🧵 string

⬇️ Marked

🌐 HTML

⬇️ DOM

So Vite is doing more than simply starting a development server.

Its module system also helps the application incorporate non-TypeScript resources.



---



# 🔀 Part 454 — Two content pipelines share one display area

The architecture can now be represented as:

　　　　　　　　　📄 **DemoArea**

　　　　　　　　　　　│

　　　　　　┌──────────┴──────────┐

　　　　　　▼　　　　　　　　　▼

　　　🧩 **Demo**　　　　　📚 **Markdown**

　　　　　　│　　　　　　　　　│

```
　　　render()　　　　　marked.parse()
```

　　　　　　│　　　　　　　　　│

　　　　　　▼　　　　　　　　　▼

　　　🌳 HTMLElement　　　　🌐 HTML

　　　　　　└──────────┬──────────┘

　　　　　　　　　　　▼

　　　　　　　　📄 displayed content

The same main area can therefore host two very different kinds of material.



---



# 🔄 Part 455 — Switching the major section

When the user switches from Test Page to Project Notes:

👤 header click

⬇️

⬛ `Header`

⬇️ callback

🏗️ `App`

⬇️

🧭 `Navigation.setSection(...)`

⬇️

🔄 sidebar contents change

⬇️

📨 active item retrieved

⬇️

📄 `DemoArea.show(...)`

The header itself does not rebuild the notes sidebar.

It communicates the section change to the coordinator.

The coordinator tells the appropriate component what to do.



---



# 🤝 Part 456 — Callbacks allow components to communicate without owning each other

Callbacks appear repeatedly in this architecture.

A component can say:

> 📣 **Something happened.**

without deciding the complete consequence.

For example:

⬛ Header

says:

> “A section was selected.”

It does not need to manipulate `DemoArea` directly.

Instead:

⬛ Header

⬇️ callback

🏗️ App

⬇️ coordinates consequences

This keeps components more independent.



---



# 🧠 Part 457 — Central coordination prevents tangled dependencies

Imagine if:

⬛ Header directly controlled Navigation,

🧭 Navigation directly controlled DemoArea,

📄 DemoArea directly modified Header.

The dependency graph could quickly become tangled:

⬛ ↔️ 🧭 ↔️ 📄 ↔️ ⬛

Instead, `App` acts as the coordination point:

　　　⬛ Header

　　　　↘️

　　　　🏗️ App

　　　　↙️　↘️

🧭 Navigation　📄 DemoArea

This makes the direction of communication easier to understand.



---



# 🌳 Part 458 — The DOM tree is the meeting point

Eventually all these TypeScript objects produce one DOM tree.

At a high level:

```
#app
```

└── `.app-shell`\
　　├── `.app-header`\
　　└── `.app-content`\
　　　├── `.navigation`\
　　　└── `.demo-area`\
　　　　　├── heading\
　　　　　├── description\
　　　　　└── demo/documentation content

The classes are separate in TypeScript.

The browser combines their output into one hierarchical document.

That DOM tree is where the components become one visible interface.



---



# 🎨 Part 459 — CSS sees the DOM, not the TypeScript architecture

CSS does not know that an element was created by a class called:

```
Navigation
```

It sees:

🏷️ `.navigation`

Likewise it does not know about the `Header` TypeScript class.

It sees:

🏷️ `.app-header`

So there are two overlapping architectural views.

### ⚙️ Programming architecture

Classes, interfaces, callbacks, objects.

### 🌳 Browser architecture

Elements, attributes, classes, IDs.

The application works because the TypeScript architecture produces a predictable DOM architecture.



---



# 🔗 Part 460 — The Neighbours demo shows the entire stack especially clearly

The Neighbours demo is a useful example because almost every layer participates.

👤 pointer enters home cell

⬇️

🌳 **DOM event**

⬇️

⚙️ **DemoAreaNeighbours**

⬇️

📍 neighbour coordinates originally supplied by Midgard

⬇️

🏷️ coordinate-derived SVG IDs

⬇️

🔍 matching SVG polygons

⬇️

🎨 styles change

⬇️

✨ neighbours visibly highlight

This crosses:

📦 domain logic

⚙️ TypeScript

🌳 DOM

🔷 SVG

🎨 styling

🖱️ browser interaction

in one feature.



---



# 🌲 Part 461 — SVG Terrain shows another complete stack

The terrain demo follows a different route:

📦 Midgard grid

⬇️

📍 geometry

⬇️

🧠 application assigns terrain meaning

⬇️

🌱 grass / 🌊 water / 🏰 tower

⬇️

🔷 SVG primitives

⬇️

✂️ clipping

⬇️

🎨 layered illustration

⬇️

👁️ terrain scene

Again, Midgard supplies the geometric foundation while the application builds increasingly specialized meaning on top.



---



# 🧩 Part 462 — Interfaces appear at important boundaries

Several interfaces and types help describe communication boundaries.

For example:

🧩 `Demo`

defines:

> What must a demo be able to do?

📨 `MenuItem`

defines:

> What information identifies a navigation item?

🧭 `HeaderSection`

defines:

> Which major sections are valid?

These types reduce ambiguity.

Instead of passing arbitrary data everywhere, components communicate using known contracts.



---



# 🔒 Part 463 — TypeScript protects the internal communication

Because these contracts are typed, many mistakes can be caught before the application runs.

For example:

❌ a Demo without `render()`

❌ an invalid HeaderSection value

❌ a MenuItem missing its `id`

can be detected by TypeScript.

This does not eliminate all possible errors, but it moves many problems from:

🌐 runtime

to:

🛠️ development time.

That is one of the major benefits of TypeScript in this application.



---



# ⚠️ Part 464 — Some relationships remain outside the type system

Not every relationship is protected by TypeScript.

For example:

🏷️ TypeScript creates class `navigation-item`

and:

🎨 CSS expects `.navigation-item`

Those strings must agree.

Likewise, Markdown chapter IDs in `Navigation` must correspond to the IDs handled by `DemoArea`.

These are still application contracts, but they are less strongly enforced by the compiler.

Understanding these weaker boundaries is important when maintaining the system.



---



# 🔍 Part 465 — IDs are used as routing keys

Throughout the application, IDs often act as stable internal keys.

A navigation label might be:

**SVG Terrain**

But the program needs a stable machine-readable identity.

That is what the ID provides.

Conceptually:

🏷️ human label

**SVG Terrain**

and:

🆔 internal identity

**an associated item ID**

serve different audiences.

The label can potentially change without changing the underlying conceptual route.

This is the same broad principle seen with Midgard coordinates and SVG IDs: identity and presentation should not be confused unnecessarily.



---



# 🏗️ Part 466 — The architecture grows by adding implementations

A useful property of the current design is that new demonstrations can follow an established pattern.

Conceptually:

1. Create a new class implementing `Demo`.
2. Give it a `render()` method.
3. Add a corresponding navigation item.
4. Map that ID to the new class in `DemoArea`.

The surrounding architecture does not need to be reinvented.

`App`, `Header` and the basic rendering contract can remain unchanged.

This is one benefit of establishing clear extension points.



---



# ⚖️ Part 467 — But adding a demo still touches multiple places

The architecture is not fully automatic.

Adding a demo currently requires updating more than one location.

For example:

🧭 Navigation must know the item exists.

📄 DemoArea must know which implementation corresponds to its ID.

Possibly:

🎨 CSS may need additional styles.

That is not necessarily a problem for a small application.

But it reveals where future refactoring might become useful if the number of demos grows substantially.



---



# 🧠 Part 468 — Architecture should match the size of the problem

The test app does not need:

🏢 an enterprise dependency-injection framework

🗃️ a large global state system

🛣️ a sophisticated routing framework

⚙️ dozens of configuration layers

Its current architecture is relatively small and explicit.

That is appropriate for its purpose.

Good architecture does not mean maximizing abstraction.

It means:

> 🧠 **Using enough structure to keep responsibilities understandable without introducing unnecessary machinery.**



---



# 🧪 Part 469 — The test app is also a development instrument

Although it looks like a small website, the Test Page has another important role.

It helps inspect Midgard behaviour visually.

For example:

⬡ Does a single hexagon have the expected shape?

↔️ Does the x-dominated grid align correctly?

↕️ Does the y-dominated grid differ correctly?

🎨 Can individual coordinates be styled?

🌲 Can the geometry support richer terrain?

🔗 Do neighbours appear where expected?

So the application is partly:

📖 documentation

partly:

🎨 showcase

and partly:

🧪 visual development tool.



---



# 🧪 Part 470 — Visual demos and automated tests have different jobs

The visual test app should not replace the Vitest suite.

They answer different questions.

### 🤖 Automated tests

Good at checking exact facts repeatedly.

For example:

> Does this coordinate return these six neighbours?

### 👁️ Visual demos

Good at checking integrated behaviour humans can understand quickly.

For example:

> Does the neighbour relationship look spatially correct when displayed?

Together they provide different kinds of confidence.



---



# 📚 Part 471 — The notes add a third perspective

The project now effectively contains three ways to understand Midgard.

### 🤖 Tests

**Is the behaviour correct?**

### 🖥️ Demos

**What does the behaviour look like?**

### 📚 Notes

**How and why does the code work?**

These complement each other.

A single feature such as neighbours can therefore be approached from three directions:

🤖 exact expected coordinates

🖥️ interactive visual highlighting

📚 conceptual explanation

This creates a strong learning environment around the library.



---



# 🧭 Part 472 — One complete mental flow

A useful way to remember the application is:

🌐 **Browser starts**

⬇️

🚀 **main.ts**

starts the program

⬇️

🏗️ **App**

coordinates the application

⬇️

⬛ **Header**

chooses major section

⬇️

🧭 **Navigation**

chooses an item

⬇️

📄 **DemoArea**

routes the item

⬇️

🧩 **Demo or Markdown**

creates content

⬇️

📦 **Midgard**

provides geometry when needed

⬇️

🌳 **DOM/SVG**

represents the result

⬇️

🎨 **CSS**

provides presentation

⬇️

👁️ **browser displays it**

That is the complete system in one chain.



---



# 🧠 Part 473 — The deeper architectural pattern

The application repeatedly follows a useful pattern:

### 1. Represent something with data

📍 coordinate\
📨 MenuItem\
🧭 section\
🌱 terrain type

### 2. Pass that data across a clear boundary

callback\
method argument\
return value

### 3. Let the receiving component interpret it

Navigation interprets section.

DemoArea interprets MenuItem.

Midgard interprets grid configuration.

Renderer interprets geometry.

CSS interprets classes.

### 4. Produce the next representation

click

→ MenuItem

→ Demo

→ geometry

→ SVG

→ visual result

This chain of transformations is one of the best ways to understand the application as a whole.



---



# 🎯 Chapter 16 — The central idea

The Midgard Test App is not one large program where every part knows everything else.

It is a collection of cooperating responsibilities:

🚀 **`main.ts` starts**

🏗️ **`App.ts` coordinates**

⬛ **`Header.ts` selects major sections**

🧭 **`Navigation.ts` selects items**

📨 **`MenuItem.ts` defines shared navigation data**

📄 **`DemoArea.ts` routes content**

🧩 **`Demo.ts` defines the common demo contract**

⬡🌲🔗 **concrete demos implement individual features**

📦 **Midgard provides the geometric domain**

🌳🔷 **DOM and SVG represent the result**

🎨 **`style.css` gives the interface its visual form**

The most important dependency direction is:

🎨 **Presentation and interaction**

⬇️ depend on

🖥️ **Test application**

⬇️ depends on

📦 **Midgard Hex Grid**

The lower-level Midgard library does not need to know about:

❌ navigation

❌ CSS

❌ SVG IDs

❌ trees

❌ towers

❌ mouse events

❌ documentation pages

That separation is what allows a relatively small geometry library to support increasingly sophisticated demonstrations without becoming responsible for the entire application.

> 🧠 **The system becomes understandable because each layer knows enough to perform its own job, but not everything about every other layer.**
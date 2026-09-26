## Chapter 25 — The Complete Mental Model of the Test App

### 🧠 Part 825 — From individual files to one system

The previous chapters examined the Test App from many perspectives:

🚀 startup

🏗️ application coordination

⬛ header navigation

🧭 sidebar navigation

📄 content routing

🧩 demos

📦 Midgard

🌳 DOM

🔷 SVG

🎨 CSS

📣 events

🧠 state

⚡ Vite

🧪 testing

🔧 maintainability.

The final step is to combine these ideas into **one mental model**.

Instead of asking:

> “What does this particular line do?”

the question becomes:

> **How does the entire Test App work as one system?**



---



# 🗺️ Part 826 — The highest-level picture

At the highest level:

👤 **User**

↕️

🖥️ **Test App**

↕️

📦 **Midgard Hex Grid**

The Test App sits between the user and the library.

Midgard provides reusable hex-grid capabilities.

The Test App turns those capabilities into:

👁️ visible demonstrations

🖱️ interactive examples

📚 documentation.



---



# 🧱 Part 827 — The system has layers

A useful layered model is:

👤 **User**

⬇️

🖱️ **Interaction**

⬇️

🏗️ **Application coordination**

⬇️

🧩 **Demo / documentation layer**

⬇️

📦 **Midgard library**

⬇️

📐 **geometry and domain results**

⬇️

🔷 **SVG / DOM representation**

⬇️

🎨 **CSS presentation**

⬇️

👁️ **User sees result**

This is not a rigid framework.

It is a way of understanding responsibilities.



---



# 🚀 Part 828 — Everything begins at `main.ts`

The browser application needs a starting point.

That is:

```
main.ts
```

Its job is deliberately small.

Conceptually:

🌐 browser loads application

⬇️

🚀 `main.ts`

⬇️

🎯 locate `#app`

⬇️

🏗️ create `App`

⬇️

▶️ `app.start()`.

The entry point does not need to know how a tower is drawn or how neighbours are calculated.

It starts the system.



---



# 🏗️ Part 829 — `App` assembles the major pieces

`App` is the central coordinator.

It brings together:

⬛ `Header`

🧭 `Navigation`

📄 `DemoArea`.

Conceptually:

　　　　　　🏗️ **App**

　　　　　↙️　 ↓　 ↘️

　　　⬛ Header　🧭 Navigation　📄 DemoArea

These components have different responsibilities but must cooperate.

App provides the place where that cooperation is coordinated.



---



# 🧩 Part 830 — Composition builds the application

App does not become a Header.

It does not become Navigation.

It does not become DemoArea.

Instead:

> **App has these components.**

That is **composition**.

Conceptually:

🏗️ App

**has a** Header

**has a** Navigation

**has a** DemoArea.

This is one of the most important object-oriented relationships in the application.



---



# ⬛ Part 831 — Header controls the highest navigation level

Header represents the major sections of the application.

In the current version, it distinguishes:

🧪 Test Page

and:

📚 Project Notes.

Header knows about its own buttons and active state.

But it does not need to manipulate the sidebar or content area directly.

Instead it reports meaningful selection events.



---



# 📣 Part 832 — Header communicates through a callback

The relationship is:

👤 click

⬇️

⬛ Header

⬇️

📣 section callback

⬇️

🏗️ App.

Header says essentially:

> “This section has been selected.”

App decides what that means for the rest of the application.

This keeps Header focused.



---



# 🧭 Part 833 — Navigation controls the second level

Navigation represents the sidebar.

Its contents depend on the active section.

For Test Page it contains demo choices such as:

⬡ Single Hex

↔️ X-Dominated Grid

↕️ Y-Dominated Grid

🎨 CSS Styling

🌲 SVG Terrain

🔗 Neighbours.

For the notes section it contains documentation chapters.

So the sidebar is dynamic even though the Navigation object itself remains the same component.



---



# 🧠 Part 834 — Navigation remembers state

Navigation stores information about:

🎯 active section

🧪 active Test Page item

📚 active notes item.

This allows it to answer:

> Which items should currently be displayed?

and:

> Which item is currently active?

State and behaviour therefore live together inside the component.



---



# 🧳 Part 835 — `MenuItem` is the shared navigation data shape

A navigation choice can be represented simply as:

🆔 `id`

🏷️ `label`.

That is the role of:

**`MenuItem`**.

It is deliberately small.

The label answers:

> What should the user see?

The ID answers:

> What does the application use internally to identify this choice?



---



# 🆔 Part 836 — IDs connect different parts of the architecture

An ID such as a demo ID can travel conceptually through several layers:

🧭 Navigation

⬇️

📦 MenuItem

⬇️

🏗️ App

⬇️

📄 DemoArea

⬇️

🏭 concrete Demo.

The ID therefore acts as a routing key.

It helps connect:

**user choice**

to:

**application behaviour**.



---



# 📄 Part 837 — `DemoArea` is the content controller

Once an item is selected, `DemoArea` determines what should appear.

It has two major content routes:

🧩 **Demo**

or:

📚 **Markdown documentation**.

Conceptually:

📦 MenuItem

⬇️

📄 DemoArea

↙️　　　　　　↘️

🧩 Demo　　　　📚 Markdown

This makes DemoArea one of the major integration points in the application.



---



# 🔀 Part 838 — DemoArea performs routing

The selected ID determines the next action.

For a demo:

🆔 demo ID

⬇️

🏭 create concrete Demo

⬇️

🎨 call `render()`.

For documentation:

🆔 chapter ID

⬇️

📄 find imported Markdown

⬇️

📝 parse with Marked

⬇️

🌳 display HTML.

One content region therefore supports two different content systems.



---



# 🧩 Part 839 — All demos share one contract

The Demo interface says, in essence:

> Every Demo must be able to return an `HTMLElement`.

That tiny rule creates an important abstraction.

DemoArea does not need separate rendering protocols for:

⬡ Single Hex

🌲 SVG Terrain

🔗 Neighbours.

It can simply ask:

```
render()
```

and receive:

🌳 `HTMLElement`.



---



# 🎭 Part 840 — Polymorphism makes different demos look alike from outside

Internally:

```
DemoAreaHome
```

is extremely simple.

```
DemoAreaSvgTerrain
```

is extremely complex.

But through the Demo abstraction:

🧩 Home → `render()`

🧩 Terrain → `render()`

🧩 Neighbours → `render()`.

Their internal complexity differs.

Their external contract is consistent.

That is polymorphism in practical use.



---



# 📦 Part 841 — The demos are consumers of Midgard

A demo that needs hex-grid functionality imports the library.

For example:

🧩 Demo

⬇️

📦 `HexGrid`

⬇️

📐 library operation

⬇️

📍 returned geometry.

This dependency direction is important:

**Test App → Midgard**

not:

**Midgard → Test App**.

The reusable library does not know which demonstrations happen to exist.



---



# 🧮 Part 842 — Midgard owns mathematical knowledge

Midgard knows things such as:

📍 valid coordinates

🔗 neighbour relationships

📐 coordinate positioning

⬡ hexagon geometry

🗺️ grid generation

🪜 layering.

The Test App does not need to independently implement those rules.

It asks the library.

This gives important knowledge a single home.



---



# 🎨 Part 843 — The Test App owns presentation knowledge

The Test App knows things such as:

🌱 grass should be green

🌊 water should be blue

🏰 how a tower should look

🌲 how trees should be drawn

✨ how neighbours should highlight

🏷️ which SVG IDs should be created.

Midgard does not need any of this knowledge.

This is the central library/application boundary.



---



# 🔷 Part 844 — SVG translates geometry into graphics

Midgard may return points conceptually like:

📍 Point

📍 Point

📍 Point

📍 Point

📍 Point

📍 Point.

The Test App translates them into:

🔷 SVG polygon data.

So SVG acts as an adapter between:

📐 abstract geometry

and:

👁️ visible graphics.



---



# 🔄 Part 845 — The geometry-to-screen pipeline

For a hexagon:

📍 logical coordinate

⬇️

📦 Midgard

⬇️

🎯 center position

- \


📐 polygon points

⬇️

🧩 Test App

⬇️

🔷 SVG polygon

⬇️

🎨 CSS / SVG styling

⬇️

👁️ visible hexagon.

This pipeline is one of the most important in the whole project.



---



# 🌳 Part 846 — SVG is part of the DOM

The generated SVG is not merely a picture file.

Its elements become DOM objects.

That means the Test App can:

🏷️ assign IDs

🎨 assign classes

🔍 query polygons

🖱️ attach event listeners

✨ change styles dynamically.

This makes SVG particularly suitable for the current demonstrations.



---



# 🆔 Part 847 — Coordinates can become DOM identity

A coordinate such as:

📍 `(4,6)`

can become:

🏷️ `hex-4-6`.

This creates a bridge:

📦 domain identity

⬇️

🧩 application representation

⬇️

🌳 DOM identity.

The library remains unaware of the DOM ID.

The application derives it when needed.



---



# 🎨 Part 848 — CSS completes the presentation layer

Once DOM/SVG elements have:

🏷️ classes

and:

🆔 IDs,

CSS can target them.

For example:

📍 coordinate

⬇️

🏷️ SVG ID

⬇️

🔍 CSS selector

⬇️

🌊 blue fill.

CSS therefore sits at the outer presentation edge of the architecture.



---



# 🖱️ Part 849 — Interaction travels in the opposite direction

Rendering largely moves outward:

🧠 data

→ 🌳 DOM

→ 👁️ screen.

Interaction begins at the other end:

👤 user

⬇️

🖱️ browser event

⬇️

🌳 DOM element

⬇️

⚙️ event handler

⬇️

🧠 application behaviour.

So a browser application contains two complementary flows.



---



# 🔄 Part 850 — Output flow and input flow

### 👁️ Output

🧠 state/data

→ 📐 geometry

→ 🌳 DOM/SVG

→ 🎨 presentation

→ 👤 user.

### 🖱️ Input

👤 user

→ 📣 event

→ ⚙️ handler

→ 🧠 application logic

→ 🔄 new state.

Then the new state creates new output.

This creates a loop.



---



# ♻️ Part 851 — The interactive cycle

The complete cycle is:

🧠 **State**

⬇️

🎨 **Render**

⬇️

👁️ **Visible interface**

⬇️

🖱️ **User action**

⬇️

📣 **Event**

⬇️

⚙️ **Logic**

⬇️

🔄 **State changes**

⬇️

🎨 **Render/update again**.

This cycle is fundamental to interactive software far beyond this particular project.



---



# 🔗 Part 852 — Neighbours demonstrates the whole cycle beautifully

The Neighbours demo begins with:

📍 home coordinate `(4,6)`.

Then:

📦 Midgard calculates neighbours.

The Test App converts those coordinates into:

🏷️ SVG identities.

The user enters the home cell:

🖱️ `mouseenter`.

The event handler identifies neighbour polygons:

🔍

and modifies their visual state:

✨ highlight.

When the pointer leaves:

🖱️ `mouseleave`

the appearance returns.

One demo therefore connects almost every major concept in the project.



---



# 🌲 Part 853 — SVG Terrain demonstrates the other major strength

The terrain demo is less about interaction and more about composition.

It demonstrates:

📦 Midgard geometry

⬇️

✂️ clipping boundaries

⬇️

🌱 terrain base

⬇️

🌲 graphical objects

⬇️

🏰 structures

⬇️

⬡ border

⬇️

👁️ illustrated map.

This demonstrates that Midgard can support rich rendering without becoming responsible for rendering itself.



---



# 📚 Part 854 — Documentation travels through a parallel pipeline

Not everything in DemoArea uses Midgard.

Documentation follows:

📄 Markdown

⬇️

⚡ Vite `?raw`

⬇️

🧵 string

⬇️

📝 Marked

⬇️

🌐 HTML

⬇️

🌳 DOM

⬇️

👁️ chapter.

This is a separate pipeline that joins the same final content area.



---



# ⚡ Part 855 — Vite surrounds the source architecture

Vite helps make the source project runnable.

Conceptually:

📁 source files

⬇️

⚡ Vite/tooling

⬇️

🌐 browser environment

⬇️

🚀 application startup.

Vite handles infrastructure.

It does not decide application responsibilities.

This distinction prevents tooling from being confused with architecture.



---



# 🧠 Part 856 — TypeScript surrounds the code with static information

TypeScript adds compile-time knowledge.

It can understand distinctions such as:

📦 `MenuItem`

🧩 `Demo`

📍 `Point`

🪜 `LayeredHexagon`

🌳 `HTMLElement`.

This helps detect incompatible relationships before they become browser errors.

But TypeScript does not eliminate runtime uncertainty.

DOM queries can still fail.

Events still occur dynamically.

External data could still be invalid.

Static and runtime reasoning complement one another.



---



# 🔒 Part 857 — Encapsulation appears at several levels

The project uses boundaries at multiple scales.

### 🧱 Class level

`private` implementation details.

### 📄 Module level

only selected values are exported.

### 📦 Library level

Midgard exposes a public API while hiding internals.

### 🏗️ Architectural level

the Test App owns presentation while Midgard owns grid logic.

Encapsulation is therefore not one keyword.

It is a recurring design idea.



---



# 🧭 Part 858 — Dependency direction explains much of the design

A useful dependency picture is:

🎨 CSS / browser presentation

⬆️

🧩 Test App demos

⬆️

📦 Midgard public API

⬆️

🧮 Midgard domain implementation.

Higher-level presentation depends on lower-level reusable capabilities.

The lower levels do not depend on the particular presentation above them.

That creates flexibility.



---



# 🧠 Part 859 — Knowledge direction matters too

Dependencies are not only technical imports.

They represent knowledge.

Midgard knows:

> How does a hex grid work?

The Test App knows:

> How should this particular demonstration look?

Navigation knows:

> Which menu item is active?

App knows:

> How should major components coordinate?

This gives each important piece of knowledge an architectural home.



---



# 🎯 Part 860 — The architecture can be understood as responsibility ownership

A compact map is:

🚀 `main.ts`

→ **start**

🏗️ `App.ts`

→ **coordinate**

⬛ `Header.ts`

→ **top-level navigation**

🧭 `Navigation.ts`

→ **sidebar navigation/state**

📦 `MenuItem.ts`

→ **navigation data contract**

📄 `DemoArea.ts`

→ **content routing/display**

🧩 `Demo.ts`

→ **demo contract**

🎨 Demo implementations

→ **specific demonstrations**

🎨 `style.css`

→ **presentation**

📦 Midgard

→ **hex-grid domain logic**.

If these responsibilities are understood, much of the code becomes easier to predict.



---



# 🧩 Part 861 — Each Demo then has its own teaching responsibility

The demos themselves form another map:

🏠 **Home**

minimal Demo implementation.

⬡ **Single Hex**

basic geometry.

↔️ **X-Dominated Grid**

complete X-oriented grid.

↕️ **Y-Dominated Grid**

complete Y-oriented grid.

🎨 **CSS Styling**

DOM identity and stylesheet integration.

🌲 **SVG Terrain**

rich SVG composition.

🔗 **Neighbours**

domain relationships and interaction.

The Test Page therefore progresses from simple to increasingly integrated examples.



---



# 🪜 Part 862 — Complexity is introduced gradually

The progression is roughly:

🌳 one empty DOM element

⬇️

⬡ one SVG polygon

⬇️

🗺️ many polygons

⬇️

🎨 CSS identities

⬇️

🌲 composed SVG artwork

⬇️

🖱️ interactive domain behaviour.

This makes the Test Page more than a random collection of examples.

It forms a learning progression.



---



# 🧠 Part 863 — Several transformations define the system

Much of programming in the Test App can be understood as transforming representations.

Examples:

📍 Coordinate

→ 🏷️ DOM ID.

📍 Point array

→ 🧵 SVG points string.

📄 Markdown

→ 🌐 HTML.

🧠 active item ID

→ 🎨 active CSS class.

🔗 neighbour coordinates

→ ✨ highlighted polygons.

This perspective is extremely useful.

Software often works by moving information through carefully defined representations.



---



# 🔄 Part 864 — Data flows; responsibilities transform it

A useful general pattern is:

📥 **Input**

⬇️

🧩 **Responsible component**

⬇️

🔄 **Transformation**

⬇️

📤 **Output**.

For example:

📥 `Coordinate[]`

⬇️

🧩 neighbour demo

⬇️

🔄 create SVG IDs

⬇️

📤 `Set<string>`.

Or:

📥 Markdown string

⬇️

📝 Marked

⬇️

🔄 parse

⬇️

📤 HTML string.

Thinking in data flow often makes complex code much easier to follow.



---



# 🧪 Part 865 — Verification surrounds the architecture

The system is supported by several forms of verification.

　　　　　👁️ visual inspection

　　　　　　　↑

🖥️ Test App ← 📦 Midgard → 🤖 automated tests

　　　　　　　↓

　　　　　🧠 TypeScript

Different mechanisms inspect different properties.

Together they provide stronger evidence than any single mechanism alone.



---



# 📚 Part 866 — Documentation completes the learning system

There are now two complementary forms of explanation.

### 📚 Library Notes

explain:

📦 how Midgard itself works.

### 📘 Test Page Notes

explain:

🖥️ how the consumer application works.

Together they describe both sides of the boundary:

📦 **producer**

↔️

🖥️ **consumer**.

This is especially useful for understanding library design.



---



# 🪞 Part 867 — The Test App reflects the quality of the library API

A reusable library can claim to be easy to use.

But a consumer provides evidence.

If the Test App can perform meaningful tasks through clear calls such as:

```
createSingleHexagon()
createGrid()
getNeighbours()
```

then the public API demonstrates practical value.

The consumer acts like a mirror:

> 📦 **What does the library look like from outside?**

That perspective is essential in API design.



---



# 🎮 Part 868 — The same architecture can grow further

A future small game could extend the model:

📦 Midgard geometry

⬇️

🎮 game domain

⬇️

🎨 SVG renderer

⬇️

🖱️ interaction.

New concepts might include:

🌱 terrain

🏰 structures

🧙 units

🚶 movement

🎯 selection.

But Midgard would remain the spatial foundation rather than absorbing every game concept.



---



# 🌱 Part 869 — Growth should follow discovered needs

The current application does not need every architecture that a future game might require.

So development can remain incremental:

🧪 working demo

⬇️

🧠 learn

⬇️

➕ add capability

⬇️

🔍 notice architectural pressure

⬇️

🧹 refactor where useful

⬇️

🧪 verify again.

This keeps architecture grounded in actual requirements.



---



# 🧭 Part 870 — How to read an unfamiliar part of the Test App

When approaching a file, a useful sequence is:

### 1️⃣ What responsibility does this file have?

### 2️⃣ What does it import?

### 3️⃣ What does it export?

### 4️⃣ What state does it own?

### 5️⃣ What public operations does it provide?

### 6️⃣ Which other component calls it?

### 7️⃣ Which components does it call?

### 8️⃣ Does it manipulate data, DOM, SVG, CSS state, or several?

### 9️⃣ Where does its input come from?

### 🔟 Where does its output go?

These questions turn source code into an architectural story.



---



# 🔍 Part 871 — How to trace a bug

For a bug, follow the data.

Suppose:

❌ the wrong neighbours highlight.

Trace:

📍 home coordinate

⬇️

📦 `getNeighbours()`

⬇️

📚 returned coordinates

⬇️

🏷️ generated IDs

⬇️

🔍 selected polygons

⬇️

🎨 highlight operation.

At some point:

expected data

≠

actual data.

That boundary is where investigation should focus.



---



# ➕ Part 872 — How to think about a new feature

For a new feature, begin with responsibility.

Suppose the application needs:

🏔️ mountain terrain.

Ask:

> Is mountain geometry?

No.

So it probably does not belong in Midgard.

Ask:

> Is it application meaning/presentation?

Yes.

Then decide:

🌱 how terrain data represents mountain

and:

🎨 how SVG/CSS displays mountain.

The architecture helps determine where new code belongs.



---



# 🧠 Part 873 — Architecture reduces the search space

Without architectural boundaries, adding a feature raises the question:

> “Where in the entire project should this code go?”

With clear responsibilities, the question becomes narrower:

> “Which component owns this concept?”

That reduction in possibilities is one of the practical benefits of architecture.

It makes reasoning cheaper.



---



# 🎓 Part 874 — The Test App contains many core software-development ideas

Although the application is relatively small, it demonstrates:

🔷 TypeScript

🧱 classes

🧩 interfaces

🎭 polymorphism

🏗️ composition

🔒 encapsulation

📣 callbacks

🖱️ events

🧠 state

📦 modules

⚡ build tooling

🌳 DOM

🔷 SVG

🎨 CSS

📚 Markdown processing

📦 library consumption

🧪 integration testing

🧹 refactoring

🧭 dependency management

🎯 responsibility-driven design.

These are not isolated academic concepts.

They cooperate inside one working system.



---



# 💡 Part 875 — OOP becomes easier to understand in context

Object-oriented programming is sometimes reduced to syntax:

```
class
private
constructor
```

`implements`.

But the Test App demonstrates the deeper idea.

Objects have responsibilities and collaborate.

🏗️ App coordinates.

⬛ Header reports section selection.

🧭 Navigation manages menu state.

📄 DemoArea chooses content.

🧩 Demo implementations render specific examples.

The important question is therefore not merely:

> “Where are the classes?”

It is:

> **How are responsibilities distributed among collaborating objects?**



---



# 🧩 Part 876 — Interfaces describe collaboration boundaries

`Demo` does not describe how terrain works.

It describes what DemoArea may expect from any demonstration.

That is the power of an interface.

It defines a boundary between collaborators.

Conceptually:

📄 DemoArea says:

> “Give me something that can render an HTMLElement.”

🧩 Demo says:

> “Any implementation satisfying this contract can participate.”

That allows variation without forcing DemoArea to understand every variant.



---



# 📦 Part 877 — The public API does the same at package scale

At a larger scale:

🖥️ Test App says:

> “Give me grid operations and geometry.”

📦 Midgard public API says:

> “These are the supported operations and types.”

So:

🧩 `Demo`

is a boundary inside the application,

while:

📦 Midgard's exported API

is a boundary between packages.

The same architectural principle appears at different scales.



---



# 🌐 Part 878 — The browser is another collaborator

The application also collaborates with the browser.

It asks the browser to:

🌳 create elements

🔍 query elements

🖱️ report events

🔷 render SVG

🎨 apply CSS

📐 interpret viewBox coordinates.

So the browser is not merely where the application “happens to run.”

Its APIs are active parts of the system.



---



# 🛠️ Part 879 — Vite is part of the development system, not the domain

Likewise, Vite plays an important role:

⚡ process source

📦 resolve modules/resources

📄 support raw imports

🏗️ create builds.

But it should remain conceptually outside the Midgard domain.

This separation helps distinguish:

**what the software means**

from:

**how the software is developed and delivered**.



---



# 🎯 Part 880 — The entire project in one diagram

The complete mental model can be condensed to:

👨‍💻 **Source**

🔷 TypeScript　🎨 CSS　📄 Markdown

　　　　　　⬇️

　　　　　⚡ **Vite**

　　　　　　⬇️

🌐 **Browser starts `main.ts`**

　　　　　　⬇️

　　　　　🏗️ **App**

　　　↙️　　　↓　　　↘️

⬛ Header　🧭 Navigation　📄 DemoArea

　　　　　　　　　　　　↙️　　↘️

　　　　　　　　　🧩 Demo　📚 Notes

　　　　　　　　　　↓

　　　　　　　　　📦 Midgard

　　　　　　　　　　↓

　　　　　　　　　📐 Geometry

　　　　　　　　　　↓

　　　　　　　　　🔷 SVG / 🌳 DOM

　　　　　　　　　　↓

　　　　　　　　　🎨 CSS

　　　　　　　　　　↓

　　　　　　　　　👁️ User

　　　　　　　　　　↓

　　　　　　　　　🖱️ Events

　　　　　　　　　　↓

　　　　　　　　　🧠 State / logic

　　　　　　　　　　↓

　　　　　　　　　🔄 interface updates.

That is the Test App as one complete system.



---



# 🏁 Part 881 — The deepest architectural lesson

The project works because different concerns are allowed to remain different.

📦 Midgard does not need to draw trees.

🌲 terrain drawing does not need to calculate neighbour mathematics.

🎨 CSS does not need to manage navigation state.

🧭 Navigation does not need to parse Markdown.

📝 Marked does not need to know about hexagons.

⚡ Vite does not decide game rules.

Each piece contributes something specific.

The system emerges from their cooperation.



---



# 🎯 Chapter 25 — The central idea

The Midgard Test App can be understood as a chain of **responsibilities, transformations and collaborations**.

At startup:

🚀 `main.ts`

creates:

🏗️ `App`.

App coordinates:

⬛ Header

🧭 Navigation

📄 DemoArea.

DemoArea selects either:

🧩 a Demo

or:

📚 documentation.

Demos can consume:

📦 Midgard

to obtain:

📍 coordinates

📐 geometry

🔗 relationships

🪜 layering.

The Test App transforms that information into:

🌳 DOM

and:

🔷 SVG.

CSS adds:

🎨 presentation.

The browser supplies:

🖱️ events.

Events change:

🧠 state.

State changes lead to:

🔄 interface updates.

Around all of this:

⚡ Vite supports development and building.

🧠 TypeScript provides static structure.

🧪 tests provide verification.

📚 documentation preserves understanding.

The most important mental model is therefore not any individual syntax feature.

It is:

> 🧠 **Give each piece of knowledge and behaviour a sensible owner, connect those owners through clear boundaries, and let data flow between them in understandable transformations.**

Once that model is understood, the Test App stops looking like fifteen separate source files.

It becomes one coherent system.
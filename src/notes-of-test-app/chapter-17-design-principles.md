## Chapter 17 — Design Principles Behind the Test App

### 🧭 Part 474 — From “how it works” to “why it is designed this way”

Chapter 16 followed the complete application from:

🌐 browser startup

through:

🚀 `main.ts`

🏗️ `App`

🧭 navigation

📄 `DemoArea`

🧩 demos

📦 Midgard

🎨 SVG and CSS

Now the perspective changes again.

The question is no longer mainly:

> **How does the application work?**

Instead:

> **Why is the code divided this way, and what software-design principles can be seen in it?**

The application is small enough to understand as a whole, but large enough to demonstrate several important ideas:

🎯 **Single Responsibility**

🧱 **Separation of Concerns**

🔒 **Encapsulation**

🧩 **Abstraction**

🔌 **Loose Coupling**

🧬 **Polymorphism**

🧱 **Composition**

📦 **Dependency Direction**

♻️ **DRY versus premature abstraction**

🧹 **Clean Code**

These ideas overlap, but they are not identical.



---



# 🎯 Part 475 — Single Responsibility

A useful starting point is the **Single Responsibility Principle**, commonly abbreviated:

**SRP**

A practical interpretation is:

> 🎯 **A class or module should have one focused responsibility and therefore one main kind of reason to change.**

This does **not** mean:

> “Every class should contain only one method.”

Nor does it mean:

> “Every file should be tiny.”

The important word is:

**responsibility**.



---



# 🚀 Part 476 — `main.ts` has a narrow responsibility

`main.ts` is a particularly clear example.

Its responsibility is essentially:

> 🚀 **Bootstrap the application.**

It:

🔍 finds the application root

🛑 fails if that root does not exist

🏗️ creates `App`

▶️ starts it.

It does not contain:

❌ navigation logic

❌ Midgard geometry

❌ SVG drawing

❌ CSS styling

❌ Markdown parsing

This narrow role makes the entry point easy to understand.



---



# 🏗️ Part 477 — `App` has a different responsibility

`App` is larger because its responsibility is broader:

> 🏗️ **Coordinate the application's major components.**

It knows about:

⬛ Header

🧭 Navigation

📄 DemoArea

and the communication between them.

That does not violate Single Responsibility merely because several components are involved.

Coordination itself is the responsibility.

This is an important nuance:

> 🎯 **One responsibility does not mean one dependency or one operation.**



---



# ⬛ Part 478 — `Header` owns header behaviour

`Header` is responsible for the application's top-level navigation UI.

It handles:

🏷️ title/header structure

🔘 section buttons

🎯 active section appearance

🖱️ section-selection events.

If the top-level navigation design changes, `Header.ts` is a natural place to look.

It does not also need to know how a terrain tower is drawn.

That would be an unrelated reason for the same class to change.



---



# 🧭 Part 479 — `Navigation` owns sidebar behaviour

Likewise, `Navigation` owns the sidebar menu.

Its concerns include:

📋 available menu items

🎯 active item

🔄 switching section

🔘 rendering navigation buttons

🖱️ handling menu selection.

So:

⬛ Header

and:

🧭 Navigation

both deal with navigation in a broad sense, but they have distinct responsibilities at different levels of the interface.



---



# 📄 Part 480 — `DemoArea` owns content selection and display

`DemoArea` has another responsibility:

> 📄 **Translate the selected MenuItem into content and display that content.**

It decides whether the selection corresponds to:

🧩 a Demo

or:

📚 a Markdown chapter.

Then it places the result in the content area.

It does not calculate Midgard neighbour geometry itself.

It delegates that work to the concrete demo and ultimately the library.



---



# 🧩 Part 481 — Concrete demos own demonstrations

Each concrete Demo class then owns one demonstration.

Examples:

⬡ `DemoAreaSingleHex`

→ demonstrate single-hex creation

↔️ `DemoAreaXDominatedGrid`

→ demonstrate x-dominated grids

🎨 `DemoAreaCssStyling`

→ demonstrate CSS styling

🌲 `DemoAreaSvgTerrain`

→ demonstrate richer SVG rendering

🔗 `DemoAreaNeighbours`

→ demonstrate neighbour calculation and interaction

The application therefore decomposes by meaningful features rather than putting every demonstration into one giant `DemoArea.ts`.



---



# 🧱 Part 482 — Separation of Concerns

**Separation of Concerns** is closely related to Single Responsibility, but it applies more broadly.

The principle asks:

> 🧱 **Can different kinds of problems be kept in different parts of the system?**

The Test App separates several concerns:

📦 grid mathematics

🧭 navigation

📄 content routing

🎨 presentation

🔷 graphics

🖱️ interaction

📚 documentation

This reduces the amount of unrelated knowledge each part needs.



---



# 📦 Part 483 — The strongest separation: library versus application

Perhaps the most important separation is:

📦 **Midgard Hex Grid**

versus:

🖥️ **Midgard Test App**

Midgard handles:

📍 coordinates

🔗 neighbours

📐 positioning

⬡ geometry

🪜 layering

The test application handles:

🎨 colors

🌲 terrain graphics

🖱️ interactions

🧭 menus

📚 documentation

That boundary protects the library's reusability.



---



# 🎨 Part 484 — TypeScript versus CSS is another separation

The application also separates much of:

⚙️ **behaviour**

from:

🎨 **presentation**.

For example, TypeScript can establish:

**this navigation item is active**

by applying:

```
is-active
```

CSS then decides:

**what active looks like**.

So:

🧠 state

⬇️

⚙️ TypeScript

⬇️

🏷️ semantic class

⬇️

🎨 CSS

⬇️

👁️ visual result

The logic does not need to know every color value.



---



# 🔒 Part 485 — Encapsulation

**Encapsulation** means keeping data and behaviour together behind a controlled boundary.

A class can contain internal details that outside code does not need to manipulate directly.

For example, `Navigation` manages internal state such as:

🎯 active section

🎯 active Test Page item

🎯 active notes item

Outside code does not need to directly rewrite those fields.

Instead it uses meaningful operations such as:

**set section**

or:

**get active item**.

This protects the object's internal consistency.



---



# 🔐 Part 486 — `private` expresses encapsulation directly

TypeScript's:

```
private
```

keyword explicitly communicates:

> 🔐 **This member belongs to the internal implementation of this class.**

A private helper such as:

```
createHexagonId()
```

does not need to become part of the public API merely because the class needs it internally.

This reduces the surface area that other code can depend upon.



---



# 🔒 Part 487 — `readonly` communicates another kind of constraint

`readonly` communicates:

> 🔒 **This reference/value is established and should not later be reassigned.**

Examples include stable component references and fixed configuration values.

This is valuable because code communicates not only:

**what is possible**

but also:

**what is intended**.

Constraints are part of design documentation.



---



# 🧩 Part 488 — Abstraction

An **abstraction** presents the important idea while hiding unnecessary detail.

The `Demo` interface is an excellent example.

It says:

> 🧩 **A Demo can render itself as an HTMLElement.**

It does not expose whether that rendering requires:

⬡ one polygon

🌲 100 SVG objects

🖱️ event listeners

📦 Midgard calls

or no visible content at all.

The abstraction captures what the caller needs to know.



---



# 🔭 Part 489 — Good abstractions hide irrelevant information

From `DemoArea`'s perspective, the internal details of `DemoAreaSvgTerrain` are irrelevant.

It only needs:

```
render()
```

That allows:

📄 DemoArea

to operate at a higher conceptual level.

It can think:

> “Render this demo.”

rather than:

> “Create three clip paths, seven polygons, seventeen circles…”

This is abstraction reducing cognitive load.



---



# 🧠 Part 490 — Abstraction does not mean hiding everything

Too much abstraction can also make code difficult to follow.

If every two-line operation were hidden behind another class, interface and factory, the reader might spend more time navigating abstractions than understanding the program.

Useful abstraction asks:

> ❓ **Which details are irrelevant at this level?**

Those details can be hidden.

Details essential to understanding the responsibility should remain visible.



---



# 🔌 Part 491 — Loose coupling

Two components are **loosely coupled** when they depend on relatively small, stable contracts rather than detailed knowledge of each other's implementation.

Consider:

⬛ Header

and:

🏗️ App.

Header does not need a direct reference to `DemoArea`.

Instead it reports:

📣 **section selected**

through a callback.

`App` decides what should happen next.

This reduces direct dependency between unrelated components.



---



# 🕸️ Part 492 — Tight coupling would create a dependency web

Imagine a different design:

⬛ Header imports Navigation

🧭 Navigation imports DemoArea

📄 DemoArea imports Header

Now each component could manipulate the others directly.

The system might become:

⬛ ↔️ 🧭 ↔️ 📄 ↔️ ⬛

Changes could propagate unpredictably.

The current callback/coordinator approach is closer to:

⬛

↓ callback

🏗️ **App**

↙️　　　↘️

🧭　　　　📄

The relationships are easier to reason about.



---



# 📣 Part 493 — Callbacks are simple dependency inversion

The application does not need a sophisticated event bus to reduce coupling.

A callback already provides a useful inversion.

Instead of `Header` saying:

> “I will find DemoArea and modify it.”

Header says:

> 📣 **“Here is the section that was selected.”**

The creator of Header decides what that notification means.

This makes Header more reusable and less knowledgeable.



---



# 🧬 Part 494 — Polymorphism

Polymorphism appears through the `Demo` interface.

Different concrete classes can all be treated as:

**Demo**

because they provide:

**`render(): HTMLElement`**.

Conceptually:

　　　　　🧩 Demo

　　↙️　　　↓　　　↘️

⬡ Single　🌲 Terrain　🔗 Neighbours

　　　　　↓

```
　　　render()
```

The same operation can produce different behaviour depending on the concrete object.



---



# 🧠 Part 495 — Why polymorphism matters here

Without the common `Demo` abstraction, `DemoArea` might need code conceptually like:

> If Single Hex, call this special rendering method.

> If Terrain, call another special rendering method.

> If Neighbours, use another procedure.

Instead, once the object exists:

🧩 Demo

⬇️

**render**

The caller uses one common contract.

That makes the rendering stage simpler.



---



# 🧱 Part 496 — Composition

The application relies heavily on **composition**.

`App` contains references to:

⬛ Header

🧭 Navigation

📄 DemoArea.

This represents:

> 🧱 **Build a larger object by combining smaller objects.**

App does not inherit from Header.

Navigation does not inherit from App.

They are separate objects composed into a larger system.



---



# 🆚 Part 497 — Composition versus inheritance

Inheritance expresses an:

> **is-a**

relationship.

For example:

```
DemoAreaNeighbours implements Demo
```

means:

🔗 Neighbours demo

**is a kind of**

🧩 Demo.

Composition expresses a:

> **has-a**

relationship.

```
App
```

**has a**

⬛ Header

🧭 Navigation

📄 DemoArea.

These are different relationships and should not be confused.



---



# 🏗️ Part 498 — Why App should not inherit from its components

It would make little conceptual sense for:

```
App extends Navigation
```

because the application is not a specialized navigation menu.

Likewise:

```
App extends Header
```

would incorrectly model the relationship.

The correct relationship is:

🏗️ App

**contains and coordinates**

its components.

This is a natural use of composition.



---



# 📦 Part 499 — Dependency direction

A healthy architecture also considers which direction dependencies point.

The Test App depends on:

📦 Midgard.

But Midgard does **not** depend on:

🖥️ Test App.

So:

🖥️ **application**

➡️ 📦 **library**

not:

📦 library

➡️ 🖥️ application.

This direction is essential for keeping the library independently reusable.



---



# 🔽 Part 500 — Higher-level specialization depends on lower-level capability

The application is more specialized than the geometry library.

Midgard can potentially support:

🎮 games

📊 visualizations

🧪 simulations

🗺️ map editors

The Test App is one specific consumer.

Therefore the specialized consumer can depend on the general-purpose library without forcing the library to know about the consumer.



---



# 🚫 Part 501 — Avoiding dependency pollution

If Midgard began importing:

🎨 application CSS

🌲 terrain classes

🧭 navigation

or:

🖱️ browser interaction code

then the library would become polluted with concerns belonging to one particular consumer.

That would make it harder to reuse.

A clean dependency direction prevents this.



---



# ♻️ Part 502 — DRY: Don't Repeat Yourself

The code also raises the famous principle:

**DRY**

meaning:

> ♻️ **Don't Repeat Yourself.**

The underlying idea is not simply:

> “Never write similar-looking code twice.”

The deeper concern is duplicated **knowledge**.

If one business or domain rule exists in multiple places, those implementations can drift apart.



---



# 📦 Part 503 — A good example of avoiding dangerous duplication

Neighbour calculation belongs in Midgard.

The Neighbours demo does not implement its own second neighbour algorithm.

That avoids duplicated domain knowledge.

Good:

📦 one neighbour rule

⬇️

🔗 reused by consumer

Riskier:

📦 library neighbour algorithm

- \


🖥️ demo neighbour algorithm

If the rules changed, both implementations would need to remain synchronized.

This is exactly the kind of duplication DRY is particularly concerned with.



---



# ⚖️ Part 504 — Similar rendering code is a different question

The x-dominated and y-dominated demos contain substantial structural similarity.

Could that code be generalized?

Yes.

Should it automatically be generalized?

Not necessarily.

The repeated code is simple demonstration code whose explicitness can make each example easier to inspect independently.

So the design question becomes:

♻️ **How much duplication would be removed?**

versus:

🧠 **How much indirection would the abstraction introduce?**

DRY should be applied thoughtfully.



---



# 🌱 Part 505 — Premature abstraction

An abstraction created before the repeated concept is properly understood can become a burden.

This is sometimes called **premature abstraction**.

Suppose two demos currently look similar.

A generic abstraction is created immediately.

Later they evolve in different directions.

The supposedly reusable abstraction can become filled with:

🔀 conditionals

⚙️ flags

❓ optional configuration

🧩 special cases

At that point, keeping them separate might have been clearer.



---



# 🧠 Part 506 — Wait for the abstraction to reveal itself

A useful practical approach is:

1️⃣ notice duplication

2️⃣ understand why it exists

3️⃣ observe whether it continues

4️⃣ identify the genuinely shared concept

5️⃣ abstract that concept

This produces abstractions based on knowledge rather than guesswork.

The Test App is small enough that some explicit duplication is perfectly reasonable.



---



# 🧹 Part 507 — Clean Code and meaningful names

Many names in the application communicate intent well.

Examples include:

```
getActiveItem
setActiveSection
createTerrainSvg
drawWater
highlightNeighbours
isSameCoordinate
```

These names allow code to read at a higher conceptual level.

Compare:

```
drawWater
```

with:

```
method3
```

The first name explains why the method exists.



---



# 📖 Part 508 — Code should reveal intention

A useful Clean Code idea is that code should communicate its intention as clearly as practical.

For example:

```
isSameCoordinate
```

communicates a domain question.

A reader can understand:

> 📍 “This checks whether two coordinates represent the same location.”

without first examining the exact boolean expression.

The implementation remains available when more detail is needed.

This creates another abstraction layer through naming.



---



# 🧰 Part 509 — Helper methods should represent meaningful operations

Extracting methods is most useful when the extracted operation has a coherent meaning.

Examples:

🌊 `drawWater`

🌲 `drawTree`

🏰 `drawTower`

🏷️ `createHexagonId`

These methods represent concepts that can be named clearly.

A helper is less valuable if it merely fragments code without creating a meaningful conceptual boundary.

So:

> 🧠 **Method extraction should improve understanding, not merely reduce method length.**



---



# 📏 Part 510 — Long methods are signals, not automatic failures

`DemoAreaSvgTerrain.ts` naturally contains some substantial drawing methods.

A long method deserves inspection because it may be doing too much.

But line count alone does not determine quality.

A method drawing one coherent tower may contain many SVG instructions while still performing one conceptual task:

🏰 **draw the tower**

The better question is:

> ❓ **How many responsibilities does the method contain?**

rather than only:

> ❓ **How many lines does it contain?**



---



# 🎯 Part 511 — “Do one thing” is about conceptual level

A method can perform several low-level operations while still doing one higher-level thing.

For example:

**draw tree**

may involve:

🌑 create shadow

🪵 create trunk

🌳 create canopy

✨ create highlight

These are multiple instructions.

But together they support one coherent purpose:

🌲 **draw one tree**.

So “do one thing” should be interpreted conceptually rather than mechanically.



---



# 🔭 Part 512 — Keep operations at similar abstraction levels

A method is often easier to read when its main statements operate at roughly the same conceptual level.

For example:

🌱 draw grass

🌲 draw tree

🔷 draw border

is easier to understand at a glance than mixing those high-level calls with dozens of low-level SVG coordinate instructions.

Helper methods allow the high-level method to remain focused on the sequence of concepts.

This creates readable abstraction layers.



---



# 🧪 Part 513 — The test app itself documents the public API

The demos are also examples of how a consumer is expected to use Midgard.

For instance:

📦 create `HexGrid`

⬇️

🗺️ call `createGrid()`

⬇️

📚 receive `LayeredHexagon[]`

⬇️

🎨 render however the consumer chooses

This makes the Test App a form of **executable documentation**.

Unlike a static code example, the demo actually runs against the library.



---



# 📚 Part 514 — Executable examples can expose API quality

A public API may look elegant when designed in isolation.

But using it in a real consumer reveals practical questions:

❓ Are the names understandable?

❓ Is too much setup required?

❓ Does the returned data contain what rendering needs?

❓ Does the consumer need to know internal implementation details?

The Test App therefore does more than showcase Midgard.

It exercises the usability of the public API from a consumer's perspective.



---



# 🧠 Part 515 — Good separation makes future change more local

Suppose the visual design of the sidebar changes.

Ideally, that mainly affects:

🎨 `style.css`

and perhaps:

🧭 `Navigation.ts`.

It should not require rewriting:

📦 Midgard geometry.

Likewise, changing the neighbour mathematics should primarily affect:

📦 Midgard

and its tests.

It should not require redesigning:

⬛ Header.

This property is called **locality of change**.

Good separation helps changes remain close to the responsibility they concern.



---



# 🔧 Part 516 — Maintainability is largely about change

Software design is not only about making today's program work.

Programs change.

Features are added.

Names change.

Requirements evolve.

Bugs appear.

A maintainable architecture tries to make likely changes:

📍 easy to locate

🧩 limited in scope

🧠 understandable

🧪 testable

The Test App's separation into focused classes supports that goal.



---



# ⚠️ Part 517 — The architecture still has trade-offs

The design is not magically perfect.

For example:

📄 `DemoArea.ts`

contains a long mapping between IDs and Markdown chapters.

🧭 `Navigation.ts`

contains many note items.

Adding content can therefore require synchronized changes across multiple places.

Likewise, the x/y grid demos repeat substantial rendering logic.

These are reasonable areas to evaluate as the project grows.

Software architecture is rarely:

**perfect / wrong**

It is usually a collection of trade-offs appropriate to the current scale.



---



# 🌱 Part 518 — Refactoring should respond to pressure

If the Test App remained small, the current explicit structure might be entirely adequate.

If it grew to:

📚 hundreds of chapters

🧩 dozens of demos

🎮 many interactive systems

then new pressures would appear.

At that point, useful refactorings might include:

📋 centralized content metadata

🏭 more generalized demo registration

🧰 shared SVG rendering helpers

🛣️ more formal routing

The important principle is:

> 🌱 **Architecture can evolve when real complexity justifies it.**



---



# 🚫 Part 519 — Avoid speculative architecture

It would be possible today to build a huge infrastructure anticipating every imaginable future feature.

But that could create complexity for problems that do not yet exist.

This connects to another common principle:

**YAGNI**

meaning:

**You Aren't Gonna Need It.**

The idea is:

> 🚫 **Do not build substantial functionality merely because it might theoretically become useful someday.**

Design for known needs while leaving sensible room for evolution.



---



# ⚖️ Part 520 — DRY, YAGNI and clarity must be balanced

These principles can sometimes pull in different directions.

♻️ DRY says:

> Avoid harmful duplication.

🚫 YAGNI says:

> Avoid unnecessary machinery.

🧠 Clean Code says:

> Keep intent understandable.

The correct design often requires balancing them.

For example, combining two demos might reduce duplication but create configuration complexity that is not yet justified.

There is no universal formula.

Engineering judgment matters.



---



# 🧭 Part 521 — A useful design checklist for this application

When considering a future change, useful questions include:

🎯 **Which component actually owns this responsibility?**

🔌 **Can components communicate through a small contract?**

📦 **Does this belong in Midgard or only in the consumer?**

♻️ **Am I duplicating knowledge or merely similar-looking code?**

🧩 **Would an abstraction make the concept clearer?**

🚫 **Am I solving a real requirement or an imagined future problem?**

🧪 **Can the behaviour be tested independently?**

📍 **Will this change remain local or spread everywhere?**

These questions are more useful than mechanically applying design rules.



---



# 🗺️ Part 522 — The design principles mapped onto the application

The complete picture can be summarized like this:

🚀 **main.ts**

→ narrow bootstrap responsibility

🏗️ **App**

→ composition and coordination

⬛ **Header**

→ encapsulated top-level navigation

🧭 **Navigation**

→ encapsulated sidebar state

📨 **MenuItem**

→ small shared data contract

📄 **DemoArea**

→ content routing

🧩 **Demo**

→ abstraction and polymorphism

⬡🌲🔗 **concrete demos**

→ specialized implementations

📦 **Midgard**

→ clean dependency direction and domain separation

🎨 **style.css**

→ separation of presentation

🖱️ **callbacks/events**

→ loose communication

Together these principles create the application's structure.



---



# 🎯 Chapter 17 — The central idea

The most important lesson is not that the Test App follows a collection of named rules perfectly.

The important lesson is that the code has been divided according to **meaningful responsibilities**.

A useful mental model is:

> 🎯 **Give each concern a sensible home.**

Then:

🔒 keep internal details inside that home

🧩 expose small useful abstractions

🔌 communicate through clear contracts

📦 keep dependencies pointing toward reusable lower-level capabilities

♻️ remove duplication when it represents genuinely shared knowledge

🚫 avoid abstractions that solve problems the project does not actually have

🧹 use names and methods that reveal intention

The result is not simply shorter code.

The goal is code that is easier to:

📖 read

🧠 understand

🔧 change

🧪 test

🌱 extend

That is the deeper purpose behind principles such as Single Responsibility, separation of concerns, encapsulation and Clean Code.

> 🧠 **Good design manages knowledge: each part of the system should know what it needs for its responsibility, while unnecessary knowledge stays elsewhere.**
## Chapter 18 — Design Patterns in the Test App

### 🧩 Part 523 — What is a design pattern?

A **design pattern** is not a ready-made piece of code.

It is a recurring way of structuring a solution to a recurring software-design problem.

A pattern is better understood as:

> 🧩 **A recognizable design idea that can be implemented differently in different programs.**

Examples include:

🏭 Factory

🎯 Strategy

📣 Observer

🎭 Facade

🧱 Composite

The Midgard Test App does not formally implement every classic pattern, but several parts of its architecture have clear **pattern-like structures**.

It is useful to recognize these without forcing pattern names onto code that does not need them.



---



# 🏭 Part 524 — Factory-like creation in `DemoArea`

One of the clearest examples appears in `DemoArea`.

A navigation item contains an ID.

`DemoArea` then decides which concrete Demo object should be created.

Conceptually:

🆔 `single-hex`

⬇️

🏭 creation logic

⬇️

⬡ `new DemoAreaSingleHex()`

Or:

🆔 `svg-terrain`

⬇️

🏭 creation logic

⬇️

🌲 `new DemoAreaSvgTerrain()`

This resembles the **Factory pattern**.



---



# 🏭 Part 525 — What problem does a Factory solve?

Imagine the caller had to do this everywhere:

> If ID is this, construct class A.

> If ID is that, construct class B.

> If ID is something else, construct class C.

Construction knowledge would spread through the application.

A factory-like method centralizes the question:

> 🏭 **Which concrete object should be created for this request?**

The caller can operate at a higher level.



---



# 🧩 Part 526 — The common `Demo` interface makes the factory useful

Factory-style creation becomes especially useful when the returned objects share an abstraction.

Here:

⬡ `DemoAreaSingleHex`

🌲 `DemoAreaSvgTerrain`

🔗 `DemoAreaNeighbours`

all satisfy:

🧩 **Demo**

So conceptually the factory operation can say:

🆔 ID

⬇️

🏭 create

⬇️

🧩 **Demo**

The caller does not need a different variable type for every possible implementation.



---



# ⚖️ Part 527 — Factory-like rather than a formal Factory framework

It is important not to overstate the pattern.

There is no elaborate:

```
DemoFactory
```

hierarchy with multiple creator classes.

The application simply has a method whose responsibility resembles Factory:

> **Translate an identifier into an appropriate concrete Demo object.**

For a small application, that is enough.

A separate Factory class would add another abstraction without necessarily improving the design.



---



# 🎯 Part 528 — Strategy-like behaviour through `Demo`

The Demo system can also be viewed through the idea behind the **Strategy pattern**.

Strategy is useful when:

> 🎯 **Different implementations can perform the same conceptual operation in different ways.**

Here the shared operation is:

**render**

But different Demo implementations render differently.



---



# 🔀 Part 529 — Same operation, different implementation

Consider:

⬡ `DemoAreaSingleHex.render()`

creates single-hex content.

🌲 `DemoAreaSvgTerrain.render()`

creates terrain content.

🔗 `DemoAreaNeighbours.render()`

creates interactive neighbour content.

Yet `DemoArea` can simply think:

🧩 Demo

⬇️

🎨 **render**

The concrete implementation determines the behaviour.

This is the central idea behind Strategy-like polymorphism:

> 🔀 **Select an implementation, then use it through a common operation.**



---



# 🆚 Part 530 — Factory and Strategy-like behaviour cooperate

These two ideas fit together naturally.

First:

🏭 **Factory-like selection**

chooses:

> Which Demo implementation?

Then:

🎯 **Strategy-like polymorphism**

allows:

> Use the selected Demo through `render()`.

So:

🆔 item ID

⬇️

🏭 choose implementation

⬇️

🧩 Demo

⬇️

🎯 implementation-specific `render()`

⬇️

🌳 HTMLElement

This is a common relationship between object creation and polymorphism.



---



# 📣 Part 531 — Observer-like communication through callbacks

Another recognizable pattern appears in the event/callback architecture.

For example, `Header` does not directly perform every consequence of a section selection.

Instead it reports the event through a callback.

Conceptually:

👤 click

⬇️

⬛ Header

⬇️

📣 **section selected**

⬇️

🏗️ App reacts

This resembles the idea behind the **Observer pattern**.



---



# 👁️ Part 532 — What is the Observer idea?

Observer deals with a common problem:

> 📣 **One object experiences a change or event, and another part of the system needs to be notified.**

Conceptually:

📦 Subject

⬇️ notification

👁️ Observer

The sender does not necessarily need detailed knowledge of what the receiver will do.

This helps reduce coupling.



---



# 📣 Part 533 — The Test App uses a lightweight version

The application does not contain a large Observer infrastructure with:

📚 lists of subscribers

➕

subscribe methods

➖

unsubscribe methods

📢

broadcast loops.

Instead it often uses a single callback supplied through a constructor.

That is a much simpler mechanism.

But the architectural idea is related:

> 📣 **Report an event outward rather than directly controlling unrelated components.**



---



# 🖱️ Part 534 — Browser events are also observer-like

The browser itself heavily uses this style.

For example:

```
addEventListener
```

means conceptually:

> 👁️ **When this event occurs, notify this function.**

In the Neighbours demo:

🏠 polygon

⬇️ `mouseenter`

📣 event

⬇️

✨ highlighting function runs

The program does not continuously ask:

> “Is the mouse inside yet?”

Instead it registers interest and waits for notification.

That is event-driven, observer-like behaviour.



---



# 🎭 Part 535 — `HexGrid` acts as a Facade from the consumer's perspective

Another useful pattern to recognize is **Facade**.

A Facade provides:

> 🎭 **A simpler public interface in front of a more complicated subsystem.**

The test application interacts mainly with:

```
HexGrid
```

rather than manually coordinating all of Midgard's internal helper classes.

For example, the consumer can call:

```
createGrid()
```

without separately orchestrating:

📍 coordinate generation

🔗 filling

🎯 positioning

🔷 geometry creation

🪜 layering.

This makes `HexGrid` facade-like.



---



# 🎭 Part 536 — Why a Facade is useful

Without a high-level facade, a consumer might need to understand the complete internal workflow:

1️⃣ create coordinate range

2️⃣ fill around skeleton

3️⃣ calculate positions

4️⃣ calculate polygon points

5️⃣ determine layers

6️⃣ assemble results

That would expose substantial internal complexity.

Instead:

🖥️ consumer

⬇️

🎭 `HexGrid.createGrid()`

⬇️

⚙️ internal subsystem

⬇️

📚 `LayeredHexagon[]`

The consumer gets a useful result through a small high-level operation.



---



# 🔒 Part 537 — Facade helps hide implementation decisions

Suppose Midgard later changes how some internal grid calculation works.

If the public operation remains:

```
createGrid()
```

the Test App may not need to change.

That is a major advantage of a Facade-like boundary.

The consumer depends on:

📦 **what the library promises**

rather than:

⚙️ **how the library currently performs every internal step**.

This reduces coupling across the package boundary.



---



# 🧱 Part 538 — Composition is everywhere, but it is not automatically the Composite pattern

The application frequently uses **composition**.

For example:

🏗️ App

contains:

⬛ Header

🧭 Navigation

📄 DemoArea.

But this should not automatically be called the **Composite design pattern**.

The terms sound similar, but they are different.

### 🧱 Object composition

Build larger structures from smaller objects.

### 🌳 Composite pattern

Treat individual objects and groups of objects through a common interface, usually in a tree structure.

The Test App clearly uses composition.

That does not mean every composed structure is an implementation of the formal Composite pattern.



---



# 🧠 Part 539 — Pattern names should describe reality

This distinction matters.

Design patterns are useful when they help explain the structure.

They become unhelpful when every piece of code is forced into a famous pattern name.

A good approach is:

> 🔍 **First understand what the code actually does. Then ask whether a known pattern accurately describes that structure.**

Not:

> 🧩 **Choose a pattern name first and reinterpret the code until it fits.**



---



# 🗂️ Part 540 — `MenuItem` behaves like a simple data object

`MenuItem` contains:

🆔 `id`

🏷️ `label`.

It carries information between parts of the application.

This resembles the broad concept of a:

📨 **Data Transfer Object**

or DTO.

But again, the application does not need elaborate DTO architecture.

The important point is simply:

> 📨 **Use a small structured object to communicate data between components.**

The interface gives that message a clear shape.



---



# 🧭 Part 541 — `App` resembles a Controller or Mediator

`App` sits between:

⬛ Header

🧭 Navigation

📄 DemoArea

and coordinates their communication.

This has similarities with patterns such as:

🎛️ **Controller**

and:

🤝 **Mediator**.

The exact label is less important than the structure:

> 🏗️ **Central coordination prevents peer components from needing detailed direct knowledge of one another.**



---



# 🤝 Part 542 — The Mediator idea

The classic Mediator idea is:

> 🤝 **Objects communicate through a coordinating object rather than forming many direct dependencies with each other.**

Without mediation:

⬛ Header ↔ 🧭 Navigation

⬛ Header ↔ 📄 DemoArea

🧭 Navigation ↔ 📄 DemoArea

With a mediator-like coordinator:

⬛ Header

↘️

🏗️ App

↙️　↘️

🧭 Navigation　📄 DemoArea

This reduces the number of direct relationships.



---



# ⚖️ Part 543 — `App` is mediator-like, not a formal pattern implementation

Again, precision matters.

`App` was not necessarily constructed as a textbook **Mediator Pattern** implementation.

It is the application's main coordinator.

Its structure happens to provide some of the same benefits:

🔌 reduced direct coupling

🧭 centralized interaction flow

🧠 easier understanding of component relationships.

Calling it **mediator-like** is more accurate than claiming that the application contains a formal textbook Mediator implementation.



---



# 🏭 Part 544 — Small helper factories also appear inside SVG code

Factory-like creation appears at a smaller scale too.

For example:

```
createPolygon(points)
```

takes geometric data and returns an SVG polygon.

Conceptually:

📍 `Point[]`

⬇️

🏭 creation helper

⬇️

🔷 `SVGPolygonElement`

This is not the full GoF Factory Method pattern.

But it demonstrates the general design idea:

> 🏭 **Centralize repeated object construction behind a meaningful operation.**



---



# 🎯 Part 545 — Orientation resembles a Strategy concept inside Midgard

The Test App also exposes another strategy-like idea through Midgard's orientation:

↔️ `x-dominated`

↕️ `y-dominated`

The public API remains largely the same.

But geometric behaviour changes according to the selected orientation.

Conceptually:

📦 HexGrid

- \


🎯 orientation choice

⬇️

different geometric behaviour

while preserving:

📐 the same high-level operations.

This resembles the purpose of Strategy: vary behaviour without forcing the consumer to use an entirely different API.



---



# 🧠 Part 546 — Pattern versus implementation mechanism

A design pattern and the programming mechanism used to implement it are not the same thing.

For example, Strategy could be implemented using:

🧩 classes

🔧 functions

🔀 conditionals

📦 injected objects

depending on the language and problem.

Likewise, Observer-like communication can use:

📣 callbacks

🚌 event buses

📚 subscriber collections

🌐 browser events.

The pattern describes the **design relationship**, not one mandatory syntax.



---



# 🧰 Part 547 — TypeScript makes several patterns lightweight

Languages such as Java historically encouraged many design patterns to be expressed through classes and interfaces.

TypeScript and JavaScript can often express similar ideas more lightly.

For example:

📣 a callback function

may be enough instead of creating several Observer classes.

Likewise:

🏭 a simple method

may be enough instead of building a factory hierarchy.

This is useful because:

> 🧠 **Patterns should solve complexity, not introduce unnecessary complexity merely to look formal.**



---



# 🚫 Part 548 — Avoid pattern overengineering

Imagine creating:

```
AbstractDemoFactory
ConcreteSvgTerrainDemoFactory
DemoFactoryProvider
DemoFactoryRegistry
```

just to instantiate seven small demos.

That might technically demonstrate patterns.

But it could make this application harder to understand.

The better question is:

> ❓ **Does this abstraction solve an actual design problem?**

Patterns are tools.

They are not goals by themselves.



---



# 🔍 Part 549 — Recognizing patterns improves code reading

Even when a pattern is implemented informally, recognizing the idea can make unfamiliar code easier to understand.

For example:

🏭 “This method chooses which implementation to construct.”

→ factory-like

📣 “This component reports events through a callback.”

→ observer-like

🎭 “This public object hides a more complex subsystem.”

→ facade-like

🎯 “Different implementations provide the same operation.”

→ strategy-like

🤝 “This object coordinates otherwise separate components.”

→ mediator-like

The pattern vocabulary gives names to recurring structural ideas.



---



# 🗣️ Part 550 — Patterns provide a shared vocabulary

Imagine explaining the complete implementation details of `HexGrid`.

A shorter architectural description might be:

> 🎭 **`HexGrid` provides a facade over lower-level grid operations.**

For someone familiar with the pattern, that communicates several ideas quickly:

🔒 internals are hidden

📦 public interface is simpler

🧩 subsystem complexity exists behind it.

Patterns therefore function partly as a vocabulary for software design.



---



# ⚠️ Part 551 — The vocabulary must be used accurately

Pattern vocabulary only helps when used carefully.

Calling every constructor a:

🏭 Factory

or every callback:

👁️ Observer pattern

can make terminology meaningless.

It is often better to say:

**factory-like**

**observer-like**

**strategy-like**

when the code uses the central idea but does not implement the full formal pattern.

This keeps the explanation grounded in the actual code.



---



# 🧩 Part 552 — Patterns visible across the complete architecture

The main pattern relationships can be summarized like this:

### 🏭 Factory-like

```
DemoArea.createDemo()
```

**ID → concrete Demo**

### 🎯 Strategy-like / polymorphic behaviour

```
Demo.render()
```

**same operation → different implementation**

### 📣 Observer-like

callbacks and browser event listeners

**event → notification → reaction**

### 🎭 Facade-like

```
HexGrid
```

**simple public API → more complex library subsystem**

### 🤝 Mediator-like

```
App
```

**central coordination between major UI components**

### 📨 Data-transfer role

```
MenuItem
```

**small structured message between components**

These patterns overlap and cooperate rather than existing as isolated boxes.



---



# 🔗 Part 553 — One selection can pass through several pattern ideas

Consider selecting:

🌲 **SVG Terrain**

The process can be interpreted through several patterns:

👤 click

⬇️

📣 **Observer-like callback**

Navigation reports selection

⬇️

🤝 **Mediator-like App**

coordinates the response

⬇️

🏭 **Factory-like DemoArea**

creates `DemoAreaSvgTerrain`

⬇️

🎯 **Demo polymorphism**

calls `render()`

⬇️

🎭 **HexGrid facade**

provides grid geometry

⬇️

🔷 SVG renderer

creates the scene

A single user action can therefore travel through several complementary design structures.



---



# 🧠 Part 554 — Patterns exist at different scales

Patterns are not all operating at the same level.

For example:

🏭 `createPolygon()`

is a tiny creation abstraction.

🏭 `createDemo()`

controls feature-level object creation.

🎭 `HexGrid`

defines a package-level public boundary.

🤝 `App`

coordinates application-level components.

So design ideas can appear at:

🔧 method level

🧩 class level

🏗️ application level

📦 package level.

Recognizing scale helps prevent confusion.



---



# 🌱 Part 555 — Patterns can emerge naturally

Good code does not always begin with:

> “A Factory pattern must be implemented here.”

Often the process is:

1️⃣ identify a responsibility

2️⃣ create a clear solution

3️⃣ observe the resulting structure

4️⃣ recognize that it resembles a known pattern.

This is often healthier than forcing the architecture around a predetermined pattern catalog.

The design problem should come first.



---



# 🎓 Part 556 — Why patterns matter when learning OOP

Design patterns are especially useful when learning object-oriented programming because they demonstrate that OOP is not mainly about syntax such as:

```
class
private
new
```

`implements`.

The deeper questions are:

🧩 How should responsibilities be divided?

🔌 How should objects communicate?

🏭 Who should create objects?

🎯 How can behaviour vary?

🔒 Which details should remain hidden?

📦 Which direction should dependencies point?

Patterns provide recurring answers to those kinds of questions.



---



# 🧠 Part 557 — OOP is about collaboration between objects

The Test App demonstrates this well.

No single class is “the application”.

Instead:

🚀 `main.ts` starts

🏗️ `App` coordinates

⬛ `Header` reports section changes

🧭 `Navigation` reports selections

📄 `DemoArea` chooses content

🧩 Demo implementations render

📦 `HexGrid` supplies geometry

The behaviour emerges from **collaboration**.

This is a more useful understanding of OOP than merely:

> “OOP means putting functions inside classes.”



---



# 🧭 Part 558 — A practical pattern question

When developing a new feature, the useful question is not:

> ❓ “Which design pattern can be inserted?”

A better sequence is:

### 1️⃣ What problem exists?

### 2️⃣ Which object should own the responsibility?

### 3️⃣ What should other objects need to know?

### 4️⃣ Where are dependencies becoming awkward?

### 5️⃣ Is this a recurring design problem?

### 6️⃣ Does a known pattern describe a clean solution?

This keeps patterns connected to real engineering needs.



---



# 🎯 Chapter 18 — The central idea

The Midgard Test App contains several recognizable design-pattern ideas, but they are mostly implemented in lightweight forms appropriate to the application's size.

The most useful relationships are:

🏭 **Factory-like creation**

```
MenuItem ID → concrete Demo
```

🎯 **Strategy-like polymorphism**

`Demo → render()` with different implementations

📣 **Observer-like communication**

events and callbacks report changes outward

🎭 **Facade-like Midgard API**

`HexGrid` provides simple access to more complex grid functionality

🤝 **Mediator-like coordination**

`App` connects Header, Navigation and DemoArea without requiring them to control one another directly

The deeper lesson is:

> 🧠 **A design pattern is valuable when it gives a clear structure to a real recurring problem.**

Patterns should make software easier to understand and change.

They should not be added simply to make the architecture look sophisticated.

In a small TypeScript application, a:

📣 callback

🏭 helper method

🧩 interface

or:

🏗️ coordinating class

may capture the important idea of a classic pattern without requiring a large formal implementation.

That is one of the most useful skills in software design:

> 🎯 **Recognize the principle behind a pattern, then use only as much structure as the actual problem needs.**
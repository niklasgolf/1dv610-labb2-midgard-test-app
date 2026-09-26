# 📘 Part XI — Design Patterns in Midgard

## Part 518 — What Is a Design Pattern?

A **design pattern** is not a ready-made piece of code.

It is a recognized way of structuring objects and responsibilities to solve a recurring design problem.

Think of it as:

🧠 **a reusable design idea**

rather than:

📋 **a template you copy exactly**

For example, many systems have the problem:

> **“I have several complicated components, but I want users to interact with them through one simpler interface.”**

That recurring problem led to the pattern called:

🌐 **Facade**

---

# 🧩 Part 519 — Patterns Are About Relationships

This is important because a design pattern is usually not identifiable from one method alone.

We look at:

🏛️ **which objects exist**  
🔗 **how they relate**  
🎯 **what responsibilities they have**  
💬 **how they communicate**

and:

🧠 **what design problem that structure solves**

So we should not search Midgard for random keywords and try to attach pattern names to them.

---

# ⚠️ Part 520 — Don't Force Patterns Into the Project

There is a common mistake when learning design patterns:

> **“My assignment mentions design patterns, so every class must be some famous pattern.”**

No.

Sometimes:

🐝 `NeighbourCalculator`

is simply a well-focused class.

It does not need to secretly be:

**“Abstract Neighbour Visitor Factory Command.”** 😄

Using pattern terminology is useful only when the structure genuinely corresponds to the idea.

---

# 🌐 Part 521 — The Clearest Pattern: Facade

The strongest pattern-like structure in Midgard is:

🌐 **`HexGrid` as a Facade**

Remember the problem it solves.

Internally, Midgard contains specialized components such as:

🦴 `CoordinateRange`  
🌱 `CoordinateRangeFiller`  
🐝 `NeighbourCalculator`  
🎨 `CoordinateLayer`  
📍 `CoordinatePositioner`  
⬡ `HexagonGeometry`

A library consumer should not necessarily need to coordinate all of these manually.

---

# 🚪 Part 522 — `HexGrid` Provides a Simpler Entrance

Instead, the consumer can interact with:

🌐 **`HexGrid`**

and ask:

⬡ **create a single hexagon**  
🌐 **create a grid**  
🐝 **get neighbours**  
📍 **get a center position**  
📦 **get grid bounds**

and so on.

`HexGrid` then delegates work to the specialized components.

That is very close to the classic purpose of a **Facade**:

> **provide a simpler interface to a more complicated subsystem.**

---

# 🏢 Part 523 — The Building Analogy Returns

Imagine Midgard as a large building.

Inside are departments:

🐝 **Neighbour Department**  
🌱 **Range Department**  
📍 **Positioning Department**  
⬡ **Geometry Department**  
🎨 **Layering Department**

A visitor could theoretically walk into every department themselves.

But instead there is:

🚪 **a reception desk**

The visitor says:

> **“I need a grid.”**

The reception desk coordinates the necessary departments.

That reception desk is:

🌐 **`HexGrid`**

---

# ✨ Part 524 — `createGrid()` Shows the Facade Particularly Well

A library consumer can conceptually request:

> **Create a 3 × 2 Midgard grid with diameter 100.**

They do not need to manually perform:

🦴 **skeleton generation**  
🌱 **fill expansion**  
🔍 **duplicate prevention**  
🎨 **sorting**  
🎨 **z-index assignment**  
📍 **center calculations**  
⬡ **corner calculations**

Those details are hidden behind a higher-level operation.

That is exactly the kind of complexity reduction a façade is meant to provide.

---

# 🔓 Part 525 — A Facade Does Not Have to Hide Everything

This is an important detail.

Having a Facade does **not** necessarily mean:

🔒 **all subsystem classes must become inaccessible**

Midgard currently exposes:

🌐 **the convenient `HexGrid` façade**

while also exporting lower-level components.

That means an advanced consumer can still directly use:

🐝 `NeighbourCalculator`

or:

⬡ `HexagonGeometry`

if needed.

So the design can offer both:

✨ **convenience**

and:

🔧 **flexibility**

---

# 🧠 Part 526 — Facade Versus Encapsulation

Facade and encapsulation are related but different ideas.

### 🌐 Facade

Provides a simpler interface over multiple components.

### 🔒 Encapsulation

Controls what implementation details are exposed.

For example:

`HexGrid` acting as the main entry point is façade-like.

Meanwhile:

🔒 private `createHexagon()`

is an encapsulation decision.

The concepts cooperate, but they are not synonyms.

---

# 🧩 Part 527 — Composition Is Everywhere

Another major design idea in Midgard is:

🧩 **composition**

We have already encountered this in the OOP chapter.

Complex behaviour is created by combining specialized capabilities.

Conceptually:

🌐 **HexGrid**

uses:

🦴 **ranges**  
🌱 **filling**  
🎨 **layering**  
📍 **positioning**  
⬡ **geometry**

Instead of creating a large inheritance hierarchy, Midgard composes behaviour from smaller pieces.

---

# 🆚 Part 528 — “Has-a” Versus “Is-a”

A useful OOP distinction is:

### 🌳 Inheritance

**is-a**

For example:

> **“A dog is an animal.”**

### 🧩 Composition

**has-a / uses-a**

For example:

> **“A car has an engine.”**

Midgard mainly contains:

**uses-a**

relationships.

The filler **uses** neighbour calculation.

`HexGrid` **uses** geometry.

`HexGrid` **uses** positioning.

That fits the problem better than inventing inheritance relationships that do not naturally exist.

---

# 🧬 Part 529 — Composition Over Inheritance

A commonly taught design principle is:

> **Favor composition over inheritance.**

This does not mean:

❌ **inheritance is always bad**

It means we should not build inheritance hierarchies merely to reuse code.

Midgard's specialized responsibilities can be combined without claiming:

> **“CoordinatePositioner is a kind of HexagonGeometry”**

because that statement would make no conceptual sense.

---

# 🔀 Part 530 — What About Strategy?

Now we reach a more subtle pattern.

Midgard has two behaviours depending on:

🧭 **orientation**

For example:

🐝 neighbour calculation can be:

↔️ **x-dominated**

or:

↕️ **y-dominated**

Likewise:

📍 **positioning**

and:

⬡ **geometry**

have orientation-dependent algorithms.

This might remind us of the:

🔀 **Strategy Pattern**

---

# 🧠 Part 531 — What Strategy Means

The Strategy Pattern generally addresses this situation:

> **“I have several interchangeable algorithms for performing the same kind of operation.”**

Instead of placing all algorithms inside one class with repeated conditionals, we can represent each algorithm separately and choose the appropriate strategy.

Conceptually:

🐝 **Neighbour Strategy**

↙️　　　　　　　　　↘️

↔️ **X Strategy**　　↕️ **Y Strategy**

The caller works through a common abstraction.

---

# ⚠️ Part 532 — Midgard Does Not Fully Implement Strategy

This distinction matters.

Currently, `NeighbourCalculator` stores:

🧭 **orientation**

and then chooses between its own:

↔️ **x-dominated method**

and:

↕️ **y-dominated method**

There are not separate objects such as:

`XDominatedNeighbourStrategy`

and:

`YDominatedNeighbourStrategy`

implementing a shared strategy interface.

Therefore it would be misleading to confidently say:

> **“Midgard uses the Strategy Pattern for orientation.”**

---

# 💡 Part 533 — But the Design Problem Is Strategy-Like

What we *can* say is:

> **Orientation introduces alternative algorithms for the same responsibility, which is the kind of problem the Strategy Pattern can address.**

Current Midgard solves it more simply:

🧭 **orientation value**

⬇️

🔀 **conditional dispatch**

⬇️

↔️↕️ **specialized methods**

For only two orientations, that may be entirely reasonable.

---

# ➕ Part 534 — When Strategy Might Become More Attractive

Imagine Midgard later supports:

↔️ **x-dominated**  
↕️ **y-dominated**  
🔺 **another coordinate orientation**  
🌀 **another grid layout**  
✨ **several new geometry modes**

Then many classes might accumulate larger and larger conditional structures:

`if x...`  
`else if y...`  
`else if new...`  
`else if another...`

At that point, separate strategy objects could become more attractive.

---

# 🧩 Part 535 — Strategy Could Move Variation Into Objects

Conceptually, instead of:

🐝 `NeighbourCalculator`

asking:

> **“Which orientation am I?”**

it could receive something like:

🧠 **a neighbour strategy**

Then:

🐝 **calculator**

➡️ asks strategy

➡️ **“calculate these neighbours.”**

The specific algorithm would live in the strategy object.

That could make new algorithms easier to add without modifying the calculator's dispatch logic.

---

# ⚖️ Part 536 — But More Patterns Mean More Complexity

Would that automatically improve Midgard today?

Not necessarily.

We would introduce:

📁 **more files**  
🏛️ **more classes**  
🔗 **more objects**  
🧠 **more abstractions**

For two straightforward alternatives, the current conditional dispatch can be easier to understand.

This illustrates a critical lesson:

> **Do not introduce a pattern simply because you know its name.**

---

# 🏭 Part 537 — Is `createGrid()` a Factory Method?

The name:

**`createGrid()`**

may make someone think:

🏭 **Factory Method Pattern**

because it creates objects.

But merely creating something does not automatically mean the Factory Method design pattern is present.

---

# 🧠 Part 538 — Creation Is Not Automatically a Factory Pattern

Many ordinary methods create objects.

For example:

⬡ `createHexagon()`

constructs and returns a hexagon.

That makes it a:

**creation method**

in ordinary language.

But the formal **Factory Method Pattern** usually involves a more specific object-oriented structure in which subclasses or implementations determine which concrete product is created.

Midgard does not currently have that kind of factory hierarchy.

---

# 🚫 Part 539 — So We Should Avoid Overclaiming

A careful description would be:

❌ **“Midgard uses the Factory Method Pattern because it has `createGrid()`.”**

Better:

✅ **“Midgard contains methods responsible for object creation, but I would not classify them as an implementation of the classic Factory Method Pattern.”**

That distinction shows stronger understanding of design patterns.

---

# 🏗️ Part 540 — Pattern Versus Ordinary Good Design

This gives us an important hierarchy.

### 🧩 Clearly pattern-like

🌐 `HexGrid` → **Facade**

### 💭 Related to a known pattern problem

🧭 orientation alternatives → **Strategy-like problem**

but not currently a full Strategy implementation.

### 🔧 Ordinary design techniques

**private helper methods**  
**delegation**  
**composition**  
**focused classes**  
**creation methods**

Not every good design decision needs a Gang-of-Four pattern name.

---

# 🎯 Part 541 — Recognizing Patterns Is More Important Than Collecting Them

The goal should not be:

🏆 **“My project contains seven design patterns!”**

A stronger goal is:

🧠 **“I understand the problem each pattern solves and can tell whether my design actually has that problem.”**

For Midgard:

🌐 **complicated subsystem + need simple interface**  
➡️ Facade is highly relevant.

🧭 **two alternative algorithms**  
➡️ Strategy is worth understanding, but may currently be unnecessary.

🏭 **object creation**  
➡️ does not by itself justify Factory Method.

---

# 🛠️ Part 542 — Refactoring Toward a Pattern

Patterns are often most useful when they emerge from a real need.

Imagine orientation logic keeps expanding.

At first:

🔀 **a simple `if`**

is perfectly readable.

Later:

🔀🔀🔀🔀

many orientation-dependent branches appear throughout the project.

Now we have evidence of a recurring design problem.

At that point we might refactor toward:

🔀 **Strategy**

This is different from designing an elaborate pattern system before we know whether it is needed.

---

# 🌱 Part 543 — Let Complexity Earn the Pattern

A useful principle is:

> **Let the complexity of the problem justify the complexity of the solution.**

For Midgard today:

🌐 **Facade** gives immediate value because the subsystem genuinely has several collaborating parts.

But creating many strategy interfaces and classes for two simple orientations might provide less value.

Good design is proportional.

---

# 🎓 Part 544 — A Strong Design-Pattern Explanation

If asked:

> **“Which design patterns do you use?”**

a careful answer would be:

> The clearest pattern in Midgard is the Facade pattern. `HexGrid` provides a simpler high-level interface over specialized components for ranges, neighbours, positioning, geometry and layering. The orientation-dependent algorithms resemble the problem addressed by Strategy, but the current implementation uses conditional dispatch rather than separate strategy objects, so I would not claim that Strategy is fully implemented. The project also relies heavily on composition and delegation, although those are general design techniques rather than necessarily named design patterns.

That is precise and defensible.

---

# 🧠 Part 545 — Why This Matters for Your Course

When learning OOP, it is tempting to think the progression is:

**classes**

➡️ **inheritance**

➡️ **design patterns**

➡️ **more classes**

➡️ **even more patterns**

But mature design often moves in the opposite direction:

> **What is the simplest structure that clearly models the problem?**

Patterns are tools available when a recurring design problem justifies them.

They are not decorations.

---

# 🌟 Part 546 — The Midgard Pattern Picture

So the design picture currently looks roughly like this:

🌐 **Facade**

`HexGrid`

⬇️ delegates to

🧩 **composed specialized components**

🐝 **neighbours**  
🦴 **ranges**  
🌱 **filling**  
🎨 **layering**  
📍 **positioning**  
⬡ **geometry**

while:

🧭 **orientation variation**

is handled by:

🔀 **simple conditional dispatch**

rather than a full Strategy structure.

And:

⬡ **object creation**

uses ordinary creation/helper methods rather than a formal Factory Method hierarchy.

---

# 📘 Part 547 — Next: Midgard as an Actual TypeScript Library

We now have only the final stretch left.

Next we'll move from OOP architecture to something very practical:

📦 **What makes Midgard a library rather than an application?**

We'll connect:

🚪 `index.ts`  
📦 **exports**  
🏗️ **building the package**  
🧪 **the separate test/demo application**  
🌐 **the consumer relationship**  
🔒 **why the library should not depend on the demo**

and:

🎓 **why this separation matters specifically for your assignment.**

After that, we'll bring the entire book together into its final understanding of Midgard.
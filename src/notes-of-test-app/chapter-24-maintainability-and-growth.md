## Chapter 24 — Maintainability, Refactoring and Future Growth

### 🌱 Part 777 — Working software is only the beginning

Software has two important lives.

The first is:

> ⚙️ **Does it work now?**

The second is:

> 🔧 **Can it be understood and changed later?**

A program can produce exactly the correct result today and still be difficult to maintain tomorrow.

**Maintainability** is concerned with that second question.

For the Midgard Test App, this matters because the application has already grown from a few demonstrations into a system containing:

🧭 navigation

📚 documentation

⬡ several demos

🔷 SVG rendering

🎨 CSS

🖱️ interaction

📦 a separate library dependency.

As responsibilities grow, structure becomes increasingly important.



---



# 🧠 Part 778 — What is maintainability?

Maintainability is the ease with which software can be:

🔍 understood

🐛 debugged

🔧 modified

➕ extended

🧹 refactored

🧪 tested.

Maintainability is therefore not one specific coding technique.

It emerges from many qualities working together.

Examples include:

🏷️ clear naming

🧩 focused responsibilities

🔒 encapsulation

📦 stable interfaces

🧭 understandable dependency direction

🧪 useful tests

📚 documentation.



---



# ⏳ Part 779 — Code is read many times

A line of code may be written once but read repeatedly.

It may later be read while:

🐛 investigating a bug

➕ adding a feature

🧹 refactoring

🧪 writing a test

📚 explaining the architecture.

This is why readability matters.

The goal is not merely to minimize the number of characters typed.

The goal is to make the programmer's intention understandable.



---



# 🏷️ Part 780 — Names carry architectural information

Consider names such as:

```
DemoArea
Navigation
createTerrainSvg
getDescription
highlightNeighbours
```

`createHexagonId`.

These names communicate responsibilities.

A reader can form expectations before examining implementation details.

For example:

```
highlightNeighbours
```

suggests:

> 🔗 Find or work with neighbouring elements and visually highlight them.

A meaningful name reduces the amount of implementation that must be mentally decoded.



---



# 🆚 Part 781 — Intention-revealing names

Compare conceptually:

❌ `doThing()`

with:

✅ `highlightNeighbours()`.

Or:

❌ `data2`

with:

✅ `homeCoordinate`.

The second versions communicate **meaning**.

This is sometimes called an **intention-revealing name**.

A useful name answers:

> ❓ What role does this thing have in the program?

rather than merely:

> ❓ What technical type is it?



---



# 🧩 Part 782 — File names communicate responsibility too

The project's files also act as documentation.

For example:

```
Header.ts
```

suggests header behaviour.

```
Navigation.ts
```

suggests sidebar navigation.

```
DemoArea.ts
```

suggests the main demonstration/content area.

```
DemoAreaNeighbours.ts
```

suggests a concrete demonstration of neighbours.

The architecture is therefore partly visible from the filesystem itself.

That improves discoverability.



---



# 🧭 Part 783 — Locality makes changes easier

A maintainable design tries to keep related knowledge near each other.

Suppose the neighbour highlight colour needs to change.

Ideally there is a clear place to look.

Suppose a new menu item needs to be added.

Ideally the relevant navigation configuration is easy to locate.

This property is sometimes described as **locality of change**.

> 🔧 A change should affect a small, understandable region whenever possible.



---



# 🌊 Part 784 — Changes can ripple through dependencies

Some changes naturally affect several files.

For example, adding a completely new Demo may require:

🧩 new Demo class

🧭 navigation entry

🏭 DemoArea creation mapping

📝 description.

That is not automatically bad.

The important question is:

> ❓ Are these changes understandable consequences of the feature?

A problematic ripple is one where unrelated internals must change for no clear architectural reason.



---



# 🔗 Part 785 — Coupling influences ripple effects

**Coupling** describes how strongly parts of the system depend on one another.

If component A knows many implementation details about component B, they are more tightly coupled.

Then changing B may force changes in A.

The Test App reduces some coupling through:

🧩 interfaces

📣 callbacks

🏗️ central coordination

📦 public APIs.

The goal is not zero coupling.

Software components must cooperate.

The goal is **appropriate coupling**.



---



# 🤝 Part 786 — Some coupling is necessary

`DemoArea` must know that a Demo can:

**`render()`**.

That dependency is useful.

But `DemoArea` does not need to know:

🌲 how a tree is constructed

🌊 how waves are drawn

🔗 how neighbour highlighting works.

So the relationship is:

📄 DemoArea

depends on:

🧩 Demo contract

rather than every implementation detail.

This is controlled coupling.



---



# 📦 Part 787 — Stable boundaries reduce change propagation

Suppose the internal SVG terrain drawing is completely redesigned.

If:

```
DemoAreaSvgTerrain.render(): HTMLElement
```

still satisfies the same Demo contract, `DemoArea` may require no change.

That is the value of a stable boundary.

Conceptually:

🔧 implementation changes

⬇️

🧩 contract remains stable

⬇️

🛡️ callers remain unaffected.

Encapsulation therefore supports maintainability directly.



---



# 🧹 Part 788 — What is refactoring?

**Refactoring** means improving the internal structure of code without intentionally changing its external behaviour.

Examples include:

🏷️ renaming something more clearly

🧩 extracting a helper method

📦 moving responsibility to a better class

🔄 simplifying repeated logic

🧹 removing obsolete code.

The key idea is:

> **Structure changes; intended behaviour remains.**



---



# 🆚 Part 789 — Refactoring is not the same as adding a feature

These are different activities.

### ➕ Feature change

Before:

no neighbour highlighting.

After:

neighbour highlighting exists.

Behaviour changed intentionally.

### 🧹 Refactoring

Before:

neighbour highlighting works.

After:

neighbour highlighting still works, but the implementation is cleaner.

Separating these concepts makes development history easier to reason about.



---



# 🧪 Part 790 — Tests create refactoring confidence

Refactoring carries risk.

A programmer may intend:

> “Only structure is changing.”

but accidentally alter behaviour.

Tests provide feedback:

🧹 refactor

⬇️

🤖 run tests

⬇️

🖥️ inspect integration

⬇️

✅ behaviour still appears correct.

This is one reason maintainability and testing are deeply connected.



---



# 🔬 Part 791 — Small refactorings are easier to reason about

A huge rewrite changes many things simultaneously.

If something breaks, identifying the cause becomes difficult.

Smaller refactorings provide a clearer cycle:

1️⃣ make one structural improvement

2️⃣ check behaviour

3️⃣ commit

4️⃣ continue.

This also produces a more understandable Git history.



---



# 📜 Part 792 — Version control supports maintainability

Git does more than store backups.

A good commit history can answer:

> What changed?

> Why did the architecture evolve?

> When was this feature introduced?

> Which change caused a regression?

Small meaningful commits therefore become part of the project's technical documentation.



---



# 🏷️ Part 793 — Commit messages describe intention

A message such as:

**Add interactive neighbours demo**

communicates more than:

**changes**

or:

**update**.

A good commit message identifies the conceptual change.

This helps future readers understand development history without first examining every changed line.



---



# 🧠 Part 794 — Refactoring should respond to knowledge

The Test App contains some deliberate duplication.

For example, the X-Dominated and Y-Dominated grid demos are structurally very similar.

It would be possible to abstract them immediately.

But abstraction should answer:

> 🧠 What common concept has actually been discovered?

rather than:

> 🔢 Which lines happen to look similar?

This distinction is important.



---



# 🧩 Part 795 — Duplication can reveal a future abstraction

Repeated code can be a signal.

If several demos repeatedly perform:

📍 collect all points

📐 calculate bounds

🔷 create SVG

🏷️ set viewBox

then a shared rendering helper might eventually become useful.

The repetition tells the developer:

> 🔍 There may be a common concept here.

But it does not automatically tell:

> 🚨 Extract it immediately.



---



# ⚖️ Part 796 — The cost of abstraction

Every abstraction has a cost.

A new shared helper introduces:

📄 another location to inspect

🔗 another dependency

🧠 another concept to learn

⚙️ configuration for differences.

If the abstraction removes five duplicated lines but requires a complicated API with many options, maintainability may become worse.

So abstraction should reduce total complexity, not merely reduce line count.



---



# 🧠 Part 797 — DRY means more than avoiding repeated text

DRY means:

**Don't Repeat Yourself**.

Its deeper concern is duplicated **knowledge**.

For example, if both:

📦 Midgard

and:

🖥️ Test App

contained independent algorithms defining which coordinates are neighbours, that would be dangerous duplication.

Now there are two sources of truth.

Instead:

📦 Midgard defines neighbour rules once

and:

🖥️ Test App asks Midgard.

That is a strong application of DRY.



---



# 📝 Part 798 — Similar-looking code is not always duplicated knowledge

The X and Y grid demos contain similar rendering logic.

But they intentionally demonstrate two different public configurations.

Their similarity may make comparison easier.

So the question is not:

> “Are some lines similar?”

It is:

> “Would these pieces always need to change together for the same reason?”

If yes, abstraction becomes more attractive.

If not, keeping them separate may preserve clarity.



---



# 🌱 Part 799 — YAGNI protects against speculative complexity

YAGNI means:

**You Aren't Gonna Need It.**

It warns against building features and abstractions purely because they might someday be useful.

For example, the Test App currently does not require:

🏢 a huge plugin architecture

🌐 distributed state management

🚌 a global event bus

🏭 multiple layers of factories.

Adding them “for the future” would create present complexity for hypothetical benefit.



---



# ⚖️ Part 800 — DRY and YAGNI can pull in different directions

DRY may suggest:

> 🔄 Extract common behaviour.

YAGNI may suggest:

> ✋ Do not generalize prematurely.

Both can be correct.

The engineering task is balancing them.

A useful approach is:

1️⃣ notice repetition

2️⃣ understand why it exists

3️⃣ wait for the common concept to become clear

4️⃣ extract when the abstraction genuinely simplifies future work.

This is more thoughtful than mechanically following slogans.



---



# 📏 Part 801 — Long files are signals, not automatic failures

`DemoAreaSvgTerrain.ts` is much larger than `DemoAreaHome.ts`.

That does not automatically make it bad.

The terrain demo genuinely contains many graphical operations.

But size can prompt useful questions:

> Are several responsibilities mixed together?

> Are there meaningful concepts that deserve extraction?

> Is the file still easy to navigate?

A metric should start investigation, not replace judgment.



---



# 🔬 Part 802 — Long methods deserve the same treatment

A long method may be difficult because it:

❌ performs several unrelated tasks

❌ mixes abstraction levels

❌ contains repeated logic.

But splitting every five lines into a new method can also make code harder to follow.

The useful question remains:

> 🧠 **Does this method express one coherent operation at a sensible level of abstraction?**



---



# 🪜 Part 803 — Abstraction levels improve readability

Consider a terrain renderer.

At a high level, it is easier to understand:

🌱 draw grass

🌊 draw water

🌲 draw tree

🏰 draw tower

than to encounter hundreds of SVG attribute operations without conceptual grouping.

Helper methods let the code be read at different zoom levels.

First:

🗺️ understand the scene.

Then:

🔍 open `drawTower()` when tower details matter.

This is a major readability benefit.



---



# 🗺️ Part 804 — Code should provide a map

Well-structured code behaves somewhat like a map.

At the highest level:

> What major things happen?

Then the reader can zoom into:

> How does this particular operation work?

This is why meaningful methods and classes matter.

They provide landmarks.

Without those landmarks, understanding requires reading every low-level instruction before seeing the larger idea.



---



# 🔒 Part 805 — `private` reduces the public surface

When an implementation helper is marked:

```
private
```

it communicates:

> 🔒 This operation belongs to the internal implementation of this class.

That is useful because not every method should become part of the conceptual API.

A smaller public surface means:

🧠 fewer things consumers must understand

🔧 fewer contracts that must remain stable

🛡️ more freedom to refactor internals.



---



# 📦 Part 806 — Public APIs create maintenance obligations

Once other code depends on a public method, changing it can affect consumers.

So public API design should be deliberate.

This is particularly important for:

📦 `midgard-hex-grid`.

A public method is effectively a promise:

> Consumers may build code around this behaviour.

Therefore:

➕ adding public API

should be easier than:

🗑️ removing or changing established public API.



---



# 🧩 Part 807 — The Test App helps expose API friction

Because the Test App is a real consumer, it reveals how Midgard feels from outside.

If a simple task requires:

😵 many low-level calls

🔓 access to internals

🔄 repeated conversions

then the library's public API may deserve reconsideration.

Conversely, if demos can say:

```
createGrid(...)
```

and receive useful geometry, the facade is doing valuable work.



---



# 🔄 Part 808 — Change frequency can reveal boundaries

Imagine terrain rendering changes frequently while coordinate mathematics remains stable.

That suggests they belong in different modules—which they already do.

A useful architectural principle is:

> 🧩 **Separate things that change for different reasons.**

This is closely related to the Single Responsibility Principle.

It reduces the chance that changing visual design accidentally destabilizes mathematical logic.



---



# 📦 Part 809 — Stable core, flexible edges

Midgard can be viewed as a relatively stable core:

📍 coordinates

📐 geometry

🔗 neighbours.

The Test App is a more flexible outer layer:

🎨 presentation

🌲 terrain experiments

🖱️ interactions

📚 documentation.

Conceptually:

　　　🎨 flexible UI

　　🖱️ interaction

　🎮 application meaning

📦 **stable domain foundation**

This is a useful architectural shape.



---



# 🛠️ Part 810 — Tooling should support change, not obstruct it

TypeScript, Vite, Vitest and Git all contribute to maintainability in different ways.

🔷 **TypeScript**

detects structural mistakes.

⚡ **Vite**

provides rapid development feedback.

🤖 **Vitest**

checks behaviour.

📜 **Git**

records change history.

These tools do not create good architecture automatically.

But they make disciplined change safer and easier.



---



# 🧠 Part 811 — TypeScript improves refactoring feedback

Suppose a method or type changes.

Because TypeScript understands many relationships, it can identify places that no longer satisfy the new contract.

Conceptually:

🔧 change API

⬇️

🧠 compiler/type checker follows usages

⬇️

🚨 incompatible code revealed.

This is particularly useful in a modular application where a change can affect several files.



---



# 📚 Part 812 — Documentation reduces rediscovery

Without documentation, future maintainers may need to rediscover:

❓ why coordinates have unusual parity rules

❓ why SVG IDs are generated in the app rather than Midgard

❓ why `createSingleHexagon()` exists separately from a filled 1×1 grid

❓ how the demos relate to the library.

Documentation preserves reasoning that code alone may not communicate completely.

That reduces future cognitive work.



---



# ⚠️ Part 813 — Documentation must describe current reality

Documentation creates value only while it remains sufficiently aligned with the software.

If code changes:

🔧

but documentation does not:

📚❌

then documentation can actively mislead.

So maintenance includes:

⚙️ code

🧪 tests

📚 documentation

as related project artifacts.



---



# 🌳 Part 814 — Growth changes architectural pressure

A seven-demo application can comfortably use explicit mappings.

A seventy-demo application might make those mappings cumbersome.

That does not mean the current design is wrong.

It means:

> 🌱 **Architectural needs change as scale changes.**

A good architecture solves the current problem while leaving reasonable paths for future change.



---



# 🧭 Part 815 — When explicit mappings become expensive

Currently, adding a Demo may require updating several explicit locations.

At small scale, this has advantages:

👁️ easy to see

🧠 easy to understand

🐛 easy to debug.

If the list grows dramatically, a future refactoring might introduce:

📚 a central demo registry.

But such a registry should solve actual maintenance pressure rather than hypothetical scale.



---



# 🗂️ Part 816 — A registry as a possible future abstraction

Conceptually, a future registry could associate:

🆔 ID

🏷️ label

📝 description

🏭 Demo creator.

Then several current mappings could derive from one data structure.

That might reduce duplicated feature metadata.

But it would also introduce a new architectural concept.

So the tradeoff would need to be evaluated when the need appears.



---



# 🚫 Part 817 — Future possibility is not a present requirement

Recognizing a possible refactoring does not mean it should be performed now.

This distinction is valuable:

💡 **possible improvement**

is not the same as:

🚨 **current defect**.

Mature software design includes the ability to notice future options without immediately implementing all of them.



---



# 🧠 Part 818 — Technical debt is contextual

**Technical debt** is often used too casually.

Simple explicit code is not automatically debt because a more abstract version could be imagined.

A design becomes problematic when it creates meaningful future cost:

🐛 frequent errors

🐌 slow changes

🧠 excessive difficulty understanding

🔄 repeated inconsistent updates.

Technical debt should therefore be discussed in terms of concrete maintenance consequences.



---



# 🧹 Part 819 — Refactor when the pressure is visible

Good moments for refactoring include when:

🔄 the same change repeatedly touches many places

🐛 similar bugs keep appearing

🧩 a clear shared concept has emerged

📏 methods become difficult to understand

🔗 coupling blocks a new feature

🧪 code becomes difficult to test.

Then the refactoring solves an observed problem.



---



# 🚦 Part 820 — Do not mix unlimited cleanup with every feature

While adding a feature, it is tempting to improve everything encountered.

That can create a huge change containing:

➕ new behaviour

🧹 unrelated refactoring

🏷️ renaming

📁 file movement

🎨 styling changes.

Such a change is harder to review and debug.

Smaller focused changes make cause and effect clearer.



---



# 📜 Part 821 — Git history benefits from focused changes

A focused commit might say:

**Add interactive neighbours demo**

Another might later say:

**Extract shared SVG bounds helper**

Each commit tells a clear story.

If both are mixed with twenty unrelated changes, history becomes less useful.

Maintainability therefore extends beyond code structure into the structure of development work itself.



---



# 🔍 Part 822 — Maintainability can be evaluated with questions

Useful questions include:

### 🧠 Understanding

Can the responsibility of each file be explained?

### 🔗 Dependencies

Is it clear which direction dependencies point?

### 🔧 Change

Can a feature be modified without unrelated changes?

### 🧪 Verification

Can important behaviour be checked after modification?

### 📦 Boundaries

Are public and private responsibilities clear?

### 📚 Knowledge

Are important non-obvious decisions documented?

These questions are often more useful than a single numeric metric.



---



# 🌱 Part 823 — Good architecture leaves room to evolve

The Test App does not need to predict every future requirement.

Instead it needs enough structure that future requirements can be handled deliberately.

The current separation already provides several useful extension points:

🧩 new Demo implementation

🧭 new menu item

📄 new Markdown chapter

🎨 new CSS

🌲 richer SVG rendering

🎮 future application logic.

This is flexibility through clear boundaries rather than through speculative frameworks.



---



# 🧠 Part 824 — Maintainability is largely about managing knowledge

Many software problems are ultimately knowledge problems.

Who knows:

📍 coordinate rules?

→ Midgard.

Who knows:

🧭 active navigation?

→ Navigation.

Who knows:

🏗️ how major UI pieces coordinate?

→ App.

Who knows:

🌲 how terrain is drawn?

→ terrain Demo.

Who knows:

🎨 how classes look?

→ CSS.

When knowledge has a clear home, changes are easier to reason about.



---



# 🎯 Chapter 24 — The central idea

Maintainable software is not software with:

❌ the fewest possible lines

❌ the most classes

❌ the most patterns

❌ zero duplication of text

❌ the most sophisticated abstractions.

Maintainable software makes its important knowledge and responsibilities understandable.

The Midgard Test App supports this through:

🏷️ meaningful names

🧩 focused components

🔒 encapsulation

📦 public boundaries

📣 controlled communication

🧭 clear dependency direction

🧪 several forms of verification

📚 documentation

📜 focused development history.

Refactoring should then be used deliberately:

🧠 identify real maintenance pressure

⬇️

🧩 understand the underlying design problem

⬇️

🧹 improve structure

⬇️

🧪 verify preserved behaviour

⬇️

📜 record the change clearly.

The most important principle is:

> 🧠 **Architecture should make change understandable.**

Good design does not prevent software from changing.

It gives each change a sensible place to happen, limits unnecessary ripple effects, and makes it possible to verify that the rest of the system still behaves as intended.
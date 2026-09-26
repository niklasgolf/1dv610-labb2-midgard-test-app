# 📘 Part IV — Why Midgard Is Designed This Way

## Part 271 — From “What Does the Code Do?” to “Why Is It Good Design?”

We now understand **what happens** inside Midgard.

The next question is more important from a software-quality perspective:

**Why split the solution into all these different classes?**

Why not simply put everything inside `HexGrid`?

To answer that, we need several closely related concepts:

🎯 **Responsibility**  
🧩 **Cohesion**  
🔗 **Coupling**  
📦 **Abstraction**  
🛡️ **Encapsulation**  
🏛️ **Façade**

These terms can sound theoretical, but your Midgard library gives us concrete examples of all of them.

---

# 🎯 Part 272 — Responsibility

A class has a **responsibility** when there is some particular job that it is responsible for performing.

Look at Midgard:

### 🔢 `CoordinateValidator`

**Responsibility:**

**Determine whether a coordinate follows Midgard's rules.**

### 🐝 `NeighbourCalculator`

**Responsibility:**

**Calculate neighbouring coordinates.**

### 🦴 `CoordinateRange`

**Responsibility:**

**Describe and create the skeleton and decide whether filling is required.**

### 🌱 `CoordinateRangeFiller`

**Responsibility:**

**Expand a skeleton with surrounding coordinates.**

### 📍 `CoordinatePositioner`

**Responsibility:**

**Convert logical coordinates into geometric center positions.**

### ⬡ `HexagonGeometry`

**Responsibility:**

**Calculate hexagon geometry and geometric bounds.**

### 🎨 `CoordinateLayer`

**Responsibility:**

**Sort coordinates and assign row-based z-indexes.**

### 🌐 `HexGrid`

**Responsibility:**

**Provide the main API and coordinate the lower-level components.**

---

# 🧠 Part 273 — “Do One Thing”

This connects directly to an important Clean Code idea:

> **Functions and classes should have focused responsibilities.**

“Do one thing” does not necessarily mean:

**a method must contain only one statement.**

It means the operations inside the method should belong to **one coherent purpose**.

For example, calculating the six corners of a hexagon requires several mathematical operations.

That is still one coherent task:

⬡ **calculate hexagon geometry**

But if that same method also:

🔢 validated coordinates,  
🌱 generated the grid,  
🎨 assigned z-indexes,

and:

🖥️ manipulated HTML,

then it would be doing several conceptually different jobs.

---

# 🧩 Part 274 — Cohesion

This brings us to:

**cohesion**

A class has **high cohesion** when the things inside it strongly belong together.

Consider:

📍 **CoordinatePositioner**

Its methods revolve around one subject:

**positioning coordinates geometrically**

That is cohesive.

Likewise:

🐝 **NeighbourCalculator**

contains behaviour concerned with:

**neighbour relationships**

Again, highly related functionality.

---

# 🗄️ A Low-Cohesion Alternative

Imagine a class called:

**`MidgardUtilities`**

containing methods for:

🐝 finding neighbours  
📍 calculating centers  
🎨 assigning z-indexes  
⬡ calculating corners  
🛡️ validating coordinates  
📦 calculating bounds

It might technically work.

But why do those methods belong in one class?

The answer would mostly be:

> **“Because they are all things Midgard needs.”**

That is a very broad reason.

Splitting them according to their domain responsibilities gives the project stronger cohesion.

---

# 🔗 Part 275 — Coupling

Now we need the other side of the picture:

**coupling**

Coupling describes how much different parts of a program depend on one another.

Some coupling is unavoidable.

For example:

🌱 `CoordinateRangeFiller`

needs neighbour calculations.

Therefore it collaborates with:

🐝 `NeighbourCalculator`

That is a dependency.

---

# ⚖️ Part 276 — Coupling Is Not Automatically Bad

It would be a mistake to think:

> **“Good software has no coupling.”**

If objects never interacted, they could not build anything interesting together.

The goal is generally to keep dependencies:

🎯 **understandable**  
🔍 **limited**  
🧩 **purposeful**

In Midgard, the relationship:

🌱 **filler** → 🐝 **neighbour calculator**

makes sense because the filler genuinely needs to know the neighbours of skeleton coordinates.

---

# 💥 Part 277 — Imagine Everything Depending on Everything

A much harder system would look like:

🐝 neighbour calculator modifies geometry  
⬡ geometry modifies coordinate ranges  
🦴 coordinate range controls rendering  
🎨 layering performs validation  
📍 positioner generates skeletons

Now responsibilities are tangled.

Changing one area could unexpectedly affect several unrelated areas.

Midgard instead tries to make the relationships directional and understandable.

---

# 📦 Part 278 — Abstraction

Now consider the word:

**abstraction**

Abstraction means we can work with an idea at a useful level without constantly thinking about all the lower-level details underneath it.

When a programmer calls:

`createGrid()`

they can think:

🌐 **“Create my grid.”**

They do not have to think simultaneously about:

- the √3 formulas,
- duplicate detection,
- neighbour offsets,
- sorting,
- z-index increments,
- six-corner geometry,
- and skeleton construction.

Those details still exist.

They have simply been placed **behind a more useful abstraction**.

---

# 🚗 Part 279 — A Simple Analogy

When driving a car, you press:

🚗 **the accelerator**

You do not manually control:

- fuel injection,
- air mixture,
- ignition timing,
- transmission calculations,
- and every mechanical movement inside the engine.

The simpler control is an abstraction over a more complicated mechanism.

Similarly:

🌐 **`createGrid()`**

is a relatively simple operation built on top of many smaller mechanisms.

---

# 🛡️ Part 280 — Encapsulation

Abstraction is closely related to another idea:

**encapsulation**

Encapsulation is about keeping implementation details contained behind appropriate interfaces.

Your library user should care primarily about:

> **What can I ask this object to do?**

rather than:

> **Exactly how does it accomplish every internal step?**

For example, someone using `createGrid()` does not need to manually reproduce its internal `createHexagon` process.

That implementation detail can remain inside `HexGrid`.

---

# 🔒 Part 281 — The Private `createHexagon()` Is a Good Example

Inside `HexGrid`, the helper:

`createHexagon()`

is private.

Why?

Because it exists to support the internal implementation of the class.

The library user does not need another public operation saying:

> “Call this particular internal helper in exactly the way `HexGrid` expects.”

Instead the user gets meaningful public operations such as:

⬡ `createSingleHexagon()`  
🌐 `createGrid()`

The private helper supports those operations internally.

That is encapsulation in a very concrete form.

---

# 🏛️ Part 282 — The Façade Pattern

Now we return to:

🌐 **`HexGrid`**

We have repeatedly called it a **façade**.

A façade provides a simpler interface in front of a more complicated subsystem.

Behind `HexGrid` are several specialized components:

🐝 **neighbour calculation**  
🦴 **range construction**  
🌱 **filling**  
🎨 **layering**  
📍 **positioning**  
⬡ **geometry**

But the library user can begin with one central object:

🌐 **HexGrid**

That reduces the amount of architecture they need to understand before they can do something useful.

---

# 🚪 Part 283 — Think of the Façade as the Front Door

Imagine Midgard as a building.

Inside are specialist departments:

🐝 **neighbour department**  
🦴 **range department**  
📍 **positioning department**  
⬡ **geometry department**  
🎨 **layering department**

A visitor should not necessarily need to walk directly into every department.

Instead there is a:

🚪 **front entrance**

That entrance is:

🌐 **HexGrid**

The specialist departments still exist.

The façade simply provides a convenient route into the system.

---

# ✨ Part 284 — But the Lower-Level API Is Still Available

Your library does something interesting.

It provides convenient high-level methods such as:

⬡ `createSingleHexagon()`  
🌐 `createGrid()`

but it also exposes useful lower-level capabilities.

A programmer can still ask for:

🐝 **neighbours**  
📍 **center positions**  
🌱 **coordinate ranges**  
📦 **bounds**

and so forth.

So Midgard is not saying:

> **“You may only use the façade.”**

Instead it provides different abstraction levels for different needs.

---

# 🎯 Part 285 — This Relates Directly to Public API Design

For a reusable library, the public API matters enormously.

The question is not merely:

> **“Does the code work?”**

It is also:

> **“What should another programmer have to understand in order to use it?”**

For the common case:

🌐 **create a grid**

the answer should ideally be:

**not very much.**

That is why:

`new HexGrid(...)`

followed by:

`createGrid(...)`

is valuable.

The complexity remains inside the library.

---

# 🧪 Part 286 — Testing Supports This Architecture

Our test suite reinforces these boundaries.

We can test:

🐝 **neighbour calculation independently**  
📍 **positioning independently**  
⬡ **geometry independently**

and then separately test:

🌐 **HexGrid**

If everything lived in one giant class and one giant method, testing individual concepts would become much more difficult.

---

# 🔧 Part 287 — This Also Helps Refactoring

Suppose later we discover a better way to detect duplicate coordinates.

Ideally we should be able to change:

🌱 **CoordinateRangeFiller**

without rewriting:

📍 **positioning**  
⬡ **geometry**  
🎨 **layering**

because duplicate detection belongs to the filling responsibility.

That is one of the practical benefits of separating responsibilities.

---

# 🧠 Part 288 — “Reason to Change”

Another useful way of thinking about responsibility is:

> **What kind of change would cause this class to change?**

For example:

**“If Midgard changes its neighbour rules…”**

🐝 `NeighbourCalculator` is an obvious place to inspect.

**“If we change how z-index works…”**

🎨 `CoordinateLayer` is the obvious place.

**“If we change geometric corner calculations…”**

⬡ `HexagonGeometry` is the obvious place.

That is much easier than asking:

> **“Where somewhere inside the giant Midgard class is that logic?”**

---

# 🌳 Part 289 — The Architecture as a Set of Responsibilities

We can summarize the design like this:

**MIDGARD**

├── 🔢 coordinate rules  
├── 🐝 neighbour relationships  
├── 🦴 skeleton construction  
├── 🌱 range expansion  
├── 🎨 rendering order  
├── 📍 geometric positioning  
├── ⬡ hexagon geometry  
└── 🌐 public coordination

Each branch has a recognizable purpose.

That is a much stronger mental model than:

> **“There are ten TypeScript files.”**

The files matter less than the responsibilities they represent.

---

# 🎓 Part 290 — A Strong Oral Explanation

If your teacher asks:

> **“Why didn't you just put everything in `HexGrid`?”**

you could explain:

> I wanted the classes to have focused responsibilities. For example, neighbour calculation, coordinate positioning, geometry and layering are different concerns, so they are implemented separately. `HexGrid` then acts as a façade that coordinates those components and provides a simpler public API. This also makes the individual behaviours easier to test and change independently.

That answer connects the actual code to software-design principles rather than merely describing filenames.

---

# 🔬 Part 291 — But We Should Not Pretend the Design Is Perfect

Good software-quality reflection is not:

> **“Everything I wrote is perfect.”**

A more interesting question is:

> **Where are the trade-offs?**

For example, having several small classes improves separation of responsibilities, but it also creates:

📁 **more files**  
🔗 **more relationships between objects**  
🧠 **more concepts for a maintainer to learn**

Likewise, exposing both high-level and lower-level APIs gives flexibility, but it also makes the public API larger.

Software design is often about balancing these competing qualities.

---

# ⚖️ Part 292 — Separation Versus Simplicity

Imagine the two extremes.

### 🧱 Extreme A — Everything in one class

**Advantages:**

fewer files and fewer class names.

**Disadvantages:**

many unrelated responsibilities become mixed together.

### 🧩 Extreme B — Every tiny operation gets its own class

**Advantages:**

extreme separation.

**Disadvantages:**

the architecture can become fragmented and unnecessarily difficult to navigate.

Good design lies somewhere between those extremes.

The question is:

> **Does each separation represent a meaningful concept?**

In Midgard, concepts such as neighbours, positioning, geometry and layering have reasonably clear identities of their own.

---

# 💎 Part 293 — The Central Quality Idea

The architecture can therefore be summarized with a simple principle:

> **Keep different responsibilities separate, but make them easy to combine.**

That is exactly what we see:

🔧 **specialized components**

➕

🌐 **one convenient façade**

➕

🧪 **focused tests**

=

📦 **a reusable library whose internal structure can still be understood.**

---

# 📘 Part IV — Clean Code in Midgard

## Part 294 — Looking at the Code Through a Different Lens

Until now, we have mainly asked:

**Does the design make sense?**

Now we change perspective and ask:

🧹 **Is the code itself easy to understand, maintain and change?**

This brings us directly to ideas from Robert C. Martin's **Clean Code**.

One of the most useful principles for Midgard is:

🎯 **Functions should do one thing.**

But that sentence is easy to misunderstand.

---

# 🎯 Part 295 — What Does “Do One Thing” Actually Mean?

It does **not** mean:

> **“A method may contain only one operation.”**

Consider `getBounds()`.

To calculate bounds it must:

🔍 **inspect points**  
⬅️ **find minimum x**  
➡️ **find maximum x**  
⬆️ **find minimum y**  
⬇️ **find maximum y**  
📏 **calculate width**  
📏 **calculate height**

Those are several operations.

Yet they all contribute to one coherent purpose:

📦 **Calculate the bounds of a collection of points.**

So the method can still reasonably be described as doing **one thing**.

---

# 🧠 Part 296 — The Better Question

Instead of literally counting statements, ask:

> **Can I describe what this method does with one short sentence?**

For example:

🐝 **`getNeighbours()`**

> “Returns the neighbours appropriate for this orientation.”

Good.

🦴 **`getSkeleton()`**

> “Creates the skeleton coordinates for this range.”

Good.

🎨 **`sortCoordinates()`**

> “Returns the coordinates sorted by y and then x.”

Good.

📍 **`getCenterPosition()`**

> “Calculates the center position appropriate for this orientation.”

Again, one clear purpose.

---

# 🚨 Part 297 — What Would a Method Doing Too Much Look Like?

Imagine a method called:

`createGridAndRenderIt()`

that:

🦴 creates a skeleton  
🌱 fills neighbours  
🔀 sorts coordinates  
🎨 assigns z-indexes  
📍 calculates centers  
⬡ calculates corners  
🖼️ creates SVG elements  
🎨 assigns CSS  
🖱️ installs click handlers  
💾 stores something in IndexedDB

Now it becomes difficult to describe the method as doing one thing.

It crosses several abstraction and responsibility boundaries.

That would be a much stronger candidate for decomposition.

---

# 🏷️ Part 298 — Intention-Revealing Names

Another major Clean Code idea is that names should communicate intention.

Compare:

`calc()`

with:

`getCenterPosition()`

The second name immediately tells us much more.

Likewise:

`CoordinateRangeFiller`

is considerably more informative than something vague such as:

`GridHelper`

The name tells us:

🌱 **this object fills a coordinate range.**

---

# 🔢 Part 299 — Your Domain Vocabulary Appears in the Code

Midgard has developed its own vocabulary:

**Coordinate**  
**Neighbour**  
**Skeleton**  
**Fill Around**  
**Orientation**  
**Layer**  
**Hexagon**  
**Bounds**

Those concepts appear in class, method and type names.

That is valuable because the programming vocabulary starts matching the conceptual vocabulary of the problem.

Instead of translating mentally between:

> “ThingProcessor2”

and:

> “the class that adds surrounding coordinates”

we can simply read:

🌱 **CoordinateRangeFiller**

---

# 🧩 Part 300 — Small Methods Can Delegate

Look at the general orientation-aware methods we have repeatedly encountered.

For example, conceptually:

🧭 `getNeighbours()`

asks:

**Which orientation am I using?**

Then it delegates to:

↔️ **x-dominated neighbour calculation**

or:

↕️ **y-dominated neighbour calculation**

The general method does not need to contain all the mathematics itself.

That keeps its purpose clear:

🎯 **choose the correct neighbour calculation**

---

# 🔄 Part 301 — The Same Pattern Appears Elsewhere

We saw the same structure with:

📍 `getCenterPosition()`

and:

⬡ `getHexagonPoints()`

Conceptually:

🧭 **general method**

⬇️

**checks orientation**

↙️　　　　　　↘️

↔️ **x method**　　↕️ **y method**

This gives the orientation-specific mathematics its own clearly named location.

---

# 🪜 Part 302 — Levels of Abstraction

Another useful Clean Code idea is:

> **Try not to mix wildly different levels of abstraction inside the same method.**

What does that mean?

Consider these two statements:

🌐 **“Create a grid.”**

and:

📐 **“Divide the width by √3 and multiply this coordinate component by a step.”**

The first is very high-level.

The second is low-level mathematical detail.

Both are necessary somewhere.

But putting every low-level formula directly inside the high-level `createGrid()` method would make that method much harder to read.

---

# 🌐 Part 303 — `createGrid()` Can Speak at a Higher Level

Conceptually, `createGrid()` can think in terms such as:

🎨 **obtain layered coordinates**  
⬡ **create a hexagon for each coordinate**  
✨ **return layered hexagons**

It does not need to explain the √3 geometry itself.

That belongs elsewhere.

This allows `createGrid()` to remain closer to the abstraction level suggested by its name:

🌐 **create a grid**

---

# 🔬 Part 304 — Lower-Level Methods Handle Lower-Level Details

Then:

📍 **CoordinatePositioner**

can contain the spacing mathematics.

And:

⬡ **HexagonGeometry**

can contain the corner mathematics.

So the architecture forms something like:

### 🌐 High level

**Create a grid.**

⬇️

### 🧩 Middle level

**Generate ranges, layers and hexagons.**

⬇️

### 📐 Lower level

**Calculate exact coordinates, distances and points.**

That separation helps a reader move through the code without having to understand everything simultaneously.

---

# 📏 Part 305 — Small Is Useful, but Small Is Not the Goal by Itself

Clean Code strongly values small functions.

But it would be possible to take this too far.

Imagine splitting:

`getBounds()`

into dozens of tiny functions:

- “Check one x”
- “Compare one minimum”
- “Subtract two numbers”
- “Return one property”

The code might technically contain extremely small methods, but understanding the overall operation could become harder.

So the deeper goal is not:

📏 **make everything as short as physically possible**

It is:

🧠 **make each unit easy to understand and give it a coherent purpose.**

---

# 🔀 Part 306 — Control Statements Reveal Decisions

Your assignment also cares about control statements.

These include things such as:

🔀 `if`  
🔁 `for`

and sorting callbacks containing decision logic.

Control statements matter because they show where the program must:

**make decisions**

or:

**repeat work**

For example, `CoordinateValidator` asks:

❓ **Is x an integer?**  
❓ **Is y an integer?**  
❓ **Is either coordinate negative?**  
❓ **Do x and y have matching parity?**

Those decisions represent actual domain rules.

---

# 🦴 Part 307 — Loops Can Express the Domain Clearly

Consider `getSkeleton()`.

A skeleton has:

↕️ **several rows**

and within each row:

↔️ **several columns**

So nested loops are a natural representation:

🔁 **for each row**  
　🔁 **for each column**  
　　🔷 **create coordinate**

The existence of two loops is not automatically a code smell.

They correspond directly to the two-dimensional structure being generated.

---

# 🌱 Part 308 — Conditionals Can Also Express Business Rules

Consider:

`shouldFillAround()`

Its decisions are not accidental programming complexity.

They represent an actual Midgard rule:

⬡ **1 × 1 → caller may choose**  
🌐 **larger skeleton → always fill**

That conditional structure is therefore expressing the domain.

This distinction matters.

Not every `if` is evidence of bad code.

Sometimes the `if` **is the rule being modeled**.

---

# 🔍 Part 309 — Duplicate Detection Has a Clear Purpose

Inside the filler, Midgard checks:

**Does this coordinate already exist?**

If yes:

🚫 **don't add it again**

If no:

➕ **add it**

Again, this is control flow.

But it corresponds to a clear invariant:

🌐 **A completed coordinate range should contain unique coordinates.**

The code has a reason for the branch.

---

# 🧠 Part 310 — Complexity Is Not the Same as Number of Lines

A 30-line method can sometimes be easier to understand than a 10-line method full of:

- nested conditions,
- clever expressions,
- hidden side effects,
- and vague names.

So when reviewing your Midgard methods, useful questions are:

**Can I explain its purpose?**  
**Are the names clear?**  
**Do its branches represent understandable rules?**  
**Does it stay at a reasonably consistent abstraction level?**  
**Does it unexpectedly modify things outside itself?**

Those questions tell us more than simply counting lines.

---

# 🛡️ Part 311 — Side Effects and Predictability

Remember our test for:

🎨 `CoordinateLayer.sortCoordinates()`

The test deliberately verifies that sorting does **not** modify the original array.

That relates strongly to clean-code reasoning.

A method called:

`sortCoordinates()`

returning a sorted result is easier to reason about if it does not secretly alter data owned elsewhere.

The test protects that predictability.

---

# ✨ Part 312 — A Method's Contract Matters

We can think of every public method as having a small contract.

For example:

🐝 **`getNeighbours(coordinate)`**

**Input:**  
one coordinate

**Promise:**  
return its six neighbours according to orientation.

Or:

📦 **`getBounds(points)`**

**Input:**  
geometric points

**Promise:**  
return their enclosing rectangle.

Clean code tries to make these contracts understandable through:

🏷️ **names**  
🔢 **types**  
🧩 **focused responsibilities**  
🧪 **tests**

---

# 🔷 Part 313 — TypeScript Helps Communicate Intent

Types are also part of readability.

Instead of passing anonymous numbers everywhere, Midgard defines concepts such as:

**Coordinate**  
**Point**  
**Bounds**  
**Hexagon**  
**LayeredCoordinate**  
**LayeredHexagon**

These types tell the reader what the data **means**.

For example:

**Coordinate**

and:

**Point**

both contain x and y.

But conceptually they are very different.

One belongs to:

🔢 **logical Midgard space**

and the other to:

📐 **geometric space**.

---

# 🎨 Part 314 — Adding `zIndex` Through a New Type

Likewise:

**LayeredCoordinate**

communicates:

> “This is not merely a coordinate anymore.”

It contains:

**x**  
**y**

plus:

🎨 **zIndex**

And:

**LayeredHexagon**

communicates that a normal `Hexagon` has been enriched with rendering-layer information.

Types therefore participate in the design documentation.

---

# 🧹 Part 315 — Clean Code Does Not Mean “No Complexity”

Midgard contains real complexity:

📐 **regular-hexagon mathematics**  
🔢 **parity rules**  
↔️↕️ **two orientations**  
🌱 **range expansion**  
🔍 **duplicate prevention**  
🎨 **rendering order**

That complexity cannot simply disappear.

Good design tries to ensure that complexity is located where it belongs.

Instead of one enormous ball of complexity, we get:

🐝 **neighbour complexity** → neighbour class  
📍 **positioning complexity** → positioner  
⬡ **geometric complexity** → geometry  
🎨 **layering complexity** → layer class

That is a much more useful interpretation of “clean.”

---

# 🎓 Part 316 — A Strong Reflection Point

If you need to reflect on Clean Code, a useful argument is:

> The project contains unavoidable domain complexity, especially because the two grid orientations use different neighbour and geometry calculations. I tried to keep that complexity localized in classes with focused responsibilities instead of placing all calculations in `HexGrid`. The high-level class can therefore delegate to more specialized components.

That is stronger than merely saying:

> **“My methods are short.”**

It explains *why the structure helps readability and maintainability*.

---

# ⚖️ Part 317 — But Clean Code Also Invites Criticism

A good reflection should also ask:

> **Could anything still be improved?**

For example, some orientation-specific methods have very similar structures.

That duplication may actually improve clarity because the two formulas remain explicit.

But it also creates a maintenance trade-off:

↔️ **x implementation**

and:

↕️ **y implementation**

must remain consistent.

There is no universal answer saying that duplication is always wrong.

The useful question is whether removing it would make the code:

✨ **clearer**

or:

🌀 **more abstract and harder to understand**.

---

# 💡 Part 318 — Readability Versus Cleverness

For this project, explicit formulas such as:

↔️ **x-dominated calculation**

and:

↕️ **y-dominated calculation**

can be easier for a student or library user to understand than one highly generalized mathematical algorithm full of parameters and transformations.

Sometimes:

**a little duplication**

is preferable to:

**a clever abstraction nobody understands.**

Clean code is not about making code look sophisticated.

It is about making its intention understandable.

---

# 🧭 Part 319 — The Most Useful Clean-Code Question

When reading one of your methods, imagine another programmer seeing it six months from now.

Ask:

> **Can they understand why this exists and what it is trying to accomplish without reconstructing the whole project in their head?**

If yes, that is a strong sign.

Good naming, focused responsibility, sensible types, limited side effects and useful tests all contribute to that.

---

# 📘 Part 320 — The Next Step: Examine the Longest Methods

Now we can become much more concrete.

Your assignment specifically asks you to examine the **five longest methods** and reflect on the Clean Code principle:

🎯 **“Do one thing.”**

So rather than discussing the principle abstractly, the next chapter can take the actual longer methods from Midgard and examine them one by one:

📏 **What does the method do?**  
🧩 **Can its work be described as one coherent responsibility?**  
🔀 **Why does it contain its control statements?**  
✂️ **Would splitting it improve readability—or merely fragment a coherent algorithm?**  
⚖️ **What could genuinely be improved?**

That will give us material that can later be turned almost directly into your course reflection.
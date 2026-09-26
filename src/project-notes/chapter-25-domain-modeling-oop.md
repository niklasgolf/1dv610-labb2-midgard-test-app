# 📘 Part VIII — Domain Modeling and OOP in Midgard

## Part 421 — What Is the Domain?

Before thinking about classes, methods or TypeScript, we should ask:

> **What problem world is Midgard trying to describe?**

That problem world is the **domain**.

For Midgard, the domain contains concepts such as:

🔢 **coordinates**  
↔️↕️ **grid orientations**  
🐝 **neighbouring positions**  
🦴 **skeletons**  
🌱 **filled coordinate ranges**  
📍 **geometric positions**  
⬡ **hexagons**  
🎨 **rendering layers**  
📦 **geometric bounds**

These concepts exist at the conceptual level before we decide exactly how to implement them.

---

# 🧠 Part 422 — Domain Modeling Starts Before Programming

Imagine we had never written any TypeScript.

We could still discuss Midgard:

> “A coordinate has x and y.”  
> “A valid coordinate has matching parity.”  
> “A coordinate has six neighbours.”  
> “A grid can be x-dominated or y-dominated.”  
> “A skeleton has a width and height.”  
> “A skeleton can be surrounded by neighbouring coordinates.”  
> “A hexagon has a center and six corner points.”  
> “Hexagons on the same row share a rendering layer.”

Those are statements about the **domain**.

They are not yet statements about TypeScript.

---

# 🗺️ Part 423 — From Domain Concepts to Software Concepts

Then we begin modeling those ideas in software.

For example:

🔢 **domain concept: coordinate**

⬇️

TypeScript:

**`Coordinate`**

🐝 **domain behaviour: find neighbours**

⬇️

TypeScript:

**`NeighbourCalculator`**

📍 **domain concept: geometric position**

⬇️

TypeScript:

**`Point`**

⬡ **domain concept: hexagon geometry**

⬇️

TypeScript:

**`HexagonGeometry`**

This is the bridge between domain analysis and implementation.

---

# 🏛️ Part 424 — OOP Is Not Just “Using Classes”

This is especially important.

Object-oriented programming does not become meaningful simply because we write:

**`class Something`**

everywhere.

The deeper question is:

> **Have we identified meaningful concepts and placed relevant state and behaviour together?**

Midgard gives us good examples.

🐝 **`NeighbourCalculator`**

contains:

🧭 **orientation state**

and behaviour for:

🐝 **calculating neighbours**

Those two things belong together because orientation affects neighbour relationships.

---

# 📍 Part 425 — `CoordinatePositioner` Is Another Object

`CoordinatePositioner` also stores:

🧭 **orientation**

and provides behaviour for:

📍 **positioning coordinates**

Why does orientation belong there?

Because the same logical coordinate is positioned differently depending on whether the grid is:

↔️ **x-dominated**

or:

↕️ **y-dominated**

So the object's state influences its behaviour.

That is a very natural object-oriented relationship.

---

# ⬡ Part 426 — `HexagonGeometry` Follows the Same Idea

`HexagonGeometry` knows:

🧭 **its orientation**

Then it can answer:

> ⬡ **“What are the six corners of this hexagon?”**

The answer depends on orientation.

So again:

**state + related behaviour**

are grouped into one object.

---

# 🤔 Part 427 — Why Isn't `Coordinate` a Class?

This is an interesting modeling question.

A Midgard coordinate currently contains:

**x**

and:

**y**

So it is represented as a TypeScript type rather than as a class with its own methods.

That is a perfectly reasonable design choice.

Not every domain concept needs to become an object with behaviour.

---

# 🔢 Part 428 — `Coordinate` Is Primarily Data

A coordinate itself is currently a simple value:

**`{ x, y }`**

Operations involving coordinates live in specialized objects:

✅ **validation → `CoordinateValidator`**  
🐝 **relationships → `NeighbourCalculator`**  
📍 **positioning → `CoordinatePositioner`**

So `Coordinate` serves mainly as:

📦 **structured domain data**

rather than an active object with its own methods.

---

# ⚖️ Part 429 — Another Design Would Have Been Possible

We could imagine a different design where `Coordinate` was a class with methods such as:

**`isValid()`**  
**`getNeighbours()`**

Perhaps even:

**`getCenterPosition()`**

But then `Coordinate` would need to know much more about:

🧭 **orientation**  
📐 **geometry**

and perhaps other grid rules.

That could make the coordinate object responsible for too much.

The current design keeps the coordinate itself lightweight.

---

# 🦴 Part 430 — Why `CoordinateRange` Is a Class

Now compare that with:

🦴 **`CoordinateRange`**

It has meaningful state:

↔️ **width**  
↕️ **height**  
🧭 **orientation**

and related behaviour:

✅ `isValid()`  
🦴 `getSkeleton()`  
🌱 `shouldFillAround()`

So a class is natural here.

The object represents:

> **a configured coordinate-range concept that can answer questions about itself.**

---

# 🔗 Part 431 — Objects Collaborate

OOP becomes especially visible when objects collaborate.

For example:

🌱 **`CoordinateRangeFiller`**

contains a:

🦴 **`CoordinateRange`**

The filler can ask that range:

> **“Give me your skeleton.”**

and:

> **“Should you be filled around?”**

Then the filler can use:

🐝 **neighbour calculations**

to construct the result.

So objects do not merely exist independently.

They collaborate to solve the larger domain problem.

---

# 🧩 Part 432 — Composition

This leads us to an important OOP idea:

**composition**

Composition means building more complex behaviour from smaller objects.

Instead of one giant inheritance hierarchy, Midgard mostly works by having objects **use other objects**.

Conceptually:

🌱 **CoordinateRangeFiller**

**has/uses a**

🦴 **CoordinateRange**

and:

🌐 **HexGrid**

**uses**

🐝 **NeighbourCalculator**  
📍 **CoordinatePositioner**  
⬡ **HexagonGeometry**  
🦴 **CoordinateRange**  
🌱 **CoordinateRangeFiller**  
🎨 **CoordinateLayer**

This is composition-oriented design.

---

# 🌳 Part 433 — Notice What Midgard Does NOT Have

Midgard does not need a complicated hierarchy such as:

`GridThing`

⬇️

`ShapeGridThing`

⬇️

`HexagonalShapeGridThing`

⬇️

`XDominatedHexagonalShapeGridThing`

That kind of inheritance would not automatically make the design “more object-oriented.”

Midgard instead favors:

🧩 **small collaborating objects**

That is often simpler.

---

# 🧬 Part 434 — Inheritance Is Only One OOP Tool

People sometimes learn OOP as:

> **class + inheritance = OOP**

But OOP includes much more:

📦 **objects containing state**  
🎯 **responsibilities**  
🔒 **encapsulation**  
💬 **objects communicating through methods**  
🧩 **composition**  
🏷️ **domain concepts represented in code**

Inheritance is only one possible relationship.

A project can be strongly object-oriented without a large inheritance tree.

---

# 🧭 Part 435 — Orientation Is Modeled Differently

Another interesting modeling decision is:

**`GridOrientation`**

It is not a class.

It is a union type containing:

↔️ `'x-dominated'`

or:

↕️ `'y-dominated'`

Why?

Because right now orientation itself mainly represents:

> **one of two allowed values**

It does not need an independent identity with lots of behaviour.

So a small type expresses the domain very efficiently.

---

# 💡 Part 436 — This Is an Important Modeling Principle

Do not ask:

> **“How can I turn everything into a class?”**

Ask:

> **“What software representation best expresses this concept?”**

Sometimes the answer is:

🏛️ **class**

Sometimes:

📦 **object type**

Sometimes:

🔤 **union type**

Sometimes:

🔢 **primitive value**

Good modeling is about representing meaning clearly, not maximizing the number of classes.

---

# ⬡ Part 437 — `Hexagon` Is Also Primarily Structured Data

A completed `Hexagon` contains:

🔢 **coordinate**  
📍 **center**  
⬡ **points**

It does not currently need its own behavioural class.

It represents the result of several calculations.

So a structured type is sufficient.

Similarly:

✨ **`LayeredHexagon`**

takes that structure and adds:

🎨 **zIndex**

---

# 🧠 Part 438 — Domain Concepts Can Be Data or Behaviour

We can therefore roughly divide Midgard's model into two categories.

### 📦 Data-oriented concepts

🔢 `Coordinate`  
📍 `Point`  
📦 `Bounds`  
⬡ `Hexagon`  
🎨 `LayeredCoordinate`  
✨ `LayeredHexagon`  
🧭 `GridOrientation`

### 🏛️ Behaviour-oriented concepts

✅ `CoordinateValidator`  
🐝 `NeighbourCalculator`  
🦴 `CoordinateRange`  
🌱 `CoordinateRangeFiller`  
📍 `CoordinatePositioner`  
⬡ `HexagonGeometry`  
🎨 `CoordinateLayer`  
🌐 `HexGrid`

That is not an absolute theoretical rule, but it is a useful way to understand the implementation.

---

# 🔗 Part 439 — Dependencies Form Relationships in the Model

We can now sketch the important relationships:

🌐 **HexGrid**

→ 🐝 `NeighbourCalculator`  
→ ✅ `CoordinateValidator`  
→ 📍 `CoordinatePositioner`  
→ ⬡ `HexagonGeometry`  
→ 🦴 `CoordinateRange`  
→ 🌱 `CoordinateRangeFiller`  
→ 🎨 `CoordinateLayer`

And:

🌱 **CoordinateRangeFiller**

→ 🦴 `CoordinateRange`  
→ 🐝 `NeighbourCalculator`

These arrows mean roughly:

> **uses / depends upon**

---

# 🗺️ Part 440 — This Is Moving Toward a Class Diagram

A class diagram is not simply:

> **draw every class in boxes**

Its real purpose is to communicate the model.

For Midgard, a useful diagram could show:

🏛️ **important classes**  
📦 **important domain types**  
🔗 **dependencies/associations**

and perhaps selected:

🔧 **public operations**

The diagram should help another programmer understand:

> **how the concepts relate**

It should not merely reproduce every line of TypeScript visually.

---

# 🎯 Part 441 — Domain Model Versus Implementation Model

There is an important distinction here.

A **conceptual domain model** might contain:

⬡ **Hexagon**  
🔢 **Coordinate**  
🧭 **Orientation**  
🐝 **Neighbour relationship**  
🦴 **Skeleton**  
🌐 **Grid**

It describes the problem concepts.

An **implementation/class model** may contain:

`NeighbourCalculator`  
`CoordinateRangeFiller`  
`CoordinatePositioner`

These are software constructs introduced to implement the domain.

They are related, but they are not exactly the same thing.

---

# 🧠 Part 442 — Why This Distinction Matters

Suppose someone asks:

> **“Is `CoordinateRangeFiller` a thing that exists in the real-world domain?”**

Not necessarily.

It is more like a software service we invented because:

🌱 **filling a range**

is a meaningful responsibility.

Meanwhile:

🔢 **Coordinate**  
⬡ **Hexagon**  
🌐 **Grid**

are more directly recognizable domain concepts.

So domain analysis and software design influence one another, but they are not identical.

---

# 🗣️ Part 443 — Domain Language

An important benefit of domain modeling is developing a shared vocabulary.

In Midgard we repeatedly use:

**coordinate**  
**orientation**  
**neighbour**  
**skeleton**  
**fill around**  
**layer**  
**hexagon**  
**bounds**

These words become the language used in:

📖 **documentation**  
💻 **source code**  
🧪 **tests**  
🗣️ **discussions**

That consistency reduces translation between “what we mean” and “what the code calls it.”

---

# 🏷️ Part 444 — Naming Is Therefore More Than Style

When we chose:

**`skeletonWidth`**

instead of something vague such as:

**`gridX`**

we were making a domain-modeling decision.

The name communicates:

> **“This number describes the width of the skeleton, not necessarily the final grid.”**

Likewise:

**`LayeredCoordinate`**

communicates that layering has been added to the coordinate concept.

Good names help preserve the model inside the implementation.

---

# 🔒 Part 445 — Encapsulation Reappears in OOP

Objects also decide what they expose.

For example:

🌐 **`HexGrid`**

has a private:

⬡ **`createHexagon()`**

The outside world does not need to know that helper exists.

The object exposes behaviour meaningful to consumers and keeps supporting implementation details internal.

So encapsulation is not merely about putting `private` everywhere.

It is about deciding:

> **Which responsibilities belong inside the object's boundary, and which operations form its external contract?**

---

# 🔄 Part 446 — State and Behaviour

Let's look at several Midgard objects through classic OOP terminology.

### 🐝 NeighbourCalculator

**State:** orientation  
**Behaviour:** calculate neighbours

### 📍 CoordinatePositioner

**State:** orientation  
**Behaviour:** convert coordinate → center position

### ⬡ HexagonGeometry

**State:** orientation  
**Behaviour:** calculate points and bounds

### 🦴 CoordinateRange

**State:** width, height, orientation  
**Behaviour:** validate, create skeleton, decide filling

This is a very concrete example of grouping related state and behaviour.

---

# 🌐 Part 447 — `HexGrid` Has a Different Kind of Responsibility

`HexGrid` also stores:

🧭 **orientation**

but its main role is broader.

It coordinates the domain services and presents them through one public interface.

So not every class represents a physical or conceptual “thing.”

Some classes represent:

🛠️ **services**

or:

🎼 **orchestration**

within the domain model.

---

# 🎼 Part 448 — Think of `HexGrid` as the Conductor

A useful analogy is an orchestra.

🐝 **NeighbourCalculator = one specialist musician**  
📍 **CoordinatePositioner = another**  
⬡ **HexagonGeometry = another**  
🎨 **CoordinateLayer = another**

Each knows its specialty.

Then:

🌐 **HexGrid**

acts like the conductor.

It does not personally play every instrument.

It coordinates them to produce the complete result.

---

# 🧩 Part 449 — Why Composition Fits Midgard Well

Midgard's problem naturally divides into transformations:

🔢 **coordinate**

➡️ 🐝 **relationships**

➡️ 🌱 **range**

➡️ 🎨 **layering**

➡️ 📍 **position**

➡️ ⬡ **geometry**

That makes composition especially suitable.

Each component can perform one transformation or responsibility, and higher-level components combine them.

There is little need to describe these concepts as:

> **“X is a specialized kind of Y.”**

So inheritance would add relatively little.

---

# 🎓 Part 450 — A Strong OOP Explanation

If someone asks:

> **“In what way is Midgard object-oriented?”**

a stronger answer than “because I used classes” would be:

> Midgard models different responsibilities as collaborating objects. Classes such as `NeighbourCalculator`, `CoordinatePositioner` and `HexagonGeometry` combine orientation state with behaviour related to that responsibility. More complex behaviour is built through composition rather than a large inheritance hierarchy, while simpler value concepts such as `Coordinate`, `Point` and `Hexagon` are represented as TypeScript types. `HexGrid` coordinates the lower-level objects and provides the main façade.

That demonstrates actual understanding of the design.

---

# ⚖️ Part 451 — OOP Does Not Mean Every Decision Was Inevitable

We should also recognize that this is **one model**, not the only possible model.

Someone else might:

🏛️ **make `Coordinate` a class**  
🧭 **model orientation using strategy objects**  
🌱 **use sets for range filling**  
⬡ **make `Hexagon` an active object**

or organize responsibilities differently.

The important question is not:

> **“Is there only one correct class diagram?”**

It is:

> **“Can we explain why our chosen model represents the domain coherently?”**

---

# 💡 Part 452 — This Is the Essence of Domain Modeling

Domain modeling is therefore not merely:

> **“Find nouns and turn them into classes.”**

It is a process of deciding:

🧠 **Which concepts matter?**  
🔗 **How are they related?**  
📦 **What information belongs to them?**  
🎯 **Which behaviours belong together?**  
🛡️ **Which rules must always hold?**  
🏷️ **What vocabulary communicates the model clearly?**

Midgard contains answers to all of these questions.

---

# 📘 Part 453 — Next: Invariants and Domain Rules

There is one especially important concept hiding underneath almost everything we have discussed:

🛡️ **invariants**

An invariant is a rule that must remain true for the model to make sense.

Midgard has several excellent examples:

🔢 **valid coordinates require matching parity**  
🚫 **coordinates cannot be negative**  
🦴 **skeleton coordinates advance by two**  
🌱 **larger skeletons always fill**  
🐝 **every hexagon has six neighbours in the logical system**  
⬡ **every generated hexagon has six corner points**  
🎨 **coordinates on the same y-row share a z-index**

Understanding invariants will show us **why certain checks exist, why certain tests are especially important, and how the domain rules hold the whole model together.**
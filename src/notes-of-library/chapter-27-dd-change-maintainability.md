# 📘 Part X — Dependency Direction, Change and Maintainability

## Part 484 — Good Architecture Becomes Most Valuable When Something Changes

When software is first written, many designs can appear perfectly acceptable.

The real test often comes later:

🔧 **A requirement changes.**

Suppose Midgard is working perfectly today, but tomorrow we decide:

🎨 **z-index should increase by 10 instead of 100.**

Or:

🌱 **the fill-around rules should change.**

Or:

📍 **the geometric spacing needs a new formula.**

Or:

🐝 **neighbour relationships need another representation.**

The architectural question becomes:

> **How much of the system must we understand and modify to make that change safely?**

---

# 🌊 Part 485 — Change Can Spread

Imagine that all Midgard logic existed inside one enormous `HexGrid` class.

Changing neighbour calculations might require searching through hundreds of lines containing:

🐝 **neighbours**  
🌱 **filling**  
📍 **positioning**  
⬡ **geometry**  
🎨 **layering**  
📦 **bounds**

Even if only one concept needs changing, the programmer must understand many unrelated concepts before feeling safe.

This is sometimes described as a **ripple effect**:

💧 **one small change**

➡️ affects another area

➡️ which affects another

➡️ which affects another.

---

# 🎯 Part 486 — Responsibilities Give Changes a Home

Midgard's separated responsibilities make many changes easier to locate.

If the question is:

🐝 **“How are neighbours calculated?”**

we know to investigate:

**`NeighbourCalculator`**

If it is:

🎨 **“How is z-index assigned?”**

we investigate:

**`CoordinateLayer`**

If it is:

📍 **“How are logical coordinates converted into geometric centers?”**

we investigate:

**`CoordinatePositioner`**

This is one practical benefit of the responsibility-based architecture we discussed earlier.

---

# 🧠 Part 487 — Localizing Change

A useful design goal is:

> **A change to one concept should ideally require changes mainly where that concept is represented.**

This is called **localizing change**.

For example:

🎨 **rendering-layer rules**

should preferably not require us to rewrite:

🐝 **neighbour mathematics**

Those are different concerns.

The more independently they can evolve, the easier the system becomes to maintain.

---

# 🎨 Part 488 — Example: Change the Z-Index Increment

Currently, each new y-row advances the z-index by:

**100**

Imagine the requirement changes to:

**10**

instead.

Conceptually, the affected responsibility is obvious:

🎨 **`CoordinateLayer`**

The neighbour system does not care.

The geometry system does not care.

Coordinate validation does not care.

That is a healthy dependency boundary.

---

# 🧪 Part 489 — But the Tests Must Change Too

The implementation is not the only place expressing the rule.

The tests currently expect values such as:

`100`  
`200`  
`300`  
`400`

So an intentional requirement change means:

💻 **change the implementation**

and:

🧪 **change the tests that specify the old requirement**

This is important.

A failing test does not always mean:

> **“The new implementation is wrong.”**

Sometimes it means:

> **“The specification itself intentionally changed, so the test must change with it.”**

---

# 🐝 Part 490 — Example: Change Neighbour Mathematics

Suppose the neighbour system itself changed.

The primary implementation location would be:

🐝 **`NeighbourCalculator`**

But the effects would travel farther than the z-index example.

Why?

Because:

🌱 **`CoordinateRangeFiller`**

uses neighbour calculations when creating filled ranges.

Therefore:

🐝 **changed neighbour rules**

➡️ may produce different filled coordinate ranges.

This is a genuine dependency.

---

# 🔗 Part 491 — Dependencies Explain Change Propagation

This gives us a very practical meaning of a dependency.

If:

🌱 **A depends on B** 🐝

then:

> **a behavioural change in B may affect A.**

For Midgard:

🌱 **CoordinateRangeFiller**

➡️ depends on

🐝 **NeighbourCalculator**

Therefore changing neighbour behaviour may legitimately change filler behaviour.

That is not necessarily bad coupling.

The relationship is logically necessary.

---

# 🧩 Part 492 — Necessary Coupling Versus Accidental Coupling

This distinction is extremely important.

### ✅ Necessary coupling

The filler depends on neighbour calculations because filling literally requires neighbours.

### ❌ Accidental coupling

Imagine `CoordinateValidator` depended on z-index values for no meaningful reason.

That would connect unrelated concepts.

Good architecture does not eliminate all dependencies.

It tries to make dependencies:

> **meaningful and understandable.**

---

# 📍 Part 493 — Example: Change Positioning Mathematics

Suppose you discover that the spacing formula for x-dominated grids should change.

The relevant responsibility lives in:

📍 **`CoordinatePositioner`**

The logical coordinate system can remain unchanged.

So:

🔢 `(2,2)`

can still be a valid Midgard coordinate.

🐝 It can still have the same six logical neighbours.

🦴 It can still appear in the same skeleton.

Only its:

📍 **geometric center**

changes.

---

# 🌍 Part 494 — Logical Space and Geometric Space Are Decoupled

This reveals an important architectural boundary.

Midgard has:

### 🔢 Logical space

Coordinates, neighbours, skeletons, ranges.

and:

### 📐 Geometric space

Pixel-like center positions, corner points and bounds.

A change to geometric spacing does not necessarily require changing the logical topology.

That separation is extremely useful.

---

# 🗺️ Part 495 — The Same Grid Can Be Positioned Differently

Conceptually, imagine this logical structure:

⬡ — ⬡ — ⬡

The relationships between those cells can remain identical even if we decide to render them:

🔎 **larger**  
🔬 **smaller**  
↔️ **farther apart**

or according to slightly different geometry.

The logical model describes:

> **which cells exist and how they relate.**

The geometric model describes:

> **where they appear.**

---

# ⬡ Part 496 — Geometry Has Another Separate Responsibility

Now suppose the center positions remain correct, but we change how corner points are calculated.

That belongs primarily to:

⬡ **`HexagonGeometry`**

Again, the logical coordinate:

`(2,2)`

does not need to know anything about:

**√3**  
**radius**  
**half-radius**

or:

**corner positions**

The responsibilities are separated.

---

# 📦 Part 497 — Bounds Depend on Geometry

However, bounds are calculated from geometric points.

So:

⬡ **geometry changes**

may change:

📦 **bounds**

That is a legitimate propagation of change.

We can visualize it:

⬡ **geometry changes**

⬇️

📍 **corner points change**

⬇️

📦 **bounds may change**

Architecture does not prevent consequences.

It makes the consequences **understandable**.

---

# 🌱 Part 498 — Example: Change the Fill Rule

Suppose Midgard's requirement changes from:

🌐 **larger skeletons always fill**

to:

🎛️ **all skeleton sizes may independently choose whether to fill.**

Where does that rule currently live?

🦴 **`CoordinateRange.shouldFillAround()`**

That gives the requirement a clear home.

Then:

🌱 **CoordinateRangeFiller**

uses the answer.

This is preferable to having the rule duplicated throughout:

`createGrid()`  
`CoordinateRangeFiller`  
`HexGrid`

and several other locations.

---

# 🧠 Part 499 — One Rule, One Authoritative Place

A useful principle is:

> **Try to avoid representing the same domain decision independently in many places.**

If five different methods each contained their own version of:

> **“larger skeletons must always fill”**

then changing the rule would require finding all five.

Worse:

four might be changed while one is forgotten.

Now the system contains contradictory interpretations of the domain.

---

# 📚 Part 500 — Tests Repeat Expectations for a Different Reason

At first this may seem contradictory.

We just said:

> **“Don't duplicate the rule.”**

Yet tests also contain expectations about the rule.

That is different.

The implementation should have an authoritative place where the behaviour is decided.

Tests independently state:

🧪 **what behaviour we expect from that implementation.**

That duplication is deliberate verification, not accidental duplicated business logic.

---

# 🔄 Part 501 — Change Impact Is a Useful Design Test

When evaluating architecture, ask:

> **If requirement X changes, which files should reasonably need modification?**

For example:

🎨 **layering rule changes**  
→ mostly `CoordinateLayer` + relevant tests.

🐝 **neighbour rule changes**  
→ `NeighbourCalculator` + dependent behaviour/tests.

📍 **positioning formula changes**  
→ `CoordinatePositioner` + geometric expectations/tests.

🌱 **fill rule changes**  
→ `CoordinateRange` + relevant filler/high-level tests.

If the answer were always:

> **“almost every file”**

that would indicate much stronger coupling.

---

# 🌐 Part 502 — `HexGrid` Depends on Many Components

There is an obvious exception:

🌐 **`HexGrid`**

It knows about many lower-level capabilities.

That is intentional because it acts as:

🚪 **façade**

and:

🎼 **orchestrator**

It sits near the top of the architecture and combines specialized components.

---

# 🏗️ Part 503 — Dependency Direction

Conceptually, the architecture looks something like:

🌐 **HexGrid**

⬇️

🦴 🌱 🐝 🎨 📍 ⬡  
**specialized domain components**

rather than:

🦴 **CoordinateRange**

⬇️

🌐 **HexGrid**

⬇️

🦴 **CoordinateRange**

The specialized classes do not need to know how the entire façade works.

The higher-level façade knows how to combine them.

---

# 🔽 Part 504 — Higher Level Depends on Lower-Level Capabilities

For example:

🌐 `HexGrid.createGrid()`

can depend on:

🌱 **range creation**  
🎨 **layering**  
📍 **positioning**  
⬡ **geometry**

But:

🐝 `NeighbourCalculator`

does not need to know that `createGrid()` even exists.

Its world is much smaller:

> **orientation + coordinate → six neighbours.**

That keeps the low-level component independently understandable.

---

# 🧪 Part 505 — Independent Components Are Easier to Test

Because `NeighbourCalculator` does not require a complete `HexGrid`, we can test it directly.

Likewise:

📍 **CoordinatePositioner**  
⬡ **HexagonGeometry**  
🎨 **CoordinateLayer**

This is another connection between:

🏗️ **architecture**

and:

🧪 **testability**

Focused dependencies create smaller testing contexts.

---

# 🛠️ Part 506 — Maintainability Means More Than “Easy to Read”

We often say maintainable code is:

📖 **readable**

That is certainly important.

But maintainability also means:

🔧 **easy to modify**  
🐛 **easy to diagnose**  
🧪 **easy to verify**  
🧩 **easy to extend**  
🧠 **possible to understand without loading the entire system into your head**

Midgard's separation of responsibilities supports all of these.

---

# 🐛 Part 507 — Architecture Helps Locate Bugs

Suppose the final SVG shows the correct hexagon shape but every hexagon appears too far down the page.

Where would you investigate first?

Probably:

📍 **`CoordinatePositioner`**

not:

🐝 **NeighbourCalculator**

Suppose instead that cells appear in the wrong logical relationships.

Then:

🐝 **`NeighbourCalculator`**

becomes more suspicious.

Good architecture gives bugs conceptual locations.

---

# 🧪 Part 508 — Tests Narrow the Search Further

Suppose:

🌐 **`createGrid()` fails.**

But:

🦴 **range tests pass**  
🐝 **neighbour tests pass**  
📍 **positioning tests pass**  
⬡ **geometry tests pass**  
🎨 **layering tests pass**

That information helps narrow the problem toward:

🔗 **orchestration/integration**

rather than one of the individual algorithms.

Focused tests therefore complement modular architecture.

---

# ➕ Part 509 — Extending the Library

Maintainability also matters when adding functionality.

Suppose later you want:

✨ **a method that returns only the outer boundary coordinates of a grid.**

You would ask:

> **Which existing domain concepts can this use?**

Perhaps:

🌱 **coordinate range**

and:

🐝 **neighbour relationships**

could provide the foundation.

You would not necessarily need to rewrite:

⬡ **geometry**

or:

🎨 **layering**

Existing responsibilities become reusable building blocks.

---

# 🧱 Part 510 — Architecture Creates Building Blocks

This is one reason libraries benefit from separation.

Instead of one enormous operation:

🌐 **“do everything”**

we have reusable capabilities:

🔢 **validate**  
🐝 **find neighbours**  
🦴 **create skeleton**  
🌱 **fill range**  
🎨 **layer**  
📍 **position**  
⬡ **calculate geometry**  
📦 **calculate bounds**

New features can combine these building blocks in new ways.

---

# ⚖️ Part 511 — But More Components Also Have a Cost

We should remain critical.

More classes mean:

📁 **more files**  
🏷️ **more names**  
🔗 **more relationships**  
🧠 **more concepts for maintainers to learn**

So modularity has a cost.

If every two-line calculation became its own class, Midgard could become harder rather than easier to understand.

The goal is:

> **meaningful separation, not maximum separation.**

---

# 🎯 Part 512 — The Practical Balance

Midgard's design philosophy can be summarized as:

> **Separate concepts that have different reasons to change, but keep closely related steps together when separating them would add little clarity.**

For example:

🐝 **neighbour mathematics**

and:

🎨 **z-index layering**

clearly have different reasons to change.

They deserve separation.

But the four min/max comparisons inside:

📦 `getBounds()`

all change for essentially the same reason:

**the bounds algorithm changes.**

Keeping them together is reasonable.

---

# 🧠 Part 513 — “Reason to Change” Returns

Earlier we used the Clean Code question:

> **Does this method do one thing?**

At class level we can ask a related question:

> **What kind of requirement would cause this class to change?**

Examples:

🐝 **NeighbourCalculator**  
→ neighbour/topology requirements.

📍 **CoordinatePositioner**  
→ positioning requirements.

⬡ **HexagonGeometry**  
→ geometric-shape requirements.

🎨 **CoordinateLayer**  
→ layering/order requirements.

This is a practical way to think about responsibility.

---

# 🔗 Part 514 — A Dependency Map Is Really a Change Map

When we draw:

🌱 **Filler → NeighbourCalculator** 🐝

we are not merely drawing which class calls which class.

We are also saying:

> **Neighbour behaviour can influence filling behaviour.**

Likewise:

🌐 **HexGrid → CoordinatePositioner** 📍

means:

> **positioning changes can affect results produced through HexGrid.**

Dependencies tell us where changes can travel.

---

# 🎓 Part 515 — A Strong Maintainability Explanation

If asked why the project is divided into several classes, you could explain:

> The separation localizes different reasons for change. For example, neighbour rules belong to `NeighbourCalculator`, positioning mathematics belongs to `CoordinatePositioner`, and rendering-layer rules belong to `CoordinateLayer`. `HexGrid` depends on these specialized components and coordinates them through the high-level API. This means a change can often be made and tested mainly within the component responsible for that concept, although dependent behaviour may also need verification.

That is a strong architectural argument.

---

# 🌟 Part 516 — The Key Idea

Good architecture does not promise:

❌ **“Changing one thing will never affect anything else.”**

That would be unrealistic.

Instead, it tries to make change:

🎯 **localized**  
🔗 **predictable**  
🧠 **understandable**  
🧪 **verifiable**

That is one of the most practical definitions of maintainability.

---

# 📘 Part 517 — Next: Design Patterns in Midgard

We are now ready for one of the most interesting final topics:

🧩 **design patterns.**

We will not try to force famous pattern names onto everything.

Instead, we will look at the structures that genuinely appear in Midgard and ask:

🌐 **Is `HexGrid` a Facade?**  
🧩 **Where do we see composition?**  
🔀 **Is the orientation handling related to Strategy, and if so, is it actually a Strategy implementation yet?**  
🏭 **Is `createGrid()` a Factory Method, or would calling it that be misleading?**  
🔒 **How do private helpers relate to encapsulation?**

Most importantly, we'll learn the difference between:

> **“This code resembles a pattern”**

and:

> **“This code actually implements that design pattern.”**
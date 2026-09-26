# 📘 Part IX — Invariants and Domain Rules

## Part 454 — What Is an Invariant?

An **invariant** is a condition that should remain true whenever a particular part of the system is in a valid state.

In simpler language:

🛡️ **It is a rule the model must not break.**

For example, Midgard says that a valid coordinate must have:

🔢 **integer x and y values**  
➕ **non-negative values**  
⚫⚫ **both even**

or:

⚪⚪ **both odd**

Those are not merely implementation preferences.

They are rules that define what a valid Midgard coordinate **is**.

---

# 🔢 Part 455 — The Coordinate Invariant

The central coordinate rule can be written conceptually as:

### ✅ Valid

`(0,0)`  
`(2,2)`  
`(4,2)`  
`(1,1)`  
`(3,1)`  
`(11,11)`

### ❌ Invalid

`(1,2)`  
`(10,11)`  
`(−1,1)`  
`(2.5,2)`

The validator explicitly protects these rules, and the tests cover both valid parity combinations, both invalid parity combinations, decimal values and negative coordinates.

---

# 🧠 Part 456 — Why Matching Parity Matters

This parity rule is not arbitrary.

It is what allows Midgard's coordinate system to represent the hexagonal neighbour structure consistently.

For an x-dominated grid, moving straight horizontally changes x by:

**±2**

while leaving y unchanged.

So:

`(10,10)`

can become:

`(8,10)`

or:

`(12,10)`

Both remain:

⚫⚫ **even/even**

Diagonal movement changes both coordinates by one:

`(10,10)`

➡️ `(9,9)`

or:

➡️ `(11,11)`

Both become:

⚪⚪ **odd/odd**

The neighbour rules therefore preserve the coordinate invariant.

---

# ↕️ Part 457 — Y-Dominated Movement Preserves It Too

For y-dominated orientation, straight movement changes:

**y by ±2**

So:

`(10,10)`

➡️ `(10,8)`

or:

➡️ `(10,12)`

Again:

⚫⚫ **even/even remains even/even**

Diagonal movement changes both x and y by one.

So the same parity structure survives.

---

# 🔗 Part 458 — One Rule Connects Several Classes

This is where invariants become architecturally interesting.

The matching-parity rule appears explicitly in:

✅ **CoordinateValidator**

But other classes have been designed so their behaviour naturally **preserves** it.

🐝 `NeighbourCalculator`  
produces neighbours with valid parity relationships.

🦴 `CoordinateRange`  
starts at `(2,2)` and moves in steps of two.

🌱 `CoordinateRangeFiller`  
uses those neighbour rules.

So the invariant is not isolated inside one file.

It influences the design of the whole coordinate system.

---

# 🦴 Part 459 — The Skeleton Preserves the Same Invariant

Remember the 3 × 2 skeleton:

`(2,2)`　`(4,2)`　`(6,2)`  
`(2,4)`　`(4,4)`　`(6,4)`

Every coordinate is:

⚫⚫ **even/even**

Why?

Because the skeleton begins at:

**(2,2)**

and advances in steps of:

**2**

Adding two to an even number keeps it even.

So skeleton generation naturally produces valid Midgard coordinates.

---

# 🌱 Part 460 — Filling Introduces Odd/Odd Coordinates

Now something interesting happens.

Suppose the skeleton contains:

**(2,2)**

Its diagonal neighbours include:

`(1,1)`  
`(3,1)`  
`(1,3)`  
`(3,3)`

These are:

⚪⚪ **odd/odd**

So the filled grid contains both valid coordinate families:

⚫⚫ **even/even**

and:

⚪⚪ **odd/odd**

What it never needs are:

❌ **even/odd**

or:

❌ **odd/even**

---

# 🕸️ Part 461 — The Grid Is a Subset of the Ordinary Integer Grid

Imagine an ordinary square coordinate grid containing every integer pair.

Midgard does **not** use every position.

Conceptually:

`(0,0)` ✅　`(1,0)` ❌　`(2,0)` ✅  
`(0,1)` ❌　`(1,1)` ✅　`(2,1)` ❌  
`(0,2)` ✅　`(1,2)` ❌　`(2,2)` ✅

It forms an alternating pattern.

Approximately half of the ordinary integer-coordinate combinations are excluded by the parity rule.

That structure is what makes Midgard's logical coordinate space different from an ordinary square grid.

---

# 🐝 Part 462 — Six Neighbours Are Another Domain Rule

A hexagonal grid has:

🐝 **six neighbouring positions**

not:

**4**

and not:

**8**

So `NeighbourCalculator` should always produce exactly:

**6 coordinates**

for a coordinate in either orientation.

The tests explicitly protect this structural rule.

---

# ↔️↕️ Part 463 — Orientation Changes the Neighbours, Not Their Number

Orientation affects **where** the straight neighbours lie.

### ↔️ X-dominated

Straight movement is horizontal.

### ↕️ Y-dominated

Straight movement is vertical.

But both orientations still satisfy:

🐝 **six neighbours**

So we can distinguish:

### 🛡️ Invariant

There are six neighbours.

### 🔄 Variation

Their coordinate offsets depend on orientation.

This distinction is extremely useful in domain modeling.

---

# 🦴 Part 464 — Range Dimensions Have Their Own Invariant

A `CoordinateRange` requires:

**width ≥ 1**

and:

**height ≥ 1**

and both must be:

🔢 **integers**

Therefore:

`1 × 1` ✅  
`3 × 2` ✅  
`0 × 2` ❌  
`3 × 0` ❌  
`1.5 × 2` ❌  
`3 × 1.5` ❌

This protects the meaning of:

🦴 **a skeleton containing a discrete number of hexagon positions**

---

# 🌱 Part 465 — Filling Has a Domain Rule Too

Midgard's filling rule is:

### ⬡ 1 × 1 skeleton

The caller may choose:

🌱 **fill**

or:

⬡ **leave unfilled**

### 🌐 Larger skeleton

🌱 **always fill**

Even explicitly supplying `fillAround = false` does not disable filling for a larger skeleton.

That is not a generic TypeScript rule.

It is a **Midgard domain rule**.

---

# 🧠 Part 466 — This Is Why `shouldFillAround()` Exists

Without a named method, the condition could simply be buried inside some larger algorithm.

But:

🌱 **`shouldFillAround()`**

gives the rule a conceptual home.

The method answers a domain question:

> **According to Midgard's rules, should this range receive surrounding fill?**

This is a good example of code expressing the language of the model.

---

# 🧺 Part 467 — Uniqueness Is Another Important Invariant

When several skeleton coordinates are filled, their neighbour areas overlap.

But the completed range should not contain:

**the same coordinate several times**

So another useful invariant is:

🛡️ **Each logical position appears at most once in the completed coordinate range.**

That is why `CoordinateRangeFiller` checks for an existing coordinate before adding another one.

The wider x-dominated range test specifically confirms that the completed range contains the expected unique coordinates.

---

# ⬡ Part 468 — A Hexagon Has Six Corner Points

Once we move from logical coordinates into geometry, another structural rule appears.

A Midgard hexagon should contain:

⬡ **six corner points**

The geometry tests verify six points for both orientations.

And the higher-level `createGrid()` test checks that every generated hexagon also contains six points.

Again we have:

🔬 **low-level protection**

plus:

🌐 **high-level protection**

---

# 📏 Part 469 — Diameter Has an Orientation-Dependent Contract

Another rule is slightly different because it varies according to configuration.

For:

↔️ **x-dominated**

**hexDiameter means full width.**

For:

↕️ **y-dominated**

**hexDiameter means full height.**

So the invariant is not:

> **“width always equals diameter.”**

Instead it is:

🛡️ **the dominant dimension equals the supplied diameter.**

The geometry and `HexGrid` tests protect this interpretation.

---

# 🎨 Part 470 — Layering Has Several Rules

`CoordinateLayer` has its own small collection of invariants.

First:

🔀 coordinates are ordered by **y first**, then **x**.

Second:

🎨 coordinates on the same y-row receive the same z-index.

Third:

🪜 each new distinct y-row advances the z-index by:

**100**

---

# 🧠 Part 471 — Z-Index Depends on Row Order, Not the Numeric Y Value

This is subtle.

Suppose the rows have y-values:

`0`  
`2`  
`4`  
`6`

Their z-indexes are:

`100`  
`200`  
`300`  
`400`

The calculation is therefore not:

**`zIndex = y × 100`**

Instead:

🎨 **each encountered row receives the next layer.**

The tests deliberately demonstrate this behaviour.

---

# 🛡️ Part 472 — Non-Mutation Can Be a Behavioural Guarantee

There is another kind of invariant:

> **An operation should not unexpectedly alter its input.**

`sortCoordinates()` returns sorted coordinates while preserving the original array.

The test explicitly checks this.

That protects a useful behavioural guarantee:

🛡️ **sorting inside `CoordinateLayer` does not secretly reorder the caller's array.**

---

# 📦 Part 473 — Empty Bounds Have a Defined Meaning

What are the bounds of:

**zero points?**

Midgard defines them as:

`minX = 0`  
`minY = 0`  
`maxX = 0`  
`maxY = 0`  
`width = 0`  
`height = 0`

This is an edge-case contract.

Without it, callers might have to wonder whether the method:

❌ **throws**  
❓ **returns undefined**  
♾️ **returns infinities**

or does something else.

Instead, the behaviour is explicit and tested.

---

# 🌐 Part 474 — High-Level API Invariants

The façade adds some important guarantees of its own.

### ⬡ `createSingleHexagon()`

Returns exactly:

**1 complete hexagon**

### 🌐 `createGrid()`

🌱 **uses surrounding fill**  
🎨 **returns layered hexagons**  
⬡ **every returned hexagon has six points**

The 1 × 1 distinction is especially important:

⬡ `createSingleHexagon()` → **1**

🌼 `createGrid()` with 1 × 1 skeleton → **7**

---

# 🔗 Part 475 — Invariants Form a Chain

Now look at what happens during `createGrid()`.

🦴 **skeleton generation**

must preserve:

🔢 **valid coordinate structure**

⬇️

🌱 **filling**

must preserve:

🔢 **valid coordinates**

and:

🧺 **uniqueness**

⬇️

🎨 **layering**

must preserve the coordinates while adding:

🎨 **correct row ordering**

⬇️

📍 **positioning**

must map logical coordinates consistently into geometry.

⬇️

⬡ **geometry**

must produce:

**six points per hexagon**

The final result depends on every earlier stage preserving its own rules.

---

# 💥 Part 476 — One Broken Invariant Can Travel Through the System

Suppose neighbour calculation accidentally generates:

❌ `(10,11)`

That is an invalid parity combination.

The filler could then include it.

The positioner could still calculate a geometric position for it.

The geometry class could still create six corner points around that position.

So technically:

**the later mathematics might continue working.**

But the model would already have been corrupted because an invalid Midgard coordinate entered the pipeline.

This illustrates why protecting invariants close to where they matter is important.

---

# 🧠 Part 477 — TypeScript Cannot Express Every Invariant

TypeScript can express:

**x is a number**

and:

**y is a number**

But the normal `Coordinate` type does not automatically express:

> “x and y must be integers”  
> “x and y must be non-negative”  
> “x and y must have matching parity.”

Those are richer **domain constraints**.

Therefore the model needs:

✅ **validation**  
🧪 **tests**  
📖 **documentation**

to communicate and protect them.

---

# 🏛️ Part 478 — This Is a Core Domain-Modeling Idea

A good domain model is not merely a collection of nouns.

It also contains:

🛡️ **rules governing which states are meaningful**

For Midgard:

> **“Coordinate has x and y”**

is only part of the model.

The stronger statement is:

> **A Midgard coordinate has non-negative integer x and y values whose parity matches.**

Now we have captured not just the structure, but part of the **meaning**.

---

# 🧪 Part 479 — Why Invariants Produce Good Tests

Once an invariant is identified, test design becomes easier.

Ask:

> **What examples satisfy the rule?**

and:

> **What examples violate it?**

For parity:

✅ **even/even**  
✅ **odd/odd**  
❌ **even/odd**  
❌ **odd/even**

For dimensions:

✅ **1**  
❌ **0**  
❌ **1.5**

For hexagons:

✅ **six points**  
❌ **anything else**

This is a systematic way of deriving tests from the domain model.

---

# 📖 Part 480 — Invariants Also Belong in Documentation

Some rules are important enough that library users should not have to discover them by experimentation.

Especially:

🔢 **coordinate parity**  
↔️↕️ **diameter semantics**  
🦴 **skeleton meaning**  
🌱 **1 × 1 versus larger fill behaviour**

These are not implementation trivia.

They affect how another programmer correctly uses and interprets Midgard.

---

# 🎓 Part 481 — A Strong Domain-Modeling Explanation

If asked:

> **“What are some important invariants in your domain?”**

you could answer:

> One central invariant is that valid Midgard coordinates consist of non-negative integers where x and y have the same parity. The neighbour and skeleton algorithms are designed to preserve that structure. Other invariants include unique coordinates in a filled range, six neighbours in the logical hex-grid structure, six geometric points for each generated hexagon, and consistent z-index values for coordinates on the same y-row. These rules are protected by focused automated tests.

That connects:

🧠 **domain modeling**  
💻 **implementation**

and:

🧪 **testing**

in one explanation.

---

# 🌟 Part 482 — The Deeper Pattern

We can now see the project as more than a collection of algorithms.

Midgard has:

📦 **domain concepts**  
such as Coordinate and Hexagon,

🔗 **relationships**  
such as neighbour relationships,

🛡️ **invariants**  
such as parity and uniqueness,

🎯 **responsibilities**  
assigned to classes,

🌐 **workflows**  
such as `createGrid()`,

and:

🧪 **tests**  
that protect those rules.

That is essentially a small but genuine software model.

---

# 📘 Part 483 — Next: Dependency Direction and Change

Now we can ask another important software-design question:

> **What happens when requirements change?**

For example:

🐝 **What if neighbour rules changed?**  
🎨 **What if z-index increments changed from 100?**  
📍 **What if positioning mathematics changed?**  
🌱 **What if fill-around behaviour changed?**  
⬡ **What if we added a new way of creating grids?**

A well-structured design should help us identify:

**where the change belongs**

and:

**how far its effects should spread.**

That leads us into dependency direction, change impact, maintainability, and one of the most practical meanings of good software architecture.
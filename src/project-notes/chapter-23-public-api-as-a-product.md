# 📘 Part VI — The Public API as a Product

## Part 359 — A Library Has Two Audiences

When writing an ordinary application, the main user is usually:

👤 **the person using the application**

But a reusable library has another kind of user:

👨‍💻 **the programmer using the library**

That changes how we think about software quality.

Midgard should not merely:

✅ **calculate hexagons correctly**

It should also be:

🧠 **understandable**  
🚪 **easy to enter**  
🏷️ **clearly named**  
📖 **learnable**  
🧩 **useful without requiring knowledge of every internal detail**

In other words:

> **The API itself is part of the product.**

---

# 🚪 Part 360 — `index.ts` Is the Front Door

We previously studied `index.ts` as a very small source file.

Architecturally, however, it has an important role.

It defines what the package makes available to another programmer.

Think of the library as a building again:

🏢 **all the source files are inside the building**

But:

🚪 **`index.ts`**

is the entrance.

It exports the concepts that consumers of Midgard are allowed to use.

---

# 📦 Part 361 — Installation Should Lead to One Clear Package

Ideally, another programmer should think:

📦 **“I installed `midgard-hex-grid`.”**

Then they import what they need from that package.

They should not have to understand the project's internal folder structure and think:

> “Where exactly is `coordinate-positioner.ts`?”  
> “Which directory contains `HexGrid`?”  
> “Which internal path should I import?”

The package boundary should hide that organizational detail.

---

# 🌐 Part 362 — The Easiest Starting Point Is `HexGrid`

For most programmers, the natural entry point is:

🌐 **`HexGrid`**

They choose an orientation:

↔️ **x-dominated**

or:

↕️ **y-dominated**

and then they can immediately perform useful operations.

The simplest high-level possibilities are:

⬡ **create one hexagon**

or:

🌐 **create a grid**

That is important for **learnability**.

A programmer should not need to understand eight classes before achieving their first useful result.

---

# ✨ Part 363 — Progressive Complexity

A good API can reveal complexity gradually.

A beginner might need only:

🌐 **`HexGrid`**

⬇️

🌐 **`createGrid()`**

But a more advanced programmer might later want:

🐝 `getNeighbours()`  
🌱 `getCoordinateRange()`  
🎨 `getLayeredCoordinateRange()`  
📍 `getCenterPosition()`  
⬡ `getHexagonPoints()`  
📦 `getGridBounds()`

So Midgard can support different levels of use.

---

# 🪜 Part 364 — Think of the API as a Ladder

The programmer can climb only as high as necessary.

### 🟢 Level 1 — “Just make it for me”

⬡ `createSingleHexagon()`  
🌐 `createGrid()`

### 🟡 Level 2 — “Give me parts of the grid model”

🐝 **neighbours**  
🌱 **coordinate ranges**  
🎨 **layered coordinates**

### 🔵 Level 3 — “Give me geometric calculations”

📍 **center positions**  
⬡ **corner points**  
📦 **bounds**

This makes the library useful without forcing every consumer to use the same abstraction level.

---

# 🧠 Part 365 — Why `createGrid()` Is So Important

Imagine the library exposed only the lower-level classes.

A programmer might need to learn:

🦴 `CoordinateRange`

then:

🌱 `CoordinateRangeFiller`

then:

🎨 `CoordinateLayer`

then:

📍 `CoordinatePositioner`

then:

⬡ `HexagonGeometry`

before producing anything visible.

Technically, the library could still work.

But the learning curve would be much steeper.

`createGrid()` gives the common workflow a name and packages the steps together.

---

# 🏷️ Part 366 — Parameter Names Are Part of the API

Public API design is not just about method names.

Parameter names matter too.

Consider:

**`skeletonWidth`**

and:

**`skeletonHeight`**

Those names communicate something important.

They do not mean:

❌ **final number of hexagons horizontally and vertically**

They describe:

🦴 **the dimensions of the skeleton**

That distinction is essential because surrounding fill can make the completed grid larger than the skeleton.

---

# 📏 Part 367 — `hexDiameter` Also Communicates Intent

The public option:

**`hexDiameter`**

is more meaningful than something vague such as:

**`size`**

But Midgard still needs documentation explaining the orientation rule:

↔️ **x-dominated → diameter means full width**  
↕️ **y-dominated → diameter means full height**

The type system can tell us that `hexDiameter` is a number.

It cannot by itself fully explain what that number means geometrically.

That is where documentation becomes important.

---

# 🌼 Part 368 — The 1 × 1 Case Needs Especially Clear Documentation

There is another semantic distinction that a user could easily misunderstand.

These two operations are intentionally different:

### ⬡ `createSingleHexagon()`

Returns:

**exactly one hexagon**

### 🌐 `createGrid()` with a 1 × 1 skeleton

Returns:

**the skeleton hexagon plus its surrounding fill**

➡️ **7 hexagons**

This behaviour makes sense once you understand Midgard.

But it is not something every new user would automatically predict.

Therefore it deserves a clear example in the documentation.

---

# 📖 Part 369 — Documentation Should Explain Meaning, Not Just Syntax

Weak documentation might say:

**`skeletonWidth: number`**

That tells us almost nothing beyond what TypeScript already tells us.

Better documentation explains:

🦴 **what a skeleton is**  
🔢 **where it starts**  
🌱 **how filling works**  
🌐 **why a 1 × 1 skeleton can produce seven hexagons**

The most valuable documentation often explains the **concept behind the parameter**, not merely its TypeScript type.

---

# 🧪 Part 370 — Tests and Documentation Have Different Jobs

We previously described tests as executable specifications.

That is true.

But a library user should not have to read the test suite before understanding basic usage.

Tests answer:

🧪 **Does the implementation behave as intended?**

Documentation answers:

📖 **How should I use this library, and what do its concepts mean?**

They complement one another.

---

# 📚 Part 371 — A Good Documentation Order

For Midgard, a new programmer could be introduced gradually.

First:

🌐 **What is Midgard Hex Grid?**

Then:

📦 **How do I install it?**

Then:

⬡ **Create one hexagon**

Then:

🌐 **Create a grid**

Then explain:

↔️↕️ **orientations**  
🦴 **skeletons**  
🌱 **fill-around**  
🎨 **layers**  
📍 **coordinates versus geometric positions**

Finally:

🔧 **lower-level API methods**

That order follows what the user needs to learn rather than simply following the alphabetical order of the source files.

---

# 🎯 Part 372 — Source-Code Order and Documentation Order Are Different

This is an important distinction.

When studying the implementation, it made sense for us to begin with foundational concepts such as:

🔢 `Coordinate`

and:

🧭 `GridOrientation`

But a library tutorial might begin immediately with:

🌐 **`HexGrid.createGrid()`**

Why?

Because a tutorial asks:

> **“How can I accomplish something useful?”**

while source-code study asks:

> **“How is this system constructed?”**

Those are different learning journeys.

---

# 🛡️ Part 373 — Public Versus Private

Now we reach one of the most important API-design questions:

**Should everything be public?**

Usually:

❌ **no**

Every public method becomes something library users may depend upon.

Once users depend on it, changing or removing it later becomes more difficult.

So public API surface should generally be intentional.

---

# 🔒 Part 374 — `createHexagon()` Is Private for a Reason

We already encountered:

🔒 **`createHexagon()`**

inside `HexGrid`.

It is useful internally.

But the library does not need to promise it as a public operation.

The meaningful public concepts are:

⬡ **“Create a single hexagon”**

and:

🌐 **“Create a grid”**

The helper exists because the implementation needs it.

That does not automatically mean consumers should depend upon it.

---

# 📦 Part 375 — Exporting a Class Is a Design Decision

This also means every export in:

🚪 **`index.ts`**

is a design decision.

When we export:

🐝 `NeighbourCalculator`

or:

⬡ `HexagonGeometry`

we are effectively saying:

> **“This is something another programmer may legitimately use directly.”**

That gives flexibility.

But it also enlarges the public surface of the library.

---

# ⚖️ Part 376 — A Larger Public API Has a Trade-Off

More public functionality means:

✅ **more flexibility**

but also:

📚 **more documentation**  
🧪 **more public behaviour to test**  
🔒 **more compatibility expectations**  
🧠 **more concepts visible to the user**

So:

> **more public methods ≠ automatically a better library.**

Sometimes the cleanest API is the smallest API that still supports the intended use cases.

---

# 🌐 Part 377 — Why the Current Combination Is Interesting

Midgard currently takes a relatively open approach.

It offers:

✨ **convenient high-level operations**

while also exposing:

🔧 **lower-level building blocks**

That makes sense for a library whose audience may want to use the hex-grid mathematics in ways that you have not anticipated.

For example, someone might want:

🐝 **neighbour relationships**

without ever drawing a hexagon.

Or:

📍 **center positions**

without using Midgard's complete grid-generation process.

The lower-level API makes those uses possible.

---

# 🧠 Part 378 — This Is a Good Reflection Trade-Off

You could reflect on this honestly:

> Exposing lower-level classes makes the library more flexible because consumers can use individual parts of the coordinate and geometry system. However, it also increases the public API surface and therefore the amount of behaviour that effectively becomes part of the library's contract. A smaller API centered only on `HexGrid` would be easier to learn but less flexible.

That demonstrates actual API-design reasoning.

---

# 🔢 Part 379 — Types Are Part of the User Experience

The exported types also matter.

A programmer receives meaningful structures such as:

🔢 **Coordinate**  
📍 **Point**  
📦 **Bounds**  
⬡ **Hexagon**  
🎨 **LayeredCoordinate**  
✨ **LayeredHexagon**

These types help an editor and TypeScript itself explain what the library returns.

So the API communicates through:

🏷️ **method names**  
🏷️ **parameter names**  
🧩 **types**  
📖 **documentation**  
🧪 **predictable behaviour**

All of these contribute to usability.

---

# 🧭 Part 380 — Orientation as a Union Type

Another nice API choice is:

**`GridOrientation`**

with only two valid alternatives:

↔️ `'x-dominated'`  
↕️ `'y-dominated'`

That is much clearer than accepting an arbitrary string.

TypeScript can immediately tell the programmer:

> **these are the supported orientations.**

This is a good example of the type system making an API easier to discover and harder to misuse.

---

# 🚧 Part 381 — Types Cannot Protect Everything

However, consider:

**`hexDiameter: number`**

TypeScript knows it is a number.

But it does not automatically know whether:

**0**  
**−100**

or:

**NaN**

should be acceptable in the domain.

Likewise, a type such as:

**`skeletonWidth: number`**

does not by itself mean:

**“positive integer.”**

So there is an important distinction:

### 🔷 Type correctness

**“This value is a number.”**

versus:

### 🎯 Domain correctness

**“This number makes sense as a Midgard skeleton width.”**

That is why domain validation can still matter even in strongly typed TypeScript code.

---

# 🧠 Part 382 — A Public API Should Be Hard to Misuse

One useful API-design goal is:

> **Make correct usage easy and incorrect usage difficult.**

Midgard already does some of this through:

🧭 **restricted orientation values**  
🏷️ **meaningful option names**  
✨ **high-level creation methods**  
🧩 **explicit return types**

But documentation and validation can strengthen it further.

---

# 💥 Part 383 — Error Behaviour Is Also Part of the API

Suppose a programmer supplies something impossible.

What should happen?

Possibilities include:

❌ **throw an error**  
🔄 **return an empty result**  
⚠️ **return some special result**  
🛡️ **reject the input through validation**

Whatever strategy a library chooses, it should ideally be:

**predictable and documented.**

Errors are not separate from API design.

They are part of the contract between the library and its consumer.

---

# 📖 Part 384 — Examples May Be More Valuable Than Long Explanations

For a programming library, one small working example can teach a great deal.

A user sees conceptually:

🌐 **create HexGrid**

⬇️

📏 **specify diameter**  
🦴 **specify skeleton dimensions**

⬇️

✨ **receive layered hexagons**

Immediately, several API relationships become clear.

Then prose can explain the deeper concepts.

This is why good library documentation often combines:

💡 **small examples**

➕

📖 **conceptual explanations**

➕

📚 **detailed API reference**

---

# 🎓 Part 385 — The Assignment's “Easy to Use and Learn” Requirement

This connects directly to the assignment's concern with the public API.

The question is not simply whether you have enough classes and methods.

The deeper question is:

> **Has the library been designed for another programmer rather than only for its author?**

That means considering which operations users genuinely need and which implementation details they should not need to understand.

---

# 🧪 Part 386 — Higher Quality Requires More Than Working Code

The higher-grade criteria also make documentation, examples, installation guidance and separation between the module and test application important.

That makes sense.

A reusable library is not really finished merely because:

✅ **its algorithms work**

Someone else must also be able to:

📦 **obtain it**  
🧠 **understand it**  
🛠️ **use it**  
🧪 **trust its behaviour**

without needing the original author sitting beside them.

---

# 🌟 Part 387 — The Library User Should Not Need Your Brain

This is perhaps the simplest way to express good library design.

While developing Midgard, **you** know why:

**(2,2)** is important,  
**matching parity** matters,  
**1 × 1** behaves specially,  
**diameter** changes meaning with orientation,  
and **z-index** increases by row.

But a future user does not have that knowledge.

The API, types, examples and documentation need to transfer enough of that understanding to them.

A reusable library succeeds when its design carries that knowledge instead of relying on the author's memory.

---

# 🧭 Part 388 — Three Views of Midgard

We can now view the project from three different perspectives.

### 👨‍💻 Library consumer

> “I want hex-grid functionality.”

They mainly see:

🌐 **public API**  
📖 **documentation**  
🧩 **exported types**

### 🛠️ Library maintainer

> “I need to understand or change Midgard.”

They see:

🔧 **specialized classes**  
🔗 **dependencies**  
🧪 **tests**  
🏗️ **architecture**

### 👤 End user of an application

They may know nothing about Midgard at all.

They simply see whatever application another programmer builds with it.

That distinction is fundamental to understanding what a **library** actually is.

---

# 📘 Part 389 — Next: Testing Strategy as Software Quality

We have already explained every test file individually.

But now we can examine testing from the **software-quality perspective** rather than file by file.

The next section will answer questions such as:

🧪 **What exactly is a unit test in this project?**  
🔗 **Which Midgard tests are more integration-like?**  
🎯 **What should we actually test?**  
🚫 **What should we avoid testing?**  
🛡️ **How do tests make refactoring safer?**  
🐛 **What kinds of bugs can this suite catch?**  
📊 **And most importantly: What does “convincing testing” actually mean for a library like Midgard?**
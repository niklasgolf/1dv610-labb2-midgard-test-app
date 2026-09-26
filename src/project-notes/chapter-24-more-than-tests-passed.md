# 📘 Part VII — Testing Strategy as Software Quality

## Part 390 — Testing Is More Than “67 Tests Passed”

Midgard currently has a very satisfying result:

🧪 **8 test files**  
✅ **67 tests passed**

But the number **67** is not what makes the testing convincing.

We could write 500 almost meaningless tests.

Or we could write a smaller collection of carefully chosen tests that protect the important behaviour of the library.

So the real question is:

> **What evidence does the test suite give us that Midgard works correctly?**

That is the software-quality perspective.

---

# 🎯 Part 391 — Test Behaviour, Not Merely Code

Suppose we have this domain rule:

🔢 **A valid Midgard coordinate must contain non-negative integers with matching parity.**

A useful test asks:

> **Does the validator actually enforce that rule?**

That is why `coordinate.test.ts` checks:

✅ **even/even**  
✅ **odd/odd**  
❌ **even/odd**  
❌ **odd/even**  
❌ **decimals**  
❌ **negative x**  
❌ **negative y**

The tests correspond to **meaningful behaviours and boundaries**, rather than simply trying to execute every line.

---

# 📊 Part 392 — Coverage and Confidence Are Not the Same Thing

Imagine a method containing:

🔀 **three important branches**

We could execute the method once and perhaps touch many lines.

That might improve a coverage percentage.

But perhaps we only tested:

🟢 **the easiest branch**

Then we still know very little about whether the other behaviours work.

So:

📊 **code coverage**

can be useful evidence,

but:

🛡️ **confidence in behaviour**

requires carefully selected test cases.

---

# 🧪 Part 393 — What Is a Unit Test?

A unit test normally focuses on a relatively small unit of behaviour in isolation.

For example:

🔢 **`CoordinateValidator`**

is an excellent candidate.

We create the validator.

We give it one coordinate.

We inspect the result.

There are very few moving parts.

If this test fails, we know almost immediately where to investigate.

---

# 🐝 Part 394 — `NeighbourCalculator` Is Another Clear Unit

The neighbour tests ask very focused questions.

For x-dominated orientation:

> **What are the six neighbours of (10,10)?**

For y-dominated orientation:

> **What are the six neighbours of (10,10)?**

These tests target one domain operation:

🐝 **neighbour calculation**

That makes them easy to understand and easy to diagnose when they fail.

---

# 🔗 Part 395 — What Makes a Test More Integration-Like?

Now compare that with:

🌐 **`HexGrid.createGrid()`**

To produce its result, several components collaborate.

The test exercises behaviour involving:

🦴 **range creation**  
🌱 **filling**  
🎨 **layering**  
📍 **positioning**  
⬡ **geometry**

So even though this is still an automated test inside the library, it is more **integration-like** than the tiny validator test.

It asks:

> **Do these pieces work correctly together through the public API?**

---

# 🧩 Part 396 — Midgard Benefits From Both Levels

The focused tests give us:

🔍 **precision**

The broader tests give us:

🌐 **confidence in collaboration**

That combination is powerful.

If only the broad tests existed, failures could be difficult to diagnose.

If only the tiny tests existed, every component could theoretically work individually while being connected incorrectly.

So Midgard benefits from both.

---

# 🛡️ Part 397 — Tests Protect Domain Rules

Some Midgard behaviours are especially important because they define the domain itself.

For example:

🔢 **matching coordinate parity**  
🦴 **skeleton starts at `(2,2)`**  
↔️↕️ **orientation-specific neighbour relationships**  
🌱 **larger skeletons automatically fill**  
🎨 **each new y-row advances the z-index by 100**  
📏 **diameter has orientation-dependent meaning**

If one of these rules accidentally changes, the program might still compile perfectly.

TypeScript cannot necessarily tell us:

> **“Your Midgard mathematics is now wrong.”**

Tests can.

---

# 🐛 Part 398 — Imagine a Tiny Bug in Neighbour Mathematics

Suppose someone changes the x-dominated right neighbour from:

➡️ `(x + 2, y)`

to:

➡️ `(x + 1, y)`

TypeScript may be perfectly happy.

Both expressions produce numbers.

The program compiles.

But the domain rule has been broken.

The neighbour test around `(10,10)` expects:

➡️ **(12,10)**

so the test fails immediately.

That demonstrates an important distinction:

### 🔷 Type checking asks:

> **Is this operation structurally/type-correct?**

### 🧪 Testing asks:

> **Does this operation produce the intended behaviour?**

---

# 🌱 Part 399 — Tests Protect Special Cases

The 1 × 1 range is another good example.

Midgard intentionally distinguishes:

⬡ **1 × 1 without fill**

from:

🌼 **1 × 1 with fill**

The filler tests demonstrate:

**without fill → 1 coordinate**

**with fill → 7 coordinates**

That special behaviour could easily be damaged during later refactoring.

The tests preserve the intended contract.

---

# 🚧 Part 400 — Boundary Tests Are Particularly Valuable

Many bugs occur at boundaries.

For `CoordinateRange`, the minimum legal dimension is:

**1**

So testing:

✅ **1**

and:

❌ **0**

is particularly useful.

Likewise:

❌ **1.5**

tests the integer requirement.

This is often more informative than testing only many ordinary values such as:

**3, 4, 5, 6…**

The boundary tells us where behaviour changes.

---

# ↔️↕️ Part 401 — Both Orientations Must Be Protected

Midgard effectively contains two related geometric systems:

↔️ **x-dominated**

and:

↕️ **y-dominated**

Testing only one would leave a major portion of the library weakly protected.

That is why the suite repeatedly checks both.

We see this in:

🐝 **neighbours**  
📍 **positioning**  
⬡ **geometry**  
🌱 **filled ranges**  
🌐 **`HexGrid`**

This is not pointless duplication.

Orientation is one of the central dimensions of behaviour in the library.

---

# 📐 Part 402 — Mathematical Tests Need Appropriate Assertions

Geometry introduces floating-point values such as:

**√3**

Therefore the mathematically expected result may be:

**100√3**

while the computer stores an approximation such as:

**173.205080756…**

That is why the tests use approximate comparison where appropriate rather than demanding inappropriate exact floating-point equality.

The assertion strategy should match the nature of the value being tested.

---

# 🧠 Part 403 — A Good Test Should Have a Clear Reason to Exist

For every test, we should ideally be able to answer:

> **What mistake would this test catch?**

Examples:

❌ **wrong parity rule**  
➡️ coordinate tests catch it.

❌ **wrong orientation branch**  
➡️ dispatcher tests catch it.

❌ **duplicate coordinates during filling**  
➡️ filled-range tests catch it.

❌ **sorting mutates caller's array**  
➡️ coordinate-layer test catches it.

❌ **wrong hexagon dimensions**  
➡️ geometry tests catch it.

❌ **components connected incorrectly**  
➡️ `HexGrid` tests catch it.

That is much more meaningful than simply accumulating test cases.

---

# 🚫 Part 404 — Avoid Testing Implementation Details Without a Reason

Suppose a public operation returns exactly the correct result.

Should a test necessarily demand that the implementation used:

🔁 **exactly two loops**  
📦 **a particular temporary variable**  
🔒 **a specific private helper**

Usually not.

Those are implementation details.

If tests become tightly coupled to such details, harmless refactoring can break the tests even though the library still behaves correctly.

---

# 🎯 Part 405 — Prefer Observable Behaviour

A stronger test usually says:

> **Given this input, I expect this observable result.**

For example:

Given:

🦴 **a 3 × 2 skeleton**

expect:

🔢 **these skeleton coordinates**

Or:

Given:

📍 **these points**

expect:

📦 **these bounds**

That allows the implementation to improve later while preserving the contract.

---

# 🔒 Part 406 — Private Methods Usually Do Not Need Direct Tests

Remember:

🔒 **`HexGrid.createHexagon()`**

It is private.

We do not necessarily need a dedicated test calling that helper directly.

Its behaviour is already exercised through public operations such as:

⬡ **`createSingleHexagon()`**

and:

🌐 **`createGrid()`**

This is useful because the private implementation can later be reorganized without forcing consumers—or tests—to depend on it directly.

---

# ♻️ Part 407 — This Makes Refactoring Safer

Suppose we completely rewrite how:

🌱 **duplicate detection**

works.

Maybe today we scan an array.

Later we might use another internal data structure.

If the externally observable result remains identical:

✅ **the behavioural tests should continue passing**

That gives us freedom to improve the implementation without changing the library contract.

---

# 🔴 Part 408 — The Red–Green–Refactor Idea

This relates to a famous testing workflow:

🔴 **Red**  
Write or observe a failing test.

⬇️

🟢 **Green**  
Write enough implementation to make it pass.

⬇️

🔵 **Refactor**  
Improve the implementation while keeping the tests green.

Even when a project is not developed with strict test-driven development, the final stage remains extremely useful:

🛡️ **tests provide protection while restructuring code**

---

# 🔍 Part 409 — Tests Can Reveal Design Problems Too

Testing is not only about catching arithmetic errors.

Sometimes code is difficult to test because it has too many responsibilities or dependencies.

Imagine one method simultaneously:

📍 **calculates geometry**  
🌐 **accesses a network**  
💾 **writes a database**  
🖥️ **manipulates the DOM**

Testing that method in isolation becomes much harder.

Midgard's separation into small mathematical/domain components makes many operations naturally easy to test.

---

# 🧩 Part 410 — Testability and Design Often Reinforce Each Other

Consider:

🐝 **`NeighbourCalculator`**

Input:

🔢 **one coordinate**

Output:

🐝 **six coordinates**

No database.

No browser.

No network.

No global state.

That makes the class extremely predictable.

The same applies to much of Midgard's geometry.

These kinds of deterministic calculations are excellent candidates for unit testing.

---

# 🎲 Part 411 — Deterministic Behaviour Is Powerful

If we call:

🐝 **x-dominated neighbours of `(10,10)`**

today,

tomorrow,

on another computer,

or:

**1,000 times**

the answer should be identical.

There is no:

🕐 **current time**  
🎲 **randomness**  
🌐 **server response**  
👤 **user account**

involved.

That makes the core library especially suitable for automated testing.

---

# 🧪 Part 412 — What Does “Convincing Testing” Mean Here?

For Midgard, convincing testing should provide evidence across several dimensions:

### 🔢 Domain rules

Coordinate validity and parity.

### ↔️↕️ Configuration variants

Both orientations.

### 🚧 Boundaries and edge cases

Zero, decimals, empty point collections, 1 × 1 ranges.

### 📐 Mathematical correctness

Centers, corners and bounds.

### 🌱 Collection behaviour

Filling and duplicate prevention.

### 🎨 Ordering/layering

Sorting and z-index.

### 🌐 Component collaboration

High-level `HexGrid` operations.

That is far more persuasive than merely saying:

> **“I wrote 67 tests.”**

---

# 📊 Part 413 — Number of Tests Is Supporting Evidence

The fact that:

✅ **67 tests pass**

is still useful.

It tells us the suite is substantial and currently green.

But in a reflection, the stronger argument is:

> **what those tests cover and why those cases were selected**

Quantity supports the argument.

It should not replace the argument.

---

# ⚠️ Part 414 — Testing Can Never Prove Absence of Every Bug

Even a good test suite does not mathematically prove:

> **“There are no bugs anywhere.”**

Tests demonstrate that:

> **the behaviours we selected work for the tested cases**

There may still be cases we did not consider.

This is why thoughtful test selection matters.

---

# 🔎 Part 415 — Asking “What Haven't We Tested?”

A mature testing discussion should therefore include:

> **What remains uncertain?**

For example, depending on the intended public contract, we might ask whether there should be more tests around invalid high-level options such as:

📏 **invalid diameter values**  
🦴 **invalid skeleton dimensions passed through the façade**  
⚠️ **other malformed public input**

That does not mean the current suite is bad.

It means testing is also about identifying the boundaries of our confidence.

---

# 🧠 Part 416 — Tests Document Decisions

There is another benefit.

Months from now, someone may wonder:

> **“Was it intentional that larger skeletons fill even if `fillAround` is false?”**

The test answers:

✅ **yes**

That exact behaviour is explicitly tested.

Tests therefore preserve design decisions that might otherwise exist only in the original author's memory.

---

# 📚 Part 417 — The Suite Tells a Story

Read conceptually from bottom to top:

🔢 **What coordinates are legal?**

⬇️

🐝 **How are coordinates related?**

⬇️

🦴 **How do we create skeletons?**

⬇️

🌱 **How do skeletons become complete ranges?**

⬇️

📍 **Where do coordinates appear geometrically?**

⬇️

⬡ **What shape do they have?**

⬇️

🎨 **How are they layered?**

⬇️

🌐 **Does the complete public API work?**

The tests mirror the conceptual construction of the library.

---

# 🎓 Part 418 — A Strong Testing Reflection

A useful reflection could therefore say:

> I used focused unit tests for individual domain rules and calculations, such as coordinate validation, neighbour relationships, positioning and geometry. I also used broader tests through `HexGrid` to verify that the components work together through the public API. I selected tests for both orientations, important boundaries and special cases such as the 1 × 1 range. The purpose was not only to increase the number of tests but to protect the library's important behavioural rules and make later refactoring safer.

That explains a **testing strategy**, not merely a test count.

---

# 🛡️ Part 419 — The Bigger Software-Quality Picture

Testing now connects to everything else we have discussed.

🎯 **focused responsibilities**

make:

🧪 **focused tests easier**

📦 **abstraction**

allows:

🧪 **tests to target public behaviour**

🛡️ **encapsulation**

allows:

♻️ **internal refactoring**

🏷️ **clear names**

make:

📖 **tests readable as specifications**

So testing is not an isolated activity added after programming.

It interacts directly with software design.

---

# 📘 Part 420 — Next: Domain Modeling and OOP

There is one major perspective we have not yet explored deeply.

Your university work focuses strongly on:

🧠 **domain modeling**

and:

🏛️ **object-oriented thinking**

Midgard gives us an excellent concrete example.

We can ask:

❓ **What is the domain?**  
❓ **Which concepts became types?**  
❓ **Which concepts became classes?**  
❓ **Which relationships are associations or dependencies?**  
❓ **Where is state stored?**  
❓ **Where is behaviour placed?**  
❓ **Why is `Coordinate` a type while `CoordinateRange` is a class?**

And perhaps most importantly:

> **How did a real-world conceptual model become TypeScript code?**

That will connect Midgard directly to the OOP and domain-modeling ideas you are studying in 1DV607.
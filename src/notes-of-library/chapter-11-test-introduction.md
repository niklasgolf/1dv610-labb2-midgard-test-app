# 🧪 Part II — Testing Midgard Hex Grid

## Chapter 11 — Why Do We Test the Library?

Perfect. We now have the **eight test files**, corresponding to the main functional parts of Midgard:

🔢 `coordinate.test.ts`  
🐝 `neighbours.test.ts`  
🦴 `coordinate-range.test.ts`  
🌱 `coordinate-range-fill.test.ts`  
📍 `coordinate-positioner.test.ts`  
⬡ `geometry.test.ts`  
🎨 `coordinate-layer.test.ts`  
🔷 `hex-grid.test.ts`

Rather than immediately going test by test, we should first understand **what these files are actually doing for us**.

This is a different way of reading code.

---

# 🧠 Part 71 — Production Code Asks One Question, Tests Ask Another

In Part I we studied the source code.

There our main question was:

> **“How does Midgard work?”**

Now our question changes to:

> **“How do we demonstrate that Midgard behaves as intended?”**

For example, the coordinate validator says that:

✅ **even/even is valid**  
✅ **odd/odd is valid**  
❌ **even/odd is invalid**  
❌ **odd/even is invalid**  
❌ **decimals are invalid**  
❌ **negative coordinates are invalid**

The test file deliberately checks all of these situations.

So the tests are not another implementation of Midgard.

They are a collection of **expectations about Midgard**.

---

# 🧪 Part 72 — Vitest

All eight files begin by importing things such as:

**`describe`**  
**`it`**  
**`expect`**

from **Vitest**.

For example, the coordinate tests import these before importing `CoordinateValidator`.

These three words form the basic language of our tests.

---

## 📚 `describe`

`describe` groups related tests.

For example, the layering tests have a group called:

**`sortCoordinates`**

and another called:

**`getLayeredCoordinates`**

So `describe` helps organize the test suite according to the functionality being tested.

---

# 🧪 `it`

Inside those groups we find individual tests using:

**`it`**

The text should describe one expected behaviour.

For example:

> **“sorts coordinates by y first and x second”**

That is a remarkably useful sentence.

Even without reading the implementation, we know what behaviour this test is trying to prove.

---

# 🎯 `expect`

Finally we have:

**`expect`**

This is where the test says:

> **“Here is what the result must be.”**

For example, after sorting coordinates, the test expects them to appear with the lowest y first and x sorted within each row.

Conceptually, most of our tests therefore follow a very simple pattern:

🧱 **Arrange**  
Prepare the objects and input.

⬇️

⚙️ **Act**  
Call the method being tested.

⬇️

🎯 **Assert**  
Check that the result matches our expectation.

---

# 🔢 Part 73 — A Tiny Example From Our Own Tests

Consider one of the simplest coordinate tests.

First we prepare:

**coordinate = (10,10)**

Then we create:

🛡️ **CoordinateValidator**

Then we call:

**`isValidCoordinate()`**

Finally:

**`expect(result).toBe(true)`**

That follows the pattern beautifully:

🧱 **Arrange**  
Coordinate `(10,10)` and validator.

⚙️ **Act**  
Validate the coordinate.

🎯 **Assert**  
The answer must be `true`.

---

# 💡 Part 74 — Tests Are Executable Specifications

There is a useful way of thinking about tests:

> 📖 **They describe the rules of Midgard in a form the computer can execute.**

Take our coordinate-range rules.

We claim that a 1 × 1 skeleton begins at:

**(2,2)**

The test actually creates a 1 × 1 range, calls `getSkeleton()`, and requires the result to contain exactly `(2,2)`.

We claim that a 3 × 2 skeleton should contain:

**(2,2) (4,2) (6,2)**

and:

**(2,4) (4,4) (6,4)**

The test requires exactly that.

So our documentation can say:

> **“This is how skeletons work.”**

Our implementation says:

> **“This is how I create them.”**

And our tests say:

> **“Prove that the implementation actually produces them.”**

---

# 🛡️ Part 75 — Testing the Happy Path Is Not Enough

Good tests should not only check situations where everything is valid.

Look at `CoordinateRange.isValid()`.

The tests verify valid ranges such as:

**1 × 1**

and:

**3 × 2**

But they also deliberately try:

❌ **width = 1.5**  
❌ **height = 1.5**  
❌ **width = 0**  
❌ **height = 0**

This is important because validation code exists specifically to distinguish good input from bad input.

If we tested only valid input, we would only have demonstrated half of its responsibility.

---

# 🧭 Part 76 — Both Orientations Need Testing

Midgard has two orientations:

↔️ **x-dominated**  
↕️ **y-dominated**

So whenever orientation changes behaviour, our tests should demonstrate both sides.

The neighbour tests do exactly this.

For x-dominated `(10,10)`, the two straight neighbours are:

**(8,10)** and **(12,10)**

For y-dominated `(10,10)`, they instead become:

**(10,8)** and **(10,12)**

The same principle appears in the positioning tests.

For x-dominated `(2,2)` with dimension 100, the expected center is:

**x = 100**  
**y = 100 × √3**

For y-dominated, those roles are reversed:

**x = 100 × √3**  
**y = 100**

So our test suite is checking an important symmetry in the design.

---

# 🔬 Part 77 — Unit Tests and Integration-Like Tests

Our test suite also operates at different levels.

Most files focus on one specialized class.

For example:

🐝 `neighbours.test.ts` tests `NeighbourCalculator`.  
⬡ `geometry.test.ts` tests `HexagonGeometry`.  
🎨 `coordinate-layer.test.ts` tests `CoordinateLayer`.

These are strongly focused tests.

---

## 🔷 `hex-grid.test.ts` is different

`HexGrid` coordinates many of those components.

So when we test `createGrid()`, we are testing a larger journey through the system.

For example, one test asks `HexGrid` to create a grid from a **1 × 1 skeleton** and expects:

**7 layered hexagons**

distributed over three y-rows with z-index values:

**100**  
**200**  
**300**

For that test to succeed, several concepts must work together:

🦴 **skeleton creation**  
🐝 **neighbours**  
🌱 **filling**  
🔀 **sorting**  
🎨 **layering**  
📍 **positioning**  
⬡ **geometry**  
🔷 **high-level grid creation**

So this gives us confidence not merely that the individual pieces work, but that they can cooperate correctly.

---

# 🧩 Part 78 — Testing Internal Rules and Public Behaviour

This combination is valuable.

Imagine we only tested `createGrid()`.

If something failed, it might be difficult to know whether the problem was:

🐝 **neighbour calculation**  
🌱 **filling**  
📍 **positioning**  
⬡ **geometry**

or:

🎨 **layering**

But because those components have their own tests, failures can be much easier to locate.

At the same time, if we tested **only** the small classes, we could know that each piece works independently without proving that the complete high-level operation works correctly.

So our suite contains both ideas:

🔬 **Focused tests of individual responsibilities**

and:

🌐 **Tests of the assembled public behaviour**

---

# 🎯 Part 79 — Tests Also Protect Future Changes

Suppose that six months from now we change `CoordinateRangeFiller`.

Perhaps we find a cleaner algorithm.

The new code may look completely different.

That does not necessarily matter.

What matters is whether its **behaviour remains correct**.

Our existing tests already specify, among other things, that a filled x-dominated 1 × 1 skeleton must contain the center coordinate and its six neighbours.

So after refactoring, we run the tests again.

If they still pass:

✅ **our new implementation still satisfies that tested behaviour.**

If one suddenly fails:

🚨 **we know that our change altered something the test suite expects.**

This is one of the major practical benefits of automated testing:

> **Tests give us confidence to change code without manually rechecking everything every time.**

---

# 📐 Part 80 — Exact Values Versus Approximate Values

There is one more testing detail worth noticing before we examine the files individually.

Sometimes our tests use:

`toBe()`

Sometimes:

`toEqual()`

And sometimes:

`toBeCloseTo()`

These are not interchangeable.

---

## 🎯 `toBe()`

Useful for exact primitive values:

**true**  
**false**  
**0**  
**100**

For example, the origin positioning test expects x and y to be exactly zero.

---

## 🧩 `toEqual()`

Useful when comparing structures such as objects and arrays.

For example, we can require an entire neighbour array to contain exactly the expected coordinate objects.

---

## 📐 `toBeCloseTo()`

Geometry often involves:

**√3**  
**division**  
**floating-point arithmetic**

Those calculations can produce tiny numerical differences.

So geometric tests often use:

`toBeCloseTo()`

instead of demanding strict floating-point equality.

Our position tests use this when checking values such as:

**100 × √3**

That is an important practical testing technique for mathematical software.

---

# 🌟 The Test Suite Mirrors the Architecture

There is something satisfying about the overall structure.

Our source code was divided by responsibility.

The test suite largely mirrors those same responsibilities:

🔢 **Coordinate rules → coordinate tests**  
🐝 **Neighbour rules → neighbour tests**  
🦴 **Skeleton rules → coordinate-range tests**  
🌱 **Filling rules → range-filler tests**  
📍 **Positioning mathematics → positioner tests**  
⬡ **Shape mathematics → geometry tests**  
🎨 **Rendering order → layer tests**  
🔷 **Complete public behaviour → HexGrid tests**

So the tests themselves give us another map of the library.
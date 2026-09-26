# 🧪 Chapter 16 — `coordinate-positioner.test.ts`

## Part 135 — From Logical Coordinates to Real Positions

So far, most of our tests have lived in the **logical Midgard world**.

We have dealt with coordinates such as:

🔢 **(2,2)**  
🔢 **(4,2)**  
🔢 **(3,3)**

But these coordinates are not yet positions that we can directly use to draw hexagons.

For drawing, we need actual geometric positions:

📍 **x = some distance**  
📍 **y = some distance**

That conversion is the responsibility of:

`CoordinatePositioner`

The test file is divided into three sections:

↔️ **`getXDominatedCenterPosition()`**  
↕️ **`getYDominatedCenterPosition()`**  
🧭 **`getCenterPosition()`**

---

# ↔️ Part 136 — Testing the X-Dominated Origin

The first test creates an:

↔️ **x-dominated `CoordinatePositioner`**

and gives it:

**coordinate = (0,0)**  
**dimension = 100**

The expected geometric position is:

📍 **x = 0**  
📍 **y = 0**

---

# 🧠 Why Is `(0,0)` Such a Useful Test?

Because it gives us a mathematical anchor point.

Whatever the spacing formulas are, multiplying them by zero should produce zero.

Conceptually:

**logical x = 0**

× horizontal step

=

**geometric x = 0**

and:

**logical y = 0**

× vertical step

=

**geometric y = 0**

So this test checks a very simple but important invariant:

> 🎯 **The logical origin maps to the geometric origin.**

---

# 📐 Part 137 — Testing a Real X-Dominated Position

The next test is more interesting.

It uses:

**coordinate = (2,2)**

and:

**dimension = 100**

Because the positioner is x-dominated, that 100 represents the:

↔️ **complete hexagon width**

The expected center is:

**x = 100**  
**y = 100 × √3**

---

# 🧮 Part 138 — Why Does x Become 100?

From the source code we already learned that for an x-dominated hexagon:

**xStep = width / 2**

With width 100:

**xStep = 50**

Our logical x-coordinate is:

**2**

Therefore:

**2 × 50 = 100**

So:

📍 **center.x = 100**

---

# 📐 Why Does y Become `100 × √3`?

For an x-dominated hexagon, the full hexagon height is:

**200 / √3**

The vertical step between Midgard coordinate units is three quarters of that height:

**(200 / √3) × 3/4**

which simplifies to:

**150 / √3**

and that is mathematically equivalent to:

**50√3**

Our logical y-coordinate is 2:

**2 × 50√3**

=

**100√3**

So the expected y-position is:

📍 **100 × √3**

This is exactly what the test checks.

---

# 🔍 Part 139 — Why `toBeCloseTo()`?

Notice something subtle.

The x assertion uses:

`toBe(100)`

But the y assertion uses:

**`toBeCloseTo(100 × Math.sqrt(3))`**

Why?

Because √3 is irrational:

**√3 ≈ 1.732050807568877...**

Computers represent floating-point numbers with finite precision.

For geometric calculations involving square roots and division, demanding perfect equality can make tests unnecessarily fragile.

So:

🎯 `toBe()` means essentially **exactly this value**

while:

📐 `toBeCloseTo()` means **numerically sufficiently close to this value**

For geometry, that distinction is very useful.

---

# ↕️ Part 140 — Testing the Y-Dominated Origin

Now we rotate the system.

The next group creates a:

↕️ **y-dominated `CoordinatePositioner`**

and again tests:

**(0,0)**

with dimension:

**100**

The expected result remains:

📍 **x = 0**  
📍 **y = 0**

This is important.

Changing orientation changes the spacing formulas.

It does **not** change where the origin is.

---

# 🔄 Part 141 — Testing a Real Y-Dominated Position

Now we again use:

**(2,2)**

and dimension:

**100**

but with y-dominated orientation.

This time the expected result is:

📍 **x = 100 × √3**  
📍 **y = 100**

Compare that with the x-dominated result:

### ↔️ X-dominated

**x = 100**  
**y = 100√3**

### ↕️ Y-dominated

**x = 100√3**  
**y = 100**

There is a beautiful symmetry here.

---

# 📐 Part 142 — The Meaning of `dimension` Changes With Orientation

This is also where an important API concept becomes visible.

The number:

**100**

does not always describe the same physical axis.

For:

↔️ **x-dominated**

100 means the full **width** of the hexagon.

For:

↕️ **y-dominated**

100 means the full **height** of the hexagon.

The tests demonstrate that distinction through the expected center positions.

---

# 🧭 Part 143 — Testing the General `getCenterPosition()`

We now encounter the same testing pattern that appeared in `NeighbourCalculator`.

We have already tested the specialized calculations:

↔️ **x-dominated positioning**  
↕️ **y-dominated positioning**

But ordinary callers can use:

`getCenterPosition()`

and let the object's orientation determine which calculation is appropriate.

So we also need to test the dispatcher.

---

# ↔️ Part 144 — Dispatcher With X-Dominated Orientation

The test creates:

**`CoordinatePositioner('x-dominated')`**

Then it calls the general:

`getCenterPosition()`

for:

**(2,2)**

with dimension:

**100**

It expects:

**x = 100**  
**y ≈ 100√3**

So the general method correctly behaves like the x-dominated calculation.

---

# ↕️ Part 145 — Dispatcher With Y-Dominated Orientation

The final test creates:

**`CoordinatePositioner('y-dominated')`**

and again calls:

`getCenterPosition()`

rather than the specialized method.

Now the expected result is:

**x ≈ 100√3**  
**y = 100**

So both branches of the dispatcher are tested.

---

# 🌳 Part 146 — The Same Testing Pattern Appears Again

Compare this with `NeighbourCalculator`.

There we had:

↔️ `getXDominatedNeighbours()`  
↕️ `getYDominatedNeighbours()`  
🧭 `getNeighbours()`

Here we have:

↔️ `getXDominatedCenterPosition()`  
↕️ `getYDominatedCenterPosition()`  
🧭 `getCenterPosition()`

And in both cases, the tests follow the same strategy:

**1. Test the x-specific calculation.**  
**2. Test the y-specific calculation.**  
**3. Test that the general method chooses correctly.**

That consistency makes both the production design and the test design easier to understand.

---

# 🔢 Part 147 — Coordinate Versus Position

These tests also reinforce one of the most important conceptual distinctions in Midgard.

When we give the method:

🔢 **Coordinate (2,2)**

we are **not** saying:

> “Draw something at pixel x=2, y=2.”

Instead, `(2,2)` identifies a location in the logical Midgard coordinate system.

The positioner converts it into something like:

📍 **Point (100, 173.205...)**

for an x-dominated hexagon with width 100.

So:

🔢 **Coordinate**

answers:

> **Where am I in the Midgard grid?**

while:

📍 **Point**

answers:

> **Where is that location in geometric 2D space?**

---

# 🧪 Part 148 — What Does This Test File Establish?

`coordinate-positioner.test.ts` demonstrates that:

🎯 **`(0,0)` maps to the geometric origin in both orientations.**  
↔️ **x-dominated coordinates use the correct horizontal and vertical spacing.**  
↕️ **y-dominated coordinates use the rotated spacing relationship.**  
📐 **floating-point geometric values are compared appropriately.**  
🧭 **`getCenterPosition()` dispatches to the correct orientation-specific calculation.**

---

# 🧩 Where Are We in the Complete Pipeline?

At this point our tests have verified:

🔢 **valid logical coordinates**

⬇️

🐝 **neighbour relationships**

⬇️

🦴 **skeleton generation**

⬇️

🌱 **complete filled coordinate ranges**

⬇️

📍 **geometric center positions**

But a center point is still not a hexagon.

If we know:

**center = (100,173.205...)**

we still need to calculate:

⬡ **Where are the six corners?**

That is the next responsibility.
# 🧪 Chapter 13 — `neighbours.test.ts`

## Part 92 — Testing the Six Neighbours

Now we move from:

🔢 **“Is this coordinate valid?”**

to:

🐝 **“Which coordinates surround it?”**

The class under test is:

`NeighbourCalculator`

The test file is organized into three sections:

↔️ `getXDominatedNeighbours`  
↕️ `getYDominatedNeighbours`  
🧭 `getNeighbours`

This organization mirrors the design of the production class itself.

---

# ↔️ Part 93 — Testing the X-Dominated Neighbours

The first group tests:

`getXDominatedNeighbours()`

The tests use the coordinate:

**(10,10)**

and create an x-dominated `NeighbourCalculator`.

Why `(10,10)`?

It is comfortably away from zero, so all six neighbours remain non-negative. It also makes the coordinate changes very easy to see.

---

# 🔢 First Question: Are There Six?

The first test does something deliberately simple.

After asking for the neighbours, it checks:

**the array has length 6**

This tests one fundamental property of a hexagonal grid:

⬡ **A hexagon has six neighbouring positions.**

But notice what this test does **not** prove.

Imagine the method returned:

**(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)**

There would still be six items.

So the test would pass even though the neighbours were completely wrong.

That is why we need the next test.

---

# 🎯 Part 94 — Testing the Exact X-Dominated Coordinates

The second test asks a stronger question:

> **Are they the correct six neighbours?**

For `(10,10)`, it expects:

⬅️ **(8,10)**  
➡️ **(12,10)**  
↖️ **(9,9)**  
↗️ **(11,9)**  
↙️ **(9,11)**  
↘️ **(11,11)**

This corresponds exactly to the x-dominated neighbour rule we studied earlier.

---

# 🧮 Look at the Coordinate Changes

The two straight horizontal neighbours change x by **2**:

**(10,10) → (8,10)**  
**(10,10) → (12,10)**

The four diagonal neighbours change both coordinates by **1**:

**(10,10) → (9,9)**  
**(10,10) → (11,9)**  
**(10,10) → (9,11)**  
**(10,10) → (11,11)**

So this test does much more than prove:

> **“There are six.”**

It proves the actual coordinate relationship.

---

# 🧠 Part 95 — Why Have Both Tests?

At first, these two tests may seem slightly repetitive.

The second test already supplies an array containing six coordinates.

So why separately test that there are six?

Because the tests communicate **two distinct requirements**:

1️⃣ A hexagon must have **six neighbours**.  
2️⃣ Those neighbours must be at the **correct coordinates**.

This makes the intention very explicit.

A reader scanning the test names can immediately understand both requirements.

---

# ↕️ Part 96 — Testing the Y-Dominated Neighbours

The next group repeats the same strategy for:

`getYDominatedNeighbours()`

Again, we start with:

**(10,10)**

and again the first test checks:

**exactly six neighbours are returned**

But this time the calculator is:

↕️ **y-dominated**

---

# 🎯 The Expected Y-Dominated Neighbours

The exact-coordinate test expects:

⬆️ **(10,8)**  
⬇️ **(10,12)**  
↖️ **(9,9)**  
↗️ **(11,9)**  
↙️ **(9,11)**  
↘️ **(11,11)**

---

# 🔄 Compare the Two Orientations

This comparison makes the orientation concept extremely clear.

### ↔️ X-dominated

The straight movement is horizontal:

**(x − 2, y)**  
**(x + 2, y)**

### ↕️ Y-dominated

The straight movement is vertical:

**(x, y − 2)**  
**(x, y + 2)**

### 🔶 Both orientations

The four diagonal relationships remain:

**(x − 1, y − 1)**  
**(x + 1, y − 1)**  
**(x − 1, y + 1)**  
**(x + 1, y + 1)**

The tests make this difference visible with concrete numbers.

---

# 🧭 Part 97 — Now Test `getNeighbours()`

So far we have directly tested the two specialized methods:

↔️ `getXDominatedNeighbours()`  
↕️ `getYDominatedNeighbours()`

But programmers should not always have to choose the correct specialized method themselves.

The class also has:

`getNeighbours()`

This is the general method.

Its job is essentially:

> **Look at my orientation and choose the correct neighbour algorithm.**

So now we need to test that decision.

---

# ↔️ Part 98 — Does the General Method Choose X-Dominated?

The test creates:

**`new NeighbourCalculator('x-dominated')`**

Then instead of calling the specialized x method, it calls:

**`getNeighbours()`**

The expected result is the x-dominated neighbour set.

This tests the dispatching logic.

Conceptually:

**orientation = x-dominated**

⬇️

🧭 `getNeighbours()`

⬇️

↔️ **x-dominated calculation**

⬇️

🐝 **correct six neighbours**

---

# ↕️ Part 99 — Does It Choose Y-Dominated?

The final test does the mirror image.

It creates:

**`new NeighbourCalculator('y-dominated')`**

calls:

`getNeighbours()`

and expects the y-dominated neighbour set.

So we have now demonstrated both branches:

↔️ **x-dominated → x algorithm**  
↕️ **y-dominated → y algorithm**

---

# 🌳 Part 100 — We Are Testing a Branch

This introduces an important testing concept.

`getNeighbours()` contains a **decision**.

Depending on orientation, the program follows one path or another.

We can visualize it like this:

🧭 **What orientation?**

↙️　　　　　　　　　↘️

↔️ **x-dominated**　　　↕️ **y-dominated**

⬇️　　　　　　　　　⬇️

**x calculation**　　　　**y calculation**

A useful test suite should exercise **both branches**.

And that is exactly what these two tests do.

---

# 🔗 Part 101 — Another Important Connection: Parity Is Preserved

There is also something deeper hidden inside these expected results.

We start with:

**(10,10)**

which is:

**even + even**

and therefore valid.

Look at the x-dominated neighbours:

**(8,10)** → even/even  
**(12,10)** → even/even  
**(9,9)** → odd/odd  
**(11,9)** → odd/odd  
**(9,11)** → odd/odd  
**(11,11)** → odd/odd

Every neighbour still follows the Midgard parity rule.

The same is true for the y-dominated neighbours.

So the neighbour algorithm naturally moves from one valid Midgard coordinate to other valid Midgard coordinates.

---

# 🧪 Part 102 — What Does This Test File Establish?

The complete `neighbours.test.ts` demonstrates:

🐝 **every neighbour calculation returns six coordinates**  
↔️ **the x-dominated formulas produce the expected positions**  
↕️ **the y-dominated formulas produce the expected positions**  
🧭 **the general `getNeighbours()` method chooses the x algorithm when appropriate**  
🧭 **the same method chooses the y algorithm when appropriate**

---

# 🧩 A Useful Testing Pattern Appears

This file gives us a nice pattern:

### First test the specialized operations

↔️ **Does the x algorithm work?**  
↕️ **Does the y algorithm work?**

### Then test the method that coordinates them

🧭 **Does `getNeighbours()` select the right one?**

That means if a future test fails, we get useful clues.

Suppose:

✅ `getXDominatedNeighbours()` passes  
✅ `getYDominatedNeighbours()` passes  
❌ x-dominated `getNeighbours()` fails

Then the mathematical algorithms are probably not the problem.

The problem is more likely in the **selection/dispatching logic**.

This is one reason focused unit tests are valuable: they can help us locate where a problem lives.
# 🧪 Chapter 18 — `coordinate-layer.test.ts`

## Part 166 — Adding a Visual Layer to the Grid

We now know:

🔢 **which coordinates exist**  
📍 **where their centers are**  
⬡ **where their six corners are**

But Midgard also needs information about **drawing order**.

When hexagons visually overlap, we may want a lower row drawn first and a later row drawn above it.

That is the responsibility of:

`CoordinateLayer`

The test file concentrates on two methods:

🔀 **`sortCoordinates()`**  
🎨 **`getLayeredCoordinates()`**

---

# 🔀 Part 167 — Testing the Sorting Rule

The first test deliberately supplies coordinates in an unsorted order:

**(4,2)**  
**(3,1)**  
**(2,0)**  
**(1,1)**  
**(2,2)**

The job of `sortCoordinates()` is to organize them according to Midgard's rendering order.

The primary sorting rule is:

↕️ **y first**

and when two coordinates have the same y:

↔️ **x second**

---

# 🧮 Part 168 — Sort by y First

Let's group the coordinates by y.

### y = 0

**(2,0)**

### y = 1

**(3,1)**  
**(1,1)**

### y = 2

**(4,2)**  
**(2,2)**

So immediately we know that all coordinates with y=0 must come first, then y=1, then y=2.

---

# ↔️ Part 169 — Then Sort by x

Within each y-row, x determines the order.

For y=1 we have:

**(3,1)** and **(1,1)**

Since:

**1 < 3**

the correct order is:

**(1,1)**  
**(3,1)**

Likewise for y=2:

**(2,2)** comes before **(4,2)**.

---

# 🎯 The Complete Expected Order

The test therefore expects:

**(2,0)**  
**(1,1)**  
**(3,1)**  
**(2,2)**  
**(4,2)**

This proves both levels of the sorting rule:

> **first y, then x.**

---

# 🧠 Part 170 — Why Sort at All?

Later we want to assign layers according to rows.

Imagine coordinates arriving in this order:

**y=2**  
**y=0**  
**y=1**  
**y=2**  
**y=0**

It would be awkward to assign row-based z-indexes directly.

Sorting first transforms them into:

**y=0 → y=1 → y=2**

Now the algorithm can simply move through the array and notice:

> **“Ah, y changed. I have reached a new row.”**

That makes the layering algorithm much simpler.

---

# 🛡️ Part 171 — Sorting Must Not Change the Original Array

The second sorting test checks something more subtle.

It creates an array of coordinates and makes a copy of it.

Then:

🔀 `sortCoordinates()` is called.

Afterwards the test checks that the **original array still equals its original copy**.

---

# 🤔 Why Is This Important?

JavaScript's normal array sorting operation can mutate an array.

In other words, if we directly sort an array that another part of the program supplied, we might unexpectedly change that caller's data.

Imagine:

📦 **Caller owns coordinates**

⬇️

🎨 **CoordinateLayer receives them**

⬇️

🔀 **CoordinateLayer sorts them**

⬇️

💥 **caller's original array has secretly changed**

That kind of **side effect** can make programs much harder to understand.

---

# ✨ Part 172 — Defensive Copying

The production implementation avoids that by sorting a **copy**.

Conceptually:

📦 **original coordinates**

⬇️

📋 **make a copy**

⬇️

🔀 **sort the copy**

⬇️

✅ **return sorted copy**

while:

📦 **original coordinates**

remain unchanged.

The test doesn't care exactly *how* the class accomplishes this.

It tests the observable contract:

> **Calling `sortCoordinates()` must not mutate the original input.**

---

# 🎨 Part 173 — Testing `getLayeredCoordinates()`

Now we reach the main purpose of the class.

The method:

`getLayeredCoordinates()`

takes ordinary coordinates and adds:

`zIndex`

So something like:

🔢 **(2,0)**

can become conceptually:

🎨 **(2,0,zIndex=100)**

---

# 🪜 Part 174 — The Z-Index Rule

Midgard uses a simple row-based rule:

**first y-row → zIndex 100**  
**second y-row → zIndex 200**  
**third y-row → zIndex 300**

and so on.

Importantly:

🎯 **z-index is based on the row, not on each individual hexagon.**

Two coordinates on the same y-row therefore receive the same z-index.

---

# 🧪 Part 175 — Same Row, Same Layer

The test uses coordinates distributed across three y-values.

After layering, it expects:

### y = 0

**zIndex = 100**

### y = 1

both coordinates get:

**zIndex = 200**

### y = 2

both coordinates get:

**zIndex = 300**

This proves a key rule:

> 🎨 **The layer changes only when y changes.**

---

# 🔀 Part 176 — Sorting and Layering Work Together

Notice how important the earlier sorting step now becomes.

Suppose the sorted coordinates are:

**(2,0)**  
**(1,1)**  
**(3,1)**  
**(2,2)**  
**(4,2)**

The layering algorithm can process them sequentially:

**(2,0)**

New y-row!

➡️ zIndex becomes **100**

---

**(1,1)**

New y-row!

➡️ zIndex becomes **200**

---

**(3,1)**

Same y-row.

➡️ remain at **200**

---

**(2,2)**

New y-row!

➡️ zIndex becomes **300**

---

**(4,2)**

Same y-row.

➡️ remain at **300**

So sorting turns layering into a very straightforward sequential algorithm.

---

# 🪜 Part 177 — Does Z-Index Depend on the Actual y Number?

The final test reveals an important detail.

It uses rows with y-values:

**0**  
**2**  
**4**  
**6**

You might imagine a formula such as:

**zIndex = y × 100**

But that would produce:

**y=0 → 0**  
**y=2 → 200**  
**y=4 → 400**  
**y=6 → 600**

That is **not** Midgard's rule.

---

# 🎯 Each New Row Means +100

The test instead expects:

**y=0 → zIndex 100**  
**y=2 → zIndex 200**  
**y=4 → zIndex 300**  
**y=6 → zIndex 400**

So z-index represents:

**row order**

not:

**the numerical y-coordinate itself.**

---

# 🧠 Part 178 — This Is a Subtle but Important Distinction

Suppose the rows were:

**y = 10**  
**y = 50**  
**y = 1000**

As long as those are three distinct sorted rows, the conceptual layering rule would still be:

🥉 **first row → 100**  
🥈 **second row → 200**  
🥇 **third row → 300**

The gaps between y-values do not matter.

What matters is:

> **Did we enter a new row?**

---

# 🎨 Part 179 — Why Use 100, 200, 300 Instead of 1, 2, 3?

The tests establish that Midgard increments by **100**.

That gives generous spacing between layer values.

Conceptually:

**row 1 → 100**  
**row 2 → 200**  
**row 3 → 300**

This leaves numerical room between the major row layers if some future rendering situation ever needs intermediate values.

The current tests, however, establish only the actual present contract:

> **each new row increases the z-index by 100.**

---

# 🧩 Part 180 — `LayeredCoordinate` Adds Information

This is another useful design idea.

An ordinary coordinate tells us:

🔢 **where something belongs logically**

A layered coordinate tells us:

🔢 **where it belongs logically**

plus:

🎨 **its rendering layer**

So conceptually:

**Coordinate**

x + y

⬇️

**CoordinateLayer**

⬇️

**LayeredCoordinate**

x + y + zIndex

The original coordinate meaning has not disappeared.

We have **enriched** it with additional information.

---

# 🧪 Part 181 — What Does `coordinate-layer.test.ts` Establish?

The complete test file verifies that:

🔀 **coordinates are sorted by y first.**  
↔️ **coordinates sharing y are sorted by x.**  
🛡️ **sorting does not mutate the original array.**  
🎨 **coordinates on the same y-row receive the same z-index.**  
🪜 **every new y-row increases z-index by 100.**  
🔢 **z-index depends on row sequence, not the numerical size of y.**

---

# 🔗 Part 182 — We Have Almost Tested the Entire Internal System

Look at everything the test suite has established so far:

🔢 **CoordinateValidator**

What coordinates are legal?

⬇️

🐝 **NeighbourCalculator**

Which coordinates surround another?

⬇️

🦴 **CoordinateRange**

What is the skeleton?

⬇️

🌱 **CoordinateRangeFiller**

How does the skeleton become a complete range?

⬇️

📍 **CoordinatePositioner**

Where is each coordinate geometrically?

⬇️

⬡ **HexagonGeometry**

Where are its six corners?

⬇️

🎨 **CoordinateLayer**

In what row-based visual layer should it appear?

---

# 🏛️ But One Major Test File Remains

All these smaller classes are useful individually.

But the library has a high-level façade:

🌐 **`HexGrid`**

That is where the pieces are assembled into the API that a library user can conveniently work with.

And consequently:

`hex-grid.test.ts`

is by far the largest test file.

It tests both:

🔧 **the lower-level operations exposed through `HexGrid`**

and:

✨ **the high-level convenience methods such as `createSingleHexagon()` and `createGrid()`.**
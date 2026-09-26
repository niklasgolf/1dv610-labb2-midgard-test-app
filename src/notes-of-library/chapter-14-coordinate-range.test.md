# 🧪 Chapter 14 — `coordinate-range.test.ts`

## Part 103 — Testing the Skeleton Builder

We now move from individual coordinates and neighbours to something larger:

🦴 **a coordinate range**

The class under test is:

`CoordinateRange`

This test file is divided into three clear sections:

🛡️ **`isValid()`** — is the requested skeleton size allowed?  
🦴 **`getSkeleton()`** — are the correct skeleton coordinates generated?  
🌱 **`shouldFillAround()`** — should surrounding coordinates later be added?

These correspond directly to the three main responsibilities we found when studying the source class.

---

# 🛡️ Part 104 — Testing `isValid()`

The first group asks whether the requested dimensions form a valid coordinate range.

Remember:

**width** and **height** describe the number of skeleton hexagons.

They must therefore be:

🔢 **integers**

and:

➕ **at least 1**

---

# ✅ The Smallest Valid Range

The first test creates:

**width = 1**  
**height = 1**

Then it calls:

`range.isValid()`

and expects:

✅ **true**

This establishes an important boundary:

> **1 × 1 is valid.**

We cannot go smaller than that.

---

# ✅ Part 105 — Larger Ranges Are Also Valid

The next test uses:

**width = 3**  
**height = 2**

and expects:

✅ **true**

So `CoordinateRange` is not limited to the special 1 × 1 case.

The dimensions can grow as long as they remain valid positive integers.

---

# 🔬 Why Test 1 × 1 AND 3 × 2?

These two tests represent different useful categories.

**1 × 1** checks the minimum valid boundary.

**3 × 2** demonstrates an ordinary larger range.

This is a common testing idea:

> ✨ **Test important boundaries as well as normal cases.**

---

# 🚫 Part 106 — Width Must Be an Integer

The next test deliberately uses:

**width = 1.5**  
**height = 1**

The expected result is:

❌ **false**

Why?

Because a skeleton cannot meaningfully contain:

**1.5 hexagons across**

The dimensions describe counts, and counts must be whole numbers.

---

# 🚫 Part 107 — Height Must Also Be an Integer

The following test mirrors the previous one:

**width = 1**  
**height = 1.5**

Again:

❌ **false**

This is another example of testing both dimensions independently.

If the implementation accidentally checked only width, this second test would reveal the problem.

---

# ⛔ Part 108 — Width Cannot Be Zero

Next:

**width = 0**  
**height = 1**

The expected result is:

❌ **false**

This establishes the lower boundary.

The smallest legal width is:

**1**

---

# ⛔ Part 109 — Height Cannot Be Zero

Likewise:

**width = 1**  
**height = 0**

must return:

❌ **false**

So together these six tests establish:

> **width must be an integer ≥ 1**

and:

> **height must be an integer ≥ 1**

---

# 🦴 Part 110 — Testing `getSkeleton()`

Now we move to the actual coordinate generation.

The first skeleton test creates the smallest possible range:

**1 × 1**

Then it calls:

`getSkeleton()`

and expects exactly:

🔷 **(2,2)**

---

# 🎯 This Tests an Important Design Decision

Remember that Midgard skeletons do not internally begin at:

**(0,0)**

They begin at:

**(2,2)**

So this test protects that design decision.

If somebody later changed the implementation to start at `(0,0)`, this test would immediately fail.

---

# 🦴 Part 111 — Testing a 3 × 2 Skeleton

The next test is much more revealing.

It creates:

**width = 3**  
**height = 2**

and expects:

### Row 1

🔷 **(2,2)**　🔷 **(4,2)**　🔷 **(6,2)**

### Row 2

🔷 **(2,4)**　🔷 **(4,4)**　🔷 **(6,4)**

---

# 🧮 What Is This Test Actually Proving?

Quite a lot.

It proves that:

📍 **the skeleton starts at `(2,2)`**  
↔️ **x increases by 2**  
↕️ **y increases by 2**  
🔢 **width 3 produces three coordinates per row**  
🔢 **height 2 produces two rows**

and therefore:

**3 × 2 = 6 skeleton coordinates**

---

# 🧠 It Also Indirectly Protects the Parity System

All these skeleton coordinates are:

**even/even**

For example:

**(2,2)**  
**(4,2)**  
**(6,4)**

So the skeleton generation naturally stays inside the valid Midgard coordinate system.

The step size of **2** is important.

If we stepped by 1, we could generate something like:

**(2,2), (3,2), (4,2)**

But `(3,2)` is:

**odd/even**

and therefore invalid.

So the test also demonstrates how the skeleton algorithm respects the coordinate rules established much earlier.

---

# 🌱 Part 112 — Testing `shouldFillAround()`

Now we reach the most unusual part of `CoordinateRange`.

Remember:

**`CoordinateRange` itself does not perform the filling.**

It only decides:

> **Should filling happen?**

The actual filling belongs to:

🌱 `CoordinateRangeFiller`

So these tests are about a **decision**, not about adding neighbours.

---

# ⬡ Part 113 — The Special 1 × 1 Case

For a 1 × 1 range, filling is optional.

The first test creates:

**1 × 1**

and does not provide `fillAround`.

It expects:

❌ **false**

So the default behaviour for a single skeleton coordinate is:

> **do not fill around it.**

---

# 🚫 Explicitly Saying `false`

The next test again uses:

**1 × 1**

but this time explicitly supplies:

**fillAround = false**

The result remains:

❌ **false**

This confirms that an explicit false value behaves exactly as expected.

---

# 🌱 Part 114 — Explicitly Requesting Fill

Now the test changes:

**fillAround = true**

for the same:

**1 × 1 range**

This time:

✅ **`shouldFillAround()` returns true.**

So for 1 × 1, the caller has a genuine choice:

### ⬡ Without filling

**1 skeleton coordinate**

➡️ eventually **1 hexagon**

### 🌼 With filling

**1 skeleton coordinate**

➡️ eventually **7 hexagons**

---

# 🧩 Part 115 — Larger Width Automatically Requires Fill

Now the rule changes.

The test creates:

**width = 3**  
**height = 1**

It does **not** request `fillAround`.

Yet the expected answer is:

✅ **true**

Why?

Because in Midgard's design, larger skeletons represent the internal structure of a complete filled grid.

So once the range is larger than 1 × 1, filling is automatic.

---

# ↕️ Part 116 — Larger Height Does the Same

The next test uses:

**width = 1**  
**height = 2**

Again:

✅ **true**

This proves that either dimension being larger than one is sufficient.

So:

**2 × 1** → fill  
**1 × 2** → fill  
**3 × 2** → fill

and so on.

---

# ⚠️ Part 117 — The Most Important Edge Case

The final test is especially interesting.

It creates:

**3 × 2**

and explicitly supplies:

**fillAround = false**

What should happen?

You might initially expect:

❌ **false**

because the caller explicitly requested false.

But that is **not the contract of this class**.

The test expects:

✅ **true**

---

# 🧠 Why?

Because `fillAround` is only a meaningful choice for:

**1 × 1**

For larger ranges, the Midgard design says:

🌱 **always fill around the skeleton**

Therefore:

**3 × 2 + fillAround false**

still means:

✅ **fill**

---

# 🌳 Part 118 — We Can Express the Entire Rule as a Decision Tree

Think of `shouldFillAround()` like this:

🌱 **Is this range larger than 1 × 1?**

↙️　　　　　　　　　　　↘️  
**YES**　　　　　　　　　**NO**  
⬇️　　　　　　　　　　　⬇️  
✅ **Fill**　　　　　　　**Check `fillAround`**  
　　　　　　　　　　　↙️　　　　↘️  
　　　　　　　　　　**true**　　**false / missing**  
　　　　　　　　　　　⬇️　　　　　　⬇️  
　　　　　　　　　　✅ **Fill**　　❌ **Don't fill**

---

# 🎯 This Is Excellent Material for Tests

Why?

Because the method contains several branches.

The test suite checks:

⬡ **1 × 1 + unspecified**  
⬡ **1 × 1 + false**  
🌼 **1 × 1 + true**  
↔️ **width > 1**  
↕️ **height > 1**  
🌐 **larger range + explicit false**

So the important decision paths are represented by concrete examples.

---

# 🔗 Part 119 — Notice What Is NOT Tested Here

There is an important separation of responsibilities.

`coordinate-range.test.ts` checks:

> **whether filling should happen**

but it does not test:

> **which surrounding coordinates are actually added.**

Why not?

Because that belongs to another class:

🌱 **`CoordinateRangeFiller`**

and therefore another test file:

🧪 **`coordinate-range-fill.test.ts`**

This mirrors the architecture of the production code.

**`CoordinateRange` decides.**

**`CoordinateRangeFiller` performs.**

---

# 🧪 What `coordinate-range.test.ts` Establishes

We can summarize the file as three groups of guarantees.

### 🛡️ Range validity

Width and height must be positive integers.

### 🦴 Skeleton generation

Skeletons begin at `(2,2)` and grow in steps of 2 across x and y.

### 🌱 Fill decision

A 1 × 1 skeleton may remain unfilled, but larger skeletons automatically require surrounding fill.
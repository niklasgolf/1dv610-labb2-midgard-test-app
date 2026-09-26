# 🧪 Chapter 15 — `coordinate-range-fill.test.ts`

## Part 120 — Testing the Actual Filling Process

In the previous chapter we tested:

🌱 **Should filling happen?**

Now we move one step further:

🌱 **What coordinates are actually produced when filling happens?**

The class under test is:

`CoordinateRangeFiller`

The tests are divided into two main groups:

🐝 **`getCoordinatesAround()`**  
🌐 **`getCoordinateRange()`**

This is where several earlier parts of Midgard begin working together.

---

# 🐝 Part 121 — Testing `getCoordinatesAround()`

The first responsibility is simple:

Given one coordinate, return the **six coordinates surrounding it**.

The first test creates a 1 × 1:

↔️ **x-dominated `CoordinateRange`**

and gives that range to:

**`CoordinateRangeFiller`**

Then it asks for the coordinates around:

**(2,2)**

---

# ↔️ The Expected X-Dominated Result

The test expects:

⬅️ **(0,2)**  
➡️ **(4,2)**  
↖️ **(1,1)**  
↗️ **(3,1)**  
↙️ **(1,3)**  
↘️ **(3,3)**

This should look very familiar.

It is exactly the same neighbour system we studied in:

🐝 `NeighbourCalculator`

---

# 🔗 Part 122 — This Test Shows Collaboration Between Classes

Remember how `CoordinateRangeFiller` works internally.

It does not contain its own separate neighbour mathematics.

Instead, it creates a `NeighbourCalculator` using the range's orientation.

So we now have a relationship:

🦴 **CoordinateRange**

provides orientation

⬇️

🌱 **CoordinateRangeFiller**

needs surrounding coordinates

⬇️

🐝 **NeighbourCalculator**

calculates them

This is a good example of **composition**.

One class solves its problem partly by using another specialized class.

---

# ↕️ Part 123 — Testing the Y-Dominated Version

The second test repeats the process with:

↕️ **y-dominated**

Again the center coordinate is:

**(2,2)**

But now the expected neighbours are:

⬆️ **(2,0)**  
⬇️ **(2,4)**  
↖️ **(1,1)**  
↗️ **(3,1)**  
↙️ **(1,3)**  
↘️ **(3,3)**

So once again we verify that orientation flows correctly through the system.

The filler itself does not need two independent neighbour algorithms.

It delegates that responsibility.

---

# 🌐 Part 124 — Testing `getCoordinateRange()`

Now we reach the central method of the filler:

`getCoordinateRange()`

This method begins with the skeleton and returns the complete coordinate collection.

The first test examines the simplest possible case:

**1 × 1**

with no `fillAround` request.

From the previous chapter we know:

> **1 × 1 + no fillAround → don't fill**

Therefore the expected result contains only:

🔷 **(2,2)**

---

# 🧠 Part 125 — Notice the Chain of Responsibility

This apparently simple result actually depends on two classes.

First:

🦴 `CoordinateRange`

creates the skeleton:

**[(2,2)]**

Then:

🌱 `CoordinateRangeFiller`

asks the range:

> **“Should I fill around this?”**

The answer is:

❌ **no**

So the filler simply returns the skeleton.

This is a nice example of responsibilities being separated without becoming disconnected.

---

# 🌼 Part 126 — Filling a 1 × 1 Skeleton

The next test uses exactly the same:

**1 × 1 x-dominated range**

but now calls `getCoordinateRange()` with:

**fillAround = true**

This changes the expected result dramatically.

We now expect:

🔷 **skeleton:**

**(2,2)**

plus six neighbours:

**(0,2)**  
**(4,2)**  
**(1,1)**  
**(3,1)**  
**(1,3)**  
**(3,3)**

---

# 🔢 One Skeleton Coordinate Becomes Seven Coordinates

So this test demonstrates one of the most important distinctions in the entire public API:

### ⬡ Single unfilled

1 × 1 skeleton

➡️ **1 coordinate**

### 🌼 Filled grid

1 × 1 skeleton

➡️ **7 coordinates**

This is precisely why later:

`createSingleHexagon()`

and:

`createGrid({ skeletonWidth: 1, skeletonHeight: 1 })`

produce fundamentally different results.

---

# 🧩 Part 127 — Testing a Wider Skeleton

Now things become more interesting.

The next test creates:

**width = 2**  
**height = 1**

with:

↔️ **x-dominated orientation**

The skeleton itself contains:

**(2,2)**  
**(4,2)**

Because the range is larger than 1 × 1, filling happens automatically.

---

# 🌱 Fill Around the First Skeleton Coordinate

Around:

**(2,2)**

we get:

**(0,2)**  
**(4,2)**  
**(1,1)**  
**(3,1)**  
**(1,3)**  
**(3,3)**

---

# 🌱 Fill Around the Second Skeleton Coordinate

Around:

**(4,2)**

we get another set including:

**(2,2)**  
**(6,2)**  
**(3,1)**  
**(5,1)**  
**(3,3)**  
**(5,3)**

---

# ⚠️ Part 128 — Here Comes the Duplicate Problem

Notice what happened.

Some coordinates appear more than once conceptually.

For example:

**(3,1)**

is a neighbour of both skeleton positions.

Likewise:

**(3,3)**

is shared.

And the skeleton coordinates themselves can appear in neighbour calculations.

If we simply appended every neighbour blindly, the resulting array would contain duplicates.

That would be wrong.

A coordinate should appear only once in the completed range.

---

# 🔍 Testing Duplicate Prevention

The expected result therefore contains only unique coordinates:

**(2,2)**  
**(4,2)**  
**(0,2)**  
**(1,1)**  
**(3,1)**  
**(1,3)**  
**(3,3)**  
**(6,2)**  
**(5,1)**  
**(5,3)**

Then the test adds another assertion:

> **the result must contain exactly 10 coordinates.**

---

# 🧠 Part 129 — Why Test Both the Array and Its Length?

Again we see two related assertions.

The complete array proves:

🎯 **which coordinates exist and their returned order**

The length assertion emphasizes:

🔢 **there must be exactly 10**

That second assertion makes the duplicate-prevention requirement particularly visible.

If duplicates slipped into the result, the count could grow beyond ten.

---

# ↕️ Part 130 — The Wider Y-Dominated Range

The final test performs a similar operation with:

**width = 2**  
**height = 1**

but this time:

↕️ **y-dominated**

The skeleton itself is still:

**(2,2)**  
**(4,2)**

Remember: the skeleton-generation logic itself is not rotated.

What changes is the **neighbour relationship used for filling**.

---

# 🌐 The Expected Y-Dominated Result

The test expects the two skeleton coordinates plus their unique surrounding coordinates, including:

**(2,0)**  
**(2,4)**  
**(1,1)**  
**(3,1)**  
**(1,3)**  
**(3,3)**  
**(4,0)**  
**(4,4)**  
**(5,1)**  
**(5,3)**

The complete result has:

🔢 **12 coordinates**

---

# 🤔 Part 131 — Why 10 in One Orientation but 12 in the Other?

This is a very interesting consequence of the coordinate system.

The skeleton is:

**(2,2) — (4,2)**

In an x-dominated grid, those two skeleton coordinates are themselves **direct horizontal neighbours**.

So their surrounding neighbourhoods overlap heavily.

That produces:

**10 unique coordinates.**

In the y-dominated system, the direct straight neighbours of `(2,2)` are vertically positioned:

**(2,0)** and **(2,4)**

The second skeleton coordinate `(4,2)` is therefore arranged differently relative to the first in terms of the neighbour system.

Their surrounding sets overlap less.

The result becomes:

**12 unique coordinates.**

The tests capture this orientation-dependent consequence explicitly.

---

# 🚫 Part 132 — Filling Does Not Continue Forever

There is an extremely important conceptual point here.

Suppose we begin with:

🔷 **skeleton coordinate `(2,2)`**

We find its six neighbours.

But do we then find **the neighbours of those neighbours**?

No.

Otherwise:

**1 coordinate**

would create **6 neighbours**,

those neighbours would create more neighbours,

those would create more,

and the grid would keep expanding outward.

🌌 **Potentially forever.**

---

# 🎯 The Original Skeleton Drives the Expansion

The filler expands around:

**the skeleton coordinates**

not recursively around every newly discovered coordinate.

Conceptually:

🦴 **Skeleton**

⬇️

🐝 **Find neighbours of each skeleton coordinate**

⬇️

🔍 **Ignore coordinates already present**

⬇️

🌐 **Finished coordinate range**

The newly added surrounding coordinates do **not** become new expansion centers.

This is crucial to understanding what “fill around” means in Midgard.

---

# 🧪 Part 133 — What Does This Test File Prove?

`coordinate-range-fill.test.ts` establishes several important behaviours.

🐝 **The filler can obtain the correct six surrounding coordinates in either orientation.**  
⬡ **A 1 × 1 skeleton remains one coordinate when filling is disabled.**  
🌼 **A 1 × 1 skeleton becomes seven coordinates when filling is enabled.**  
🌱 **Larger skeletons are automatically expanded.**  
🔍 **Shared coordinates are not duplicated.**  
↔️ **and** ↕️ **orientations can produce differently shaped completed ranges.**

---

# 🔗 Part 134 — We Can Now See Three Classes Working as a Chain

This is worth seeing as one picture.

🦴 **CoordinateRange**

creates the skeleton and decides whether filling is required.

⬇️

🌱 **CoordinateRangeFiller**

takes the skeleton and performs the expansion.

⬇️

🐝 **NeighbourCalculator**

provides the six surrounding coordinates for each skeleton position.

This is exactly the sort of relationship that object-oriented design is trying to create:

> **Each class has a focused responsibility, but the objects collaborate to solve a larger problem.**
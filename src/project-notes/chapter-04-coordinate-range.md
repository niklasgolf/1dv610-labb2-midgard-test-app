# 📘 Chapter 4 — `coordinate-range.ts`

## Part 6 — From One Coordinate to a Grid Skeleton

Until now, we have worked with individual coordinates.

We know what makes a coordinate valid, and we know how to find the six neighbours around it.

But a useful hex-grid library must also be able to create **larger areas**.

This is where `CoordinateRange` enters the picture.

Its responsibility is to create the **skeleton** that will later become a complete Midgard grid.

---

## 🦴 What do we mean by a skeleton?

This word is important in our library.

Suppose the programmer asks for:

**skeletonWidth = 3**  
**skeletonHeight = 2**

We do **not** mean that the finished grid will contain only six hexagons.

We first create a rectangular foundation containing:

**3 × 2 = 6 skeleton coordinates**

Conceptually:

🔷　🔷　🔷  
🔷　🔷　🔷

Later, `CoordinateRangeFiller` will add the surrounding neighbours and turn this skeleton into the larger filled Midgard grid.

So there are two stages:

> **Skeleton → Filled grid**

`CoordinateRange` is responsible for the first stage.

---

## ⚙️ `CoordinateRangeConfig`

Before creating a `CoordinateRange`, we need to describe it.

The file therefore begins with the type:

`CoordinateRangeConfig`

It contains three pieces of information:

🔹 **width** — number of skeleton hexagons horizontally  
🔹 **height** — number of skeleton hexagons vertically  
🔹 **orientation** — x-dominated or y-dominated

Importantly, width and height describe **numbers of hexagons**, not pixels or geometric measurements.

This means a width of 3 simply means:

> **Create three skeleton coordinates across.**

---

## 📍 Why does every skeleton begin at (2,2)?

Earlier versions of the design could have allowed the programmer to choose where a range begins.

But the current library deliberately simplifies this.

Every `CoordinateRange` starts internally at:

**(2,2)**

The programmer therefore does not need to think about a starting coordinate.

They only need to say:

**How wide?**  
**How high?**

This follows our larger library philosophy:

> **Do not ask the user for information the library can sensibly decide itself.**

---

# 🧱 Part 7 — Constructing the `CoordinateRange`

The `CoordinateRange` class stores three values:

**width**  
**height**  
**orientation**

When the object is constructed, these values come from the `CoordinateRangeConfig` and become properties of the range.

Conceptually, we might create a range representing:

**width = 3**  
**height = 2**  
**orientation = x-dominated**

At this point, however, we still have only a **description**.

We have not yet generated the six coordinates.

Before doing that, the class provides an important check.

---

## 🛡️ `isValid()` — can this range exist?

Width and height represent numbers of skeleton hexagons.

Therefore, values such as these make sense:

**1 × 1** ✅  
**3 × 2** ✅  
**10 × 5** ✅

But these do not:

**2.5 × 3** ❌  
**0 × 4** ❌  
**−2 × 5** ❌

You cannot reasonably ask for half a skeleton hexagon or a negative number of hexagons.

So `isValid()` checks two things.

First, width and height must both be **integers**.

Second, both must be at least **1**.

If all checks succeed, the range is valid.

---

# 🏗️ Part 8 — `getSkeleton()`

Now we reach the heart of this file.

`getSkeleton()` turns width and height into actual Midgard coordinates.

Every skeleton begins at:

**(2,2)**

and skeleton coordinates advance in steps of **2**.

### 🔹 A 1 × 1 skeleton

This is the simplest case:

**(2,2)**

Only one coordinate is needed.

### 🔹 A 3 × 1 skeleton

We begin at x = 2 and move in steps of two:

**(2,2)　(4,2)　(6,2)**

Notice that all coordinates remain even-even and therefore valid.

### 🔹 A 3 × 2 skeleton

Now we need another row.

The first row is:

**(2,2)　(4,2)　(6,2)**

Then y also moves by two:

**(2,4)　(4,4)　(6,4)**

So the complete skeleton is:

🔷 **(2,2)**　🔷 **(4,2)**　🔷 **(6,2)**  
🔷 **(2,4)**　🔷 **(4,4)**　🔷 **(6,4)**

This is exactly what the nested loops inside `getSkeleton()` create: the outer loop moves through the rows, while the inner loop creates the x positions within each row.

---

## 🔁 Why nested loops?

This is worth understanding because it is a common programming pattern.

Imagine reading the skeleton row by row.

For each y position:

➡️ create every x position in that row.

Then:

⬇️ move to the next y position.

Then again:

➡️ create every x position.

So a two-dimensional structure naturally leads to:

> **a loop inside another loop.**

The outer loop controls **height**.

The inner loop controls **width**.

Together they produce every coordinate in the rectangular skeleton.

---

# 🌱 Part 9 — Should the Skeleton Be Filled?

There is one final responsibility in `CoordinateRange`.

The method:

`shouldFillAround()`

decides whether neighbouring coordinates should later be added around the skeleton.

The important rule is:

### 🔹 A 1 × 1 skeleton

A single skeleton coordinate may either remain alone or be surrounded by its six neighbours.

This distinction allows the library to support both:

**one single hexagon**

and:

**a 1 × 1 skeleton expanded into seven hexagons.**

For this special case, `fillAround` determines what happens.

### 🔹 Anything larger than 1 × 1

For a larger skeleton, Midgard automatically fills around it.

So:

**3 × 2 → always filled**  
**4 × 4 → always filled**  
**10 × 6 → always filled**

The programmer does not need to request this separately.

Again, this follows the philosophy of making the high-level library simple.

---

## 🧠 What `CoordinateRange` does — and does not do

This distinction is important.

`CoordinateRange` knows how to:

🦴 **describe a skeleton**  
🛡️ **validate its dimensions**  
📍 **generate its skeleton coordinates**  
🌱 **decide whether surrounding coordinates should be added**

But it does **not actually add those surrounding coordinates**.

That responsibility belongs to another class.

This is another example of separating responsibilities.

`CoordinateRange` says:

> **“Here is my skeleton, and yes, it should be filled.”**

Another object will perform the actual filling.

---

## 🔗 Where we are now

Our library is starting to form a chain:

🔷 **Coordinate**  
defines one grid position.

⬇️

🧭 **GridOrientation**  
defines the direction of the grid.

⬇️

🐝 **NeighbourCalculator**  
finds the six coordinates around another coordinate.

⬇️

🦴 **CoordinateRange**  
creates a rectangular skeleton containing many coordinates.

And now we have everything necessary to combine those ideas.

We have a skeleton.

We know how to find neighbours.

So the next class can take **every skeleton coordinate**, find its neighbours, and build the complete filled grid around it.
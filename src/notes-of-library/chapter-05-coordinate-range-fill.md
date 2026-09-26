# 📘 Chapter 5 — `coordinate-range-fill.ts`

## Part 10 — Turning the Skeleton Into a Complete Grid

In the previous chapter, `CoordinateRange` created the **skeleton** of our grid.

For example, a 3 × 2 skeleton gives us:

🔷 **(2,2)**　🔷 **(4,2)**　🔷 **(6,2)**  
🔷 **(2,4)**　🔷 **(4,4)**　🔷 **(6,4)**

But this is not yet the complete Midgard grid.

The skeleton is deliberately sparse. There are spaces between these coordinates where other valid Midgard coordinates belong.

The next class solves that problem:

`CoordinateRangeFiller`

Its purpose is to take a `CoordinateRange` and produce the **complete coordinate area around its skeleton**.

---

## 🧩 Two classes working together

This is a good point to see why we separated `CoordinateRange` and `CoordinateRangeFiller`.

🦴 **`CoordinateRange`**  
knows how to create the skeleton.

🌱 **`CoordinateRangeFiller`**  
knows how to expand that skeleton.

The filler therefore receives a `CoordinateRange` in its constructor and stores it for later use.

This is **composition** in action.

Instead of making `CoordinateRangeFiller` recreate everything that `CoordinateRange` already knows, we give it a `CoordinateRange` object and let the two classes cooperate.

---

# 🐝 Part 11 — Getting the Neighbours Around One Coordinate

To fill around a skeleton coordinate, we need something we already built:

`NeighbourCalculator`

The method `getCoordinatesAround()` creates a neighbour calculator using the same orientation as the range.

It then asks that calculator for the six neighbours of the supplied coordinate.

So imagine our skeleton contains:

**(2,2)**

In an x-dominated grid, its neighbours are:

↖️ **(1,1)**　↗️ **(3,1)**  
⬅️ **(0,2)**　🔷 **(2,2)**　➡️ **(4,2)**  
↙️ **(1,3)**　↘️ **(3,3)**

The filler itself does not need to know the mathematical rules for calculating those six positions.

That knowledge already belongs to `NeighbourCalculator`.

This is important.

We do **not** duplicate the neighbour mathematics inside `CoordinateRangeFiller`.

Instead:

🌱 `CoordinateRangeFiller` says:

> **“I need the neighbours of this coordinate.”**

🐝 `NeighbourCalculator` answers:

> **“Here they are.”**

Each class keeps its own responsibility.

---

# 🔍 Part 12 — Avoiding Duplicate Coordinates

Now we encounter a new problem.

Suppose our skeleton contains two nearby coordinates:

**(2,2)** and **(4,2)**

When we calculate the neighbours around both, some of those neighbours can overlap.

A coordinate might therefore be discovered more than once.

But our final grid should not contain duplicate hexagons.

We do not want something like:

**(3,1)**  
**(3,1)**  
**(3,1)**

appearing several times in the final array.

So `CoordinateRangeFiller` has a helper method called:

`containsCoordinate()`

Its job is to answer:

> **“Does this coordinate already exist in the array?”**

It loops through the coordinates and compares both x and y values.

If it finds a coordinate with the same x and y, it returns:

✅ **true**

Otherwise:

❌ **false**

---

## 🧠 Why compare x AND y?

A coordinate is defined by both values together.

For example:

**(3,1)**

and:

**(3,3)**

have the same x-value, but they are completely different positions.

Likewise:

**(1,3)**

and:

**(3,3)**

share y but are still different.

Two coordinates are equal only when:

> **x is equal AND y is equal.**

That is the identity of a Midgard coordinate.

---

# 🌱 Part 13 — `getCoordinateRange()`

Now we reach the main method of the class:

`getCoordinateRange()`

This is where the complete process comes together.

The first thing it does is ask its `CoordinateRange` for the skeleton.

So we begin with:

🦴 **Skeleton**

Then the method asks:

> **Should this range be filled around?**

Remember the rule from the previous chapter.

A 1 × 1 range can remain as one coordinate when filling is disabled.

If filling is not required, the method simply returns the skeleton immediately.

That means there is no unnecessary neighbour calculation.

---

## 🌳 When filling IS required

If the range should be filled, the method first creates a copy of the skeleton.

This is important because the skeleton itself must remain part of the final result.

So conceptually we begin with:

> **Complete coordinates = skeleton coordinates**

Then we expand from there.

### 🔄 Step 1 — Visit every skeleton coordinate

The method loops through the skeleton.

For each coordinate, it asks:

> **What are the six neighbours around this coordinate?**

### 🐝 Step 2 — Calculate the neighbours

`getCoordinatesAround()` uses our `NeighbourCalculator` and returns those six coordinates.

### 🔄 Step 3 — Visit each neighbour

Now we loop through those neighbouring coordinates.

For each one, we ask:

> **Is this coordinate already in our result?**

### ➕ Step 4 — Add it only if necessary

If the coordinate does not already exist, we add it.

If it is already there, we skip it.

This continues for every neighbour around every skeleton coordinate.

---

# 🧠 The whole algorithm in plain English

The entire filling process can be understood like this:

🦴 **1. Create the skeleton**

⬇️

❓ **2. Should we fill around it?**

If no → return the skeleton.  
If yes → continue.

⬇️

📋 **3. Copy the skeleton into the result**

⬇️

🔄 **4. Visit every skeleton coordinate**

⬇️

🐝 **5. Find its six neighbours**

⬇️

🔍 **6. Check every neighbour**

⬇️

➕ **7. Add it if it isn't already present**

⬇️

✅ **8. Return the complete coordinate collection**

---

# 🌟 The special 1 × 1 case

This gives us an especially useful behaviour.

A 1 × 1 skeleton begins with:

🔷 **(2,2)**

If filling is disabled:

**Result = 1 coordinate**

🔷

But if filling is enabled, we add all six neighbours:

　🔷　🔷  
🔷　🔷　🔷  
　🔷　🔷

**Result = 7 coordinates**

This distinction later allows `HexGrid` to support two different high-level ideas:

🔹 **Create exactly one hexagon**

and

🔹 **Create a complete grid around a 1 × 1 skeleton**

Those may sound similar, but they deliberately produce different results.

---

# 💡 An important design detail: we only expand from the skeleton

There is a subtle point worth noticing.

The filler calculates neighbours around **the original skeleton coordinates**.

It does not continuously take every newly added neighbour and find *its* neighbours too.

That distinction matters.

Otherwise the process could keep expanding:

**Skeleton**

⬇️

**Neighbours**

⬇️

**Neighbours of neighbours**

⬇️

**Neighbours of those neighbours...**

…and our grid could continue growing far beyond the requested area.

Instead, the skeleton defines the foundation.

We add **one surrounding layer** around that foundation.

---

# 🧩 Our architecture is becoming clearer

We can now follow a surprisingly powerful chain of cooperation:

🔷 **Coordinate**  
defines one position.

⬇️

🧭 **GridOrientation**  
defines how the hex grid faces.

⬇️

🐝 **NeighbourCalculator**  
knows the six positions around a coordinate.

⬇️

🦴 **CoordinateRange**  
creates the skeleton.

⬇️

🌱 **CoordinateRangeFiller**  
uses the neighbour system to expand that skeleton.

At this point, we can generate the **logical coordinates of an entire Midgard grid**.

But something very important is still missing.

A coordinate such as:

**(4,2)**

is only an abstract grid coordinate.

It does not yet tell SVG:

> **Where on the screen should this hexagon actually be drawn?**

We now need to cross an important boundary in the library:

> **from logical coordinates → to geometric positions.**
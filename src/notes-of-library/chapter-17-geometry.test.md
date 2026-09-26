# 🧪 Chapter 17 — `geometry.test.ts`

## Part 149 — From a Center Point to an Actual Hexagon

We have now tested how Midgard converts:

🔢 **logical coordinate**

into:

📍 **geometric center position**

But a center point alone cannot be drawn as a hexagon.

To create the actual shape, we need:

⬡ **six corner points**

That is the responsibility of:

`HexagonGeometry`

The test file is organized into four sections:

↔️ **`getXDominatedHexagonPoints()`**  
↕️ **`getYDominatedHexagonPoints()`**  
🧭 **`getHexagonPoints()`**  
📦 **`getBounds()`**

---

# ↔️ Part 150 — Does an X-Dominated Hexagon Have Six Corners?

The first test uses:

📍 **center = (100,100)**  
📏 **dimension = 100**  
↔️ **orientation = x-dominated**

Then it calls:

`getXDominatedHexagonPoints()`

and checks:

🔢 **the returned array contains six points.**

This establishes the most basic structural requirement:

⬡ **A hexagon must have six corners.**

But, just like our neighbour tests, merely having six values does not prove that they are positioned correctly.

So we need stronger tests.

---

# 📏 Part 151 — Does 100 Really Mean the Complete Width?

The next test again uses:

📍 **center = `(100,100)`**

and:

📏 **dimension = `100`**

For an x-dominated hexagon, that dimension represents:

↔️ **the complete width of the hexagon**

So if the center is:

**x = 100**

and the total width is:

**100**

then the hexagon must extend:

**50 units left**

and:

**50 units right**

from its center.

---

# 🔷 The Test Checks Two Corner Points

It retrieves:

**upperRight**

and:

**upperLeft**

Then it expects:

**upperRight.x = 150**  
**upperLeft.x = 50**

Visually:

**50 ←────── 100 ──────→ 150**  
　　　left　　 center　　 right

The total distance is:

**150 − 50 = 100**

Exactly the requested width.

---

# 🧠 Part 152 — Why Doesn't This Test Check Every Coordinate?

The production method calculates all six corner positions.

But this particular test is specifically named:

> **“uses the given width as the complete hexagon width”**

Therefore it focuses on the values needed to demonstrate that property.

It does not need to reproduce the entire geometry algorithm inside the test.

That is an important testing principle:

> 🎯 **A test should make the behaviour it is checking easy to understand.**

---

# ↕️ Part 153 — Testing the Y-Dominated Hexagon

Now we rotate the geometry.

The test creates:

↕️ **y-dominated `HexagonGeometry`**

with the same:

📍 **center = `(100,100)`**  
📏 **dimension = `100`**

and calls:

`getYDominatedHexagonPoints()`

Again, the first requirement is:

🔢 **six corner points.**

---

# 📏 Part 154 — Now 100 Means Complete Height

For a y-dominated hexagon, the supplied dimension means:

↕️ **complete hexagon height**

The center is:

**y = 100**

The height is:

**100**

Therefore the shape must extend:

**50 upward**

and:

**50 downward**

So its vertical extremes are:

**y = 50**

and:

**y = 150**

---

# 🔷 The Test Checks Exactly That

It examines:

**upperLeft**

and:

**lowerLeft**

and expects:

**upperLeft.y = 50**  
**lowerLeft.y = 150**

Visually:

　　　　**50**  
　　　　⬆️  
　　　 **100** ← center  
　　　　⬇️  
　　　 **150**

The complete height is:

**150 − 50 = 100**

---

# 🔄 Part 155 — The Orientation Symmetry Appears Again

We have now seen the same idea in both positioning and geometry.

### ↔️ X-dominated

The supplied dimension controls:

**full width**

### ↕️ Y-dominated

The supplied dimension controls:

**full height**

This is a central convention in Midgard.

The tests make sure the convention is maintained consistently.

---

# 🧭 Part 156 — Testing the General `getHexagonPoints()`

Once again we encounter our familiar dispatcher pattern.

There are specialized methods:

↔️ `getXDominatedHexagonPoints()`  
↕️ `getYDominatedHexagonPoints()`

and a general method:

🧭 **`getHexagonPoints()`**

The general method should inspect the stored orientation and use the correct geometry calculation.

---

# ↔️ X-Dominated Dispatcher Test

The test creates:

**`HexagonGeometry('x-dominated')`**

and calls:

`getHexagonPoints(center, 100)`

It then checks that the horizontal extremes are:

**x = 50**

and:

**x = 150**

So the general method behaves according to the x-dominated geometry.

---

# ↕️ Y-Dominated Dispatcher Test

The next test creates:

**`HexagonGeometry('y-dominated')`**

and calls the same general method.

This time it checks:

**y = 50**

and:

**y = 150**

So the dispatcher correctly selects the y-dominated geometry.

---

# 🌳 Part 157 — We Have Seen This Pattern Three Times

There is now a very clear architectural pattern in Midgard.

### 🐝 Neighbours

**specialized x method**  
**specialized y method**  
**general orientation-aware method**

### 📍 Positioning

**specialized x method**  
**specialized y method**  
**general orientation-aware method**

### ⬡ Geometry

**specialized x method**  
**specialized y method**  
**general orientation-aware method**

And the test strategy mirrors that architecture.

That consistency is useful because once we understand one component, the others become easier to reason about.

---

# 📦 Part 158 — Testing `getBounds()`

Now `geometry.test.ts` introduces something different.

Suppose we have several geometric points scattered across the plane.

We want the smallest rectangular area that contains all of them.

That rectangle is described by:

**minX**  
**minY**  
**maxX**  
**maxY**  
**width**  
**height**

This is our:

📦 **Bounds**

---

# 🔢 Part 159 — A Concrete Bounds Example

The test provides four points:

📍 **(50,75)**  
📍 **(250,25)**  
📍 **(300,200)**  
📍 **(100,250)**

Now we inspect all their x-values:

**50, 250, 300, 100**

The smallest is:

**minX = 50**

The largest is:

**maxX = 300**

---

# ↕️ Now the y-values

We have:

**75, 25, 200, 250**

The smallest is:

**minY = 25**

The largest is:

**maxY = 250**

Therefore the outer rectangle runs from:

📍 **(50,25)**

to:

📍 **(300,250)**

---

# 📐 Part 160 — Calculating Width and Height

Once we know the extremes:

**width = maxX − minX**

Therefore:

**300 − 50 = 250**

And:

**height = maxY − minY**

Therefore:

**250 − 25 = 225**

The test expects exactly:

**minX = 50**  
**minY = 25**  
**maxX = 300**  
**maxY = 250**  
**width = 250**  
**height = 225**

---

# 🖼️ Part 161 — Why Bounds Matter to a Graphics Library

Bounds are extremely useful when drawing.

Imagine Midgard creates a large collection of hexagons.

We may want to know:

🖼️ **How large should the SVG be?**  
📦 **How much space does the grid occupy?**  
↔️ **What are its leftmost and rightmost positions?**  
↕️ **What are its topmost and bottommost positions?**

The bounds calculation converts a potentially large collection of geometric points into one simple description:

> **“This is the rectangle containing everything.”**

---

# 🕳️ Part 162 — What If There Are No Points?

The final geometry test checks an important edge case:

`getBounds([])`

In other words:

📭 **an empty array of points**

There is no:

**leftmost point**,  
**rightmost point**,  
**topmost point**,  
or **bottommost point**.

So the method returns a neutral zero-sized bounds object:

**minX = 0**  
**minY = 0**  
**maxX = 0**  
**maxY = 0**  
**width = 0**  
**height = 0**

---

# 🛡️ Part 163 — Why Test the Empty Case?

Without special handling, a bounds algorithm often begins by taking:

**the first point**

as the initial minimum and maximum.

That works when points exist.

But if the array is empty, there **is no first point**.

So the production code deliberately handles this situation, and the test protects that behaviour.

This is another example of an:

⚠️ **edge case**

The ordinary case is:

**one or more points**

The boundary case is:

**zero points**

---

# 🧪 Part 164 — What Does `geometry.test.ts` Establish?

This test file demonstrates that:

⬡ **x-dominated hexagons have six corners.**  
↔️ **the supplied x-dominated dimension represents the complete width.**  
⬡ **y-dominated hexagons also have six corners.**  
↕️ **the supplied y-dominated dimension represents the complete height.**  
🧭 **`getHexagonPoints()` chooses the correct orientation-specific geometry.**  
📦 **`getBounds()` correctly finds the outer rectangle around points.**  
📭 **an empty point collection produces zero bounds.**

---

# 🔗 Part 165 — Our Geometric Pipeline Is Now Tested

We can now follow a Midgard location through several tested stages:

🔢 **Coordinate**

`(2,2)`

⬇️

📍 **CoordinatePositioner**

calculates its center

⬇️

⬡ **HexagonGeometry**

calculates six corners around that center

⬇️

📦 **Bounds**

can determine the outer rectangle around geometric points

This means we have now tested both:

🧠 **the logical grid**

and:

📐 **the geometric representation of that grid**
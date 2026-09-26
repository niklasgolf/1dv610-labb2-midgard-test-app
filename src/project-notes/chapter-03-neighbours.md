# 📘 Chapter 3 — `neighbours.ts`

## Part 5 — Finding the Six Hexagons Around Us

Now we have everything needed for our first real hex-grid operation.

We have:

🔢 **a coordinate**  
🧭 **an orientation**

The natural next question is:

> **Which six hexagons touch this hexagon?**

That responsibility belongs to:

`NeighbourCalculator`

The class stores a `GridOrientation`, supplied through its constructor.

This is a good example of an object carrying information about its own configuration.

Once we create an x-dominated `NeighbourCalculator`, we do not need to keep telling it:

> **“Remember, this is x-dominated.”**

The object already knows.

---

## 🔍 `getNeighbours()`

The public method is called:

`getNeighbours()`

It receives one coordinate and returns an array containing its neighbouring coordinates.

Its first decision is very simple:

**Is this an x-dominated grid?**

If yes, use the x-dominated neighbour calculation.

Otherwise, use the y-dominated calculation.

This public method therefore acts as a small dispatcher.

It decides **which internal calculation is appropriate**, while the details are handled elsewhere in the class.

---

## ↔️ X-dominated neighbours

For an x-dominated coordinate **(x,y)**, the six neighbours are:

**(x − 2, y)**  
**(x + 2, y)**

and:

**(x − 1, y − 1)**  
**(x + 1, y − 1)**  
**(x − 1, y + 1)**  
**(x + 1, y + 1)**

This is where our strange-looking coordinate system starts to pay off.

Take:

**(10,10)**

Its neighbours become:

↖️ **(9,9)**　　↗️ **(11,9)**  
⬅️ **(8,10)**　⬡ **(10,10)**　➡️ **(12,10)**  
↙️ **(9,11)**　↘️ **(11,11)**

Every generated neighbour still follows the Midgard parity rule.

For example:

**(10,10)** is even-even.

Moving diagonally changes both values by one:

**(9,9)** becomes odd-odd.

Still valid. ✅

Moving horizontally changes x by two:

**(8,10)** remains even-even.

Still valid. ✅

This is one of the main reasons the coordinate system was designed this way.

---

## ↕️ Y-dominated neighbours

For a y-dominated grid, we use the same underlying idea but swap which axis receives the straight ±2 movement.

The six neighbours become:

**(x, y − 2)**  
**(x, y + 2)**

and:

**(x − 1, y − 1)**  
**(x + 1, y − 1)**  
**(x − 1, y + 1)**  
**(x + 1, y + 1)**

So for **(10,10)**:

⬆️ **(10,8)**  
↖️ **(9,9)**　↗️ **(11,9)**  
　　　 **(10,10)**  
↙️ **(9,11)**　↘️ **(11,11)**  
⬇️ **(10,12)**

Again, all six coordinates remain valid according to the parity system.

---

## 🧠 A useful pattern is emerging

We can now see how the first three concepts cooperate:

🔷 **`Coordinate`** tells us where we are.  
🧭 **`GridOrientation`** tells us how the grid is oriented.  
🐝 **`NeighbourCalculator`** tells us which six coordinates surround us.

None of these pieces needs to know anything about SVG, pixels, polygon points or complete grids.

We are still working entirely in the **abstract coordinate world**.

That is deliberate.

**Geometry comes later.**

First, we need to learn how Midgard creates **many coordinates at once**.
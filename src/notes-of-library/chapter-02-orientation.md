# 📘 Chapter 2 — `orientation.ts`

## Part 4 — Which Direction Does the Hex Grid Face?

We now understand what a Midgard coordinate is and which coordinates are valid.

The next file is extremely small:

`orientation.ts`

But this tiny file introduces an idea that affects almost every geometric calculation later in the library:

🧭 **Grid orientation**

Midgard supports two orientations:

`x-dominated`

and

`y-dominated`

---

## ↔️ X-dominated

An **x-dominated** grid has its straight neighbour direction along the x-axis.

Visually, we can think of it as:

**⬡ — ⬡ — ⬡**

The hexagons have points at the top and bottom, while their left and right sides are vertical.

This is the orientation we saw in our X-Dominated Grid demo.

For coordinates, the two straight neighbours of **(10,10)** are:

**(8,10)** ← **(10,10)** → **(12,10)**

Notice that y stays the same while x changes by 2.

The other four neighbours are diagonal:

**(9,9)**　　**(11,9)**  
　　　 **(10,10)**  
**(9,11)**　 **(11,11)**

This relationship will become important when we reach `neighbours.ts`.

---

## ↕️ Y-dominated

A **y-dominated** grid turns the idea around.

Now the straight neighbour direction follows the y-axis.

For the same coordinate **(10,10)**, the straight neighbours become:

**(10,8)**  
⬆️  
**(10,10)**  
⬇️  
**(10,12)**

The four diagonal neighbours remain:

**(9,9)**  
**(11,9)**  
**(9,11)**  
**(11,11)**

So the fundamental coordinate system has not changed.

What changes is **which axis dominates the layout**.

---

## 🏷️ Why make `GridOrientation` its own type?

We could have used an ordinary string everywhere.

A programmer might then write something like:

**`x-dominated`**

But they could also accidentally write:

**`x-dominant`**  
**`horizontal`**  
**`xdominated`**

Those are just strings as far as TypeScript is concerned.

Instead, Midgard defines `GridOrientation` so that only two values belong to this concept:

🔹 **`x-dominated`**  
🔹 **`y-dominated`**

This gives the rest of the library a precise vocabulary.

When a class receives a `GridOrientation`, we know exactly what choices are possible.

---

## 🧩 One type used by many parts of the library

This tiny type becomes surprisingly important.

The neighbour calculator needs orientation because the straight neighbours depend on it.

The coordinate range needs orientation because a rectangular skeleton grows differently depending on its direction.

The positioner needs orientation because coordinates must be translated differently into geometric positions.

The geometry system needs orientation because the shape itself must face the correct way.

And eventually `HexGrid` stores an orientation when it is constructed.

This gives us a nice design.

Instead of repeatedly telling every method what orientation to use, we can create a grid with an orientation once:

**HexGrid → `x-dominated`**

or:

**HexGrid → `y-dominated`**

The grid then carries that knowledge with it.
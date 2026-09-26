# 📘 Chapter 1 — `coordinate.ts`

## Part 2 — The Foundation: What Is a Coordinate?

The first source file we study is **`coordinate.ts`**.

This is a good place to begin because almost everything else in Midgard depends on coordinates. Neighbours, ranges, positioning and complete grids all need a common way to describe **where a hexagon is located**.

The file begins with a very small type:

`Coordinate`

It contains only two values:

**x** — the horizontal coordinate  
**y** — the vertical coordinate

In TypeScript, both are numbers.

---

### 🧱 Why create a `Coordinate` type?

Technically, we could pass two separate numbers everywhere:

**x = 4**  
**y = 2**

But those two numbers belong together. Together they describe **one position in the Midgard grid**.

By creating a `Coordinate` type, we can instead think in terms of one object:

**coordinate → `{ x, y }`**

This makes the rest of the library easier to understand.

A method can receive a **`Coordinate`** rather than receiving two unrelated numbers.

For example, later the neighbour system essentially asks:

> **“Give me the six neighbours of this Coordinate.”**

The positioning system asks:

> **“Where should this Coordinate appear geometrically?”**

And the range system works with collections of **`Coordinate`** objects.

So this tiny type becomes a shared language used throughout the library.

---

### ⚠️ A type does not guarantee a valid Midgard coordinate

There is an important distinction here.

The `Coordinate` type says that a coordinate contains:

**x: number**  
**y: number**

But TypeScript's `number` type includes many values that Midgard does **not** accept.

For example:

**(2, 2)** is a valid Midgard coordinate.

But all of these still fit the basic TypeScript shape of `Coordinate`:

**(2, 3)**  
**(-2, -2)**  
**(2.5, 2.5)**

They contain an x-number and a y-number, so TypeScript can regard them as coordinates.

But according to the rules of **our library**, they are invalid.

This gives us two different ideas:

🔷 **`Coordinate`** describes the *shape of the data*.  
🛡️ **`CoordinateValidator`** decides whether that data follows the *rules of Midgard*.

That separation is why the file contains both a type and a class.

---

# 🛡️ Part 3 — `CoordinateValidator`

The second part of `coordinate.ts` is the class **`CoordinateValidator`**.

Its job is very focused:

> **Given a coordinate, determine whether it is allowed in the Midgard coordinate system.**

The class has one method:

`isValidCoordinate()`

It receives a `Coordinate` and eventually returns either:

✅ **true** — valid Midgard coordinate  
❌ **false** — invalid Midgard coordinate

The method performs the validation in several logical stages.

---

### 1️⃣ First check — are x and y integers?

The first rule is that both values must be whole numbers.

So:

**(2, 2)** ✅

but:

**(2.5, 2)** ❌

and:

**(3, 1.7)** ❌

The method uses `Number.isInteger()` for both x and y. If either value is not an integer, it immediately returns `false`.

Notice something useful about the structure.

Once we know the coordinate is invalid, the method **stops**.

There is no reason to continue checking parity or anything else.

This keeps the reasoning simple:

> **Not integers? → invalid → finished.**

---

### 2️⃣ Second check — are the numbers non-negative?

Midgard does not use negative coordinates.

Therefore:

**(0, 0)** ✅ potentially valid  
**(10, 4)** ✅ potentially valid

but:

**(-2, 2)** ❌

If either x or y is below zero, the method returns `false`.

Again, the method stops as soon as a rule has been broken.

---

### 3️⃣ Third check — even or odd?

Now we reach the distinctive Midgard rule.

The method determines four facts:

**Is x even?**  
**Is y even?**  
**Is x odd?**  
**Is y odd?**

This is done using the remainder operator `%`.

A number is even when dividing it by 2 leaves a remainder of zero.

So conceptually:

**4 % 2 = 0 → even**

while:

**5 % 2 = 1 → odd**

The validator calculates these properties for both coordinates.

---

### 4️⃣ The actual Midgard rule

Now the method can finally answer the important question.

If **both values are even**, the coordinate is valid.

✅ **(2, 2)**  
✅ **(4, 8)**  
✅ **(0, 2)**

If **both values are odd**, the coordinate is also valid.

✅ **(1, 1)**  
✅ **(3, 5)**  
✅ **(7, 9)**

The validator therefore returns `true` for either of these two situations.

Everything remaining must be a mixed pair:

❌ **even + odd**  
❌ **odd + even**

So if neither valid combination matched, the method reaches its final:

**`return false`**

That completes the validation.

---

## 🧠 The reasoning of the whole method

We can understand `isValidCoordinate()` almost like a conversation:

**Are x and y whole numbers?**  
No → ❌ invalid.  
Yes → continue.

**Are both zero or greater?**  
No → ❌ invalid.  
Yes → continue.

**Are both even?**  
Yes → ✅ valid.

Otherwise, **are both odd?**  
Yes → ✅ valid.

Otherwise → ❌ invalid.

---

### 🌱 Why this small file matters so much

`coordinate.ts` is only a small part of the library, but conceptually it establishes the rules of the entire Midgard world.

It gives us two fundamental building blocks:

🔷 **`Coordinate`** — what a coordinate looks like.  
🛡️ **`CoordinateValidator`** — whether a coordinate is actually allowed.

And from now on, whenever we talk about positions such as:

**(2,2), (4,2), (1,3), (3,3)**

we know exactly what they mean and why they are valid.

This foundation will make the next part much easier, because we can now ask the natural next question:

> **If we have one valid hexagon coordinate, where are its six neighbours?**
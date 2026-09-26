# 🧪 Chapter 12 — `coordinate.test.ts`

## Part 81 — Testing the Foundation of Midgard

We begin the detailed study of the test files with the most fundamental rule in the entire coordinate system:

🔢 **Which coordinates are valid?**

The production class responsible for this is:

`CoordinateValidator`

and `coordinate.test.ts` contains a compact collection of tests designed to prove that its rules behave correctly.

There are **seven tests** in this file.

Together they cover three major ideas:

🟢 **correct parity combinations**  
🔴 **incorrect parity combinations**  
🚫 **numbers that are not permitted at all**

---

# 🧱 Part 82 — The Basic Shape of One Test

Look at the first test.

Its description says:

> **“returns true when x and y are both even”**

The test then follows the pattern we introduced earlier.

## 1️⃣ Arrange

First we create the input coordinate:

**x = 10**  
**y = 10**

Both numbers are even.

Then we create:

🛡️ **`CoordinateValidator`**

## 2️⃣ Act

Next we call:

`isValidCoordinate(coordinate)`

and save the returned value in:

**`result`**

## 3️⃣ Assert

Finally:

**`expect(result).toBe(true)`**

In ordinary English:

> **“I expect the validator to say that (10,10) is valid.”**

That is one complete automated test.

---

# 🟢 Part 83 — Testing Both Valid Parity Combinations

Remember the central Midgard rule:

> A coordinate exists when x and y have the **same parity**.

That gives us two valid possibilities.

## 🟢 Even + even

Example:

**(10,10)**

10 is even.  
10 is even.

Therefore:

✅ **valid**

## 🟢 Odd + odd

The second test uses:

**(11,11)**

11 is odd.  
11 is odd.

Therefore:

✅ **valid**

The test expects `true`.

---

# 🧠 Why Do We Need Both Tests?

We could theoretically test `(10,10)` and say:

> **“We have demonstrated that equal parity works.”**

But that would be incomplete.

Imagine that someone accidentally implemented the validator as:

> **“x and y must both be even.”**

Then:

**(10,10)**

would pass.

But:

**(11,11)**

would incorrectly fail.

By explicitly testing both valid categories, we protect the actual rule:

> **same parity**

rather than accidentally testing only one example of it.

---

# 🔴 Part 84 — Testing the Invalid Parity Combinations

Now we turn the rule around.

If x and y have **different parity**, the coordinate must not exist.

Again, there are two possibilities.

## ❌ Even + odd

The test uses:

**(10,11)**

10 = even  
11 = odd

So:

❌ **invalid**

The expected result is `false`.

## ❌ Odd + even

The next test uses:

**(11,12)**

11 = odd  
12 = even

So:

❌ **invalid**

Again, the expected result is `false`.

---

# 🧩 We Have Now Covered All Four Parity Cases

This gives us a very neat logical matrix:

**even + even** → ✅ valid  
**odd + odd** → ✅ valid  
**even + odd** → ❌ invalid  
**odd + even** → ❌ invalid

That is excellent coverage of the parity rule itself.

We are not simply trying a few random coordinates.

We are systematically testing **every possible even/odd combination**.

---

# 🚫 Part 85 — Parity Is Not the Only Rule

But remember something important from `coordinate.ts`.

A coordinate is not valid merely because its parity works.

Midgard coordinates must also be:

🔢 **integers**

and:

➕ **non-negative**

So the remaining three tests concentrate on those restrictions.

---

# 🔢 Part 86 — Decimal Coordinates

The next test tries:

**(10.5, 10.5)**

Interesting!

Both numbers could appear to have the “same” relationship to each other.

But that does not matter because Midgard coordinates must be integers.

So the validator must reject them.

The test expects:

❌ **false**

---

# 💡 Why This Test Matters

Without this test, somebody could later accidentally alter the validator so that parity becomes the only condition.

Then fractional coordinates might slip through.

But Midgard's coordinate system is discrete.

We have positions such as:

**(2,2)**  
**(3,3)**  
**(4,2)**

We do not have logical Midgard coordinates such as:

**(2.37, 4.81)**

The geometric world can contain decimal positions.

The **logical coordinate world** cannot.

That distinction between logical coordinates and geometric points was one of the important ideas from Part I.

---

# ⛔ Part 87 — Negative x

The next test uses:

**(-2,2)**

Notice something interesting.

-2 is an integer.  
-2 is even.  
2 is an integer.  
2 is even.

So purely according to the parity rule:

**even + even**

looks valid.

But Midgard also requires coordinates to be non-negative.

Therefore:

> ❌ **(-2,2) must be rejected.**

And that is exactly what the test requires.

---

# ⛔ Part 88 — Negative y

The final test reverses the situation:

**(2,-2)**

Again:

2 = even  
-2 = even

But:

**y < 0**

Therefore:

❌ **invalid**

The test expects `false`.

---

# 🧠 Why Test Negative x AND Negative y?

This is similar to our parity tests.

Imagine an implementation bug that checks:

**x >= 0**

but accidentally forgets to check y.

Then the negative-x test would pass because the validator correctly rejects `(-2,2)`.

But `(2,-2)` might incorrectly be accepted.

By testing both axes separately, we demonstrate that the restriction applies independently to:

↔️ **x**

and:

↕️ **y**

---

# 🧪 Part 89 — What Exactly Have These Seven Tests Proven?

Let's collect the complete picture.

The tests establish that `CoordinateValidator` accepts:

🟢 **even/even**  
🟢 **odd/odd**

and rejects:

🔴 **even/odd**  
🔴 **odd/even**  
🔴 **decimal coordinates**  
🔴 **negative x**  
🔴 **negative y**

This closely mirrors the actual responsibility of `CoordinateValidator`.

That is important.

The tests are focused.

They are not trying to test hexagon geometry or grid filling at the same time.

They ask one fundamental question:

# “Is this a valid Midgard coordinate?”

---

# 🔬 Part 90 — These Are Good Unit Tests

This is a particularly clear example of **unit testing**.

The unit under test is small:

🛡️ `CoordinateValidator`

It has a focused responsibility:

> **validate a coordinate**

Each test supplies a controlled input and examines the returned result.

There is no:

❌ SVG  
❌ browser  
❌ grid rendering  
❌ database  
❌ user interface  
❌ network

The tests isolate the coordinate rule itself.

---

# 📖 Tests Can Be Read Almost Like Documentation

Notice how much we can understand simply by reading the test names:

**returns true when x and y are both even**  
**returns true when x and y are both odd**  
**returns false when x is even and y is odd**  
**returns false when x is odd and y is even**  
**returns false when coordinates contain decimals**  
**returns false when x is negative**  
**returns false when y is negative**

Even without reading the implementation, those sentences communicate most of the coordinate-validation contract.

That is a very useful property of well-named tests:

> ✨ **The test suite becomes another form of documentation.**

---

# 🔗 Part 91 — Source Code and Test Code Form a Pair

We can now think of these two files together:

### 🔢 `coordinate.ts`

says:

> **Here is the algorithm for deciding whether a coordinate is valid.**

### 🧪 `coordinate.test.ts`

says:

> **Here are concrete examples demonstrating the behaviour that algorithm must produce.**

The production code contains the solution.

The test code contains the expectations.

Together they describe the rule much more clearly than either one alone.
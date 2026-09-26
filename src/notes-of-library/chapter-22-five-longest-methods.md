# 📘 Part V — The Five Longest Methods

## Part 321 — Why the Assignment Focuses on Long Methods

Now we turn the Clean Code discussion directly toward the assignment requirement.

The interesting question is **not simply whether a method is long**.

Instead, we want to investigate:

🎯 **Does it still do one coherent thing?**  
🪜 **Does it stay at one sensible level of abstraction?**  
🔀 **Why does it contain several steps or control statements?**  
✂️ **Would extracting parts actually improve the code?**  
🧩 **Or would splitting it merely scatter one understandable algorithm across several methods?**

This distinction matters because:

> **long method ≠ automatically bad method.**

---

# 🔍 Part 322 — How We Should Judge Each Method

For each longer method, we can use the same five questions.

### 1️⃣ What is its purpose?

Can we describe the method in one sentence?

### 2️⃣ What steps does it perform?

A method can contain several steps while still pursuing one purpose.

### 3️⃣ Are those steps at roughly the same abstraction level?

Or does it suddenly jump from high-level orchestration into unrelated low-level details?

### 4️⃣ Would extraction make the intention clearer?

Sometimes a private helper gives an important operation a name.

### 5️⃣ Would extraction merely fragment the algorithm?

More methods do not automatically mean cleaner code.

---

# 📦 Part 323 — A Strong Candidate: `getBounds()`

One of the more substantial algorithms appears in:

⬡ **`HexagonGeometry.getBounds()`**

Its purpose can be stated very simply:

> **Calculate the rectangular bounds surrounding a collection of geometric points.**

That is already a good sign.

Despite containing several calculations, the method has one recognizable responsibility.

---

# 🟢 Part 324 — The Empty-Collection Case

The method first handles an important edge case:

**What if there are no points?**

There is then no meaningful:

**minX**  
**minY**  
**maxX**  
**maxY**

from which to calculate dimensions.

So Midgard returns a zero-sized bounds object:

⬅️ **minX = 0**  
⬆️ **minY = 0**  
➡️ **maxX = 0**  
⬇️ **maxY = 0**  
↔️ **width = 0**  
↕️ **height = 0**

This is a useful early decision because the rest of the algorithm can then assume:

**at least one point exists.**

---

# 🧠 Part 325 — Why the Early Return Helps

Without that early handling, the rest of the method might repeatedly need to ask:

❓ **Do we have any points?**

Or it might need artificial initial values such as:

**∞ and −∞**

Instead, the exceptional situation is handled immediately.

Conceptually:

**No points?**  
➡️ return zero bounds.

**Otherwise?**  
➡️ continue with the normal algorithm.

This keeps the main calculation easier to follow.

---

# 📍 Part 326 — Initialize From a Real Point

For a non-empty collection, Midgard initializes:

**minX**  
**minY**  
**maxX**  
**maxY**

from the **first actual point**.

That means the algorithm begins with a valid geometric observation.

Then every point can be compared against those current boundaries.

---

# 🔁 Part 327 — One Loop, Four Questions

For each point, the algorithm asks:

⬅️ **Is this x smaller than the current minX?**  
➡️ **Is this x larger than the current maxX?**  
⬆️ **Is this y smaller than the current minY?**  
⬇️ **Is this y larger than the current maxY?**

If so, the corresponding boundary is updated.

There are several `if` decisions here.

But notice:

> **all four decisions belong to exactly the same purpose: finding the extreme coordinates.**

---

# 📏 Part 328 — Finally Calculate Width and Height

Once the extremes are known:

↔️ **width = maxX − minX**  
↕️ **height = maxY − minY**

Then the complete `Bounds` object can be returned.

So the entire algorithm is:

🟢 **handle empty input**

⬇️

📍 **initialize boundaries**

⬇️

🔁 **inspect every point**

⬇️

⬅️⬆️➡️⬇️ **determine extremes**

⬇️

📏 **calculate dimensions**

⬇️

📦 **return bounds**

---

# 🎯 Part 329 — Does `getBounds()` Do One Thing?

I would describe the answer as:

**Yes, reasonably clearly.**

It contains multiple operations, but they are all necessary stages of:

📦 **calculating bounds**

It does not suddenly:

🐝 calculate neighbours  
🌱 fill coordinate ranges  
🎨 assign layers

or:

🖥️ render anything.

Its responsibility remains geometrically focused from beginning to end.

---

# ✂️ Part 330 — Could We Split It?

Technically, yes.

We could imagine helper methods such as:

`getHorizontalExtremes()`  
`getVerticalExtremes()`  
`createBoundsFromExtremes()`

But would that necessarily make this algorithm easier to understand?

Probably not.

The current calculation is conceptually simple:

> **scan the points and remember the smallest and largest x and y values.**

Breaking that simple scan into several methods could make the reader jump around unnecessarily.

---

# ⚖️ Part 331 — An Important Clean Code Lesson

This gives us our first useful reflection:

> A longer method should not automatically be divided simply because of its line count. `getBounds()` performs several steps, but they all contribute directly to one cohesive operation: calculating geometric bounds. Extracting those steps into separate methods could increase indirection without creating clearer responsibilities.

That is a much more thoughtful Clean Code analysis than:

> “The method is long, therefore it should be shorter.”

---

# 🌱 Part 332 — Another Candidate: `getCoordinateRange()`

Now consider:

🌱 **`CoordinateRangeFiller.getCoordinateRange()`**

Its purpose is:

> **Create the complete coordinate range from the skeleton according to Midgard's fill rules.**

Again, we can describe the purpose in one sentence.

But internally it performs several interesting steps.

---

# 🦴 Part 333 — First Obtain the Skeleton

The method begins with:

🦴 **the skeleton coordinates**

That gives it the core structure from which the final range will be constructed.

Then comes an important decision:

❓ **Should this range actually be filled?**

---

# 🚪 Part 334 — Another Useful Early Return

If filling is not required:

🌱❌

the method simply returns:

🦴 **the skeleton**

This corresponds especially to the special unfilled **1 × 1** case.

Again, an early return simplifies the rest of the method.

After that point, the algorithm knows:

**Yes, we are definitely performing fill-around.**

---

# 🧺 Part 335 — Start the Result With the Skeleton

When filling is required, Midgard first copies the skeleton into the result.

This is important because:

🌱 filling **extends** the skeleton.

It does not replace it.

So:

> **final range = skeleton + unique surrounding coordinates**

---

# 🔁 Part 336 — Visit Every Skeleton Coordinate

The method then loops through each:

🦴 **skeleton coordinate**

and asks:

🐝 **What are its six neighbours?**

That operation is delegated to:

`getCoordinatesAround()`

which in turn uses the neighbour logic.

---

# 🐝 Part 337 — Then Visit the Neighbours

For each surrounding coordinate, the filler asks:

❓ **Is this coordinate already in the result?**

If:

✅ **already present**

nothing needs to happen.

If:

❌ **not present**

the coordinate is added.

So we have nested iteration:

🔁 **each skeleton coordinate**  
　🐝 **obtain neighbours**  
　🔁 **each neighbour**  
　　🔍 **check for duplicate**  
　　➕ **add if unique**

---

# 🎯 Part 338 — Does This Method Do One Thing?

Again, I would argue:

**Yes.**

The nested loops may make the method look more complex than a tiny getter, but every operation serves:

🌱 **building the filled coordinate range**

The method does not contain the actual orientation-specific neighbour formulas.

That complexity has already been delegated to:

🐝 **NeighbourCalculator**

This is important.

If all six neighbour formulas were also embedded directly inside this method, its responsibility would become less focused.

---

# 🧩 Part 339 — Existing Helpers Already Reduce Complexity

Notice that this method already relies on meaningful helper operations:

🐝 **`getCoordinatesAround()`**

and:

🔍 **`containsCoordinate()`**

That means the main algorithm can be read conceptually as:

**get skeleton**  
**decide whether to fill**  
**get surrounding coordinates**  
**add the ones that do not already exist**

Those helper names remove lower-level detail from the main flow.

---

# ✂️ Part 340 — Should We Split It Further?

We could theoretically extract:

`addUniqueNeighbours()`

and move the inner loop there.

Then the main method might become shorter.

But again we should ask:

**Would that make the algorithm easier to understand?**

There is a reasonable argument either way.

An extracted helper could give the inner operation a clear name.

But the existing loop is also closely connected to the central filling algorithm and is not conceptually unrelated.

This is exactly the kind of design judgment Clean Code reflection should discuss rather than pretending there is one mathematically correct answer.

---

# 🌐 Part 341 — A Different Kind of Method: `getGridBounds()`

Now consider:

🌐 **`HexGrid.getGridBounds()`**

This method is interesting because it is more orchestration-oriented.

Its purpose is:

> **Calculate the total geometric bounds occupied by a set of Midgard coordinates.**

But it does not perform all the mathematics itself.

---

# 🔗 Part 342 — `getGridBounds()` Coordinates Other Responsibilities

Conceptually it performs:

🔢 **receive coordinates**

⬇️

📍 **calculate center for each coordinate**

⬇️

⬡ **calculate the six points for each hexagon**

⬇️

🧺 **collect all points**

⬇️

📦 **ask geometry to calculate their bounds**

This is a different kind of “one thing.”

Its job is not one isolated mathematical formula.

Its job is:

🎯 **coordinate the operations required to obtain grid bounds.**

---

# 🧠 Part 343 — Orchestration Can Still Be One Responsibility

This is important for understanding `HexGrid`.

A façade naturally coordinates other objects.

So saying:

> **“This method calls several other methods; therefore it does several things”**

would be too simplistic.

The calls:

📍 **position**  
⬡ **create points**  
📦 **calculate bounds**

are all stages of answering one high-level question:

> **What are the bounds of these grid coordinates?**

---

# 🪜 Part 344 — Abstraction Levels Matter Here

The method is cleaner because it can call operations with meaningful names.

It does not need to contain formulas such as:

**√3**  
**half-width**  
**half-radius**  
**min/max comparisons**

directly in its orchestration.

Instead it can remain relatively high-level:

📍 **get center**  
⬡ **get points**  
📦 **get bounds**

That is a good example of separating abstraction levels.

---

# 🎯 Part 345 — Does `getGridBounds()` Do One Thing?

A defensible conclusion is:

**Yes, at the façade level.**

Its one high-level responsibility is:

📦 **determine the geometric bounds of the supplied grid coordinates.**

It accomplishes that by delegating specialized calculations rather than implementing them all itself.

---

# 🌐 Part 346 — Now Consider `createGrid()`

Another important method is:

🌐 **`HexGrid.createGrid()`**

Its purpose is easy to state:

> **Create a complete collection of layered hexagons from the supplied grid options.**

Internally, however, it crosses several stages we now know very well.

---

# 🦴 Part 347 — First Obtain the Layered Coordinate Range

`createGrid()` supplies:

↔️ **skeleton width**  
↕️ **skeleton height**  
🌱 **fill-around behaviour**

to the range/layer pipeline.

It receives:

🔢 **coordinates**

➕

🎨 **z-indexes**

At this point it has the logical and rendering structure of the grid.

---

# ⬡ Part 348 — Then Transform Each Coordinate Into a Hexagon

For each layered coordinate:

📍 **calculate center**

⬇️

⬡ **calculate points**

⬇️

✨ **construct hexagon**

⬇️

🎨 **retain zIndex**

The result becomes:

`LayeredHexagon[]`

---

# 🔒 Part 349 — `createHexagon()` Is Already Extracted

This is a particularly nice detail.

The repeated operation:

📍 **center calculation**

➕

⬡ **point calculation**

➕

✨ **Hexagon construction**

has already been given a private helper:

`createHexagon()`

Therefore `createGrid()` does not need to contain all those details directly.

It can operate at a higher level:

**get layered coordinates**

then:

**turn each into a hexagon**

then:

**add its layer information**

---

# 🎯 Part 350 — Does `createGrid()` Do One Thing?

At its abstraction level:

**Yes.**

Its responsibility is:

🌐 **construct the requested grid**

The lower-level responsibilities are delegated.

This is an important example because `createGrid()` sounds like it should be complicated.

But the architecture allows the method to remain conceptually straightforward.

---

# ⬡ Part 351 — `createSingleHexagon()` Gives Us a Useful Comparison

The high-level method:

`createSingleHexagon()`

follows a similar pattern.

It obtains the special:

🦴 **1 × 1 unfilled range**

selects its coordinate

and delegates actual hexagon construction to:

🔒 **`createHexagon()`**

This means the two high-level creation methods share the same lower-level hexagon-building behaviour.

---

# ♻️ Part 352 — Why That Is Better Than Duplicating the Geometry

Imagine if:

`createSingleHexagon()`

and:

`createGrid()`

both separately contained:

📍 **positioning calculations**  
⬡ **corner calculations**  
✨ **object construction**

Then changing how a `Hexagon` is constructed would require updating both methods.

Instead:

⬡ **`createHexagon()`**

centralizes that internal operation.

That is a meaningful extraction because it represents a reusable internal concept.

---

# 🧠 Part 353 — This Shows When Extraction IS Valuable

Compare two cases.

### 📦 `getBounds()`

Extracting every min/max operation might merely fragment one simple algorithm.

### ⬡ `createHexagon()`

Extracting hexagon construction is useful because:

- it has a meaningful name,
- it is reused,
- and it hides lower-level detail from high-level creation methods.

So Clean Code is not:

> **“extract everything.”**

It is:

> **extract when the new abstraction makes the code easier to understand or avoids meaningful duplication.**

---

# 🔬 Part 354 — The Five-Method Analysis Gives Us a Pattern

Across these longer methods, we can see several kinds of complexity.

📦 **`getBounds()`**  
Algorithmic complexity.

🌱 **`getCoordinateRange()`**  
Iteration and domain-rule complexity.

📦 **`getGridBounds()`**  
Orchestration complexity.

🌐 **`createGrid()`**  
High-level construction complexity.

⬡ **`createSingleHexagon()` / internal `createHexagon()` relationship**  
Shared construction and abstraction.

The important question in every case remains:

> **Does the complexity belong to the method's stated purpose?**

---

# 🎓 Part 355 — A Strong Clean Code Reflection

A good overall reflection could express the reasoning like this:

> The longest methods are not necessarily violating the “do one thing” principle simply because they contain several steps. I interpret “one thing” as one coherent responsibility at a consistent abstraction level. For example, `getBounds()` performs several comparisons but all are part of calculating geometric bounds, while `createGrid()` delegates range generation and geometry calculations so that it can remain focused on constructing a grid. I would only extract additional methods where the extraction creates a meaningful abstraction rather than merely reducing the number of lines.

That shows that you understand the principle rather than applying it mechanically.

---

# ⚠️ Part 356 — One Important Distinction for Your Final Reflection

When you eventually write the actual university reflection, we should be careful to distinguish:

📏 **the objectively five longest methods by source-line count**

from:

🧠 **the methods that are most interesting to discuss architecturally**

They may overlap, but they are not necessarily identical.

For the final document, we should calculate the five longest methods from the actual source rather than guess from visual size.

Then we can apply exactly this style of analysis to those five.

---

# 🧹 Part 357 — Clean Code Is About Judgment

This entire exercise leads to something important.

Clean Code principles are not a machine where:

**“20 lines = bad”**  
**“10 lines = good”**  
**“three methods = clean”**  
**“one method = dirty”**

Instead, they encourage us to ask:

🎯 **Is the responsibility focused?**  
🏷️ **Is the intention clear?**  
🪜 **Are abstraction levels sensible?**  
🔗 **Are dependencies understandable?**  
🧩 **Are helpers meaningful?**  
✂️ **Would extraction genuinely improve readability?**  
🧪 **Can the behaviour be tested independently?**

Those questions require judgment.

---

# 📘 Part 358 — Next: The Public API as a Product

We have now looked deeply at the **inside** of Midgard.

The next important perspective is the opposite:

👨‍💻 **What does another programmer experience when they install and use this library?**

That brings us to:

📦 **the public API**  
🚪 **`index.ts` as the library entrance**  
✨ **high-level versus lower-level operations**  
🔒 **what should remain internal**  
🧠 **learnability**  
📖 **documentation and examples**

and an especially important library-design question:

> **How much of Midgard should another programmer need to understand before they can successfully use it?**
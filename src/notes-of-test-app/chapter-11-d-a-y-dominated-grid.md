## Chapter 11 — `DemoAreaYDominatedGrid.ts`

### ↕️ Part 252 — The same experiment with a different orientation

`DemoAreaYDominatedGrid.ts` is deliberately very similar to the x-dominated grid demo from Chapter 10.

The major difference is the orientation supplied to Midgard:

↔️ Previous chapter: **`x-dominated`**

↕️ This chapter: **`y-dominated`**

Everything else follows essentially the same demonstration strategy:

🦴 create a 3 × 2 skeleton

📏 use hex diameter 100

📦 ask Midgard to create the grid

📚 receive layered hexagons

📐 calculate the complete bounds

🎨 render the grid as SVG

🏷️ display coordinates and z-index values.

This similarity is useful because it isolates one variable:

> 🧪 **What changes when the orientation changes?**

---

# 🔬 Part 253 — A controlled comparison

The two grid demos can almost be viewed as a small experiment.

Keep these values constant:

📏 **hexDiameter = 100**

🦴 **skeletonWidth = 3**

🦴 **skeletonHeight = 2**

Change only:

🧭 **orientation**

Then compare the resulting geometry.

Conceptually:

　　　　　　**Same configuration**

　　　　　　　　　│

　　　　　┌────────┴────────┐

　　　　　▼　　　　　　　　▼

↔️ **x-dominated**　　　↕️ **y-dominated**

　　　　　│　　　　　　　　│

　　　　　▼　　　　　　　　▼

🗺️ grid geometry A　　　🗺️ grid geometry B

This makes the difference between orientations easier to understand than if every other configuration value changed at the same time.

---

# 🧭 Part 254 — The orientation changes the geometry

The important change happens when `HexGrid` is constructed as:

`y-dominated`

The test app does not contain a special collection of mathematical formulas for y-dominated geometry.

Instead:

↕️ orientation

⬇️

📦 **HexGrid**

⬇️

🧠 Midgard applies its y-dominated rules

⬇️

📍 different centers and polygon points

⬇️

🎨 the same general rendering strategy works

This reinforces the library boundary:

> 📦 **Orientation-specific geometry belongs inside Midgard, not inside the rendering application.**

---

# 📏 Part 255 — Diameter changes its geometric interpretation

The configuration still uses:

`hexDiameter: 100`

But for a y-dominated grid, the diameter corresponds to the full **height** of a hexagon.

So the same numeric value:

**100**

has an orientation-dependent geometric meaning.

Conceptually:

↔️ **x-dominated**

`hexDiameter`

→ full width

↕️ **y-dominated**

`hexDiameter`

→ full height

The test application does not need separate calculations for this.

Midgard owns that rule.

---

# 🦴 Part 256 — The skeleton concept remains unchanged

The demo still supplies:

`skeletonWidth: 3`

and:

**`skeletonHeight: 2`**.

So the conceptual request remains:

> 🦴 **Build a Midgard grid around a 3 × 2 skeleton.**

Changing orientation does not change what the skeleton configuration means at the API level.

That is valuable API consistency.

The consumer can use the same configuration structure for both orientations.

Only the orientation supplied to the `HexGrid` changes.

---

# 🔌 Part 257 — A consistent public API

This illustrates an important quality of the Midgard public API.

The consumer does not need one API such as:

**createXGrid**

and another completely different API such as:

**generateVerticalHexagonMap**

Instead, the conceptual model remains:

🏭 **create `HexGrid` with orientation**

⬇️

🗺️ **call `createGrid()` with grid options**

This makes the API easier to learn.

Once the x-dominated example is understood, the y-dominated example requires very little new knowledge.

---

# 📚 Part 258 — The returned type is still `LayeredHexagon[]`

Changing orientation does not change the kind of data returned to the consumer.

The result is still a collection of:

`LayeredHexagon`

objects.

Each still provides the information needed by the test application:

📍 coordinate

🎯 center

🔷 polygon points

🪜 z-index

The **values** change because the geometry changes.

But the **shape of the API result** remains stable.

That distinction is important.

---

# 🧠 Part 259 — Stable data structure, variable data

This can be expressed as:

### 📐 Stable structure

The consumer always receives objects following the same contract.

### 🔄 Variable values

The actual centers and polygon points depend on orientation and configuration.

That is desirable API behaviour.

A programmer does not want to learn an entirely new result format simply because the grid was rotated into another orientation.

So:

↔️ x-dominated

➡️ `LayeredHexagon[]`

↕️ y-dominated

➡️ `LayeredHexagon[]`

The consumer code can therefore remain largely the same.

---

# 🏷️ Part 260 — Coordinates are still shown

Like the previous demo, this page displays coordinate and z-index information alongside the SVG grid.

This is especially useful when comparing orientations.

The visual geometry changes, but Midgard's coordinate system remains inspectable.

The demo therefore presents two views of the same grid:

👁️ **Visual view**

→ SVG polygons

🧠 **Data view**

→ `(x, y)` and z-index

Together they help connect Midgard's logical coordinate system with its geometric representation.

---

# 🪜 Part 261 — Layering still belongs to the grid data

The y-dominated grid also receives z-index values.

Again, these values represent intended rendering order rather than x/y position alone.

So the returned object still combines:

📍 **where the hexagon belongs logically**

📐 **where its geometry appears**

🪜 **where it belongs in visual ordering**

This makes `LayeredHexagon` richer than a simple pair of coordinates.

---

# 🎨 Part 262 — The SVG renderer follows the same strategy

The method responsible for creating the SVG follows the same broad process as the x-dominated version.

It must:

📚 examine the returned hexagons

⬇️

📍 gather their points

⬇️

📐 determine overall bounds

⬇️

🖼️ create an SVG with a suitable viewBox

⬇️

🔁 process each hexagon

⬇️

🔷 create polygons

The important point is:

> 🎨 **The rendering algorithm does not need to understand why the points differ.**

It simply renders the geometry it receives.

---

# 📐 Part 263 — Bounds are calculated from reality, not orientation assumptions

The renderer does not say:

> “Because this is y-dominated, use this hardcoded width and height.”

Instead it calculates bounds from the actual points.

That means:

↕️ Midgard generates geometry

⬇️

📍 actual points are inspected

⬇️

📐 actual bounds are calculated

⬇️

🖼️ SVG adapts

This is more robust than embedding assumptions about the expected size of the result.

Again, the data drives the rendering.

---

# 🔷 Part 264 — Polygon rendering does not care about orientation

An SVG polygon only needs points.

It does not ask:

> “Was this hexagon x-dominated or y-dominated?”

It receives coordinates and draws them.

So the pipeline has a useful abstraction boundary:

📦 **Midgard**

understands:

🧭 orientation

📐 hex geometry

📍 positioning

⬇️

🎨 **SVG renderer**

understands:

🔷 points become polygons

This is an excellent example of two systems needing different knowledge.

---

# 🧠 Part 265 — Information disappears when it is no longer needed

At the beginning of the process, orientation is essential.

Midgard needs it to calculate the geometry.

But once the polygon points have been calculated, the SVG renderer no longer needs to reason about orientation.

Conceptually:

↕️ **orientation**

⬇️ needed by

📐 **geometry calculation**

⬇️ produces

📍 **points**

⬇️ orientation knowledge no longer required

🎨 **render points**

This is a useful software-design idea:

> 🧠 **Pass knowledge only as far as it is actually needed.**

---

# 🪞 Part 266 — Why are the X and Y demo files so similar?

At this point an obvious question appears.

`DemoAreaXDominatedGrid.ts`

and:

`DemoAreaYDominatedGrid.ts`

are extremely similar.

Could they have been one class?

Technically, yes.

A more generalized class could potentially receive orientation as configuration.

For example, conceptually:

🗺️ **GridDemo**

⬅️ orientation

⬅️ title

⬅️ explanation

and then render either form.

But whether that abstraction is desirable depends on the purpose of the code.

---

# ⚖️ Part 267 — Duplication is not automatically bad

Software development often teaches:

> ♻️ **Don't Repeat Yourself — DRY.**

That is useful advice, but it should not be interpreted as:

> ❌ **Any two similar lines of code must immediately be combined.**

Sometimes two pieces of code are similar because they represent two deliberately separate concepts.

These demos are separate menu items with separate educational purposes:

↔️ **X-Dominated Grid**

↕️ **Y-Dominated Grid**

Keeping them separate can make each demonstration straightforward to inspect.

So there is a trade-off:

♻️ **reduce duplication**

versus:

🔍 **preserve clarity and independence**

---

# 🧠 Part 268 — Premature abstraction can also create complexity

Suppose every similarity were immediately extracted into configurable abstractions.

The result might require:

⚙️ configuration objects

🔀 conditionals

🏭 generic factories

🧩 extra helper classes

That could reduce repeated lines while making a simple demonstration harder to follow.

This leads to an important design principle:

> 🧠 **Abstraction should remove meaningful duplication, not merely chase identical-looking code.**

The right abstraction often becomes clearer after the code has evolved and the repeated concepts are well understood.

---

# 🧪 Part 269 — Demo code has different priorities

The purpose of these files also matters.

They are not the core Midgard geometry engine.

They are **demonstration code**.

For a demo, explicitness can sometimes be valuable.

A programmer examining:

↕️ **Y-Dominated Grid**

can open one file and see the complete demonstration without mentally resolving a large generic abstraction.

That does not mean duplication should never be refactored.

It means the decision should consider the role of the code.

---

# 🧩 Part 270 — Same structure can prove API consistency

There is another benefit to the similarity.

The two files demonstrate that Midgard's public API is symmetrical.

Compare conceptually:

↔️ create x-dominated HexGrid  
🦴 provide skeleton dimensions  
🗺️ create grid  
🎨 render result

with:

↕️ create y-dominated HexGrid  
🦴 provide skeleton dimensions  
🗺️ create grid  
🎨 render result

Only the orientation needs to change.

That is evidence of a consistent API design.

The similarity in the demo code makes that consistency visible.

---

# 🧭 Part 271 — Orientation is a strategy-like variation

At a conceptual level, orientation behaves like a variation in how Midgard performs geometric work.

The consumer chooses:

↔️ x-dominated

or:

↕️ y-dominated

and Midgard applies the corresponding geometric behaviour.

The consumer does not need to select individual formulas.

It selects a meaningful domain option.

This is close to a broader software-design idea:

> 🧭 **Choose a behaviour through configuration while keeping the surrounding workflow stable.**

The exact implementation inside Midgard was covered in the Library Notes; here the important point is how cleanly the consumer experiences that variation.

---

# 🔄 Part 272 — The complete y-dominated pipeline

The whole process can now be followed:

↕️ **`y-dominated`**

⬇️

🏭 **new HexGrid**

⬇️

📏 **hexDiameter 100**

🦴 **skeletonWidth 3**

🦴 **skeletonHeight 2**

⬇️

🗺️ **createGrid()**

⬇️

📚 **LayeredHexagon[]**

⬇️

📍 collect all polygon points

⬇️

📐 calculate complete bounds

⬇️

🖼️ create SVG coordinate space

⬇️

🔁 render each hexagon

⬇️

🔷 SVG polygons

⬇️

↕️ **visible y-dominated grid**

At the same time:

📚 LayeredHexagon data

⬇️

🏷️ coordinate + z-index list

This gives both visual and structural information.

---

# 🔬 Part 273 — X and Y demos as a pair

The two chapters are best understood together.

### ↔️ X-Dominated Grid

Changes geometry according to x-dominated rules.

### ↕️ Y-Dominated Grid

Changes geometry according to y-dominated rules.

But both preserve:

📦 the same library class

🗺️ the same `createGrid()` operation

🦴 the same skeleton configuration concept

📚 the same result type

🎨 the same SVG rendering strategy

🪜 the same layering concept

This means the orientation is a **variation inside a stable system** rather than two unrelated systems.

---

# 🧰 Software-design concepts reinforced in Chapter 11

### 🔬 Controlled comparison

Keeping most configuration constant makes one changing factor easier to understand.

### 📐 Stable contracts

Different configurations can produce different values while preserving the same result structure.

### 🎨 Rendering independence

SVG needs geometric points, not knowledge of Midgard's orientation mathematics.

### 🧠 Information locality

A piece of information should only travel into parts of the system that actually need it.

### ♻️ DRY

Repeated code can sometimes be extracted, but reducing repetition is not the only design goal.

### ⚖️ Abstraction trade-offs

Less duplication can come at the cost of additional indirection and complexity.

### 🧪 Context matters

Demonstration code may favor explicitness differently from production library internals.

---

# 🎯 Chapter 11 — The central idea

`DemoAreaYDominatedGrid.ts` proves something important about both Midgard and the test application.

The orientation can change substantially:

↔️ **x-dominated**

to:

↕️ **y-dominated**

without changing the overall workflow.

The architecture remains:

🧭 **choose orientation**

⬇️

📦 **HexGrid**

⬇️

🗺️ **createGrid()**

⬇️

📚 **LayeredHexagon[]**

⬇️

🎨 **generic geometry-to-SVG rendering**

The test app does not need to understand Midgard's y-dominated mathematics.

It only needs to understand the data returned by the public API.

And the strong similarity between the X and Y demos reveals another software-design lesson:

> 🧠 **Similar code is a reason to consider abstraction, not an automatic command to abstract. Clarity, purpose and future change also matter.**

The next chapter moves beyond simple outline geometry:

🎨 **`DemoAreaCssStyling.ts`**

There, Midgard coordinates begin influencing the actual DOM by becoming **SVG element IDs**, allowing individual hexagons to be targeted and styled through ordinary CSS.
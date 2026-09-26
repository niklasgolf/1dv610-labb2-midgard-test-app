# 📘 Part XII — Midgard as a TypeScript Library

## Part 548 — Library Versus Application

This distinction is fundamental to the entire assignment.

Midgard itself is:

📦 **a library**

The separate demo/test application is:

🖥️ **an application that consumes the library**

They have different purposes.

The library provides reusable functionality to **other programmers**. That is central to the assignment itself.

---

# 📦 Part 549 — A Library Does Not Need to Be an End-User Program

When someone installs Midgard, they do not necessarily expect:

🖥️ **a webpage**  
🎨 **buttons**  
🖱️ **menus**  
📝 **forms**

Instead, they expect reusable programming capabilities.

For example:

🌐 **create a grid**  
🐝 **calculate neighbours**  
📍 **calculate positions**  
⬡ **calculate hexagon geometry**  
📦 **calculate bounds**

The **output of the library becomes input to someone else's program.**

---

# 🧱 Part 550 — Midgard Stops at the Right Boundary

This is one of the most important architectural decisions in the project.

Midgard calculates things such as:

🔢 **coordinates**  
📍 **center positions**  
⬡ **corner points**  
🎨 **z-index values**  
📦 **bounds**

But it does **not** decide:

❌ **which HTML elements to create**  
❌ **which CSS colors to use**  
❌ **whether rendering uses SVG or Canvas**  
❌ **whether the consumer uses React**  
❌ **whether the hexagons are clickable**

Those decisions belong to the consuming application.

---

# 🎨 Part 551 — Geometry Is Not Rendering

This distinction deserves emphasis.

Suppose Midgard returns six points describing a hexagon:

⬡

That is **geometry**.

If another application takes those points and creates:

**an SVG polygon**

that is **rendering**.

Midgard answers:

📐 **Where are the corners?**

The application answers:

🖼️ **What should I do with those corners?**

---

# 🌐 Part 552 — This Makes Midgard More Reusable

Imagine Midgard directly created browser SVG elements.

Then it would become tied to:

🌐 **the browser**

and:

⬡ **SVG**

But because Midgard returns ordinary data, another programmer could potentially use it with:

🖼️ **SVG**  
🎨 **Canvas**  
🎮 **a game engine**  
📊 **another visualization system**

or:

🧪 **purely mathematical calculations**

The library does not unnecessarily choose the consumer's rendering technology.

---

# 🚪 Part 553 — `index.ts` Defines the Package Boundary

This brings us back to:

🚪 **`index.ts`**

Its job is deceptively important.

It exports the pieces that consumers are supposed to access.

That includes concepts such as:

🌐 `HexGrid`  
🔢 `Coordinate`  
🧭 `GridOrientation`  
⬡ `HexagonGeometry`  
📍 `CoordinatePositioner`

and the other public types/classes.

So `index.ts` effectively says:

> **“This is Midgard's public surface.”**

---

# 🏠 Part 554 — Internal Files Versus Public Package

Inside the project, the implementation is organized into files such as:

`coordinate.ts`  
`neighbours.ts`  
`geometry.ts`  
`coordinate-layer.ts`

and so on.

But a consumer should conceptually think:

📦 **midgard-hex-grid**

not:

📁 **“I need to know exactly where Niklas put each source file.”**

That distinction is important for library design.

Internal organization can evolve while the public package remains understandable.

---

# 🏗️ Part 555 — Source Code Is Not Necessarily What Consumers Execute

You write Midgard in:

🔷 **TypeScript**

But TypeScript normally goes through a build process.

Conceptually:

🔷 **TypeScript source**

⬇️

🏗️ **build**

⬇️

📦 **distributable JavaScript + type information**

⬇️

👨‍💻 **consuming project**

This is another difference between:

**developing the library**

and:

**using the library**

---

# 🔷 Part 556 — Why Type Information Still Matters

Although JavaScript ultimately executes the program, TypeScript consumers benefit from the library's type definitions.

That means an editor can understand concepts such as:

`HexGridOptions`  
`Hexagon`  
`LayeredHexagon`  
`Coordinate`  
`Bounds`

and:

`GridOrientation`

This gives consumers:

💡 **autocomplete**  
🚨 **compile-time feedback**  
📖 **discoverability**

and:

🧠 **information about the API**

---

# 📦 Part 557 — The Package Is a Contract

Once another project depends on Midgard, the package becomes a boundary between:

🛠️ **library implementation**

and:

👨‍💻 **library consumer**

The consumer should care primarily about:

📥 **accepted inputs**  
📤 **returned outputs**  
💥 **documented errors**  
🧭 **documented semantics**

They should not need to understand every internal algorithm.

---

# 🧪 Part 558 — Then Why Do We Need the Separate Test App?

Because the library itself is not primarily a visual application.

We still want to see:

⬡ **whether hexagons actually appear correctly**  
🌐 **whether grids look sensible**  
🎨 **whether z-index behaves correctly in a rendering context**

So we created:

🖥️ **`midgard-test-app`**

as a separate consumer.

---

# 🔌 Part 559 — The Test App Uses Midgard From the Outside

Conceptually, the relationship should be:

🖥️ **midgard-test-app**

⬇️ uses

📦 **midgard-hex-grid**

Not:

📦 **Midgard**

⬇️ depends on

🖥️ **test app**

This dependency direction matters enormously.

---

# ➡️ Part 560 — The Dependency Should Point Toward the Library

Think of the library as the reusable foundation:

📦 **MIDGARD**  
⬆️  
🖥️ **Test App**

The application knows about Midgard.

Midgard does not need to know that the application exists.

That means we could delete the test application tomorrow and:

📦 **the library should still make sense.**

---

# 🌍 Part 561 — And We Could Create Another Consumer

Later we could have:

🖥️ **Demo App**  
🎮 **Game**  
🗺️ **Map Tool**  
📊 **Visualization**

all using:

📦 **Midgard Hex Grid**

Conceptually:

🖥️　🎮　🗺️　📊  
↘️　 ↓　 ↓　 ↙️  
　📦 **Midgard**

That is what reusability looks like architecturally.

---

# 🚫 Part 562 — What Would Be a Bad Separation?

Imagine `HexGrid.createGrid()` contained something equivalent to:

> **“Find the HTML element with ID `midgard-demo`.”**

or:

> **“Set this CSS class.”**

Now the supposedly reusable library knows details about one particular UI.

That would weaken the separation.

The library would no longer simply provide hex-grid functionality.

It would partly become an application.

---

# 🎯 Part 563 — Separation of Concerns at Project Level

Earlier we discussed separation of responsibilities between classes.

Now the same principle appears at a larger scale.

### 📦 Library responsibility

**Model and calculate Midgard hex grids.**

### 🖥️ Demo/test application responsibility

**Use the library and present its results visually.**

So separation of concerns exists at several levels:

🔧 **method level**  
🏛️ **class level**  
📁 **module level**  
🖥️ **application level**

---

# 🧪 Part 564 — Unit Tests and Test App Serve Different Purposes

We now actually have two different kinds of verification.

### 🧪 Automated tests

Ask:

> **Does the library produce the expected values?**

### 🖥️ Demo/test application

Helps us inspect:

> **Can another program actually consume these values and use them successfully?**

The test app is therefore not a replacement for Vitest.

And Vitest is not a replacement for the consumer application.

They provide different evidence.

---

# 👀 Part 565 — Visual Verification Has Value

Hexagonal geometry is especially suitable for visual inspection.

A mathematical error might produce:

⬡ **a distorted shape**  
↔️ **incorrect spacing**  
🧱 **overlapping hexagons**  
🎨 **incorrect layering**

Seeing the generated grid can reveal problems that are immediately obvious to a human.

But visual inspection alone is difficult to repeat systematically.

That is why the automated tests remain important.

---

# 🧪 Part 566 — Automated Tests Give Repeatability

A person looking at a grid might say:

👀 **“That seems right.”**

An automated test can say:

📍 **“For this exact input, x must equal this expected value.”**

and it can perform that check:

**today,**  
**tomorrow,**  
**after refactoring,**  
**after adding another feature.**

So:

👀 **visual testing**

and:

🧪 **automated testing**

complement one another.

---

# 🧠 Part 567 — The Test App Is Also Proof of Usability

There is another subtle benefit.

If your separate application can consume Midgard without reaching into internal implementation details, that demonstrates something about the API.

It provides practical evidence that:

📦 **the library can actually be used externally.**

This is especially relevant because the assignment explicitly distinguishes the reusable module from the test application, and the test app does not count toward the module's required size.

---

# 📖 Part 568 — A Library Needs Documentation More Than an Internal Utility

If you write a tiny private function inside your own application, perhaps only you need to understand it.

But once something is presented as:

📦 **a reusable library**

the expectations change.

Another programmer needs to know:

📦 **how to install it**  
🚪 **how to import it**  
🧭 **how orientation works**  
⬡ **how to create one hexagon**  
🌐 **how to create a grid**  
🦴 **what skeleton dimensions mean**  
📤 **what the returned structures contain**

---

# ✨ Part 569 — The First Example Should Be Extremely Easy

The first documentation example should not demonstrate every feature.

Its purpose should be:

> **Get the programmer from zero to success quickly.**

Conceptually:

📦 **import Midgard**

⬇️

🌐 **create HexGrid**

⬇️

🌐 **create a small grid**

⬇️

✨ **receive hexagons**

Then the programmer can learn deeper concepts gradually.

---

# 🧭 Part 570 — Documentation Should Explain Orientation Early

Orientation is fundamental because it affects:

🐝 **neighbours**  
📍 **positioning**  
⬡ **geometry**  
📏 **diameter interpretation**

Therefore the documentation should clearly establish:

↔️ **x-dominated**

and:

↕️ **y-dominated**

early enough that later examples make sense.

---

# 🦴 Part 571 — Then Explain the Skeleton

Next comes one of Midgard's most distinctive concepts:

🦴 **the skeleton**

The programmer must understand that:

`skeletonWidth`

and:

`skeletonHeight`

describe the internal skeleton,

**not necessarily the final number of generated hexagons.**

Without that explanation, `createGrid()` could appear surprising.

---

# 🌼 Part 572 — The 1 × 1 Example Is Excellent Documentation

A particularly useful comparison would be:

⬡ **`createSingleHexagon()`**  
→ exactly **1 hexagon**

versus:

🌐 **`createGrid()` with a 1 × 1 skeleton**  
→ **7 hexagons** because the skeleton is filled around

That single comparison teaches:

🦴 **skeleton**  
🌱 **fill**  
⬡ **single-hexagon semantics**

and:

🌐 **grid semantics**

---

# 📦 Part 573 — Returned Data Should Be Explained

When `createGrid()` returns:

✨ **`LayeredHexagon[]`**

the consumer should understand what each item contains:

🔢 **coordinate**  
📍 **center**  
⬡ **six points**  
🎨 **zIndex**

Then they can decide how to render or otherwise use those values.

The library provides the information.

The consumer decides the presentation.

---

# 🔒 Part 574 — Internal Architecture Does Not Belong in the Quick Start

Notice what the beginner does **not** need to know immediately:

🌱 `CoordinateRangeFiller`  
📍 `CoordinatePositioner`  
🎨 `CoordinateLayer`  
⬡ `HexagonGeometry`

Those are important when studying or maintaining Midgard.

But they are not prerequisites for basic usage.

This is another example of abstraction:

> **documentation can hide complexity just as code can.**

---

# 🎓 Part 575 — This Connects Directly to the Assignment

The assignment's higher-grade criteria explicitly value:

📖 **documentation**  
💡 **examples**  
📦 **installation guidance**

and:

🔀 **clear separation between module and test application**

So these are not cosmetic extras.

They help demonstrate that Midgard has genuinely been designed as:

📦 **a reusable module for other programmers.**

---

# 🌟 Part 576 — The Whole Library Boundary

We can now summarize the architecture at project level:

### 📦 `midgard-hex-grid`

Owns:

🔢 **domain rules**  
🐝 **neighbours**  
🦴 **ranges**  
🌱 **filling**  
🎨 **layering**  
📍 **positioning**  
⬡ **geometry**  
📦 **bounds**  
🌐 **public API**

⬇️ consumed by

### 🖥️ `midgard-test-app`

Owns:

🎨 **visual presentation**  
🖱️ **interaction**  
🖥️ **browser UI**  
👀 **demonstration**

That is a clean and understandable boundary.

---

# 📘 Part 577 — We Are Entering the Final Chapter

At this point we have examined Midgard from almost every important direction:

💻 **source code**  
🧪 **tests**  
🏗️ **architecture**  
🧹 **Clean Code**  
🚪 **API design**  
🧠 **domain modeling**  
🏛️ **OOP**  
🛡️ **invariants**  
🔗 **dependencies**  
🧩 **design patterns**  
📦 **library boundaries**

The final chapter will now **bring all of those perspectives together**.

Rather than introducing lots of new concepts, we'll build one coherent mental model of the entire project:

> **What happens from the moment a programmer asks Midgard for a grid until the final `LayeredHexagon[]` is returned—and why is the system designed this way?**

That will give the book a proper ending and give you a compact mental model you can use when explaining the project yourself.
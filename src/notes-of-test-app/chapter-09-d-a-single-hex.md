# 📘 MIDGARD TEST APP

## Chapter 9 — `DemoAreaSingleHex.ts`

### ⬡ Part 193 — Where the test app meets the Midgard library

`DemoAreaSingleHex.ts` is the first demo where the test application begins using the actual **Midgard Hex Grid library**.

The previous Home demo only created an empty HTML element.

This demo does much more:

🧩 implements the common `Demo` interface

⬇️

📐 creates a `HexGrid`

⬇️

⬡ asks the library to create a single hexagon

⬇️

📍 receives geometric points

⬇️

🎨 converts those points into SVG

⬇️

👁️ displays the result in the browser

It also demonstrates **both orientations** supported by the library:

↔️ **x-dominated**

↕️ **y-dominated**

So this file is an important bridge between two separate projects:

📦 **Midgard Hex Grid library**

and:

🖥️ **Midgard test application**.

---

# 📦 Part 194 — Importing the library's public API

The demo imports what it needs from the Midgard library.

One of the most important imports is:

`HexGrid`

This is the high-level façade of the library.

The test application does not need to manually use the library's internal coordinate positioner, geometry calculator and other implementation classes.

Instead, it can work through the public API:

📦 **Midgard library**

⬇️ exposes

⬡ **HexGrid**

⬇️ used by

🖥️ **test application**

This is exactly what a library's public API is supposed to achieve:

> 📐 **The consumer uses a clear public interface without needing to understand the internal implementation.**

---

# 🔌 Part 195 — The test app is a library consumer

This distinction is fundamental to the entire project.

There are really two pieces of software:

### 📦 The library

`midgard-hex-grid`

Its job is to calculate:

📍 coordinates

📐 geometry

⬡ hexagon points

🧭 neighbours

📏 bounds

🗺️ grids

### 🖥️ The test application

Its job is to **use and demonstrate** those capabilities.

The test app should therefore behave like another programmer using the library.

It asks the library for useful data and decides independently how that data should be presented.

This separation will become especially clear when SVG is introduced.

---

# 🎭 Part 196 — One demo, two orientations

The `render()` method creates examples for both:

`x-dominated`

and:

**`y-dominated`**.

This is useful because the purpose of the page is not merely to produce one attractive hexagon.

It is a **demonstration page**.

The reader should be able to compare the two supported orientations.

Conceptually:

⬡ **Single Hex**

├── ↔️ **X-Dominated**  
│　└── SVG hexagon  
│  
└── ↕️ **Y-Dominated**  
　　└── SVG hexagon

The same library operation is therefore demonstrated under two different configurations.

---

# 🏗️ Part 197 — `render()` builds a complete demo section

Unlike `DemoAreaHome`, this `render()` method constructs several pieces of DOM.

The method creates a wrapper and adds content describing the examples.

The resulting demo is not just raw SVG.

It contains explanatory structure around the visual output.

That is an important responsibility of the test application.

The library provides **hexagon data**.

The demo provides:

🏷️ headings

📝 explanations

💻 examples of library usage

🎨 visual rendering

This makes the test application useful as both a showcase and a learning tool.

---

# 🧱 Part 198 — Breaking a larger interface into smaller pieces

Rather than putting every operation directly into `render()`, the class delegates work to helper methods.

The file includes responsibilities such as:

⬡ creating the Midgard hexagon

and:

🎨 converting it into SVG.

This follows an increasingly familiar pattern:

**High-level method**

⬇️ coordinates the process

**Helper methods**

⬇️ perform focused tasks

This makes `render()` easier to understand because it can describe the page at a higher level instead of containing every geometric and SVG detail.

---

# 🧭 Part 199 — Orientation becomes input

The method responsible for creating a single hexagon receives an orientation.

Conceptually:

**create single hexagon**

⬅️ receives

↔️ **x-dominated**

or:

↕️ **y-dominated**

This is better than creating two almost identical methods such as:

**createXHexagon**

and:

**createYHexagon**

The algorithm is fundamentally the same.

Only the orientation changes.

So orientation is treated as **data passed into reusable behaviour**.

That reduces duplication.

---

# 🏭 Part 200 — Creating the `HexGrid`

The demo creates a new `HexGrid` using the selected orientation.

Conceptually:

↔️ **`x-dominated`**

⬇️

🏭 create `HexGrid`

or:

↕️ **`y-dominated`**

⬇️

🏭 create `HexGrid`

The resulting `HexGrid` object now represents a library object configured for that orientation.

This is object construction being used to establish configuration.

Once created, the object knows which orientation its calculations should follow.

---

# 📐 Part 201 — Configuration through the constructor

This illustrates a common object-oriented pattern.

Information that affects the object's general behaviour can be supplied when the object is created.

Conceptually:

🏭 **construction**

`HexGrid + orientation`

⬇️

🧠 **configured object**

⬇️

future methods operate according to that orientation

The alternative would be to repeatedly pass orientation into every library method.

Instead, the orientation belongs to the `HexGrid` object's state.

That allows later operations to be simpler.

---

# ⬡ Part 202 — Calling `createSingleHexagon()`

Once the grid exists, the demo calls the library's high-level method:

`createSingleHexagon()`

with:

**`hexDiameter: 300`**.

This is a very important public API operation.

The test application does not calculate the hexagon itself.

It says, conceptually:

> 📦 **Midgard, create one hexagon with this diameter.**

The library then returns the geometric result.

This is exactly the separation desired between library and consumer.

---

# 📏 Part 203 — `hexDiameter` expresses size

The option:

`hexDiameter: 300`

tells the library how large the hexagon should be.

But the meaning of the diameter depends on orientation.

For an:

↔️ **x-dominated hexagon**

the diameter corresponds to its full width.

For a:

↕️ **y-dominated hexagon**

the diameter corresponds to its full height.

The library owns those geometric rules.

The test application only supplies the desired value.

This is another example of abstraction:

> 🧠 **The consumer expresses intention; the library handles the mathematics.**

---

# 📦 Part 204 — What comes back from the library?

The returned hexagon contains geometric information needed by the consumer.

Most importantly for this demo, it contains:

📍 **points**

These describe the corners of the hexagon.

Conceptually:

⬡ Hexagon

→ point 1

→ point 2

→ point 3

→ point 4

→ point 5

→ point 6

Those points can then be used by a rendering technology.

And this leads to one of the most important design decisions in the entire Midgard project:

> 📦 **The library provides geometry, not SVG.**

---

# 🎨 Part 205 — Midgard does not render the hexagon

The library could theoretically have returned an SVG polygon.

But it does not.

Instead, it returns geometric data.

The test application decides:

> 🎨 **I want to represent these points using SVG.**

That means the architecture is:

📦 **Midgard**

→ geometry

not:

📦 **Midgard**

→ browser-specific SVG

This keeps the library more independent.

Another consumer could potentially use the same geometric information for a different rendering system.

The library does not need to know.

---

# 🖼️ Part 206 — Enter SVG

The method `createHexagonSvg()` takes the generated hexagon and turns its geometry into an SVG representation.

SVG means:

# Scalable Vector Graphics

Unlike an ordinary raster image made from a fixed grid of pixels, SVG describes graphical shapes mathematically.

For a hexagon, this is ideal.

The browser can be told:

> 🔷 Draw a polygon through these six points.

The result remains sharp when scaled because the shape is described geometrically.

---

# 🔷 Part 207 — A polygon is a natural representation of a hexagon

SVG provides a `<polygon>` element.

A polygon is defined by a sequence of points.

That matches Midgard's output perfectly.

The transformation is conceptually:

📦 **Midgard points**

⬇️

📍 `(x₁,y₁)`

📍 `(x₂,y₂)`

📍 `(x₃,y₃)`

📍 `(x₄,y₄)`

📍 `(x₅,y₅)`

📍 `(x₆,y₆)`

⬇️

🔷 **SVG polygon**

The test app therefore does not need to recalculate the geometry.

It simply translates Midgard's geometric result into SVG syntax.

---

# 🌐 Part 208 — SVG belongs to a different XML namespace

Creating SVG elements through JavaScript is slightly different from creating ordinary HTML elements.

Ordinary HTML can use:

`document.createElement(...)`

SVG elements are created using the SVG namespace.

This is why SVG-oriented code commonly uses:

`document.createElementNS(...)`

The namespace tells the browser:

> 🌐 **This element belongs to SVG, not ordinary HTML.**

That distinction becomes much more important later in the SVG Terrain demo, where many different SVG elements are created.

---

# 📐 Part 209 — The SVG needs its own coordinate system

Midgard returns geometric points.

Those points may occupy a particular region of two-dimensional space.

The SVG therefore needs a coordinate system capable of displaying that region correctly.

This is where the SVG:

`viewBox`

becomes important.

A viewBox essentially tells SVG:

> 📐 **This is the region of mathematical space that should be visible.**

It is commonly described using four values:

**minimum x**

**minimum y**

**width**

**height**

The demo calculates those values from the actual Midgard points.

---

# 🔎 Part 210 — Finding the geometric extremes

To construct the correct SVG area, the demo examines all the hexagon's points.

It needs to determine:

⬅️ **smallest x**

➡️ **largest x**

⬆️ **smallest y**

⬇️ **largest y**

These values describe the outer limits of the hexagon.

Conceptually:

　　　　　　**minY**

　　　　　　　⬡

**minX**　←　　　　→　**maxX**

　　　　　　　⬡

　　　　　　**maxY**

Once these extremes are known, the required width and height can be calculated.

---

# 📏 Part 211 — Width and height from min and max

The geometric width follows the simple relationship:

**width = maxX − minX**

Similarly:

**height = maxY − minY**

This is a very common geometric pattern.

If an object stretches from x = 50 to x = 350:

**350 − 50 = 300**

So its width is 300 coordinate units.

The same principle works vertically.

This calculation allows the SVG viewport to fit the actual geometry rather than relying on arbitrary hardcoded dimensions.

---

# 🧠 Part 212 — Data-driven rendering

This is an important design principle.

The SVG dimensions are derived from:

📍 **the actual hexagon points**

rather than assuming:

> “A single hexagon should always occupy exactly this rectangle.”

So the flow is:

📦 **library geometry**

⬇️

📐 **calculate bounds**

⬇️

🖼️ **configure SVG**

This is **data-driven rendering**.

The visual container adapts to the data it receives.

That makes the rendering code more reusable across the two orientations.

---

# 🔁 Part 213 — Transforming points into SVG point text

SVG polygons expect their points in a textual coordinate format.

Conceptually:

**x,y x,y x,y x,y x,y x,y**

But Midgard provides structured point objects.

So the application must transform:

📦 **array of Point objects**

into:

📝 **SVG-compatible coordinate text**

This is a classic example of adapting data from one representation into another.

The geometry itself does not change.

Only its representation changes.

---

# 🗺️ Part 214 — `.map()` as a transformation operation

This kind of transformation commonly uses the array method:

`.map()`

Unlike `.find()`, which searches for one item, `.map()` creates a new value for every item in an array.

Conceptually:

📍 Point object

⬇️ transform

📝 coordinate string

for every point.

So:

**array of points**

⬇️ `.map(...)`

**array of coordinate strings**

The number of items remains the same.

Each item is simply transformed.

This is one of the most frequently used array operations in TypeScript and JavaScript.

---

# 🔗 Part 215 — `.join()` combines the transformed values

After each point has become a coordinate string, those strings need to become one final value for the SVG polygon.

This is where:

`.join()`

is useful.

Conceptually:

📚 array:

**point A**

**point B**

**point C**

⬇️ join with spaces

📝 one string:

**point A point B point C**

So `.map()` and `.join()` often work together:

📦 structured array

⬇️ **map**

📝 transformed array

⬇️ **join**

📄 one formatted string

This is a useful general JavaScript pattern.

---

# 🎨 Part 216 — The polygon's visual styling

The SVG polygon is deliberately simple.

It has:

**no filled interior**

and:

**a visible outline**

This keeps the focus on the geometry generated by Midgard.

The purpose of this demo is not terrain art or elaborate styling.

It is:

> ⬡ **Show exactly what a single library-generated hexagon looks like.**

More advanced visual styling is deliberately left for later demos.

That keeps each demo focused on a particular idea.

---

# 🎯 Part 217 — `currentColor` connects SVG to CSS

The polygon uses **`currentColor`** for its stroke.

`currentColor` is a useful CSS concept.

It means:

> 🎨 **Use the element's current CSS `color` value here.**

So instead of hardcoding a specific stroke colour directly into the SVG logic, the visual colour can participate in the surrounding CSS system.

This is a small example of keeping presentation flexible.

SVG and CSS can cooperate rather than requiring every visual property to be hardcoded in TypeScript.

---

# 🔄 Part 218 — The same renderer handles both orientations

One of the strongest parts of the design is that `createHexagonSvg()` does not need one version for x-dominated hexagons and another for y-dominated hexagons.

Why?

Because by the time the rendering method receives the hexagon, the orientation-specific geometry has already been calculated by Midgard.

So:

↔️ **x-dominated**

⬇️ Midgard

📍 correct x-dominated points

⬇️

🎨 generic SVG renderer

and:

↕️ **y-dominated**

⬇️ Midgard

📍 correct y-dominated points

⬇️

🎨 same generic SVG renderer

This is excellent separation of responsibilities.

---

# 🧠 Part 219 — Geometry and rendering remain independent

The architecture can now be divided into two layers.

### 📐 Geometry layer

Owned by:

📦 **Midgard Hex Grid**

Responsibilities:

⬡ hexagon shape

📏 diameter interpretation

📍 point calculation

🧭 orientation

### 🎨 Presentation layer

Owned by:

🖥️ **test application**

Responsibilities:

🖼️ SVG

🎨 stroke/fill

📝 explanatory text

📐 SVG viewBox

👁️ browser presentation

This boundary is one of the most important architectural decisions in the project.

---

# 💻 Part 220 — The demo also teaches library usage

The page does not only show the resulting hexagons.

It also contains examples demonstrating how the library is used.

That makes the test application serve two purposes.

### 🧪 Verification/showcase

Does the library produce sensible visible results?

### 📖 Documentation

How would another programmer call the public API?

This is especially useful for a library project because a visual demonstration can make an API much easier to understand.

---

# 🪞 Part 221 — The demo mirrors real consumer code

The example is valuable because the test application is itself a genuine consumer of the library.

It follows the same conceptual process another developer would follow:

📦 import library

⬇️

🏭 create `HexGrid`

⬇️

⬡ call `createSingleHexagon`

⬇️

📍 receive geometry

⬇️

🎨 choose how to render it

This makes the test application a practical demonstration of the library's usability.

---

# 🔒 Part 222 — The library does not know about the test app

The dependency direction is important.

The test application knows about:

📦 **Midgard**

But Midgard does **not** know about:

🖥️ **the test application**

So the dependency points in one direction:

🖥️ **Test app**

➡️ depends on ➡️

📦 **Library**

not:

📦 Library ↔️ Test app

This protects the library from becoming coupled to one particular demonstration application.

---

# 🧰 TypeScript, SVG and architecture concepts introduced in Chapter 9

### 📦 Library consumer

The test application uses the library through its public API like any external programmer could.

### 🏭 Object configuration

Orientation is supplied when constructing `HexGrid`.

### 🧠 Abstraction

The test app requests a hexagon without implementing the underlying geometry.

### 🖼️ SVG

Scalable Vector Graphics represents graphical shapes using geometric descriptions.

### 🔷 SVG polygon

A polygon can represent the six points of a hexagon directly.

### 🌐 SVG namespace

SVG DOM elements belong to the SVG namespace and can be created using namespace-aware DOM methods.

### 📐 `viewBox`

Defines the coordinate region displayed by an SVG.

### 🗺️ `.map()`

Transforms every element of an array into a corresponding new value.

### 🔗 `.join()`

Combines array values into a single string.

### 📊 Data-driven rendering

The SVG dimensions are calculated from the geometry rather than assumed in advance.

### 🔒 Dependency direction

The test app depends on Midgard; Midgard remains independent of the test app.

---

# 🎯 Chapter 9 — The central idea

`DemoAreaSingleHex.ts` establishes the most important relationship in the test application:

> 📦 **Midgard calculates the geometry. The test application decides how to present it.**

The complete flow is:

↔️ **orientation**

⬇️

📦 **new HexGrid**

⬇️

⬡ **createSingleHexagon**

⬇️

📍 **six geometric points**

⬇️

📐 **calculate visual bounds**

⬇️

🔷 **create SVG polygon**

⬇️

🌳 **return HTMLElement**

⬇️

🖥️ **DemoArea displays it**

The same pipeline works for both orientations because Midgard handles the orientation-specific mathematics before the rendering layer receives the result.

The next chapter expands the exact same principle from **one hexagon** to an entire collection:

↔️ **`DemoAreaXDominatedGrid.ts`**

There, arrays of hexagons, iteration, grid bounds and **z-index layering** become part of the picture.
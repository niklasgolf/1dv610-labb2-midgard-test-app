## Chapter 12 — `DemoAreaCssStyling.ts`

### 🎨 Part 274 — From geometry to styling

The previous demos concentrated mainly on **geometry**.

⬡ Single Hex showed the shape of one hexagon.

↔️ X-Dominated Grid showed a collection of hexagons.

↕️ Y-Dominated Grid showed the alternative orientation.

`DemoAreaCssStyling.ts` introduces a new idea:

> 🎨 **Once Midgard has created the geometry, ordinary web technologies can style individual hexagons.**

The demo creates an x-dominated 3 × 3 skeleton grid and renders its hexagons as SVG polygons. But this time, every polygon receives an **ID derived from its Midgard coordinate**.

That creates a bridge:

📍 **Midgard coordinate**

⬇️

🏷️ **SVG element ID**

⬇️

🎨 **CSS selector**

⬇️

🌊 **individual visual styling**

This is an important step because it shows how a geometry library can integrate naturally with the browser's existing DOM and CSS systems.

---

# 🧩 Part 275 — The class still follows the Demo contract

Despite introducing CSS and element IDs, the class still begins from the same architectural foundation:

🎨 **DemoAreaCssStyling**

⬇️ implements

🧩 **Demo**

⬇️ provides

🎨 **`render(): HTMLElement`**

Nothing needs to change in `DemoArea`.

From its perspective, CSS Styling is simply another Demo.

The growing complexity remains encapsulated inside the concrete implementation.

---

# 📦 Part 276 — `HexGrid` and `LayeredHexagon`

This demo uses two important library concepts:

```
HexGrid
```

and:

```
LayeredHexagon
```

Their responsibilities are different.

### 📦 `HexGrid`

The high-level library object used to generate the grid.

### ⬡ `LayeredHexagon`

The structured data representing each generated hexagon, including its geometry, coordinate and layering information.

So the flow remains:

📦 **HexGrid**

⬇️ `createGrid()`

📚 **LayeredHexagon[]**

⬇️

🎨 test application renders the result

This preserves the same library-consumer relationship established in the previous chapters.

---

# 🏗️ Part 277 — The `render()` method builds the demonstration

The `render()` method creates the visible demonstration structure.

It includes:

🏷️ explanatory content

🗺️ the generated grid

🎨 information about the styling technique

💻 an example showing the CSS approach

The important point is that the demo is not merely trying to look attractive.

It is trying to **demonstrate a technique**:

> 📍 **Use Midgard coordinates to give rendered SVG elements predictable identities, then style those identities with CSS.**

The page therefore combines visual output with an explanation of how that output was achieved.

---

# 🗺️ Part 278 — Creating the grid

The demo constructs an:

↔️ **x-dominated**

grid using:

📏 **`hexDiameter: 100`**

🦴 **`skeletonWidth: 3`**

🦴 **`skeletonHeight: 3`**.

This is slightly larger than the 3 × 2 skeleton used in the previous grid demos.

The library handles the same responsibilities as before:

📍 coordinate generation

⬡ filling around the skeleton

🎯 center positioning

🔷 polygon geometry

🪜 layering

The CSS demo does not need to duplicate any of those calculations.

Its new responsibility begins **after** the geometry has been returned.

---

# 🎯 Part 279 — A new question for the rendering layer

The earlier grid renderer mainly asked:

> 🔷 **Where should this polygon be drawn?**

The CSS Styling demo adds another question:

> 🏷️ **How can this rendered polygon be identified later?**

That is a DOM concern, not a Midgard geometry concern.

This distinction is important.

Midgard knows:

📍 coordinate `(4, 2)`

The test app decides:

🏷️ represent that coordinate in the DOM as something such as:

```
hex-4-2
```

That keeps DOM-specific identity outside the library.

---

# 🏷️ Part 280 — What is an HTML/SVG `id`?

DOM elements can have an:

```
id
```

An ID provides a unique identifier for a particular element in the document.

For example, conceptually:

⬡ one SVG polygon

→ **`id="hex-4-2"`**

Another polygon might have:

→ **`id="hex-3-3"`**

CSS and JavaScript can then target those specific elements.

An ID therefore provides a bridge between:

🌳 **an element in the DOM**

and:

🎨 **code that wants to find or style that element**

---

# 📍 Part 281 — Coordinates make useful IDs

Every Midgard hexagon already has a logical coordinate.

For example:

```
(4, 2)
```

That coordinate is already intended to uniquely describe a particular position in the grid.

The test app can therefore derive an SVG ID from it:

📍 `(4, 2)`

⬇️

🏷️ **`hex-4-2`**

Likewise:

📍 `(3, 3)`

⬇️

🏷️ **`hex-3-3`**

This is useful because the ID remains meaningful.

A developer seeing:

```
hex-4-2
```

can immediately connect it to the Midgard coordinate:

**x = 4, y = 2**

---

# 🧵 Part 282 — Template literals

Constructing strings from variable values is extremely common in TypeScript.

The coordinate-based ID is naturally suited to a **template literal**.

A template literal allows fixed text and variable values to be combined into one string.

Conceptually:

**`hex-` + x + `-` + y**

becomes:

🏷️ **`hex-4-2`**

Template literals provide a cleaner syntax for this kind of string construction.

The key concept is:

> 🧵 **Build a string whose contents depend on runtime values.**

Here those runtime values are the coordinate's `x` and `y`.

---

# 🔒 Part 283 — Why the library itself should not create SVG IDs

This is an important architectural boundary.

It might initially seem convenient for Midgard itself to return something like:

```
id: "hex-4-2"
```

But that would introduce a presentation concern into the geometry library.

Midgard's coordinate:

📍 `{ x: 4, y: 2 }`

is general-purpose domain data.

The string:

🏷️ `hex-4-2`

is a decision made for this particular DOM/SVG application.

Another consumer might want:

🎮 a Canvas renderer

🕹️ a game engine object

🧪 a test representation

🗄️ a database key

or an entirely different naming convention.

So the cleaner dependency is:

📦 **Midgard**

→ supplies coordinate

⬇️

🖥️ **consumer**

→ decides how that coordinate should become a DOM ID

This helps keep the library rendering-independent.

---

# 🏷️ Part 284 — Every polygon also receives a CSS class

The SVG polygons receive the class:

**`css-styling-hexagon`**.

This introduces the useful distinction between:

### 🆔 ID

Identifies a particular element.

### 🏷️ Class

Groups elements that share a role or style.

So the rendered grid can conceptually contain:

⬡ `id="hex-4-2"`  
　`class="css-styling-hexagon"`

⬡ `id="hex-3-3"`  
　`class="css-styling-hexagon"`

⬡ `id="hex-5-3"`  
　`class="css-styling-hexagon"`

The IDs differ.

The class is shared.

That gives CSS two levels of control.

---

# 🎨 Part 285 — General styling through the class

The shared class can style **all** hexagons in the demo.

In `style.css`, `.css-styling-hexagon` gives the hexagons their normal grass appearance.

So:

🏷️ `.css-styling-hexagon`

⬇️ applies to

⬡⬡⬡⬡⬡⬡⬡ **all matching polygons**

This is efficient because the same rule does not need to be repeated for every coordinate.

The class expresses:

> 🎨 **All of these elements belong to the same visual category.**

---

# 🎯 Part 286 — Specific styling through IDs

Then CSS can target particular coordinates using their IDs.

In the current demo, three hexagons form the lake:

🌊 **`#hex-4-2`**

🌊 **`#hex-3-3`**

🌊 **`#hex-5-3`**

Those polygons receive the blue lake color.

The rest retain the grass color.

So the styling model becomes:

🏷️ **class selector**

→ general terrain appearance

plus:

🆔 **ID selectors**

→ special exceptions

This is a very common CSS pattern:

**general rule**

+

**specific override**

---

# 🌱 Part 287 — The base terrain color

The normal hexagons use grass green:

```
#6f9f58
```

This is applied through the shared class.

Conceptually:

⬡ every rendered terrain hexagon

⬇️

🏷️ `.css-styling-hexagon`

⬇️

🌱 green fill

The TypeScript renderer does not need to assign the green fill individually to every polygon.

CSS handles that presentation rule.

This moves visual styling away from TypeScript and into the stylesheet.

---

# 🌊 Part 288 — The lake overrides the general rule

The selected lake coordinates use:

```
#4f9fcf
```

So the styling relationship is:

🌱 **general class rule**

⬇️ applies to everything

then:

🌊 **specific ID rules**

⬇️ override selected hexagons

The result is a small lake consisting of three coordinate-selected cells.

This demonstrates an important feature of CSS:

> 🎨 **Multiple rules can apply to the same element, and more specific rules can override more general ones.**

---

# 🧠 Part 289 — CSS specificity

This leads to the concept of **CSS specificity**.

CSS needs a way to decide which rule wins when multiple rules set the same property.

An ID selector such as:

```
#hex-4-2
```

is more specific than a class selector such as:

```
.css-styling-hexagon
```

So conceptually:

🌱 class says:

> “All these hexagons are green.”

But:

🌊 ID says:

> “This particular hexagon is blue.”

The more specific rule wins for that property.

This makes it possible to define broad defaults and then targeted exceptions.

---

# 🔗 Part 290 — Domain identity becomes presentation identity

There is a deeper architectural idea here.

Midgard has a **domain identity**:

📍 coordinate `(4, 2)`

The test application derives a **presentation identity**:

🏷️ `hex-4-2`

CSS then uses that presentation identity:

🎨 `#hex-4-2`

So the complete relationship is:

📍 **Domain**

```
Coordinate { x: 4, y: 2 }
```

⬇️

🖥️ **DOM**

```
id="hex-4-2"
```

⬇️

🎨 **CSS**

```
#hex-4-2
```

⬇️

🌊 **visual appearance**

This is one of the clearest examples in the test application of data travelling across several software layers.

---

# 🧱 Part 291 — The SVG bounds still use all geometry

Although CSS styling is the new topic, the renderer still needs to solve the same geometric problem as the earlier grid demos.

It gathers the points from all returned hexagons and determines:

⬅️ minimum x

➡️ maximum x

⬆️ minimum y

⬇️ maximum y

These values are used to configure the SVG viewBox.

So the rendering pipeline combines:

📐 **existing geometric technique**

with:

🎨 **new styling technique**

This is a good example of software building progressively on earlier concepts.

---

# 🔁 Part 292 — Each `LayeredHexagon` becomes a polygon

The demo loops through the returned hexagons.

For each one it creates an SVG polygon and supplies:

🏷️ coordinate-derived ID

🏷️ shared CSS class

📍 polygon points

🎨 stroke information.

So each library object undergoes a transformation:

📦 **LayeredHexagon**

⬇️

🔷 **SVGPolygonElement**

The logical information is translated into browser representation.

---

# 🔷 Part 293 — Geometry still comes directly from Midgard

The polygon's `points` attribute comes from the hexagon geometry returned by the library.

The test application does not manually decide:

> “This particular hexagon should have these six corners.”

Instead:

📦 Midgard

⬇️

📍 six points

⬇️

🖥️ test app formats them

⬇️

🔷 SVG polygon

This distinction remains essential.

The CSS demo adds styling logic, but it does not take ownership of Midgard's geometry.

---

# 🧠 Part 294 — Different concerns live in different layers

The demo now gives a particularly clear separation of concerns.

### 📦 Midgard library

Responsible for:

📍 coordinates

📐 geometry

🪜 layering

### 🖥️ TypeScript demo

Responsible for:

🔷 creating SVG elements

🏷️ translating coordinates into DOM IDs

### 🎨 CSS

Responsible for:

🌱 grass appearance

🌊 lake appearance

This can be pictured as:

📦 **Domain / geometry**

⬇️

🖥️ **DOM representation**

⬇️

🎨 **visual styling**

Each layer has a different job.

---

# 🎨 Part 295 — Why not simply set every fill in TypeScript?

The demo could have used TypeScript to inspect every coordinate and directly assign:

🌱 green

or:

🌊 blue

to every polygon.

But then the styling rules would live inside rendering code.

Using CSS demonstrates another possibility:

TypeScript provides:

🏷️ **identity and structure**

CSS provides:

🎨 **appearance**

This is valuable because CSS is specifically designed for visual presentation.

It also makes the example demonstrate how naturally SVG elements participate in normal web styling.

---

# 🌐 Part 296 — SVG is part of the DOM

SVG may look like a graphics technology separate from HTML, but when SVG is embedded in a web page, its elements participate in the DOM.

That means an SVG polygon can have:

🆔 an ID

🏷️ classes

🎨 CSS styles

🖱️ event listeners

and can be found or modified using JavaScript.

This becomes extremely important in the later Neighbours demo.

The CSS Styling demo is therefore preparing the architectural foundation for interaction as well as appearance.

---

# 🔍 Part 297 — CSS selectors as a way to address elements

A CSS selector describes which DOM elements a rule should target.

This demo uses two particularly important forms.

### 🏷️ Class selector

```
.css-styling-hexagon
```

The dot means:

> Select elements with this class.

### 🆔 ID selector

```
#hex-4-2
```

The hash means:

> Select the element with this ID.

So:

`.` → class

`#` → ID

These tiny symbols have very different meanings in CSS.

---

# 🧭 Part 298 — Coordinates make styling predictable

Suppose a programmer knows the Midgard coordinate:

**(5, 3)**

Because the test app follows a predictable ID convention, the corresponding DOM identity can be derived immediately:

📍 `(5, 3)`

⬇️

🏷️ `hex-5-3`

This predictability is valuable.

There is no need to maintain a separate table such as:

**coordinate A → random DOM ID 871**

**coordinate B → random DOM ID 492**

The coordinate itself provides enough information to derive the identifier.

---

# 🧮 Part 299 — Derived data avoids unnecessary stored state

This introduces a useful general programming concept:

# Derived data

If a value can be reliably calculated from information already available, it may not need to be stored separately.

Here:

📍 coordinate

already exists.

The DOM ID can be derived:

```
hex-x-{y}
```

So the program does not need another permanent property in the Midgard hexagon object just to store the SVG ID.

Conceptually:

**existing data**

⬇️ deterministic transformation

**derived data**

This often reduces unnecessary state.

---

# 🔒 Part 300 — One source of truth

The Midgard coordinate remains the meaningful source of identity.

The SVG ID is simply a representation derived from it.

So instead of maintaining two independent identities:

📍 coordinate

and:

🏷️ unrelated SVG ID

the design effectively has:

📍 **coordinate**

⬇️ derives

🏷️ **SVG ID**

This supports the idea of a **single source of truth**.

If identity originates from the coordinate, there is less risk of two independently stored identifiers disagreeing.

---

# 💻 Part 301 — The page demonstrates the CSS technique explicitly

The demo also contains an example showing the CSS used for the styling.

This is important because simply looking at the green and blue grid would not explain how the effect was achieved.

The page communicates both:

👁️ **result**

and:

💻 **technique**

The reader can connect:

🌊 blue lake

with:

🎨 coordinate-specific CSS selectors.

That makes the demo useful as documentation rather than merely as a visual showcase.

---

# 🧪 Part 302 — This is integration testing by observation

Although the formal automated tests live elsewhere, this demo also provides a useful form of manual integration inspection.

Several systems must work together correctly:

📦 Midgard generates coordinates and geometry

⬇️

🖥️ TypeScript creates SVG polygons

⬇️

🏷️ coordinates become IDs

⬇️

🎨 CSS selectors match those IDs

⬇️

🌊 correct cells become water

If the lake appears in the expected locations, several layers of integration are visibly working together.

This does not replace automated tests, but it is valuable as a demonstration and visual sanity check.

---

# 🚧 Part 303 — The library boundary remains clean

One of the strongest lessons from this demo is what **does not** happen.

Midgard does not contain:

❌ SVG IDs

❌ CSS class names

❌ grass colors

❌ lake colors

❌ CSS selectors

❌ DOM styling logic

Those belong to the consumer application.

Midgard remains focused on:

📍 coordinates

📐 geometry

🗺️ grid structure

🪜 layering

This protects the library from becoming tied to one rendering technology or one particular game's visual design.

---

# 🔮 Part 304 — The same ID idea can support interaction

Once a rendered hexagon has a predictable ID, CSS is not the only technology that can use it.

JavaScript can also locate and manipulate that element.

Conceptually:

📍 coordinate `(4, 2)`

⬇️

🏷️ `hex-4-2`

⬇️

🔍 find corresponding DOM element

⬇️

✨ change appearance or behaviour

This becomes particularly useful for:

🖱️ hover effects

🎯 selection

🚶 movement highlighting

🔗 neighbour highlighting

So the CSS Styling demo introduces a technique that later supports richer interaction.

---

# 🧰 TypeScript, DOM and CSS concepts introduced in Chapter 12

### 🏷️ DOM IDs

An ID identifies a particular element.

### 🏷️ CSS classes

A class groups elements that share styling or behaviour.

### 🧵 Template literals

Runtime values can be embedded into predictable strings such as coordinate-derived IDs.

### 🎨 CSS selectors

`.` targets a class, while `#` targets an ID.

### 🎯 CSS specificity

More specific selectors can override more general styling rules.

### 🧮 Derived data

Values that can be calculated reliably from existing data do not always need to be stored separately.

### 🔒 Single source of truth

The coordinate remains the fundamental identity; the DOM ID is derived from it.

### 🌐 SVG and DOM integration

SVG elements can use IDs, classes, CSS and JavaScript just like other DOM elements.

### 🧱 Separation of concerns

Geometry, DOM representation and styling belong to different layers.

---

# 🎯 Chapter 12 — The central idea

`DemoAreaCssStyling.ts` demonstrates how **domain data can safely cross into the presentation layer without making the domain library presentation-dependent**.

The complete chain is:

📦 **Midgard**

⬇️

📍 coordinate `(4, 2)`

⬇️

🖥️ **test application**

⬇️

🏷️ SVG ID `hex-4-2`

⬇️

🎨 **CSS**

⬇️

🌊 blue lake hexagon

At the same time, every polygon shares:

🏷️ **`css-styling-hexagon`**

which provides the general grass styling.

So the design combines:

🌱 **shared class styling**

with:

🌊 **coordinate-specific ID styling**

while preserving a clean architectural boundary:

> 📦 **Midgard owns geometry and coordinates. The consumer owns DOM identity and appearance.**

The next chapter takes this separation much further:

🌲🏰🌊 **`DemoAreaSvgTerrain.ts`**

Instead of merely changing polygon colors, it builds complete terrain scenes inside the hexagons using SVG primitives, groups, paths, clipping and reusable helper methods.

It is the largest demo file in the test application, so the next chapter will focus on its architecture and the important SVG concepts without turning every individual drawing coordinate into unnecessary detail.
## Chapter 19 — TypeScript, DOM and SVG: Three Worlds Working Together

### 🌍 Part 559 — The Test App crosses several programming worlds

The Test App is useful for learning TypeScript because it does not use TypeScript in isolation.

The code constantly crosses boundaries between:

🔷 **TypeScript's type system**

⚙️ **JavaScript's runtime**

🌳 **the browser DOM**

🎨 **SVG**

A line that looks simple can involve several of these layers at once.

For example, creating an SVG polygon involves:

🧠 TypeScript knowing its type

⚙️ JavaScript executing the instruction

🌳 the browser creating a DOM object

🔷 SVG defining what that object means graphically

Understanding these layers makes browser programming much easier to reason about.



---



# 🧠 Part 560 — TypeScript does not run in the browser

A fundamental fact is:

> **Browsers execute JavaScript, not TypeScript directly.**

TypeScript adds features such as:

🔤 type annotations

🧩 interfaces

🔒 access modifiers

🧠 static checking

But the TypeScript source must ultimately become JavaScript that the browser can execute.

Conceptually:

📄 TypeScript source

⬇️

🛠️ tooling

⬇️

📜 JavaScript

⬇️

🌐 browser

So TypeScript is primarily a **development-time language and type system** built around JavaScript.



---



# 🛡️ Part 561 — TypeScript helps before runtime

Suppose a method promises:

```
render(): HTMLElement
```

TypeScript can check whether the implementation returns something compatible with `HTMLElement`.

That checking happens during development/build processing.

By the time the browser executes the application, the important runtime object is the actual DOM element.

So:

🧠 **TypeScript**

helps reason about what values should be

while:

⚙️ **JavaScript**

works with the actual values at runtime.



---



# 👻 Part 562 — Some TypeScript concepts disappear completely

Consider:

```
interface Demo
```

The interface is extremely useful while programming.

It establishes:

> Every Demo implementation must provide `render(): HTMLElement`.

But the browser does not need a JavaScript object representing the interface itself.

The interface is erased during compilation/transformation.

Conceptually:

🧩 TypeScript interface

⬇️ type checking

✅ program validated

⬇️

👻 interface disappears from runtime output

This is why interfaces were described earlier as **compile-time contracts**.



---



# 🏗️ Part 563 — Classes are different

A class such as:

```
App
```

is not merely a TypeScript type description.

The program actually executes:

```
new App(root)
```

at runtime.

So the distinction is:

### 🧩 Interface

primarily a type-system construct.

### 🏗️ Class

can describe types **and** produce real runtime objects.

This is an important distinction in TypeScript.

Not everything appearing in TypeScript source has the same runtime existence.



---



# 🌳 Part 564 — The DOM is a runtime object model

The **Document Object Model**, or DOM, is provided by the browser.

It represents the document as objects that JavaScript can manipulate.

For example:

🌐 document

contains:

🏠 application root

which contains:

⬛ header

📄 content

which contains:

🧭 navigation

🗺️ demo area

These are not merely strings containing HTML.

They are runtime objects representing document nodes.



---



# 🏭 Part 565 — `document.createElement()` creates real DOM objects

When the application executes something conceptually like:

```
document.createElement('div')
```

the browser creates an element object.

It initially exists independently of the visible document.

Conceptually:

⚙️ JavaScript asks browser:

> Create a `div`.

⬇️

🌳 browser creates:

**HTMLDivElement**

But it is not necessarily visible yet.

Only when it is inserted into the document tree does it become part of the rendered page.



---



# 🔌 Part 566 — Creating and inserting are separate operations

This distinction appeared repeatedly throughout the demos.

First:

🏭 create element

Then:

⚙️ configure element

Then:

🌳 insert element

For example:

🏭 create `<div>`

⬇️

🏷️ assign class

⬇️

📝 add text/content

⬇️

🌳 append to parent

This separation makes programmatic DOM construction flexible.

An element can be fully prepared before it becomes visible.



---



# 🧬 Part 567 — DOM types form an inheritance hierarchy

TypeScript's browser definitions contain types such as:

**HTMLElement**

**HTMLDivElement**

**HTMLButtonElement**

**SVGElement**

**SVGSVGElement**

**SVGPolygonElement**

These represent different kinds of browser objects.

A specific element type contains information appropriate to that element.

For example:

🔘 `HTMLButtonElement`

is more specific than:

🌳 `HTMLElement`.

This allows TypeScript to provide better checking and editor assistance.



---



# 🔭 Part 568 — General versus specific DOM types

Consider the Demo contract:

```
render(): HTMLElement
```

That return type is intentionally broad.

A Demo can return many kinds of HTML elements as long as the result is an HTMLElement.

But inside a particular implementation, the code may know something more specific.

For example:

```
HTMLDivElement
```

This follows a useful pattern:

🔍 implementation can know precise details

while:

🧩 public abstraction exposes only what callers need.



---



# 🔎 Part 569 — Generics help TypeScript understand DOM queries

Earlier the application used forms such as:

```
querySelector<HTMLDivElement>(...)
```

The `<HTMLDivElement>` part provides type information.

It tells TypeScript:

> 🧠 **When this query succeeds, treat the returned element as an HTMLDivElement.**

But there is still another possibility:

❌ no matching element exists.

Therefore a DOM query commonly returns:

**element or null**.

That is why null checking remains necessary.



---



# 🛑 Part 570 — Types do not make runtime uncertainty disappear

This is an important lesson.

TypeScript can know:

> “If something is returned here, it should be an HTMLDivElement.”

But it cannot magically guarantee that the browser document actually contains the requested element.

So:

🔤 static type information

does not eliminate:

🌐 runtime reality.

The code still needs to handle:

```
null
```

where appropriate.

This is why `main.ts` checks whether `#app` exists.



---



# 🧠 Part 571 — Type narrowing connects runtime checks to static knowledge

The pattern is:

🔎 query DOM

⬇️

result type:

```
HTMLDivElement | null
```

⬇️

🛑 check for null

⬇️

after the check:

```
HTMLDivElement
```

TypeScript uses the program's control flow to narrow the possible type.

This is called **type narrowing**.

Runtime logic therefore gives the static type system additional knowledge.



---



# 🔷 Part 572 — SVG is part of the DOM too

SVG may look like a separate graphics technology, but in this application it is also represented through DOM objects.

An SVG can contain:

🔷 polygons

⭕ circles

⬭ ellipses

〰️ paths

📦 groups

✂️ clip paths.

JavaScript can create and manipulate these elements much like HTML elements.

This is why the Test App can attach:

🆔 IDs

🏷️ classes

🖱️ event listeners

🎨 styles

to SVG objects.



---



# 🌐 Part 573 — Why SVG uses `createElementNS()`

The demos create SVG elements using:

```
document.createElementNS(...)
```

rather than ordinary:

**`document.createElement(...)`**.

The `NS` means:

**namespace**.

SVG belongs to the SVG XML namespace.

The namespace tells the browser:

> 🔷 **Create this as an SVG element, not an HTML element with a similar-looking tag name.**

This is why the code keeps an SVG namespace value available when constructing SVG graphics.



---



# 🏷️ Part 574 — Namespace identifies the vocabulary

A namespace can be thought of as identifying which element vocabulary a name belongs to.

For example:

```
polygon
```

needs to be understood as:

🔷 **SVG polygon**

not as some arbitrary HTML element.

So conceptually:

namespace

- \


element name

⬇️

correct DOM element type

For Midgard rendering, this ensures that the browser creates genuine SVG geometry objects.



---



# 📍 Part 575 — Midgard points must become SVG syntax

Midgard produces structured geometric data.

For example, conceptually:

📍 Point

contains:

```
x
```

and:

`y`.

An SVG polygon expects its `points` attribute in textual coordinate form.

So the demo performs a transformation:

📚 `Point[]`

⬇️

🔁 map each point

⬇️

🧵 `"x,y"`

⬇️

🔗 join values

⬇️

🔷 SVG `points` attribute

This is a boundary between:

🧠 structured TypeScript data

and:

🔷 SVG's textual attribute format.



---



# 🔄 Part 576 — Data representation changes across boundaries

The same information can therefore exist in different representations.

Inside Midgard:

📍 `{ x, y }`

Inside application logic:

📚 array of Point objects

Inside SVG:

🧵 coordinate text

On screen:

👁️ polygon shape

Conceptually:

**object**

→ **array**

→ **string**

→ **graphic**

No stage changes the fundamental geometry.

Each stage represents it in the form needed by the next technology.



---



# 🎯 Part 577 — This is serialization on a small scale

Turning structured data into a textual representation is broadly related to **serialization**.

For SVG polygon points:

structured coordinates

⬇️

text

The operation is simple, but the underlying idea appears everywhere in software.

For example:

🧩 object

→ JSON

📅 date

→ ISO string

📍 coordinate

→ `"4,6"`

📚 polygon points

→ SVG points string

Different systems often need the same information encoded differently.



---



# 🆔 Part 578 — Coordinates become DOM identities too

The Test App performs another transformation:

📍 coordinate `(4,6)`

⬇️

🧵 string representation

⬇️

🏷️ `hex-4-6`

This converts domain data into a DOM identity.

The resulting string can then be used by:

🎨 CSS

🔍 DOM queries

🖱️ interaction logic.

Again, the transformation occurs because different layers require different representations.



---



# 🧺 Part 579 — Strings can become useful keys

A coordinate object contains meaningful structure.

But for some operations, a compact stable key is convenient.

For example:

📍 `{ x: 4, y: 6 }`

⬇️

🧵 `"4,6"`

can be stored in:

🧺 `Set<string>`

or used as part of:

🏷️ an element ID.

This does not mean strings are inherently better than coordinate objects.

It means they are useful for particular boundaries and lookup mechanisms.



---



# 🖱️ Part 580 — DOM objects can receive event listeners

Once a polygon exists as a DOM object, the application can attach behaviour to it.

Conceptually:

🔷 polygon

- \


👂 event listener

⬇️

🖱️ interactive polygon

This is how the Neighbours demo transforms a geometric shape into an interactive interface element.

The polygon remains an SVG shape, but it also participates in the browser's event system.



---



# 📣 Part 581 — An event object represents something that happened

When the browser detects an interaction, it creates an event and invokes registered listeners.

Conceptually:

👤 user action

⬇️

🌐 browser detects event

⬇️

📣 event dispatched

⬇️

⚙️ callback executes

This is why browser programs often do not run as one simple top-to-bottom algorithm.

They spend much of their lifetime waiting for events.



---



# ⏳ Part 582 — Browser applications are long-lived programs

A command-line program might conceptually do:

start

⬇️

calculate

⬇️

print

⬇️

finish.

A browser application behaves differently.

It starts:

🚀

builds the interface:

🌳

then remains alive:

⏳

waiting for:

🖱️ clicks

⌨️ keyboard input

🧭 navigation

🖱️ hover events

and other browser activity.

This event-driven lifetime is central to frontend programming.



---



# 🔄 Part 583 — State persists between events

Because the application stays alive, objects can preserve state between interactions.

For example, `Navigation` remembers:

🎯 active section

🎯 active Test Page item

🎯 active notes item.

A click occurs.

The object updates its state.

Then the application waits.

Another click occurs later.

The object still contains the updated state.

This is why class instances can be useful in browser applications: they combine behaviour with state that persists over time.



---



# 🏗️ Part 584 — `new` creates independent stateful instances

When:

```
new Navigation(...)
```

is executed, a particular Navigation object is created.

That object owns its own state.

Likewise:

```
new Header(...)
```

creates a separate Header object.

Conceptually:

🏗️ Class

\= blueprint/definition

while:

📦 Instance

\= actual runtime object with its own state.

This is one of the fundamental ideas behind object-oriented programming.



---



# 🔗 Part 585 — `this` refers to the current instance

Inside these classes, methods frequently use:

```
this
```

For example:

```
this.activeSection
```

means conceptually:

> 🎯 **the activeSection belonging to this particular object**

Likewise:

```
this.navigation
```

inside `App`

means:

> 🧭 **the Navigation instance stored by this App object**

`this` connects method execution to object state.



---



# 🪢 Part 586 — Callbacks can complicate `this`

When methods are passed around as callbacks, JavaScript's rules for `this` become important.

That is why techniques such as:

```
bind(this)
```

or arrow functions can appear in object-oriented browser code.

The problem is:

> If a method is called by another system, which object should `this` refer to?

Binding can preserve the intended receiver.

This is a JavaScript runtime concern that TypeScript code must still respect.



---



# ➡️ Part 587 — Arrow functions capture surrounding context

Arrow functions are especially common in event handlers and array operations.

For example, conceptually:

**item => item.id === activeId**

The arrow function can access variables from the surrounding scope.

This property is called a **closure**.

The function carries access to relevant surrounding values even when it executes inside another operation such as:

🔍 `find`

🔁 `map`

🖱️ an event listener.



---



# 🧠 Part 588 — Closures are invisible but important

Consider neighbour highlighting.

An event listener can remember information such as:

🔗 neighbour IDs

or:

🔷 the SVG element

from the scope where the listener was created.

Later:

🖱️ `mouseenter`

occurs.

The callback still has access to that information.

Conceptually:

creation time:

📦 capture useful surrounding values

⬇️

⏳ time passes

⬇️

event occurs

⬇️

⚙️ callback still knows captured values

This is one of JavaScript's most important mechanisms.



---



# 🔁 Part 589 — Array methods express transformations declaratively

The demos frequently use operations such as:

```
map()
flatMap()
find()
```

These methods allow code to express intentions such as:

🔄 transform every item

🧩 transform and flatten

🔍 locate one matching item

without manually managing an index variable in every case.

For example:

📚 points

⬇️ `map`

🧵 coordinate strings

describes the transformation directly.



---



# 🆚 Part 590 — `for...of` remains useful

The application also uses:

```
for...of
```

especially where a sequence of imperative DOM operations is clearer.

For example:

for each hexagon:

🏭 create polygon

🏷️ configure attributes

🖱️ perhaps add event listener

🌳 append polygon

Array methods and loops are not competitors where one must always replace the other.

The appropriate construct depends on the operation being expressed.



---



# 🎨 Part 591 — Attributes, properties and CSS all influence DOM elements

Browser elements can be configured through several mechanisms.

For an SVG polygon, the application may use:

🏷️ attributes such as `points`

🆔 attributes such as `id`

🏷️ CSS classes

🎨 CSS rules

⚙️ JavaScript style changes.

These mechanisms overlap but serve different purposes.

Understanding which layer owns a visual rule helps keep the application maintainable.



---



# 🧠 Part 592 — Stable styling belongs naturally in CSS

For example:

> All CSS Styling demo hexagons begin green.

That is a stable styling rule.

It fits naturally in:

🎨 `style.css`

through:

```
.css-styling-hexagon
```

But:

> Highlight these six polygons because the pointer just entered the home coordinate.

depends on runtime state.

That naturally involves:

⚙️ TypeScript/JavaScript.

So a useful distinction is:

🎨 relatively stable presentation

versus:

⚙️ dynamic behaviour-driven presentation.



---



# 🔷 Part 593 — SVG remains inspectable DOM

Because the graphics are DOM elements, browser developer tools can inspect them.

A polygon can have:

🆔 ID

🏷️ class

📍 points attribute

🎨 styles

👂 listeners.

This is one reason SVG is convenient for the current Test App.

The graphics integrate naturally with normal browser concepts rather than existing as opaque pixels.



---



# 🆚 Part 594 — SVG and Canvas use different mental models

This distinction is useful for understanding why the current implementation feels natural.

### 🔷 SVG

The browser remembers objects:

⬡ polygon

🌲 circle

🏰 path

These remain DOM elements.

### 🖼️ Canvas

JavaScript generally issues drawing commands onto a pixel surface.

After drawing, the individual shape is not automatically retained as a DOM element in the same way.

For a moderate interactive hex-grid demo, SVG's object model is convenient.

That does not mean SVG is universally faster or better for every scale.



---



# 📐 Part 595 — `viewBox` separates coordinates from displayed size

The demos calculate SVG bounds and assign a:

```
viewBox
```

The viewBox defines the internal coordinate region the SVG should display.

Conceptually:

📐 Midgard geometry exists in its own coordinate space

⬇️

🖼️ SVG viewBox describes the visible region

⬇️

📱 browser scales that region into the displayed SVG

This allows the geometry to remain expressed in meaningful coordinates while the browser handles display scaling.



---



# 🔍 Part 596 — Bounds connect geometry to rendering

To create an appropriate viewBox, the demos inspect all rendered points.

They determine:

⬅️ minimum x

➡️ maximum x

⬆️ minimum y

⬇️ maximum y

Then:

width = max x − min x

height = max y − min y

This converts a collection of individual geometric points into information about the entire drawing.

It is a good example of moving between:

🔹 local geometry

and:

🗺️ global rendering context.



---



# 📦 Part 597 — Midgard remains unaware of this browser machinery

An important architectural point emerges from all of this.

Midgard can produce:

📍 points

⬡ geometry

🪜 layers

without needing to know about:

🌳 `HTMLElement`

🔷 `SVGPolygonElement`

🖱️ `mouseenter`

🎨 CSS selectors

🌐 browser documents.

The Test App performs the translation into browser concepts.

This keeps the library's domain model independent of one rendering environment.



---



# 🧭 Part 598 — The boundary can be visualized clearly

The major transformation is:

📦 **Midgard world**

```
Coordinate
Point
Hexagon
LayeredHexagon
```

⬇️

🔄 **Test App translation**

IDs

point strings

terrain meaning

interaction logic

⬇️

🌳 **Browser world**

HTML elements

SVG elements

events

CSS

⬇️

👁️ **visible interface**

This boundary is one of the most important things to understand in the entire project.



---



# 🧠 Part 599 — TypeScript sits across both worlds

TypeScript is interesting because it helps describe both sides.

It can type:

📦 Midgard objects

such as:

```
LayeredHexagon
```

and browser objects such as:

🌳 `HTMLElement`

🔷 `SVGPolygonElement`.

So TypeScript acts as a statically checked language layer across the application's domain model and browser APIs.

This makes transformations between those worlds easier to reason about.



---



# 🔄 Part 600 — One complete example: creating a polygon

The complete conceptual journey of one hexagon is:

📦 Midgard produces a `LayeredHexagon`

⬇️

📚 application reads its `points`

⬇️

🔁 points are transformed into SVG coordinate text

⬇️

🌐 browser creates `SVGPolygonElement`

⬇️

🏷️ application assigns attributes, ID and/or class

⬇️

🌳 polygon is appended to SVG

⬇️

🎨 CSS/browser rendering determines appearance

⬇️

👁️ hexagon appears on screen

This one operation touches nearly every major technical concept in the Test App.



---



# 🔗 Part 601 — One complete example: interactive neighbours

The neighbour interaction extends that chain:

📦 Midgard calculates neighbours

⬇️

📍 application receives coordinates

⬇️

🏷️ coordinates become DOM identities

⬇️

🔷 identities correspond to polygons

⬇️

👂 event listener waits

⬇️

🖱️ mouse enters home

⬇️

⚙️ callback executes

⬇️

🎨 neighbour polygons change appearance

⬇️

👁️ user sees the domain relationship

This is where:

TypeScript

JavaScript

DOM

SVG

events

and Midgard

all cooperate.



---



# 🧰 Part 602 — The technical concepts now form one connected picture

The Test App has introduced many concepts that can initially seem unrelated:

```
interface
class
private
readonly
HTMLElement
querySelector
createElement
createElementNS
```

SVG

events

callbacks

closures

arrays

Sets

CSS classes

IDs

But they are all participating in one pipeline:

🧠 **describe data and contracts**

⬇️

⚙️ **execute program behaviour**

⬇️

🌳 **construct browser objects**

⬇️

🔷 **represent graphics**

⬇️

🎨 **style the result**

⬇️

🖱️ **respond to interaction**

Understanding the relationships is more valuable than memorizing each feature independently.



---



# 🎯 Chapter 19 — The central idea

The Midgard Test App exists at the boundary between two major worlds.

### 📦 Application/domain world

TypeScript objects such as:

📍 coordinates

⬡ hexagons

🪜 layered hexagons

🧩 demos

🧭 menu items

### 🌐 Browser world

Objects such as:

🌳 HTML elements

🔷 SVG elements

🖱️ events

🎨 CSS selectors and styles

The Test App continually translates between them.

TypeScript helps describe those relationships safely during development.

JavaScript executes the resulting behaviour.

The DOM gives the program a manipulable representation of the page.

SVG provides structured graphical elements inside that DOM.

CSS gives those elements presentation.

The browser finally renders everything into the interface seen on screen.

The most useful mental model is therefore:

📦 **data**

⬇️

⚙️ **program logic**

⬇️

🌳 **DOM representation**

⬇️

🔷 **graphic representation**

⬇️

🎨 **presentation**

⬇️

👁️ **visible result**

and interaction travels back in the other direction:

👤 **user**

⬇️

🖱️ **browser event**

⬇️

⚙️ **program logic**

⬇️

🧠 **application state/decisions**

⬇️

🌳 **DOM update**

⬇️

👁️ **new visible result**

> 🧠 **Frontend programming is largely the art of translating between data, behaviour and browser representations while keeping the responsibilities of those layers understandable.**
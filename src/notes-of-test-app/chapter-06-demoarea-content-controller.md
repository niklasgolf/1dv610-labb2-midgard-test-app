# 📘 MIDGARD TEST APP

## Chapter 6 — `DemoArea.ts`

### 🖥️ Part 118 — The application's content controller

`DemoArea.ts` controls the large main area where the application's actual content appears.

This is where the architecture from the previous chapters finally comes together.

A selected menu item travels through the system:

🧭 **Navigation**

⬇️ sends a `MenuItem`

🏛️ **App**

⬇️ forwards it

🖥️ **DemoArea**

⬇️ decides what the item represents

↙️　　　　　　　　　↘️

🧪 **Demo**　　　　　　📚 **Markdown chapter**

So `DemoArea` acts as a **content controller**.

Its central question is:

> 🧠 **Given this `MenuItem`, what should appear in the main content area?**

That makes this class the bridge between **navigation data** and **visible content**.

---

# 📦 Part 119 — Three different kinds of imports

`DemoArea.ts` contains many imports, but they fall into three clear categories.

### 🧰 1. External library

The file imports **`marked`**.

This is used to transform Markdown into HTML.

### 🧠 2. TypeScript types and demo classes

The file imports:

`MenuItem`

`Demo`

and the individual demo classes such as:

⬡ **`DemoAreaSingleHex`**

↔️ **`DemoAreaXDominatedGrid`**

↕️ **`DemoAreaYDominatedGrid`**

🎨 **`DemoAreaCssStyling`**

🌲 **`DemoAreaSvgTerrain`**

🔗 **`DemoAreaNeighbours`**

### 📚 3. Markdown documents

Finally, it imports all 31 Project Notes Markdown files.

So the imports already reveal the role of the class:

**DemoArea understands both interactive demos and documentation.**

---

# 📚 Part 120 — What is `marked`?

The import from **`marked`** is different from the project's own local imports.

`marked` is a Markdown parser.

Its purpose is:

**Markdown text**

⬇️

⚙️ **Marked**

⬇️

**HTML**

For example, conceptually:

**Markdown heading**

`# Midgard Hex Grid`

⬇️

**HTML heading**

`<h1>Midgard Hex Grid</h1>`

The browser understands HTML, but Markdown itself is simply text with formatting conventions.

`marked` performs the conversion between them.

This allows the Project Notes to be written as pleasant Markdown documents while still being displayed as formatted web content inside the application.

---

# 🌍 Part 121 — A package import versus a local import

Notice the difference between:

`marked`

and paths beginning with:

`./`

The demo classes come from local project files.

The `marked` package comes from an installed dependency.

Conceptually:

📁 **Local import**

`./demos/...`

→ something inside this project

📦 **Package import**

`marked`

→ something supplied by an installed package

This is one of the important roles of a package manager such as npm: external libraries can be installed and then imported by package name.

---

# 📄 Part 122 — Markdown files are imported as raw text

The Markdown imports contain something unusual at the end:

`?raw`

For example, conceptually:

**chapter file + `?raw`**

The important idea is that the Markdown file should be imported as **raw text**.

Without this intention, a build tool might treat the imported file differently.

Here the application specifically wants:

> 📄 **Give the program the textual contents of this Markdown file.**

The resulting imported value is therefore a string containing the chapter's Markdown.

---

# ⚡ Part 123 — This is a Vite feature

The **`?raw`** suffix is provided by Vite's import system.

It tells Vite:

> ⚡ **Import this file's contents as a string.**

That creates a useful pipeline:

📄 **Markdown file on disk**

⬇️ `?raw`

📝 **Markdown string inside TypeScript**

⬇️ `marked.parse(...)`

🌐 **HTML string**

⬇️ browser DOM

📖 **Formatted documentation**

This is a good example of TypeScript, Vite and an external library working together.

---

# 🔗 Part 124 — The Markdown pipeline

The complete documentation pipeline can therefore be pictured as:

📁 **`chapter-28-design-patterns.md`**

⬇️

⚡ **Vite `?raw`**

⬇️

📝 **plain Markdown string**

⬇️

⚙️ **`marked.parse()`**

⬇️

🌐 **HTML**

⬇️

🖥️ **DemoArea**

⬇️

📖 **formatted chapter in the browser**

This is fundamentally different from the demo pipeline.

The demo pipeline uses TypeScript classes that create DOM elements.

The documentation pipeline uses text files that are converted into HTML.

Yet both eventually appear inside the same `DemoArea`.

---

# 🧩 Part 125 — Four permanent DOM elements

The `DemoArea` class stores four DOM elements:

`element`

`heading`

`description`

`demoContainer`

All four are marked `readonly`.

Their roles are:

### 🖥️ `element`

The complete main content area.

### 🏷️ `heading`

The title of the current demo.

### 📝 `description`

A short explanation of the current demo.

### 📦 `demoContainer`

The area where the actual demo or documentation is placed.

The conceptual structure is:

🖥️ **DemoArea**

├── 🏷️ **Heading**  
├── 📝 **Description**  
└── 📦 **Content container**

---

# 🏗️ Part 126 — The constructor creates the DOM once

An important difference appears here compared with some earlier components.

The constructor immediately creates the main DOM structure.

It creates:

`<main>`

`<h2>`

`<p>`

`<div>`

and stores them in the class fields.

This means the `DemoArea` object owns a persistent set of DOM elements.

The class does not need to recreate the entire content area every time a menu item changes.

Instead:

**The outer structure stays.**

**The contents inside it change.**

---

# 🏛️ Part 127 — Why `<main>` is meaningful

The outer element is created as:

`<main>`

rather than a generic `<div>`.

This is semantic HTML.

The `<main>` element represents the primary content of the page.

So the application's broad structure now uses meaningful elements:

🏷️ **`<header>`**

→ top-level application header

🧭 **`<nav>`**

→ navigation

🖥️ **`<main>`**

→ primary content

This improves the document's semantic structure and can also help accessibility tools understand the page.

---

# 🎨 Part 128 — CSS classes define visual roles

The constructor assigns:

`demo-area`

to the main element,

`demo-heading`

to the heading,

`demo-description`

to the paragraph,

and:

`demo-container`

to the content container.

This continues the project's separation between structure and presentation.

TypeScript says:

> 🏗️ **This element is the demo heading.**

CSS says:

> 🎨 **This is how a demo heading should look.**

The class names therefore act as a connection between application structure and visual styling.

---

# 🧱 Part 129 — The DOM structure is assembled once

After creating the elements, the constructor appends them to the main element.

The structure becomes:

🖥️ **`main.demo-area`**

├── 🏷️ **`h2.demo-heading`**  
├── 📝 **`p.demo-description`**  
└── 📦 **`div.demo-container`**

The object now has a complete content area ready to receive different material.

The actual demo has not yet been selected.

The structure exists first.

Content comes later.

This separation is useful:

**🏗️ Construct the component**

then:

**🔄 Change what the component displays**

---

# 📤 Part 130 — `render()` is deliberately simple

The public `render()` method simply returns the stored element.

It does not reconstruct the component.

Conceptually:

> 📤 **Here is the main element that this DemoArea owns.**

This works because the constructor already created everything.

So when `App` asks:

**“Render yourself.”**

DemoArea can simply return its existing DOM tree.

This is a different implementation strategy from components that construct their DOM inside `render()`.

Neither strategy is inherently required by TypeScript; it is a design choice.

---

# 🎯 Part 131 — `show()` is the heart of the class

The most important public method is:

`show(item: MenuItem): void`

This is where a menu selection becomes visible content.

The method receives the same `MenuItem` concept studied earlier.

For example:

🆔 **`single-hex`**  
🏷️ **Single Hex**

or:

🆔 **`chapter-28-design-patterns`**  
🏷️ **Chapter 28 — Design Patterns**

The method must determine which kind of item it has received.

That creates the first major branch:

📚 **Is this Markdown?**

or:

🧪 **Is this a demo?**

---

# 🔎 Part 132 — First, look for Markdown

The method begins by asking `getMarkdown(item)` for Markdown associated with the selected item.

The result has the type:

`string | null`

That means there are two possibilities:

📝 **string**

→ this item represents a Markdown document

⚪ **null**

→ this item is not one of the known Markdown documents

The `show()` method therefore uses the return value itself to decide which rendering path should be followed.

---

# 🧠 Part 133 — `markdown !== null`

The condition checks specifically whether Markdown is **not null**.

If a string was returned:

📚 **Documentation path**

If `null` was returned:

🧪 **Demo path**

This is another example of type narrowing.

Before the condition:

**`markdown` → `string | null`**

Inside the successful branch:

**`markdown` → `string`**

TypeScript knows that `null` has been excluded.

So the value can safely be passed to a method expecting a string.

---

# 🛑 Part 134 — Early return keeps the two paths separate

If Markdown exists, the method:

📖 displays it

and then:

🛑 **returns immediately**

This is another **early return**.

The benefit is that the rest of `show()` does not need to be wrapped inside a large `else` block.

The logic becomes:

**Is this Markdown?**

➡️ yes → show Markdown → stop

➡️ no → continue into demo logic

This keeps the two content paths visually and logically separate.

---

# 🧪 Part 135 — The demo path

If no Markdown document matches the menu item, `show()` treats it as a potential demo.

First it updates the heading using:

`item.label`

So if the selected menu item is:

🏷️ **SVG Terrain**

the heading becomes:

🌲 **SVG Terrain**

This is another example of the `MenuItem` data object travelling through the application and finally becoming visible UI.

---

# 📝 Part 136 — Descriptions are generated separately

The description is obtained from:

`getDescription(item)`

This method maps each demo ID to a short explanation.

So the selected item provides:

🏷️ **the heading directly**

while `getDescription()` provides:

📝 **the explanatory text**

This separates the menu label from the fuller demo description.

For example:

**Menu label**

🌲 SVG Terrain

can correspond to a longer explanation describing scalable terrain and objects drawn with SVG.

---

# 🏭 Part 137 — `createDemo()` acts like a demo factory

Next, the method calls:

`createDemo(item)`

This method examines the item's ID and creates the corresponding demo object.

Conceptually:

🆔 **`home`**

➡️ 🏠 create `DemoAreaHome`

🆔 **`single-hex`**

➡️ ⬡ create `DemoAreaSingleHex`

🆔 **`x-dominated-grid`**

➡️ ↔️ create `DemoAreaXDominatedGrid`

🆔 **`y-dominated-grid`**

➡️ ↕️ create `DemoAreaYDominatedGrid`

🆔 **`css-styling`**

➡️ 🎨 create `DemoAreaCssStyling`

🆔 **`svg-terrain`**

➡️ 🌲 create `DemoAreaSvgTerrain`

🆔 **`neighbours`**

➡️ 🔗 create `DemoAreaNeighbours`

This method therefore acts somewhat like a simple **factory**:

> 🏭 **Given an identifier, create the appropriate object.**

---

# 🧩 Part 138 — Why every demo can be treated as `Demo`

The return type of `createDemo()` is:

`Demo | null`

This is very important.

The individual classes are different:

`DemoAreaSingleHex`

`DemoAreaCssStyling`

`DemoAreaSvgTerrain`

and so on.

Yet `DemoArea` can treat all of them as the common type:

`Demo`

Why?

Because they all satisfy the same demo contract.

The details of that contract will be examined in the next chapter, but its architectural purpose is already visible:

> 🧩 **DemoArea does not need separate rendering logic for every demo class.**

It only needs to know:

**This object behaves like a `Demo`.**

---

# 🎭 Part 139 — Polymorphism begins to appear

This introduces an important object-oriented idea:

# 🎭 Polymorphism

Different object types can be treated through a common interface when they provide the required behaviour.

Conceptually:

⬡ **SingleHex**

🎨 **CssStyling**

🌲 **SvgTerrain**

🔗 **Neighbours**

all become:

⬇️

🧩 **Demo**

Therefore DemoArea can simply ask:

> **Render yourself.**

It does not need to understand how each individual demo performs its rendering.

This is one of the strongest architectural ideas in the test application.

---

# ⚪ Part 140 — What if no demo exists?

`createDemo()` can also return:

`null`

So `show()` checks whether a demo was actually created.

If not, it clears the demo container and returns.

This means an unknown or currently unsupported demo ID does not leave stale content visible from the previous selection.

Conceptually:

❓ **No demo found**

⬇️

🧹 **clear previous content**

⬇️

🛑 **stop**

Again, the class handles absence explicitly rather than assuming that a demo must always exist.

---

# 🎬 Part 141 — Rendering the selected demo

When a demo object exists, the class asks it to render itself.

The resulting HTML element is placed inside the demo container.

The key idea is:

**DemoArea does not build the demo.**

The demo object builds itself.

So:

🖥️ **DemoArea**

says:

> “Render yourself.”

⬇️

🌲 **SVG Terrain demo**

or:

⬡ **Single Hex demo**

or:

🔗 **Neighbours demo**

returns an `HTMLElement`

⬇️

📦 **DemoArea inserts it**

This is a clean delegation of responsibility.

---

# 🔄 Part 142 — `replaceChildren()` swaps displayed demos

The new rendered demo replaces whatever was previously inside the demo container.

Conceptually:

📦 **demoContainer**

contains:

⬡ Single Hex

⬇️ user selects SVG Terrain

🌲 new demo renders

⬇️

🔄 replace children

⬇️

📦 **demoContainer**

contains:

🌲 SVG Terrain

The outer `DemoArea` remains the same.

Only its internal content changes.

This makes the main area behave like a reusable display surface.

---

# 📚 Part 143 — `showMarkdown()` follows a different rendering path

Documentation is displayed through:

**`showMarkdown(markdown: string)`**

When showing Markdown, the normal demo heading and description are cleared.

Why?

Because the Markdown document itself already contains its own headings and content structure.

Otherwise, the page could end up with redundant headings.

So the documentation path becomes:

🧹 **clear demo heading**

🧹 **clear demo description**

⬇️

📝 **parse Markdown**

⬇️

🌐 **insert generated HTML**

---

# 🆚 Part 144 — `textContent` versus `innerHTML`

This file demonstrates an important difference between two DOM properties.

Earlier, ordinary text was inserted using:

`textContent`

For example, a heading or description.

But Markdown is converted into actual HTML markup.

That markup needs to be interpreted as HTML rather than displayed literally.

So the class uses:

`innerHTML`

The distinction is:

### 📝 `textContent`

Treat the supplied value as ordinary text.

### 🌐 `innerHTML`

Treat the supplied value as HTML markup.

Conceptually, if the value contains an HTML heading:

Using **textContent**

➡️ the markup itself would appear as text.

Using **innerHTML**

➡️ the browser creates an actual heading element.

That is why Markdown rendering needs `innerHTML`.

---

# ⚙️ Part 145 — `marked.parse()` performs the conversion

The core documentation operation is:

**Markdown string**

⬇️

`marked.parse()`

⬇️

**HTML string**

The resulting HTML is then assigned to the demo container's `innerHTML`.

So `showMarkdown()` is essentially an adapter between:

📄 **Markdown documentation**

and:

🌐 **browser-renderable HTML**

This small method hides the whole conversion process behind a meaningful name:

**show Markdown**

---

# 🛡️ Part 146 — A useful security distinction

There is an important general lesson whenever `innerHTML` is used.

Unlike `textContent`, `innerHTML` tells the browser to interpret markup.

That means arbitrary untrusted HTML should not casually be inserted this way.

In this application, the Markdown comes from the project's own imported documentation files, so the intended data flow is controlled by the project itself.

The broader principle is:

> 🛡️ **`textContent` is appropriate for ordinary text; `innerHTML` should be used deliberately when actual HTML rendering is required.**

---

# 📚 Part 147 — `getMarkdown()` is a large lookup method

`getMarkdown(item)` maps documentation IDs to imported Markdown strings.

Its basic pattern repeats:

**Does the ID equal this chapter?**

➡️ return that chapter's Markdown

Otherwise continue.

For example, conceptually:

📖 `chapter-00-introduction`

➡️ Introduction Markdown

📖 `chapter-01-coordinate`

➡️ Coordinate Markdown

📖 `chapter-02-orientation`

➡️ Orientation Markdown

...

📖 `chapter-30-complete-mental-model`

➡️ Complete Mental Model Markdown

If none match:

➡️ **`null`**

So this method acts as a mapping between:

**navigation IDs**

and:

**document contents**

---

# 🗺️ Part 148 — IDs are acting like routing keys

The chapter IDs now reveal another role.

Earlier, they were used by Navigation to identify selected menu items.

Here, those same IDs determine which content should be displayed.

They therefore behave somewhat like simple **routing keys**.

For example:

🆔 **`chapter-28-design-patterns`**

⬇️

🗺️ `getMarkdown()`

⬇️

📄 **Design Patterns Markdown**

Similarly:

🆔 **`svg-terrain`**

⬇️

🏭 `createDemo()`

⬇️

🌲 **SVG Terrain demo**

The application does not use a full routing framework, but the ID plays a similar conceptual role:

> **An identifier points to a destination or piece of content.**

---

# 🏭 Part 149 — `createDemo()` separates construction from display

The `createDemo()` method does not render anything itself.

Its job is only:

> 🏭 **Choose and construct the correct demo object.**

Then `show()` handles displaying that object.

This separation gives each method a clearer responsibility:

`createDemo()`

→ Which demo object?

`demo.render()`

→ How does that demo create its interface?

`show()`

→ Where should the rendered result go?

This is another example of breaking a larger process into smaller conceptual steps.

---

# 📝 Part 150 — `getDescription()` maps IDs to explanatory text

The final major helper is:

**`getDescription(item: MenuItem): string`**

It maps each demo ID to a short human-readable explanation.

For example:

⬡ **Single Hex**

→ explains that single hexagons are generated by the Midgard library.

↔️ **X-Dominated Grid**

→ explains the 3 by 2 skeleton.

🎨 **CSS Styling**

→ explains styling SVG hexagons through coordinate-derived IDs.

🔗 **Neighbours**

→ explains finding and interacting with six neighbouring hexagons.

So the menu item contains the short label, while `getDescription()` supplies richer context.

---

# 🛟 Part 151 — A fallback description

If none of the known IDs match, the method still returns a string:

> **This demo has not been implemented yet.**

This is a **fallback value**.

Instead of returning `null`, the method guarantees:

`string`

for every possible `MenuItem`.

That matches its declared return type:

`string`

This makes the calling code simpler because it never has to ask:

> “Did I actually get a description?”

It always gets one.

---

# 🧠 Part 152 — Three lookup responsibilities

A useful way to understand `DemoArea.ts` is to notice its three major lookup operations.

### 📚 `getMarkdown()`

**MenuItem ID**

➡️ Markdown document

### 🏭 `createDemo()`

**MenuItem ID**

➡️ Demo object

### 📝 `getDescription()`

**MenuItem ID**

➡️ Human-readable description

The same ID therefore connects several pieces of information.

For a demo such as `svg-terrain`:

🆔 **`svg-terrain`**

↙️　　　　　　　　　↘️

🌲 **Demo object**　　　📝 **Description**

For a documentation item:

🆔 **chapter ID**

⬇️

📄 **Markdown**

This is the central mapping responsibility of `DemoArea`.

---

# 🧭 Part 153 — The complete selection flow

The complete path from a click to visible content can now be followed.

### 👤 Step 1 — User clicks

For example:

🌲 **SVG Terrain**

⬇️

### 🧭 Step 2 — Navigation

Navigation identifies the selected `MenuItem`.

⬇️

### 📞 Step 3 — Callback

The item is sent to `App`.

⬇️

### 🏛️ Step 4 — App

App forwards the item to `DemoArea.show()`.

⬇️

### 🖥️ Step 5 — DemoArea

DemoArea asks:

**Markdown?**

❌ No

⬇️

**Which demo?**

🌲 SVG Terrain

⬇️

### 🏭 Step 6 — Construct demo

A new SVG Terrain demo object is created.

⬇️

### 🎨 Step 7 — Render

The demo creates its DOM/SVG.

⬇️

### 🔄 Step 8 — Display

The old content is replaced.

The browser now shows the selected demo.

---

# 📚 Part 154 — The documentation flow is shorter

For a documentation chapter, the path changes inside `DemoArea`.

👤 **User selects Chapter 10**

⬇️

🧭 **Navigation creates selection**

⬇️

🏛️ **App forwards MenuItem**

⬇️

🖥️ **DemoArea**

⬇️

📚 `getMarkdown()` finds the chapter

⬇️

⚙️ `marked.parse()`

⬇️

🌐 HTML

⬇️

📖 **formatted chapter appears**

The same navigation architecture therefore supports two fundamentally different content systems.

---

# 🧩 Part 155 — DemoArea as an integration point

`DemoArea.ts` is an important **integration point**.

Several technologies meet here:

🧠 **TypeScript**

→ classes, types, branching and methods

🌳 **DOM API**

→ HTML elements and content replacement

⚡ **Vite**

→ raw Markdown imports

📦 **Marked**

→ Markdown parsing

📚 **Markdown**

→ documentation source format

🧪 **Demo classes**

→ interactive visual examples

The class does not deeply implement all of these technologies.

Instead, it coordinates them.

That is similar to the role `App` plays at a higher architectural level.

---

# 🎭 Part 156 — The most important OOP idea in this file

The strongest object-oriented idea in `DemoArea.ts` is the relationship between:

`Demo`

and the individual demo classes.

DemoArea does not need logic such as:

> “If this is `DemoAreaSvgTerrain`, call its special SVG render method.”

Instead, all demo objects are expected to support the same basic operation:

**render**

So many different objects can be handled uniformly.

That gives the architecture:

⬡ Single Hex  
↔️ X Grid  
↕️ Y Grid  
🎨 CSS Styling  
🌲 SVG Terrain  
🔗 Neighbours

⬇️ all satisfy

🧩 **Demo**

⬇️ therefore

🖥️ **DemoArea can render any of them**

The next chapter will examine the tiny `Demo.ts` file where this contract is actually defined.

---

# 🧰 TypeScript, Vite and DOM concepts introduced in Chapter 6

### 📦 External package import

A module can come from an installed dependency rather than a local project file.

### ⚡ Vite raw imports

**`?raw`** allows file contents to be imported as strings.

### 📝 Markdown parsing

Markdown text can be transformed into HTML using a parser such as `marked`.

### 🌐 `innerHTML`

Allows an HTML string to be interpreted as actual DOM markup.

### 🏭 Factory-like method

A method can select and construct one of several object types based on input.

### 🎭 Polymorphism

Different classes can be treated through a shared interface.

### 🗺️ Identifier-based mapping

An ID can connect navigation choices to corresponding content.

### 🛟 Fallback value

A method can provide a sensible default when no specific case matches.

---

# 🎯 Chapter 6 — The central idea

`DemoArea.ts` is where a **selection becomes content**.

It receives a `MenuItem` and determines whether that item represents:

📚 **a Markdown document**

or:

🧪 **an interactive demo**

It then delegates the actual work:

📚 Markdown is parsed by **Marked**.

🧪 Demos render themselves through the **Demo interface**.

This keeps the central responsibility clear:

> 🖥️ **DemoArea chooses what kind of content should be displayed and places that content into the application's main area.**

The high-level application architecture is now almost complete:

🌐 **`main.ts`**

⬇️

🏛️ **`App.ts`**

↙️　　　　　↓　　　　　↘️

🏷️ **Header**　🧭 **Navigation**　🖥️ **DemoArea**

　　　　　　　　　　　　　↙️　　↘️

　　　　　　　　　　　🧪 **Demo**　📚 **Markdown**

The next chapter moves into the demo system itself, beginning with the smallest file in that architecture:

🧩 **`Demo.ts`**
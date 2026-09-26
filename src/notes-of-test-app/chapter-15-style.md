## Chapter 15 — `style.css`

### 🎨 Part 380 — The visual layer of the application

`style.css` is different from every TypeScript file studied so far.

The TypeScript files create:

🌳 DOM elements

🧭 navigation behaviour

🖱️ interactions

📦 Midgard library calls

🔷 SVG graphics

But those elements still need a coherent visual presentation.

That is the responsibility of:

```
style.css
```

The stylesheet defines the overall appearance of:

🏠 the application shell

⬛ the header

🧭 the sidebar

📄 the content area

🔘 navigation buttons

📝 headings and descriptions

🗺️ demo containers

🌱🌊 styled hexagons

So the broad relationship is:

**TypeScript**

→ creates structure and behaviour

**CSS**

→ controls appearance and layout. style



---



# 🧠 Part 381 — Separation of structure, behaviour and presentation

The application demonstrates a classic web-development separation.

### 🌳 HTML/DOM structure

Created largely through TypeScript.

It answers:

> **What elements exist?**

### ⚙️ TypeScript behaviour

It answers:

> **What happens?**

### 🎨 CSS presentation

It answers:

> **How should those elements look and be arranged?**

Conceptually:

🌳 **Structure**

- \


⚙️ **Behaviour**

- \


🎨 **Presentation**

⬇️

🖥️ **complete application**

The boundaries are not absolute, especially because SVG sometimes receives styling attributes directly, but this remains the main architectural division.



---



# 🎛️ Part 382 — `:root` defines shared CSS variables

The stylesheet begins with:

```
:root
```

Inside it are variables such as:

```
--text
--bg
--surface
--header-bg
--nav-active
--border
```

**`--sans`**. style

These are called **CSS custom properties**, often informally called CSS variables.

They provide named values that can be reused throughout the stylesheet.

Instead of repeatedly remembering a particular color value, CSS can refer to its meaning.



---



# 🌳 Part 383 — Why `:root`?

`:root` represents the root element of the document.

Variables defined there are available throughout the page through normal CSS inheritance and custom-property lookup.

Conceptually:

🌳 **`:root`**

├── `--text`\
├── `--bg`\
├── `--surface`\
├── `--nav-active`\
└── ...

⬇️ available to

⬛ header

🧭 navigation

📄 demo area

🔘 buttons

This makes `:root` a convenient location for application-wide design values.



---



# 🏷️ Part 384 — Semantic variable names

Consider the difference between thinking in terms of:

```
#24302a
```

and:

```
--text
```

The first describes a literal color.

The second describes its **role**.

Likewise:

```
--nav-active
```

communicates:

> 🎨 **This is the color used for active navigation.**

This is similar to good naming in TypeScript.

Meaningful names reduce the need to remember implementation details.



---



# ♻️ Part 385 — CSS variables reduce repetition

Suppose the same green active color appears in several places.

Without a variable, the literal value would need to be repeated.

With:

```
--nav-active
```

the stylesheet can reuse:

```
var(--nav-active)
```

in multiple rules.

Conceptually:

🎨 one definition

⬇️

🔘 header active state

🧭 sidebar active state

If the design changes later, the shared value can be changed in one place.

This is CSS reuse through indirection.



---



# 🎨 Part 386 — A small design system

The variables effectively form a miniature **design system**.

They define concepts such as:

📝 text color

📝 muted text

🖼️ page background

📄 surface background

⬛ header background

🧭 navigation background

✨ hover color

🎯 active color

📏 border color

🔤 font family

Even a small application benefits from having a consistent visual vocabulary.



---



# 📦 Part 387 — The universal `box-sizing` rule

The stylesheet applies:

```
box-sizing: border-box
```

to:

```
*
*::before
*::after
```

This affects essentially every normal element and its pseudo-elements.

`border-box` changes how CSS calculates element dimensions.

It means:

> 📦 **Declared width and height include padding and border.**

This usually makes layout calculations easier to reason about.



---



# 📏 Part 388 — Why `border-box` is useful

Without `border-box`, imagine an element with:

width = 240px

plus:

padding

plus:

border

Its actual occupied width could become larger than 240px.

With:

```
box-sizing: border-box
```

the browser fits the content, padding and border inside the declared width.

This is particularly useful for the sidebar:

```
.navigation { width: 240px; ... }
```

The layout becomes more predictable.



---



# 🧹 Part 389 — Removing default page margins

Browsers provide default styles.

For example, the `<body>` normally has some margin.

This application explicitly sets:

```
margin: 0
```

for both:

```
html
```

and:

**`body`**.

That removes the browser's default outer spacing.

The application can then control its own layout from the very edge of the viewport.



---



# 📐 Part 390 — Giving the document full height

The stylesheet also gives:

```
html
```

and:

```
body
```

a height of:

**100%**.

Then:

```
#app
```

receives:

**`min-height: 100%`**.

This establishes the vertical foundation for the application layout.

The goal is for the application to be able to occupy the full browser height rather than only the height of its immediate content.



---



# 🔤 Part 391 — Global typography and colors

The `body` defines:

```
font-family: var(--sans)
color: var(--text)
```

**`background: var(--bg)`**. style

These become broad defaults for the application.

Because many CSS properties inherit, child elements can naturally use the same text styling unless they override it.

This avoids setting the font separately on every paragraph, heading and button.



---



# 🔤 Part 392 — A font stack

The `--sans` variable contains a **font stack**.

Conceptually:

preferred system font

⬇️ if unavailable

Segoe UI

⬇️ if unavailable

Roboto

⬇️

generic sans-serif

The browser tries the fonts from left to right until it finds one it can use.

This provides graceful fallback across different operating systems.



---



# 🏠 Part 393 — `.app-shell` establishes the main layout

The class:

```
.app-shell
```

corresponds to the container created by `App.ts`.

Its CSS includes:

```
display: flex
```

and:

**`flex-direction: column`**.

So the application is arranged vertically:

⬛ **Header**

⬇️

📄 **Application content**

This matches the DOM structure created earlier in `App.ts`.

The TypeScript and CSS are cooperating around a shared class name.



---



# 🤝 Part 394 — Class names are contracts between TypeScript and CSS

In `App.ts`, TypeScript adds a class such as:

```
app-shell
```

CSS then defines:

```
.app-shell
```

These two pieces of code must agree.

Conceptually:

⚙️ TypeScript says:

> “This element belongs to `app-shell`.”

🎨 CSS says:

> “Elements belonging to `app-shell` should look and behave like this.”

The class name therefore acts as a small contract between two technologies.



---



# 📱 Part 395 — `100vh`

`.app-shell` uses:

**`min-height: 100vh`**.

`vh` means **viewport height**.

So:

**100vh**

means approximately:

> 📱 **100% of the viewport's height.**

This helps ensure that the shell fills at least the visible browser window.

If the content becomes taller, `min-height` still allows it to grow.



---



# ⬛ Part 396 — Styling the header

`.app-header` uses Flexbox and defines properties such as:

📐 minimum height

↔️ horizontal padding

⬛ dark background

⬜ light text

➖ bottom border. style

Its layout is:

🏷️ **Midgard Hex Grid**

then:

🔘 **Test Page**

🔘 **Project Notes**

Because the header uses:

```
display: flex
```

its children can naturally be arranged horizontally.



---



# 📐 Part 397 — `align-items: center`

The header uses:

```
align-items: center
```

With the default horizontal flex direction, this centers children vertically within the header.

So the title and navigation buttons sit neatly around the vertical center line rather than aligning awkwardly at the top.

This is one of the most common Flexbox alignment patterns.



---



# 🏷️ Part 398 — Styling the application title

`.app-title` removes the heading's default margin and defines:

🔤 font size

🏋️ font weight

↔️ letter spacing.

This is another reminder that semantic HTML and visual appearance are separate concerns.

`Header.ts` creates an:

```
h1
```

because it is the application's primary heading.

CSS then decides how large and heavy that heading should appear.

Semantic meaning does not require accepting the browser's default visual style.



---



# 🧭 Part 399 — Header navigation is another Flexbox container

`.header-navigation` also uses:

```
display: flex
```

Its buttons are arranged horizontally with:

```
gap: 8px
```

and the navigation itself receives:

**`margin-left: 48px`**.

So the visual relationship becomes:

🏷️ title

　　　↔️ spacing

🔘 Test Page　🔘 Project Notes

Nested Flexbox layouts are common.

The header is a flex container, and the navigation inside it is another flex container.



---



# 🔘 Part 400 — Resetting button appearance

Browser buttons have default styling.

The header navigation buttons deliberately replace much of it:

```
border: 0
background: transparent
font: inherit
```

along with custom padding, radius and colors.

This allows the button to remain a real semantic:

```
<button>
```

while visually fitting the application's design.

That is preferable to using a generic `<div>` merely because it is easier to style.



---



# 🖱️ Part 401 — `cursor: pointer`

The navigation buttons use:

```
cursor: pointer
```

When the pointer moves over the button, the browser displays the familiar pointing-hand cursor.

This gives the user a visual hint:

> 🖱️ **This element is interactive.**

Small visual signals like this improve discoverability.



---



# ✨ Part 402 — Hover state

The header button has a:

```
:hover
```

rule.

When the pointer is over the button, its background changes.

Conceptually:

⚪ normal

⬇️ pointer enters

✨ hover appearance

⬇️ pointer leaves

⚪ normal

Unlike the Neighbours demo, no JavaScript event handler is necessary here.

CSS can handle this simple visual interaction directly.



---



# 🆚 Part 403 — CSS hover versus JavaScript mouse events

This provides a useful comparison.

### 🎨 CSS `:hover`

Good when the desired behaviour is primarily a styling change.

### ⚙️ JavaScript `mouseenter`

Useful when entering an element must execute program logic.

The header only needs:

> “Change appearance while hovered.”

So CSS is enough.

The Neighbours demo needs:

> “Find a calculated set of related polygons and modify them.”

That requires program logic.

Choosing the simpler mechanism when it is sufficient keeps code cleaner.



---



# 🎞️ Part 404 — CSS transitions

The header navigation buttons define transitions for:

**background**

and:

**color**

over:

**0.15s ease**.

Without a transition:

⚪ normal

→ instantly →

🟩 active/hover color

With a transition:

⚪ normal

→ smooth short change →

🟩 new color

CSS transitions allow changes between visual states to be animated without JavaScript.



---



# 🎯 Part 405 — `.is-active` represents state visually

The header uses:

```
.header-navigation-item.is-active
```

This selector means:

> Select an element that has both `header-navigation-item` and `is-active`.

The active button receives:

🟩 active background

⬜ active text color.

Recall that `Header.ts` adds and removes:

```
is-active
```

through TypeScript.

So the complete relationship is:

🧠 application state

⬇️

⚙️ TypeScript toggles class

⬇️

🏷️ `is-active`

⬇️

🎨 CSS changes appearance

This is an important application pattern.



---



# 🧠 Part 406 — State classes bridge behaviour and styling

TypeScript does not need to say:

> “Set this exact green background color.”

Instead it says:

> “This button is active.”

CSS decides what active should look like.

So:

⚙️ TypeScript owns **state**

🎨 CSS owns **visual interpretation of state**

The class:

```
is-active
```

is the bridge.

This is cleaner than mixing all presentation values into TypeScript.



---



# 🧱 Part 407 — `.app-content` creates the second major layout

Below the header is:

```
.app-content
```

It also uses:

**`display: flex`**.

But now the layout is horizontal:

🧭 **Navigation**

│

📄 **Demo area**

This gives the complete application two nested layout directions:

### Main shell

⬛ header\
⬇️\
📄 content

### Content

🧭 sidebar　➡️　📄 main area

Flexbox handles both.



---



# 🧭 Part 408 — The sidebar has a fixed width

`.navigation` uses:

```
width: 240px
```

and:

**`flex-shrink: 0`**. style

`flex-shrink: 0` tells the flex layout:

> 📏 **Do not squeeze this sidebar smaller when space becomes tight.**

So the sidebar maintains its intended width while the main content area receives the flexible remaining space.



---



# ➖ Part 409 — Visual separation through borders

The navigation receives:

```
border-right: 1px solid var(--border)
```

This creates a subtle vertical divider between:

🧭 navigation

and:

📄 content.

Borders are not only decoration.

They can communicate visual structure and help users understand which regions belong together.



---



# 📋 Part 410 — Resetting the navigation list

The sidebar uses a semantic list created in `Navigation.ts`.

Browsers normally display lists with:

• bullets

and:

↔️ default padding/margins.

`.navigation-list` removes those defaults:

```
list-style: none
margin: 0
padding: 0
```

The semantic `<ul>` remains in the DOM, but CSS adapts its appearance to the application.

Again:

🌳 semantic structure

does not dictate:

🎨 default browser presentation.



---



# ↕️ Part 411 — The sidebar list is a vertical Flexbox

`.navigation-list` uses:

```
display: flex
```

with:

```
flex-direction: column
```

and:

**`gap: 4px`**.

So the menu becomes:

🔘 Home

🔘 Single Hex

🔘 X-Dominated Grid

🔘 Y-Dominated Grid

🔘 CSS Styling

🔘 SVG Terrain

🔘 Neighbours

The DOM contains a list.

Flexbox controls how that list is visually arranged.



---



# 🔘 Part 412 — Sidebar buttons fill the available width

`.navigation-item` uses:

```
width: 100%
```

and:

**`text-align: left`**.

This creates wide menu buttons with labels aligned to the left.

That is appropriate for a sidebar navigation.

The button's semantic behaviour remains intact while CSS makes it visually resemble a navigation row.



---



# 🎯 Part 413 — Sidebar hover and active states

Like the header, sidebar navigation has separate visual states.

### ⚪ Normal

Transparent background.

### ✨ Hover

Uses:

```
--nav-hover
```

### 🟩 Active

Uses:

```
--nav-active
```

with:

```
--nav-active-text
```

So the user can distinguish:

🖱️ what is currently being pointed at

from:

🎯 what is currently selected.

Those are different interface states and should not be visually confused.



---



# 🔄 Part 414 — Navigation.ts and CSS cooperate

Earlier, `Navigation.ts` used:

```
classList.toggle('is-active', ...)
```

The stylesheet now reveals the other half of that mechanism.

TypeScript determines:

🧠 **which menu item is active**

CSS determines:

🎨 **how an active menu item looks**

So:

```
Navigation.ts
```

⬇️ toggles

🏷️ `.is-active`

⬇️ interpreted by

```
style.css
```

⬇️

🟩 active appearance

This is a clean behavioural/presentation boundary.



---



# 📄 Part 415 — `.demo-area` consumes remaining space

The main content region uses:

**`flex: 1`**. style

That means it expands to occupy the remaining horizontal space after the 240px navigation sidebar.

Conceptually:

available width

−

🧭 240px sidebar

\=

📄 flexible demo area

This makes the layout adapt naturally to different browser widths.



---



# 📐 Part 416 — Why `min-width: 0` appears

`.demo-area` also uses:

**`min-width: 0`**.

This can look strange because zero width is obviously not the intended visual width.

Its purpose relates to Flexbox sizing.

Flex items can otherwise resist shrinking below the size implied by their content.

Setting:

```
min-width: 0
```

allows the flexible content area to shrink when necessary instead of forcing unwanted overflow.

This is a small but useful Flexbox technique.



---



# 🖼️ Part 417 — Surface and spacing

The demo area receives:

📄 `background: var(--surface)`

and:

📐 `padding: 32px`.

This visually separates the primary content surface from the surrounding application background and gives the content breathing room.

The hierarchy becomes:

⬛ dark header

🧭 muted sidebar

📄 light main surface

This helps the application's major regions remain visually distinct.



---



# 📝 Part 418 — Heading and description hierarchy

`.demo-heading` is larger and heavier.

`.demo-description` uses:

**`--text-muted`**.

This creates visual hierarchy:

# Primary demo heading

then:

📝 softer supporting explanation

CSS communicates which text deserves attention first.

Typography is therefore part of information architecture, not merely decoration.



---



# 🗺️ Part 419 — `.demo-content` deliberately exposes its boundary

The current `.demo-content` uses:

```
display: inline-block
```

with:

🔴 a **2px red border**

and:

⬜/gray background.

This makes the actual demo-content boundary very visible.

For a development/test application, conspicuous styling can be useful because it shows exactly how much space a generated SVG or demo occupies.

The style does not need to represent the final appearance of a game.

It can help inspect layout behaviour.



---



# 📦 Part 420 — `inline-block`

`display: inline-block` combines useful characteristics.

The element participates somewhat like inline content, but it can still behave as a rectangular box with dimensions, background and border.

In this demo area, that helps the container wrap closely around its content rather than automatically occupying the entire available width like a normal block element.

This makes the boundaries of the rendered demonstration easier to inspect.



---



# 🔷 Part 421 — SVG is forced to `display: block`

The stylesheet contains:

**`.demo-content svg { display: block; }`**. style

SVG elements can otherwise participate in inline formatting and may leave small baseline-related gaps.

Using:

```
display: block
```

makes the SVG behave as a block box inside the demo container.

This often produces more predictable graphic layout.



---



# ⬜ Part 422 — A white SVG background

The SVG inside `.demo-content` receives:

**`background: #ffffff`**.

This gives the rendered graphics a clean white canvas regardless of the surrounding gray demo container.

So visually:

🔴 demo boundary

⬇️

⬜ SVG canvas

⬇️

⬡ rendered Midgard graphics

The contrast makes the SVG's actual area easy to see.



---



# 🌱 Part 423 — The CSS Styling demo connects directly to this file

The final stylesheet rules correspond to the CSS Styling demo from Chapter 12.

The class:

```
.css-styling-hexagon
```

receives:

🌱 **`fill: #6f9f58`**

Then three IDs:

```
#hex-4-2
#hex-3-3
#hex-5-3
```

receive:

🌊 **`fill: #4f9fcf`**. style

This is the concrete stylesheet implementation of the technique discussed earlier.



---



# 🔗 Part 424 — Following one hexagon through the complete system

Consider coordinate:

📍 **`(4,2)`**

The complete journey is:

📦 **Midgard**

creates coordinate `(4,2)`

⬇️

⚙️ **DemoAreaCssStyling.ts**

creates SVG polygon ID:

```
hex-4-2
```

⬇️

🎨 **style.css**

matches:

```
#hex-4-2
```

⬇️

🌊 sets blue fill

⬇️

👁️ browser displays a water hexagon

This is a complete cross-file relationship between:

library data

→ TypeScript

→ DOM

→ CSS

→ pixels on the screen.



---



# 🧠 Part 425 — CSS selectors depend on the DOM structure

CSS does not operate independently.

A selector such as:

```
.navigation-item.is-active
```

only works because `Navigation.ts` creates elements with:

```
navigation-item
```

and later adds:

**`is-active`**.

Likewise:

```
#hex-4-2
```

only works because the CSS Styling demo creates exactly that ID.

So CSS and TypeScript remain separate technologies, but they share agreed conventions.

Those conventions include:

🏷️ class names

🆔 IDs

🌳 element relationships

They form part of the application's internal architecture.



---



# ⚠️ Part 426 — Renaming a class can be a cross-file change

Suppose TypeScript changed:

```
navigation-item
```

to:

```
menu-button
```

but the CSS remained:

```
.navigation-item
```

The program might still run without a TypeScript error.

But the menu styling would disappear.

This reveals an important limitation:

> ⚠️ **CSS class-name relationships are generally not protected by TypeScript's type checker.**

They are string-based contracts across files.

That means refactoring CSS class names requires care.



---



# 🧠 Part 427 — Not every contract is type-safe

TypeScript gives strong compile-time help for things such as:

🧩 interfaces

🔤 union types

📦 function parameters

🔄 return values

But the relationship:

```
classList.add('demo-area')
```

↔️

```
.demo-area
```

is not automatically verified in the same way.

The compiler generally cannot tell that the stylesheet forgot or misspelled the corresponding selector.

This is a useful reminder:

> 🧠 **A software system contains contracts beyond those represented by its type system.**



---



# 🎨 Part 428 — CSS can express application state without owning it

The stylesheet knows how these states should look:

✨ hover

🎯 active

🌱 grass

🌊 water

But it does not decide:

> Which navigation item is active?

That comes from TypeScript.

Nor does CSS calculate:

> Which Midgard coordinate is `(4,2)`?

That comes from library/application data.

So CSS participates in state representation without owning the underlying business or application logic.



---



# 🧱 Part 429 — The complete visual hierarchy

The stylesheet turns the DOM tree from earlier chapters into roughly this visual structure:

⬛ **Midgard Hex Grid　　Test Page　Project Notes**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧭 **Sidebar**　│　📄 **Main content**

Home　　　　　│　Demo heading\
Single Hex　　 │　Description\
X Grid　　　　 │\
Y Grid　　　　 │　🗺️ Demo content\
CSS Styling　　│\
SVG Terrain　　│\
Neighbours　　 │

This is the visible form of the architecture created by:

```
App
Header
Navigation
DemoArea
```

and the individual demos.



---



# 🧩 Part 430 — CSS completes component cooperation

Each TypeScript class creates a different structural responsibility:

⬛ `Header`

🧭 `Navigation`

📄 `DemoArea`

🗺️ individual `Demo`

The stylesheet does not need to know their TypeScript class definitions.

It sees the DOM result:

```
.app-header
.navigation
.demo-area
.demo-content
```

and styles those elements.

So the complete system has two different component views:

### ⚙️ TypeScript view

Objects and classes.

### 🌳 CSS/DOM view

Elements, classes and selectors.

Both describe the same application from different perspectives.



---



# 🧰 CSS concepts introduced in Chapter 15

### 🎛️ Custom properties

Named reusable CSS values such as `--nav-active`.

### 🌳 `:root`

A convenient location for application-wide CSS variables.

### 📦 `box-sizing: border-box`

Makes element dimensions include padding and borders.

### 📐 Flexbox

Provides flexible one-dimensional layouts for the shell, header navigation, sidebar and main content.

### ↕️ `flex-direction`

Controls whether flex children are arranged horizontally or vertically.

### 📏 `flex: 1`

Allows an element to consume available flexible space.

### 🔒 `flex-shrink: 0`

Prevents a flex item such as the sidebar from being compressed.

### 📱 `vh`

Represents a percentage of viewport height.

### ✨ Pseudo-class `:hover`

Applies styles according to pointer interaction.

### 🎞️ `transition`

Smoothly animates changes between CSS property values.

### 🎯 State classes

Classes such as `is-active` allow TypeScript state to be represented visually by CSS.

### 🔍 Specific selectors

Classes provide shared styling while IDs can target individual elements.



---



# 🎯 Chapter 15 — The central idea

`style.css` is not merely decoration added after the application was programmed.

It participates directly in the application's architecture.

The complete relationship is:

⚙️ **TypeScript**

creates DOM structure

⬇️

🏷️ assigns classes and IDs

⬇️

🎨 **CSS**

matches those selectors

⬇️

📐 controls layout

🎨 controls appearance

✨ controls simple visual states

⬇️

👁️ **browser renders the interface**

The stylesheet also reveals how application state crosses technology boundaries:

🧠 `Header.ts` knows which section is active

⬇️

🏷️ adds `is-active`

⬇️

🎨 `style.css` gives that state a visual appearance

And the Midgard data can travel even further:

📦 coordinate `(4,2)`

⬇️

🏷️ SVG ID `hex-4-2`

⬇️

🎨 CSS selector `#hex-4-2`

⬇️

🌊 blue terrain

So the final lesson of the source-code tour is:

> 🧠 **A browser application is not built by TypeScript, DOM or CSS independently. It emerges from clearly defined relationships between all three.**

With `style.css`, all **15 current source files** in the test application have now been covered:

📄 7 files directly under `src/`

plus:

🧩 8 files under `src/demos/`

The next part of the book can therefore move away from individual files and explain the **whole Test Page application as one connected system**: startup, navigation, routing, demos, Midgard, SVG, CSS and interaction from beginning to end.
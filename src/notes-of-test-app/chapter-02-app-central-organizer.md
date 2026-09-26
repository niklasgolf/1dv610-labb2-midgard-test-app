# 📘 MIDGARD TEST APP

## Chapter 2 — `App.ts`

### 🏛️ Part 15 — The application's central organizer

In Chapter 1, `main.ts` created an `App` object and called:

`app.start()`

Now the next question is:

> 🧠 **What exactly is this `App` object responsible for?**

`App.ts` acts as the **central organizer of the test application's user interface**.

It does not draw hexagons itself.  
It does not render Markdown itself.  
It does not create navigation buttons itself.

Instead, it brings several specialized parts together:

**🏷️ `Header`** — the top navigation  
**🧭 `Navigation`** — the left-side navigation  
**🖥️ `DemoArea`** — the main content area

The relationship looks like this:

**`main.ts`**  
⬇️  
**🏛️ `App`**  
↙️ ↓ ↘️  
**🏷️ Header — 🧭 Navigation — 🖥️ DemoArea**

This is a very common object-oriented idea:

> **A larger object can coordinate several smaller objects, each with its own responsibility.**

`App` therefore acts almost like the **conductor of an orchestra**. It does not play every instrument; it coordinates the objects that do the actual work.

---

# 📦 Part 16 — Imports are now connecting application components

At the beginning of `App.ts`, several modules are imported:

**`DemoArea`**  
**`Header`**  
**`Navigation`**  
**`MenuItem`**  
**`HeaderSection`**

Imports were explained in Chapter 1, so there is no need to relearn the mechanism here.

What matters now is the **architecture they reveal**.

The file depends on several separate concepts:

**`Header`**  
→ controls the application's top-level navigation.

**`Navigation`**  
→ controls the menu on the left.

**`DemoArea`**  
→ displays whichever demo or document has been selected.

**`MenuItem`**  
→ describes an item that can be selected from the navigation.

**`HeaderSection`**  
→ describes which major section of the application is active.

The imports therefore give a quick architectural map before the class has even begun.

---

# 🧠 Part 17 — `import type`

Two imports are slightly different:

`import type { HeaderSection } from './Header.ts'`

and:

`import type { MenuItem } from './MenuItem.ts'`

The important addition is:

### `type`

This tells TypeScript:

> 🧠 **This import is needed only for type checking. It is not a JavaScript value needed while the application is running.**

That distinction is particularly useful in TypeScript.

For example:

**`Header`** is a real class used at runtime:

`new Header(...)`

But:

`HeaderSection`

is type information used by TypeScript to describe acceptable values.

Similarly:

`MenuItem`

describes the shape of menu-item data rather than being an object that `App` constructs.

So there are now two useful categories:

**⚙️ Runtime import**  
Something the running JavaScript actually needs.

**🧠 Type-only import**  
Information used by TypeScript while checking the program.

This makes the intention of the code clearer.

---

# 🏗️ Part 18 — Declaring the `App` class

The class begins with:

`export class App`

Three ideas are combined here.

### 📤 `export`

Other modules are allowed to import this class.

That is exactly what `main.ts` does.

### 🏛️ `class`

A class defines a kind of object containing both **state** and **behaviour**.

### 🏷️ `App`

This is the name of the class.

So the declaration essentially means:

> 📤 **Make the `App` class available to other modules.**

This is the connection that allows:

**`App.ts` → exports `App` → `main.ts` imports `App`**

---

# 🔒 Part 19 — The application's private fields

The class declares four fields:

`private readonly root: HTMLElement`  
`private readonly header: Header`  
`private readonly navigation: Navigation`  
`private readonly demoArea: DemoArea`

These fields describe the objects that an `App` instance needs throughout its lifetime.

There are three particularly important TypeScript ideas here.

---

## 🔐 `private`

The keyword **`private`** means that the field belongs to the internal implementation of `App`.

Code outside the class should not directly manipulate:

`app.header`  
`app.navigation`  
`app.demoArea`

Instead, `App` controls these objects internally.

This is a form of **encapsulation**.

> 🔐 **An object can hide implementation details that other parts of the program do not need to know about.**

This helps prevent unrelated code from becoming tightly connected to the internals of the class.

---

## 🔒 `readonly`

The keyword **`readonly`** means that once the field has been assigned, the class cannot later replace it with another value.

For example, once:

`this.header`

has received its `Header` object, it is not supposed to become a completely different `Header` later.

An important distinction is:

> **`readonly` protects the reference, not necessarily everything inside the object.**

The `Header` object itself may still change its internal state.

For example, its active section can change.

But `App` continues referring to the same `Header` object.

---

## 🧠 Explicit field types

Each field also declares its type:

`root: HTMLElement`  
`header: Header`  
`navigation: Navigation`  
`demoArea: DemoArea`

This makes the structure of an `App` object immediately visible.

An `App` **has a** root.  
An `App` **has a** header.  
An `App` **has a** navigation object.  
An `App` **has a** demo area.

This is an example of **composition**.

---

# 🧩 Part 20 — Composition: building larger objects from smaller objects

Composition is one of the most useful ideas in object-oriented design.

Instead of creating one enormous class that performs every task, `App` is assembled from specialized objects.

Conceptually:

**🏛️ App**

contains:

**🏷️ Header**  
**🧭 Navigation**  
**🖥️ DemoArea**

This relationship is often described as:

> **“has-a”**

An `App` **has a** `Header`.

An `App` **has a** `Navigation`.

An `App` **has a** `DemoArea`.

That is different from inheritance, which describes an **“is-a”** relationship.

Nothing here says that `App` *is a* Header or *is a* Navigation.

Instead, the application is **composed from them**.

This keeps responsibilities separated and makes the architecture easier to understand.

---

# 🏗️ Part 21 — The constructor creates the application's parts

The constructor receives:

`root: HTMLElement`

This is the same root element that `main.ts` found earlier.

Inside the constructor, the application stores that element and creates its three major UI components.

Conceptually:

`this.root = root`

means:

> Store the HTML root inside this particular `App` object.

The keyword:

### `this`

means:

> **The current object.**

So:

`this.root`

means:

> the `root` field belonging to this `App` instance.

This distinction becomes especially useful when the constructor parameter and the field have the same name:

**`root`**  
→ the value received by the constructor.

**`this.root`**  
→ the field belonging to the object.

Therefore:

`this.root = root`

means:

> 📥 Take the incoming root and store it in the object's root field.

---

# 🧱 Part 22 — Constructing the child objects

The constructor also creates:

`new Header(...)`  
`new Navigation(...)`  
`new DemoArea()`

The `App` object therefore takes responsibility for constructing the components it coordinates.

The architecture now becomes:

**`main.ts` creates `App`**

⬇️

**`App` creates `Header`**

**`App` creates `Navigation`**

**`App` creates `DemoArea`**

This creates a clear hierarchy of responsibility.

The entry point only needs to understand `App`.

`App` then understands its own components.

---

# 🔗 Part 23 — Passing methods as callbacks

Two constructor calls contain something more advanced:

`new Header(this.handleSectionSelect.bind(this))`

and:

`new Navigation(this.handleMenuSelect.bind(this))`

This is the first major example of **callbacks** in the application.

A callback is essentially:

> 📞 **A function given to another object so that the other object can call it later when something happens.**

The `Header` needs to tell `App` when the user changes the major section.

The `Navigation` needs to tell `App` when the user chooses a menu item.

But these components should not need to know the entire internal structure of `App`.

Instead, `App` gives them functions they can call.

The communication becomes:

**👤 User clicks navigation**

⬇️

**🧭 Navigation detects the click**

⬇️

**📞 Navigation calls the supplied callback**

⬇️

**🏛️ App receives the selected `MenuItem`**

⬇️

**🖥️ App tells DemoArea what to display**

This is a powerful way of keeping components separate while still allowing them to communicate.

---

# 🪢 Part 24 — Why `.bind(this)` appears

There is one more detail:

`.bind(this)`

JavaScript methods can lose their original `this` context when they are passed around as standalone functions.

`bind` creates a function whose `this` value is permanently connected to the intended object.

So:

`this.handleMenuSelect.bind(this)`

essentially means:

> 🔗 Give `Navigation` this method, but make sure that when it eventually runs, `this` still refers to the correct `App` object.

The same applies to:

`this.handleSectionSelect.bind(this)`

This matters because those methods need access to fields such as:

`this.navigation`

and:

`this.demoArea`

Without the correct `this`, they would not know which `App` object's components to use.

---

# ▶️ Part 25 — `start()` is the public doorway

`main.ts` knows almost nothing about the internal workings of `App`.

It only calls:

`app.start()`

That method performs two operations:

**1. Render the application's structure**

**2. Show the currently active menu item**

This is an excellent example of a **high-level method**.

The caller does not need to know all the individual startup steps.

Instead of `main.ts` manually creating headers, menus and content areas, it simply says:

> ▶️ **App, start yourself.**

This is another benefit of encapsulation:

**Complexity stays inside the object that owns it.**

---

# 🎨 Part 26 — `render()` builds the page structure

The `render()` method is declared:

`private render(): void`

There are two useful details here.

### 🔐 `private`

Only the `App` class itself should call this method.

It is an implementation detail of starting the application.

### 📭 `void`

The return type is:

`void`

This means that the method does not return a useful value.

Its purpose is to **perform an action**.

In this case, that action is changing the DOM.

So:

> **`void` means the method performs its work without producing a value for the caller to use.**

---

# 🧹 Part 27 — Starting with a clean root

The first operation inside `render()` is:

`this.root.replaceChildren()`

`replaceChildren()` changes the child elements contained inside an HTML element.

When called without arguments, it removes the existing children.

So the application begins rendering from a clean root:

**Before**

🌳 `root`  
├── old content  
├── old content  
└── old content

⬇️ `replaceChildren()`

**After**

🌳 `root`

This prevents previous content from remaining inside the application container.

---

# 🎨 Part 28 — Adding a CSS class from TypeScript

Next:

`this.root.classList.add('app-shell')`

Every HTML element has a `classList` that represents its CSS classes.

The method:

`add('app-shell')`

adds the class:

`app-shell`

to the root element.

This connects two different technologies:

**🧠 TypeScript**  
creates and organizes the interface.

⬇️

**🏷️ HTML classes**  
identify elements.

⬇️

**🎨 CSS**  
controls their visual appearance.

This pattern appears throughout the application.

The TypeScript generally decides **what an element is**, while CSS decides **how that element looks**.

---

# 🏗️ Part 29 — Creating HTML dynamically

The application then creates:

`document.createElement('div')`

Unlike `querySelector`, which searches for an existing element, `createElement` creates a completely new HTML element.

The new element receives:

`content.className = 'app-content'`

So the application has created a new:

`<div>`

whose CSS class is:

`app-content`

This div becomes the container for the application's two-column content area.

---

# 🧩 Part 30 — Assembling the interface

The content container receives:

`this.navigation.render()`

and:

`this.demoArea.render()`

Then the root receives:

`this.header.render()`

and the newly created content container.

The resulting DOM structure can be pictured like this:

**🌳 Application root — `.app-shell`**

├── **🏷️ Header**  
│  
└── **📦 Content — `.app-content`**  
    ├── **🧭 Navigation**  
    └── **🖥️ DemoArea**

This structure explains the layout visible in the browser.

The header stretches across the top.

Below it, the navigation and content area sit beside each other.

The TypeScript creates the structure.

The CSS determines how that structure is positioned and styled.

---

# 📎 Part 31 — `append()` combines DOM elements

The method used to assemble these pieces is:

`append(...)`

For example, several elements can be appended in one operation.

This makes DOM construction read almost like assembling components:

**Create container**

⬇️

**Append Navigation + DemoArea**

⬇️

**Append Header + container to root**

The application therefore constructs its interface as a hierarchy rather than as one large block of HTML text.

---

# 🔄 Part 32 — Changing the major application section

The application currently has major sections selected through the header.

When that happens, `Header` eventually invokes the callback that `App` supplied earlier.

That leads to:

**`handleSectionSelect(section: HeaderSection)`**

The method performs two actions.

First:

`this.navigation.setSection(section)`

The left navigation changes to the menu belonging to the selected major section.

Then:

`this.demoArea.show(this.navigation.getActiveItem())`

The content area displays the currently active item belonging to that section.

So the flow is:

**👤 User selects a header section**

⬇️

**🏷️ Header reports the selection**

⬇️

**🏛️ App receives `HeaderSection`**

⬇️

**🧭 Navigation changes menu**

⬇️

**🔎 Navigation supplies its active item**

⬇️

**🖥️ DemoArea displays it**

This is a good example of `App` acting as a **coordinator**.

Header does not directly manipulate DemoArea.

Navigation does not directly manipulate Header.

`App` coordinates the relationship between them.

---

# 🖱️ Part 33 — Selecting an item in the side menu

The second callback handler is:

`handleMenuSelect(item: MenuItem)`

Its job is even simpler:

**`this.demoArea.show(item)`**

This means:

> 🖥️ **Show the content associated with the selected menu item.**

The flow is:

**👤 User clicks menu item**

⬇️

**🧭 Navigation identifies the `MenuItem`**

⬇️

**📞 Callback reaches `App`**

⬇️

**🏛️ App forwards the item**

⬇️

**🖥️ DemoArea displays it**

Notice the separation of responsibilities.

**Navigation decides what was selected.**

**DemoArea knows how to display content.**

**App connects the two.**

---

# 🔀 Part 34 — Two different navigation levels

The application actually contains two different kinds of navigation.

### 🏷️ Header navigation

Chooses a **major section** of the application.

### 🧭 Side navigation

Chooses a **specific item inside that section**.

That produces a hierarchy:

**MIDGARD HEX GRID**

⬇️

**🏷️ Major section**

⬇️

**🧭 Item inside that section**

⬇️

**🖥️ Displayed content**

This distinction becomes particularly useful as the application grows.

A large collection of links does not have to live in one enormous menu. The top-level section first determines **which menu should exist**.

---

# 🧠 Part 35 — `App` knows relationships, not details

One of the most important things about `App.ts` is what it **does not** contain.

There is no hexagon geometry.

There are no SVG polygons.

There is no Markdown parser.

There are no terrain graphics.

There is no list of coordinates.

There is no tree drawing.

Instead, `App` knows the relationships between components.

It knows:

**🏷️ Header selections affect Navigation.**

**🧭 Navigation selections affect DemoArea.**

That is its real responsibility.

This gives `App` a very different role from the demo classes.

The demo classes create specific content.

`App` creates **application structure and communication**.

---

# 🔗 Part 36 — The communication architecture

At this point, the test application's high-level architecture can be pictured more completely:

**🌐 `main.ts`**

⬇️ creates

**🏛️ `App`**

⬇️ creates

**🏷️ Header** + **🧭 Navigation** + **🖥️ DemoArea**

Then user interaction flows in the opposite direction:

**👤 User**

⬇️ clicks

**🏷️ Header / 🧭 Navigation**

⬇️ callback

**🏛️ App**

⬇️ instruction

**🖥️ DemoArea**

This is an elegant arrangement because the components do not all need direct references to one another.

`App` sits in the middle and coordinates them.

---

# 🧰 TypeScript concepts introduced in Chapter 2

Chapter 2 adds several important concepts to those introduced by `main.ts`.

### 🧠 `import type`

Imports information needed only by TypeScript's type system.

### 🔐 `private`

Keeps implementation details inside a class.

### 🔒 `readonly`

Prevents a field from later being reassigned to another value.

### 🧩 Composition

A larger object can be built from smaller specialized objects.

### 👤 `this`

Refers to the current object.

### 🏗️ Constructor

Initializes an object and its dependencies when the object is created.

### 📞 Callback

A function can be given to another object so that it can be called later.

### 🪢 `bind`

Preserves the intended `this` context when a method is passed as a callback.

### 📭 `void`

Indicates that a function or method performs an action without returning a useful value.

### 🌳 DOM construction

TypeScript can dynamically create and assemble HTML elements.

---

# 🎯 Chapter 2 — The central idea

`App.ts` demonstrates a major software-design principle:

> 🏛️ **A central application object can coordinate specialized components without performing their jobs itself.**

`Header` handles the header.

`Navigation` handles navigation.

`DemoArea` handles displayed content.

`App` connects them.

The result is a structure in which each class has a clearer reason to exist:

**`main.ts` → starts**

**`App.ts` → coordinates**

**`Header.ts` → top-level navigation**

**`Navigation.ts` → side navigation**

**`DemoArea.ts` → content selection and display**

Later chapters can therefore examine those components individually without needing to explain the overall application structure again.
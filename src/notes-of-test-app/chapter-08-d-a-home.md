# 📘 MIDGARD TEST APP

## Chapter 8 — `DemoAreaHome.ts`

### 🏠 Part 176 — The simplest concrete Demo

`DemoAreaHome.ts` is the simplest demo class in the test application.

Its structure is essentially:

`DemoAreaHome implements Demo`

and its `render()` method creates an empty `<div>` and returns it.

There are no hexagons.

There is no SVG.

There are no event listeners.

There is no Midgard library interaction.

That simplicity makes the file useful because it shows the **minimum required implementation of the `Demo` interface**.

---

# 📥 Part 177 — Importing the Demo contract

The file imports the `Demo` interface from:

`./Demo.ts`

The purpose is now clear from Chapter 7.

`DemoAreaHome` wants to participate in the application's demo system.

To do that, it agrees to the contract:

🧩 **Demo**

⬇️ requires

🎨 **`render()`**

⬇️ returns

🌳 **`HTMLElement`**

This file therefore connects a concrete class to the abstraction introduced in `Demo.ts`.

---

# 🏗️ Part 178 — `export class DemoAreaHome`

The declaration creates a class named:

`DemoAreaHome`

The class is exported because another file needs to construct it.

That file is `DemoArea.ts`.

The relationship is:

🖥️ **DemoArea**

⬇️ imports

🏠 **DemoAreaHome**

⬇️ creates

🏗️ **new DemoAreaHome object**

So `DemoAreaHome` is a concrete component that can be selected by the application's content controller.

---

# 🤝 Part 179 — `implements Demo` in practice

This is the first concrete demo where the declaration:

`implements Demo`

can be examined in its actual context.

The class is promising:

> 🤝 **I satisfy the requirements defined by the Demo interface.**

The interface requires a method called:

`render()`

that returns:

`HTMLElement`

And `DemoAreaHome` provides exactly that.

So TypeScript can verify the relationship:

🏠 **DemoAreaHome**

⬇️ implements

🧩 **Demo**

⬇️ requires

🎨 **render**

⬇️

✅ requirement satisfied

---

# 🎨 Part 180 — The `render()` method

The class contains one public method:

`render(): HTMLElement`

This can be broken into three parts.

### 🌐 `public`

The method can be called from outside the class.

### 🎨 `render`

The method's name describes its purpose.

### 🌳 `: HTMLElement`

The method promises to return an HTML element.

This matches the `Demo` interface exactly.

---

# 🏭 Part 181 — Creating the `<div>`

Inside `render()`, the browser is asked to create:

`document.createElement('div')`

This produces a new HTML `<div>` element.

At this moment the element exists in memory, but it is not automatically visible on the page.

That distinction is important.

Creating a DOM element does **not** automatically insert it into the document.

Conceptually:

🏭 **createElement**

⬇️

🌳 **DOM element exists**

but:

❌ **not yet attached to the visible page**

Something else must eventually insert it into the document tree.

---

# 📤 Part 182 — Returning the element

The method then returns the newly created `<div>`.

So the complete operation is:

🎨 **`render()`**

⬇️

🏭 create `<div>`

⬇️

📤 return `<div>`

The class itself does not decide where that element should be placed.

That responsibility belongs to `DemoArea`.

This is an important separation.

🏠 **DemoAreaHome**

→ creates its representation

🖥️ **DemoArea**

→ decides where that representation belongs

---

# 🔗 Part 183 — Following the Home demo through the application

The full sequence begins in the side menu.

The Home menu item contains:

🆔 **`home`**

🏷️ **Home**

When selected:

🧭 **Navigation**

⬇️

🏛️ **App**

⬇️

🖥️ **DemoArea.show()**

⬇️

🏭 **createDemo()**

sees the ID:

`home`

⬇️

creates:

🏠 **new `DemoAreaHome()`**

Then DemoArea can call the common operation:

🎨 **render**

The Home demo returns its `<div>`.

DemoArea inserts that result into its content container.

---

# 🧩 Part 184 — Polymorphism in a concrete example

The previous chapter discussed polymorphism abstractly.

Here it can be followed with a real class.

`createDemo()` promises to return:

`Demo | null`

But when the Home ID is selected, the actual object created is:

`DemoAreaHome`

So there are two perspectives.

### 🏗️ Concrete reality

The object is a `DemoAreaHome`.

### 🧩 Architectural abstraction

The object can be treated as a `Demo`.

That means DemoArea does not need special rendering instructions for Home.

It can simply do what it does with every demo:

🎨 **call `render()`**

This is polymorphism working in a very small, practical example.

---

# 📭 Part 185 — Why is the `<div>` empty?

The Home demo currently creates an empty `<div>`.

That means the demo itself contributes no visible content.

This is intentional in the current implementation: the Home selection has no specialized demo content of its own.

But the page is not necessarily completely blank.

Remember that `DemoArea.show()` separately sets:

🏷️ the heading from the menu label

and:

📝 the description from `getDescription()`.

For Home, the description is:

**Select a demo from the menu to get started.**

So the visible content comes from `DemoArea`, while `DemoAreaHome` itself contributes only an empty container.

---

# 🧠 Part 186 — Two layers of demo presentation

This reveals an important detail about the test application's design.

A demo page can contain two different layers of content.

### 🖥️ Layer 1 — DemoArea

Provides:

🏷️ heading

📝 general description

### 🧪 Layer 2 — Individual Demo

Provides:

🎨 specialized rendered content

For Home:

**Layer 1 contains useful text.**

**Layer 2 is empty.**

For something like SVG Terrain:

**Layer 1 contains the title and description.**

**Layer 2 contains a large SVG demonstration.**

This shared structure keeps all demos visually consistent.

---

# 🪶 Part 187 — The minimum valid Demo

`DemoAreaHome` demonstrates how little is required to satisfy the `Demo` contract.

It does not need:

❌ a constructor

❌ private fields

❌ application state

❌ event listeners

❌ SVG

❌ Midgard library calls

❌ helper methods

It only needs:

✅ **`render(): HTMLElement`**

This demonstrates the value of keeping the `Demo` interface small.

Because the contract is minimal, even a trivial class can participate in the same architecture as the much larger SVG Terrain demo.

---

# 🏗️ Part 188 — No explicit constructor is required

Notice that `DemoAreaHome` does not define a constructor.

Classes do not need to declare one unless initialization work is required.

Conceptually, TypeScript and JavaScript allow the class to be instantiated normally:

**new DemoAreaHome**

even though no custom constructor has been written.

There are no constructor parameters and no fields that need special initialization.

So adding an explicit empty constructor would contribute nothing useful.

This follows a good general principle:

> 🪶 **Do not add code that has no job to perform.**

---

# 🎯 Part 189 — A class can be tiny and still belong to a larger architecture

Viewed in isolation, `DemoAreaHome.ts` looks almost trivial.

But viewed as part of the application, it participates in a much larger chain:

🧭 **Navigation**

⬇️

📦 **MenuItem**

⬇️

🏛️ **App**

⬇️

🖥️ **DemoArea**

⬇️

🧩 **Demo**

⬇️

🏠 **DemoAreaHome**

⬇️

🌳 **HTMLElement**

This is an important software-design lesson.

The importance of a class is not determined only by how many lines it contains.

Its role also depends on **how it participates in the architecture**.

---

# 🧪 Part 190 — A useful baseline for the coming demos

`DemoAreaHome` also provides a useful baseline.

Every following demo will still have the same basic outer contract:

🧩 **implements Demo**

⬇️

🎨 **render()**

⬇️

🌳 **HTMLElement**

But the implementation will become progressively richer.

The progression will look approximately like:

🏠 **Home**

→ minimal DOM

⬇️

⬡ **Single Hex**

→ Midgard library + SVG

⬇️

↔️ **Grid demos**

→ multiple hexagons + z-index information

⬇️

🎨 **CSS Styling**

→ IDs + CSS integration

⬇️

🔗 **Neighbours**

→ interaction + events

⬇️

🌲 **SVG Terrain**

→ complex SVG composition

So the same interface will survive while the implementations become dramatically more sophisticated.

---

# 🧠 Part 191 — Stable abstraction, changing complexity

This is one of the most interesting aspects of the demo architecture.

Compare:

🏠 `DemoAreaHome`

with:

🌲 `DemoAreaSvgTerrain`

One contains only a handful of lines.

The other contains hundreds.

Yet from `DemoArea`'s perspective, both expose the same operation:

🎨 **render**

That demonstrates a powerful property of abstraction:

> 🧩 **Complexity can grow behind an interface without forcing the caller to understand that complexity.**

DemoArea does not become hundreds of lines more complicated simply because SVG Terrain is complicated.

The complexity remains inside the concrete demo where it belongs.

---

# 🔒 Part 192 — Encapsulation begins at the class boundary

Even this tiny class illustrates **encapsulation**.

The caller does not need to know exactly how `DemoAreaHome` produces its element.

It asks:

> 🎨 Render yourself.

The class decides:

> 🏭 I will create a `<div>`.

The implementation is contained inside the class.

Later demos will encapsulate much more substantial behaviour, but the principle is already present here:

**Caller asks for a capability.**

**Object handles its own implementation.**

---

# 🧰 TypeScript and OOP concepts reinforced in Chapter 8

### 🤝 Concrete interface implementation

`DemoAreaHome` is a real class satisfying the abstract `Demo` contract.

### 🏗️ Optional constructors

A class does not need an explicit constructor when no special initialization is required.

### 🌳 Detached DOM elements

`document.createElement()` creates an element, but another part of the program must insert it into the document before it becomes part of the visible page.

### 🎭 Polymorphism

A concrete `DemoAreaHome` object can be handled through the more general `Demo` type.

### 🔒 Encapsulation

The class controls how its own rendered representation is produced.

### 🪶 Minimal implementation

A class only needs to provide the behaviour required by its contract.

---

# 🎯 Chapter 8 — The central idea

`DemoAreaHome.ts` is deliberately simple.

Its main value is architectural.

It shows the smallest possible journey from:

🧩 **interface**

to:

🏗️ **concrete class**

to:

🎨 **render method**

to:

🌳 **HTMLElement**

The relationship is:

🧩 **Demo**

⬇️ implemented by

🏠 **DemoAreaHome**

⬇️ provides

🎨 **render()**

⬇️ creates

🌳 **`<div>`**

⬇️ returned to

🖥️ **DemoArea**

This establishes the basic pattern that every remaining demo follows.

The next chapter takes a major step forward:

⬡ **`DemoAreaSingleHex.ts`**

There, the same simple `Demo` contract begins interacting with the actual **Midgard Hex Grid library**, geometric point data and SVG rendering.
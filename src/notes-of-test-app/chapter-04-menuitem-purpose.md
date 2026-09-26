# 📘 MIDGARD TEST APP

## Chapter 4 — `MenuItem.ts`

### 🧩 Part 70 — A tiny file with an important purpose

`MenuItem.ts` is extremely small. It contains only one TypeScript interface:

**`export interface MenuItem {`**  
**`  id: string`**  
**`  label: string`**  
**`}`**

Despite its size, this file introduces one of TypeScript's most useful ideas:

# 🧠 The interface

An interface describes the **shape that an object must have**.

In this case, the rule is:

> 🧭 **Every `MenuItem` must contain an `id` and a `label`, and both must be strings.**

The interface does not create menu items.

It defines what counts as a valid menu item.

---

# 🏗️ Part 71 — The shape of an object

Consider the conceptual structure:

**MenuItem**

├── 🆔 `id: string`  
└── 🏷️ `label: string`

A valid object could therefore be:

`{ id: 'home', label: 'Home' }`

Another could be:

`{ id: 'single-hex', label: 'Single Hex' }`

And another:

`{ id: 'neighbours', label: 'Neighbours' }`

All of these have the same **shape**:

**an `id` string + a `label` string**

That common shape is what the `MenuItem` interface describes.

---

# 🧠 Part 72 — TypeScript uses structural typing

TypeScript generally cares about an object's **structure**.

An object does not need to be created by some special `MenuItem` constructor.

It simply needs to contain the required properties with compatible types.

So this:

`{ id: 'home', label: 'Home' }`

can satisfy `MenuItem` because it has:

**✅ `id` → string**

**✅ `label` → string**

This approach is known as **structural typing**.

The important question is:

> 🧩 **Does the value have the required structure?**

rather than:

> “Was this object created by a particular class?”

This makes interfaces especially convenient for describing plain data objects.

---

# 🆔 Part 73 — `id` is the program's identity

The first property is:

`id: string`

The `id` is primarily useful to the program.

For example:

`'home'`  
`'single-hex'`  
`'svg-terrain'`  
`'neighbours'`

The program can use these values to determine what a menu item represents.

For example, elsewhere the application can ask conceptually:

**Is the ID `'single-hex'`?**

➡️ Show the Single Hex demo.

**Is the ID `'neighbours'`?**

➡️ Show the Neighbours demo.

So the ID acts as a stable internal identifier.

---

# 🏷️ Part 74 — `label` is for the reader

The second property is:

`label: string`

This represents the text displayed in the interface.

For example:

**Internal identity:** `x-dominated-grid`

**Visible label:** X-Dominated Grid

These serve different purposes.

The ID is convenient for program logic.

The label is designed for human readability.

This separation is useful because the visible text can be changed without necessarily changing the internal identifier.

Conceptually:

**🧠 Program**

`id = 'svg-terrain'`

⬇️

**👁️ User**

`label = 'SVG Terrain'`

---

# 📤 Part 75 — Why the interface is exported

The declaration begins:

`export interface MenuItem`

because several parts of the application need to agree on what a menu item looks like.

For example, `Navigation` stores arrays of `MenuItem` objects and passes selected items through its callback.

`App` receives a selected `MenuItem`.

`DemoArea` receives a `MenuItem` and uses its ID and label to decide what content should be displayed.

So the same concept travels through several parts of the program:

**🧭 Navigation**

creates/contains `MenuItem`

⬇️

**🏛️ App**

receives `MenuItem`

⬇️

**🖥️ DemoArea**

uses `MenuItem`

Because all three use the same interface, they agree on the shape of the data.

---

# 🤝 Part 76 — An interface acts like a contract

A useful way to think about an interface is as a **contract**.

`MenuItem` says:

> 📜 Any value described as a `MenuItem` must provide an `id` string and a `label` string.

Then different classes can communicate using that contract.

`Navigation` does not need to know every detail of `App`.

`App` does not need to know every detail of `Navigation`.

They only need to agree:

> **This is what a `MenuItem` looks like.**

That makes the interface a small shared language between components.

---

# 🛡️ Part 77 — What TypeScript can prevent

Suppose a programmer accidentally tried to create something conceptually like:

`{ id: 'home' }`

It has no `label`.

That does not satisfy the `MenuItem` interface.

Or:

`{ id: 42, label: 'Home' }`

Now `id` is a number rather than a string.

Again, it does not satisfy the interface.

TypeScript can detect such inconsistencies during development.

The interface therefore provides both:

**📖 documentation**

and:

**🛡️ compile-time checking**

The code itself documents what a menu item requires.

---

# 🆚 Part 78 — Interface versus class

It is useful to distinguish the `MenuItem` interface from classes such as `App` and `Header`.

### 🏛️ A class

A class can contain:

**state**

**constructors**

**methods**

**behaviour**

For example, `Header` can render itself and respond to section changes.

### 📐 An interface

An interface describes a required structure.

`MenuItem` does not contain behaviour such as:

`render()`

or:

`select()`

It simply says:

> A menu item has an `id` and a `label`.

So in this project:

**🏛️ `Header` → behaviour-rich object**

**🏛️ `Navigation` → behaviour-rich object**

**📐 `MenuItem` → description of data**

---

# 👻 Part 79 — The interface disappears at runtime

There is another fundamental TypeScript concept here.

`MenuItem` exists for the **TypeScript type system**.

When TypeScript is compiled into JavaScript, interfaces do not become JavaScript objects or classes.

They are essentially erased.

That is why another file can write:

`import type { MenuItem } ...`

The interface is needed while checking the TypeScript source, but the browser does not need a runtime `MenuItem` object.

This highlights an important distinction:

**🧠 TypeScript layer**

Interfaces, type checking, compile-time safety

⬇️ compilation

**🌐 JavaScript layer**

The executable code that runs in the browser

TypeScript adds information and constraints during development without requiring those type declarations to exist in the final JavaScript runtime.

---

# 🔗 Part 80 — `MenuItem` as a data carrier

The architecture becomes particularly clear when following one menu item through the application.

Imagine:

`id = 'neighbours'`  
`label = 'Neighbours'`

The object begins in `Navigation`.

⬇️

The user clicks its button.

⬇️

`Navigation` sends the `MenuItem` through its callback.

⬇️

`App` receives:

`item: MenuItem`

⬇️

`App` sends that same item to:

`DemoArea.show(item)`

⬇️

`DemoArea` examines:

`item.id`

to determine which demo to create.

It also uses:

`item.label`

as the visible heading.

So `MenuItem` acts as a small **data carrier** moving information between components.

---

# 🧭 Part 81 — Data and behaviour are separated

This reveals a useful design distinction in the test application.

### 📦 `MenuItem`

Contains data.

### 🧭 `Navigation`

Contains behaviour for selecting menu items.

### 🏛️ `App`

Contains behaviour for coordinating components.

### 🖥️ `DemoArea`

Contains behaviour for displaying selected content.

The data does not need to know how it will eventually be displayed.

A `MenuItem` does not tell `DemoArea` what to do.

It simply contains:

**“This is my identity.”**

and:

**“This is my label.”**

The receiving object decides how that information should be interpreted.

---

# 💡 Part 82 — Why such a small file is worthwhile

It might initially seem unnecessary to create an entire file for something containing only two properties.

But the file gives the concept a name:

# MenuItem

Without it, several files might independently describe objects containing an ID and label.

With the interface, there is one shared definition.

That improves:

**🧠 readability** — the name communicates meaning

**🛡️ type safety** — TypeScript checks the structure

**🤝 consistency** — several classes use the same contract

**🔧 maintainability** — the concept has one obvious definition

Small files are not automatically wasteful.

Sometimes a tiny file represents an important concept very clearly.

---

# 🧰 TypeScript concepts introduced in Chapter 4

### 📐 Interface

Describes the required structure of an object.

### 🧩 Structural typing

An object can satisfy an interface by having the required shape.

### 📜 Shared contract

Several parts of a program can communicate through the same type definition.

### 👻 Compile-time-only types

Interfaces help TypeScript check the program but do not become runtime JavaScript objects.

### 📦 Data object

A simple object can carry information between more behaviour-rich classes.

---

# 🎯 Chapter 4 — The central idea

`MenuItem.ts` contains almost no code, yet it defines one of the application's most frequently exchanged pieces of information.

Its entire purpose can be summarized as:

> 🧩 **A menu item has an internal identity and a human-readable label.**

That simple contract allows several independent components to communicate clearly:

**🧭 Navigation**

⬇️ `MenuItem`

**🏛️ App**

⬇️ `MenuItem`

**🖥️ DemoArea**

The next chapter can now examine `Navigation.ts`, where `MenuItem` becomes much more important and where the application's two side-navigation systems are managed.
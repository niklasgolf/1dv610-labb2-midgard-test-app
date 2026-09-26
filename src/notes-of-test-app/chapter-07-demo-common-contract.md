# 📘 MIDGARD TEST APP

## Chapter 7 — `Demo.ts`

### 🧩 Part 157 — The common contract for every demo

`Demo.ts` is one of the smallest files in the entire test application.

It contains a single interface:

`Demo`

and that interface requires one method:

**`render()` → `HTMLElement`**.

That is almost the whole file.

Yet architecturally, it is extremely important.

Its purpose is to establish one simple rule:

> 🧩 **Anything that wants to behave as a demo must be able to render itself and return an HTML element.**

That rule allows all the very different demo classes to be handled in the same way.

---

# 📐 Part 158 — Another interface, but a different kind of contract

Chapter 4 introduced the `MenuItem` interface.

That interface described **data**:

🆔 an ID

🏷️ a label

`Demo` is different.

It describes **behaviour**.

The distinction is useful:

### 📦 `MenuItem`

A valid MenuItem must **have** certain information.

### 🧩 `Demo`

A valid Demo must **be able to do** something.

Specifically:

> 🎨 **It must be able to render itself.**

So interfaces can describe both:

**what an object contains**

and:

**what an object can do**

---

# 🎨 Part 159 — The `render()` requirement

The interface requires a method named:

`render`

That method takes no arguments and returns:

`HTMLElement`

The contract can therefore be read in ordinary language:

> 🎨 **A Demo must provide a `render` method that produces an HTML element.**

The interface does not specify *how* that element should be created.

That freedom is extremely important.

---

# 🧠 Part 160 — The interface defines WHAT, not HOW

Consider the different demos in the application.

⬡ **Single Hex**

creates SVG representing individual hexagons.

↔️ **X-Dominated Grid**

creates an entire grid.

🎨 **CSS Styling**

creates SVG polygons that can be targeted by CSS.

🌲 **SVG Terrain**

creates detailed SVG terrain, trees and a tower.

🔗 **Neighbours**

creates an interactive grid with mouse events.

Their internal implementations are very different.

But `Demo` does not care.

It asks only:

> ❓ **Can the object give me an `HTMLElement` when I call `render()`?**

If yes, it can participate in the demo system.

This is a fundamental abstraction principle:

> 🧩 **Depend on the capability that is needed, not on every implementation detail.**

---

# 🌳 Part 161 — Why the return type is `HTMLElement`

Every demo eventually needs to appear inside the browser's DOM.

So the common output is:

`HTMLElement`

This gives `DemoArea` something concrete that it can insert into its content container.

The relationship is:

🧪 **Demo object**

⬇️ `render()`

🌳 **HTMLElement**

⬇️

📦 **DemoArea's container**

⬇️

👁️ **visible browser interface**

The demo may contain SVG, text, paragraphs, code explanations or other nested elements.

But at the top level, it returns an HTML element that can be inserted into the page.

---

# 🤝 Part 162 — `implements Demo`

The individual demo classes use the declaration:

`implements Demo`

This introduces an important TypeScript keyword:

# implements

When a class says that it **implements** an interface, it promises to satisfy that interface's contract.

Conceptually:

🏗️ **DemoAreaSingleHex**

says:

> 🤝 “I implement `Demo`.”

TypeScript then checks:

> 🔎 “Do you actually provide the required `render()` method with a compatible return type?”

If the class does not satisfy the contract, TypeScript can report the problem during development.

---

# 🛡️ Part 163 — `implements` gives compile-time checking

Imagine a new demo class were created but its author forgot to provide `render()`.

If that class declares:

**implements `Demo`**

TypeScript knows something is wrong.

The contract requires:

🎨 **`render()`**

but the class does not provide it.

This is valuable because the problem can be detected before the application reaches the browser and attempts to use the object.

So `implements` connects:

📐 **interface design**

with:

🛡️ **compiler checking**

---

# 🆚 Part 164 — `extends` and `implements` are different ideas

This is a useful place to distinguish two object-oriented terms.

### 🧬 `extends`

Usually expresses inheritance.

A class can inherit implementation and behaviour from another class.

### 🤝 `implements`

Expresses a contract.

A class promises that it has the structure or behaviour described by an interface.

In this application, the demos do not need to inherit from one giant Demo base class.

Instead, they simply agree on the small interface:

🧩 **Demo**

→ must provide `render()`

This keeps the shared abstraction minimal.

---

# 🎭 Part 165 — The foundation of polymorphism

Chapter 6 introduced polymorphism.

`Demo.ts` is what makes that idea concrete.

Suppose `DemoArea` receives an object typed as:

`Demo`

It does not need to know whether the actual object is:

⬡ `DemoAreaSingleHex`

↔️ `DemoAreaXDominatedGrid`

↕️ `DemoAreaYDominatedGrid`

🎨 `DemoAreaCssStyling`

🌲 `DemoAreaSvgTerrain`

🔗 `DemoAreaNeighbours`

It can simply perform the operation promised by the interface:

🎨 **render**

This is polymorphism:

> 🎭 **Different concrete objects can be used through the same common abstraction.**

---

# 🧠 Part 166 — One message, many implementations

The idea can be visualized like this:

　　　　　　　　　🧩 **Demo**

　　　　　　　　　　│

　　　　　**render() → HTMLElement**

　　　↙️　　　　↓　　　　↓　　　　↘️

⬡ **Single Hex**　↔️ **X Grid**　🎨 **CSS**　🌲 **Terrain**

Each object receives conceptually the same request:

> **Render yourself.**

But each object responds differently.

⬡ Single Hex builds one kind of DOM.

🌲 SVG Terrain builds a much more complicated DOM.

🔗 Neighbours builds an interactive DOM.

Same operation.

Different implementations.

That is one of the clearest practical examples of polymorphism in this application.

---

# 🏭 Part 167 — Why `createDemo()` can return `Demo`

This also explains something important from `DemoArea.ts`.

Its `createDemo()` method can have the return type:

**`Demo | null`**.

That method may actually create several different classes.

But it does not need a return type listing every possible concrete class.

It can simply say:

> 🧩 **If something is returned, it will satisfy the Demo contract.**

This hides unnecessary implementation details from the caller.

`show()` does not care which concrete class came back.

It only needs:

`demo.render()`

---

# 🔌 Part 168 — Loose coupling through an interface

Without the `Demo` interface, `DemoArea` could become more tightly connected to every individual demo implementation.

With the interface, the important dependency becomes:

🖥️ **DemoArea**

⬇️ depends on

🧩 **Demo abstraction**

rather than conceptually depending on the internal details of:

⬡ Single Hex

↔️ X Grid

↕️ Y Grid

🎨 CSS Styling

🌲 SVG Terrain

🔗 Neighbours

This is an example of **loose coupling**.

> 🔌 **Objects communicate through a small agreed contract instead of requiring detailed knowledge of one another.**

---

# ➕ Part 169 — Adding another demo

The value of this design becomes clearer when imagining another demo.

Suppose the application later adds:

🏰 **Castle Demo**

The new class could implement `Demo` and provide its own `render()` method.

Then the rest of the demo-rendering architecture does not need to learn a new way of displaying it.

DemoArea still performs the same conceptual operation:

🧪 **receive Demo**

⬇️

🎨 **call render**

⬇️

🌳 **receive HTMLElement**

⬇️

📦 **display it**

The concrete content changes.

The common interaction does not.

---

# 🪶 Part 170 — A deliberately tiny interface

`Demo` contains only one requirement.

That is a strength.

It does not force every demo to provide methods such as:

**start**

**stop**

**reset**

**update**

**destroy**

because the current application does not require those capabilities.

The interface describes only what the surrounding architecture genuinely needs:

> 🎨 **Render yourself.**

This follows a useful design principle:

> 🪶 **Keep interfaces as small as the real requirement allows.**

A small contract is easier for classes to satisfy and easier for programmers to understand.

---

# 📜 Part 171 — Interface as architectural documentation

Even without examining any concrete demo class, `Demo.ts` communicates something important about the architecture.

It tells a reader:

> 📖 **The application has a concept called Demo, and all demos are expected to expose the same rendering operation.**

So interfaces are not only compiler tools.

They are also documentation.

The tiny file makes an architectural concept explicit.

Without it, the shared relationship between all the demo classes would be less obvious.

---

# 👻 Part 172 — No runtime `Demo` object is created

Just like `MenuItem`, the `Demo` interface belongs to TypeScript's type system.

There is no need to create:

**a generic Demo object**

at runtime.

Instead, real concrete objects are created:

⬡ **DemoAreaSingleHex object**

🌲 **DemoAreaSvgTerrain object**

🔗 **DemoAreaNeighbours object**

TypeScript checks that these objects conform to the `Demo` interface.

After compilation, the interface itself does not need to exist as a JavaScript runtime object.

So:

🧠 **TypeScript**

uses `Demo` for checking and understanding

⬇️ compilation

🌐 **JavaScript**

runs the concrete demo objects

---

# 🧩 Part 173 — Interface versus implementation

This chapter introduces a distinction that becomes increasingly important in software design.

### 📐 Interface

Describes what is promised.

**Demo promises:** render an HTMLElement.

### 🏗️ Implementation

Contains the actual code that fulfils that promise.

For example:

⬡ `DemoAreaSingleHex`

contains one implementation.

🌲 `DemoAreaSvgTerrain`

contains a completely different implementation.

The interface is stable and simple.

The implementations are free to vary.

This gives the architecture flexibility.

---

# 🎯 Part 174 — Abstraction removes irrelevant knowledge

From `DemoArea`'s perspective, most details of a demo are irrelevant.

It does not need to know:

🌲 how a tree is drawn

⬡ how hexagon points are calculated

🎨 which CSS IDs are assigned

🔗 how neighbour highlighting works

It needs exactly one piece of knowledge:

> 🎨 **The object can render itself.**

The `Demo` interface captures precisely that knowledge and nothing more.

This is abstraction in a very practical form:

> 🧠 **Expose what another component needs to know and hide what it does not need to know.**

---

# 🔗 Part 175 — The demo architecture so far

The demo subsystem can now be pictured clearly:

🖥️ **DemoArea**

⬇️ asks `createDemo()`

🏭 **Demo object is constructed**

⬇️ conforms to

🧩 **Demo interface**

⬇️ guarantees

🎨 **render()**

⬇️ produces

🌳 **HTMLElement**

⬇️ inserted into

📦 **DemoArea container**

The `Demo` interface sits in the middle as the agreement connecting the content controller to every concrete demo.

---

# 🧰 TypeScript and OOP concepts introduced in Chapter 7

### 🤝 `implements`

A class can explicitly promise to satisfy an interface.

### 📐 Behavioural interface

An interface can describe required methods, not only data properties.

### 🎭 Polymorphism

Different concrete classes can be handled through one common interface.

### 🔌 Loose coupling

Components can depend on a small abstraction instead of knowing detailed implementations.

### 🧩 Interface versus implementation

The interface defines **what is required**.

The implementation defines **how it is achieved**.

### 🪶 Small interfaces

An interface should not require behaviour that its consumers do not actually need.

### 🧠 Abstraction

Expose the relevant capability while hiding unnecessary implementation details.

---

# 🎯 Chapter 7 — The central idea

`Demo.ts` contains almost nothing:

🧩 **one interface**

🎨 **one required method**

Yet that tiny contract makes the entire demo architecture much cleaner.

All concrete demos can be different internally while still presenting the same simple face to `DemoArea`:

> 🎨 **Call `render()` and receive an `HTMLElement`.**

The architecture therefore becomes:

　　　　　　　　　🧩 **Demo**

　　　　　　　　　　 │

　　　　　　　🎨 **render()**

　　↙️　　　　↙️　　　　↘️　　　　↘️

⬡ **Single Hex**　↔️ **Grid**　🎨 **CSS**　🌲 **Terrain**

　　　　　　　　　　 │

　　　　　　　　　　 ▼

　　　　　　　🌳 **HTMLElement**

This is a small but genuine example of object-oriented abstraction and polymorphism.

The next chapter begins with the simplest concrete implementation of this contract:

🏠 **`DemoAreaHome.ts`**

There, the abstract idea of **“a Demo must render”** becomes an actual class.
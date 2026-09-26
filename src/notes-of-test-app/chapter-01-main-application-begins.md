# 📘 MIDGARD TEST APP

## Chapter 1 — `main.ts`

### 🚀 Part 1 — Where the application begins

Every application needs a starting point.

In the Midgard Test App, that starting point is **`main.ts`**. It is one of the smallest files in the entire application, but it has a very important responsibility:

**It starts everything.**

The startup process can be pictured like this:

**🌐 Browser → 📄 `main.ts` → 🏗️ `App` → 🖥️ Test application**

`main.ts` does **not** need to understand hexagonal grids, SVG graphics, menus, Markdown documents, neighbours, or terrain.

Its responsibility is much simpler:

**1. Load the application styling**  
**2. Find the application's place in the HTML page**  
**3. Create the application**  
**4. Start it**

This is a good example of keeping a file focused on **one clear responsibility**.

---

## 📦 Part 2 — Importing what the file needs

At the beginning of `main.ts` are two imports:

`import './style.css'`

`import { App } from './App.ts'`

The word **`import`** is fundamental in modern TypeScript.

Instead of putting an entire application into one enormous file, the application is divided into smaller **modules**. In this project, a TypeScript file normally acts as a module.

An import means:

> **This file needs something provided by another file.**

The second import brings the `App` class into `main.ts`:

`import { App } from './App.ts'`

The curly braces around **`App`** mean that `App` is a **named export** from `App.ts`.

The path begins with:

`./`

This means:

> Look relative to the current file.

So **`./App.ts`** means that `App.ts` is located alongside `main.ts`.

This allows `main.ts` to use the `App` class without containing the implementation of that class itself.

That separation is important:

**`main.ts` starts the application.**  
**`App.ts` organizes the application.**

---

## 🎨 Part 3 — Why the CSS import looks different

The other import is:

`import './style.css'`

This is slightly different.

Nothing is placed inside curly braces, and nothing is assigned to a variable.

The application is not asking the CSS file to provide a TypeScript value. Instead, importing the stylesheet tells the build system that this CSS belongs to the application.

The effect is essentially:

**🎨 Load these styles when the application starts.**

This kind of import is often called a **side-effect import**.

Its purpose is not to give `main.ts` an object or function. Its purpose is simply to cause something to happen — in this case, making the stylesheet part of the application.

This distinction is useful:

**📦 `import { App } from './App.ts'`**  
→ gives the file something it can use in TypeScript.

**🎨 `import './style.css'`**  
→ loads something because of its effect on the application.

---

# 🌳 Part 4 — Finding the application's root

The next instruction is:

**`const root = document.querySelector<HTMLDivElement>('#app')`**

This single line introduces several important ideas.

Let's break it down.

---

## 🌐 `document`

In browser JavaScript and TypeScript, **`document`** represents the HTML document currently displayed in the browser.

It gives the program access to the web page.

Through `document`, TypeScript can do things such as:

**🔎 Find existing HTML elements**  
**🏗️ Create new HTML elements**  
**✏️ Change elements**  
**🖱️ react to user interaction**

The Midgard Test App makes heavy use of this ability. Much of its interface is created dynamically through TypeScript.

---

## 🔎 `querySelector`

The next part is:

`querySelector(...)`

This method searches the HTML document for something matching a CSS selector.

The selector supplied here is:

`'#app'`

In CSS selector syntax, **`#`** means an element with a particular **ID**.

So `#app` means:

> Find the HTML element whose ID is `app`.

Conceptually, the HTML page contains a root element similar to:

`<div id="app"> ... </div>`

This element becomes the container for the entire Midgard Test App.

The application will later place the header, navigation and main content inside it.

---

# 🧠 Part 5 — TypeScript adds information with `<HTMLDivElement>`

There is another interesting part of the same line:

`querySelector<HTMLDivElement>`

The part between `<` and `>` is TypeScript type information.

**`HTMLDivElement`** represents an HTML `<div>` element.

The code is therefore telling TypeScript:

> The element being searched for is expected to be an HTML `div`.

This is useful because TypeScript can now understand much more precisely what kind of object `root` should contain.

Without good type information, the program might only know:

**“This is some HTML element.”**

With `HTMLDivElement`, it knows:

**“This is specifically a div element.”**

That is one of the central ideas behind TypeScript:

> 🧠 **Give values explicit and useful type information so that mistakes can be detected before the program runs.**

---

# 📦 Part 6 — Understanding `const`

The beginning of the instruction says:

`const root = ...`

`const` declares a variable whose binding will not later be reassigned.

Here the result of the search is stored under the name:

`root`

That name is meaningful because this element acts as the **root of the application interface**.

So the line can be read almost as an English sentence:

> **Find the application's root div and store it as `root`.**

Good variable names make code easier to understand without needing additional explanation.

---

# ⚠️ Part 7 — What if the root does not exist?

There is a problem that the program must consider.

Searching for `#app` does not guarantee that such an element actually exists.

Therefore, `root` effectively has two possibilities:

**`HTMLDivElement` OR `null`**

The vertical bar used in TypeScript — **`|`** — means **“or”** when combining types.

Conceptually:

`HTMLDivElement | null`

means:

> The value may contain an HTML div, **or** there may be no matching element.

The absence of an object is represented here by:

`null`

The application therefore checks the result immediately:

`if (!root) { throw new Error('Root element #app was not found.') }`

---

# 🔀 Part 8 — The `if` statement

The word **`if`** introduces a condition.

It means:

> Execute the following code only if this condition is true.

The condition is:

`!root`

The `!` operator means **not**.

In this situation, the expression asks whether the expected root element was **not found**.

The logic is therefore:

**✅ Root exists → continue starting the application**

**❌ Root does not exist → stop with an error**

This is the first example of **control flow** in the test application.

Control flow determines which instructions are executed depending on the current situation.

---

# 💥 Part 9 — Throwing an error

If the root element cannot be found, the application executes:

`throw new Error('Root element #app was not found.')`

There are two ideas here.

First:

`new Error(...)`

creates an `Error` object containing a useful message.

Then:

`throw`

throws that error and stops the normal execution path.

This is much better than allowing the application to continue without something it absolutely requires.

Without the root element, there is nowhere to render the application.

So the program effectively says:

> 🚨 **Something fundamental is wrong. Stop immediately and explain the problem clearly.**

This approach is often called **failing fast**.

A problem is detected close to its actual cause rather than producing confusing errors somewhere much later.

---

# 🛡️ Part 10 — The same check helps TypeScript

The `if` statement is not only useful while the application is running.

It also gives **TypeScript's compiler** useful information.

Before the check, TypeScript understands:

**`root` = `HTMLDivElement` OR `null`**

But consider what happens after this:

`if (!root) { throw ... }`

If `root` were missing, execution would have stopped.

Therefore, if the program reaches the following lines, there is only one possibility left:

**`root` must be an `HTMLDivElement`.**

TypeScript can reason about this automatically.

This is called:

### 🧠 Type narrowing

A broader type:

`HTMLDivElement | null`

has been narrowed to:

`HTMLDivElement`

because the program has already dealt with the `null` case.

This is an important TypeScript pattern:

> **Check uncertain values first, and TypeScript can often give them a more precise type afterwards.**

---

# 🏗️ Part 11 — Creating the application

Once the root has been found and verified, the application can finally be created.

The next instruction is:

**`const app = new App(root)`**

This introduces an important object-oriented programming concept.

**`App` is a class.**

A class describes a kind of object — including the information it stores and the behaviour it provides.

The keyword:

`new`

creates an **instance** of that class.

So:

`new App(root)`

means:

> 🏗️ Create a new object based on the `App` class.

The resulting object is stored in:

`const app`

The distinction is important:

**🏛️ `App`** → the class  
**📦 `app`** → one object created from that class

This is similar to the relationship between a blueprint and something constructed from that blueprint.

---

# 📬 Part 12 — Passing `root` to the constructor

Notice that the root element is placed inside the parentheses:

`new App(root)`

The value `root` is being passed into the new `App` object.

It is an **argument**.

The `App` class receives it through its **constructor** and stores it as part of the object.

This creates an important connection:

**🌐 HTML root element**  
⬇️  
**🚀 `main.ts` finds it**  
⬇️  
**📬 `root` is passed into `App`**  
⬇️  
**🏗️ `App` can build the interface inside it**

This is much cleaner than having every part of the application independently search the HTML document for its container.

`main.ts` finds the root once and gives it to the application.

---

# ▶️ Part 13 — Calling `start()`

The final instruction in the entire file is beautifully simple:

**`app.start()`**

Here:

**`app`** is the object.

**`start()`** is a method belonging to that object.

A **method** is a function associated with a class or object.

The dot:

`.`

means, roughly:

> Access something belonging to this object.

So:

`app.start()`

can be read as:

> ▶️ **Tell the application object to start.**

The `App` class defines this method, and its startup work begins by rendering the application and then displaying the currently active menu item.

This gives the program a very clear sequence:

**🏗️ Construct the application**

`new App(root)`

⬇️

**▶️ Start the application**

`app.start()`

⬇️

### 🖥️ The rest of the application takes over

Creating the object and starting its behaviour are therefore two distinct operations.

---

# 🗺️ Part 14 — The complete mental model of `main.ts`

The whole file can now be understood as one small pipeline:

### 🎨 Load the stylesheet

`style.css`

⬇️

### 📦 Load the application class

`App`

⬇️

### 🔎 Find the HTML root

`#app`

⬇️

### 🛡️ Verify that it exists

`if (!root)`

⬇️

### 🏗️ Construct the application

`new App(root)`

⬇️

### ▶️ Start it

`app.start()`

⬇️

### 🖥️ The rest of the application takes over

This is why `main.ts` can remain so small.

It is the application's **entry point**, not the application itself.

---

# 🧰 TypeScript concepts introduced in Chapter 1

Even though `main.ts` contains only a few lines, it introduces a surprising number of important concepts.

### 📦 Modules and imports

Code can be divided across files and reused through `import`.

### 🎨 Side-effect imports

A file such as `style.css` can be imported because loading it changes the application environment.

### 📌 `const`

A value can be stored under a name that will not later be reassigned.

### 🧠 Generic type information

`querySelector<HTMLDivElement>`

gives TypeScript more precise information about the expected result.

### 🔀 Union types

A value may conceptually have more than one possible type:

`HTMLDivElement | null`

### 🚦 Conditional control flow

**`if`** allows different behaviour depending on a condition.

### 💥 Errors

`throw new Error(...)`

stops execution when the program reaches an invalid state.

### 🛡️ Type narrowing

After the program eliminates the `null` case, TypeScript understands that `root` must exist.

### 🏗️ Classes and objects

`new App(root)`

creates an object from a class.

### ▶️ Methods

`app.start()`

calls behaviour belonging to that object.

---

# 🎯 Chapter 1 — The central idea

`main.ts` demonstrates an important design principle:

> 🚀 **The entry point should start the application without needing to understand the entire application.**

It does not know how Midgard calculates coordinates.

It does not know how SVG hexagons are drawn.

It does not know what the navigation contains.

It does not know how Markdown becomes HTML.

It does not know how the demos work.

Instead, its responsibility is focused and easy to describe:

### Find the application's root, create the application, and start it.

That is the complete role of `main.ts`.
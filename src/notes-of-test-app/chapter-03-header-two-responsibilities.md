# 📘 MIDGARD TEST APP

## Chapter 3 — `Header.ts`

### 🧭 Part 37 — The header has two responsibilities

The `Header` class creates the dark bar at the top of the application.

At this stage of the application, the header contains:

**🏷️ Midgard Hex Grid** — the application title

**🧪 Test Page** — opens the test/demo section

**📚 Project Notes** — opens the library documentation section

So `Header` has two closely related responsibilities:

**1. Render the top-level navigation**

**2. Remember which top-level section is currently active**

It does **not** decide what should appear in the main content area. That responsibility belongs elsewhere.

This is another example of keeping responsibilities separated.

---

# 🏷️ Part 38 — `HeaderSection` creates a restricted set of choices

The file begins with:

`export type HeaderSection = 'test' | 'notes'`

This introduces an important TypeScript feature:

### 🔤 A string literal union type

A normal `string` could contain practically anything:

`'test'`  
`'notes'`  
`'hello'`  
`'banana'`

But `HeaderSection` says that only two strings are valid:

`'test'`

or

`'notes'`

Conceptually:

**HeaderSection**

→ `'test'`  
**OR**  
→ `'notes'`

This gives the compiler useful knowledge.

If a function expects:

`section: HeaderSection`

then passing something such as:

`'banana'`

would be rejected by TypeScript.

---

# 🛡️ Part 39 — Types can encode rules

This illustrates something deeper about TypeScript.

Types do not merely describe whether something is a string or number.

They can describe **rules of the program**.

The rule here is:

> 🧭 **The header currently recognizes exactly two application sections.**

Instead of writing that rule only in documentation, it is encoded directly into the type system.

This makes invalid states harder to create accidentally.

The type also has a descriptive name:

`HeaderSection`

That is much more informative than simply using:

`string`

Every place that uses `HeaderSection` communicates:

> “This value represents one of the application's top-level header sections.”

---

# 📤 Part 40 — Exporting a type

Notice that `HeaderSection` begins with:

`export type`

The `Header` class is not the only part of the program that needs to understand these section values.

For example, `App.ts` receives a `HeaderSection` when the user changes section.

Therefore the type itself is exported.

This creates a useful relationship:

`Header.ts`

defines what a valid header section is

⬇️

`App.ts`

imports that definition

⬇️

both files use the **same type**

This avoids duplicating the concept in several places.

---

# 📞 Part 41 — The header receives a callback

The first field inside `Header` is:

`private readonly onSectionSelect: (section: HeaderSection) => void`

The concepts `private`, `readonly` and callbacks were introduced in Chapter 2, so they do not need to be explained again from the beginning.

Instead, notice the type of this particular callback:

`(section: HeaderSection) => void`

This describes a function.

It says:

📥 the function receives a `HeaderSection`

📤 the function returns `void`

In ordinary language:

> 📞 **The Header expects to receive a function that can be called with the selected section.**

This is how `Header` communicates outward without needing to understand the rest of the application.

---

# 🧩 Part 42 — A function has a type too

This is an important TypeScript idea.

Types are not limited to variables such as:

`number`  
`string`  
`HTMLElement`

Functions can also have precise types.

For example:

`(section: HeaderSection) => void`

describes the shape of an acceptable function.

That means TypeScript can check that the function supplied to `Header` has the correct form.

The expected contract is:

**Header provides:** a section

**Callback accepts:** a section

That compatibility allows the two objects to communicate safely.

---

# 🟢 Part 43 — The default active section

The next field is:

`private activeSection: HeaderSection = 'test'`

Unlike the `readonly` callback field, this field is deliberately allowed to change.

That is because the user can move between sections.

Initially:

**`activeSection` → `'test'`**

Later it might become:

**`activeSection` → `'notes'`**

and later:

**`activeSection` → `'test'`**

again.

This field represents **state**.

> 🧠 **State is information an object remembers that can affect its future behaviour or appearance.**

Here, the remembered state determines which header button receives the active styling.

---

# 🏠 Part 44 — Why `'test'` is the initial state

The initialization:

`= 'test'`

means the Test Page is the application's default top-level section.

This is why the application initially behaves as though:

**🧪 Test Page**

has already been selected.

There is no need for some later operation to invent an initial section. The default is established directly where the state is declared.

That makes the initial state easy to discover when reading the class.

---

# 🌳 Part 45 — Remembering the rendered DOM element

The class also stores:

`private element: HTMLElement | null = null`

The interesting part here is:

### `HTMLElement | null`

This is another union type.

It means that `element` can contain either:

**an `HTMLElement`**

or:

`null`

Why is that necessary?

Because when the `Header` object is first constructed, its HTML has not yet been rendered.

So initially:

**`element` → `null`**

After `render()`:

**`element` → the actual header element**

The type accurately represents both possible states.

---

# ⚪ Part 46 — What `null` means

`null` represents the deliberate absence of a value.

Here it essentially means:

> ⚪ **There is currently no rendered header element stored here.**

This is different from pretending that an HTML element exists before one has actually been created.

TypeScript therefore forces the code to consider both possibilities:

**Does the element exist?**

or:

**Is it still `null`?**

That becomes important later in `setActiveSection()`.

---

# 🏗️ Part 47 — The constructor stores the communication channel

The constructor receives:

`onSectionSelect: (section: HeaderSection) => void`

and stores it as:

`this.onSectionSelect`

The `Header` object therefore receives its communication mechanism when it is created.

This produces a clean relationship:

**🏛️ App**

creates Header

⬇️

gives Header a callback

⬇️

**🏷️ Header**

stores callback

⬇️

later, when clicked

⬇️

Header calls callback

⬇️

**🏛️ App**

is notified

The Header does not need a direct reference to the entire `App`.

It only receives the one capability it actually needs:

> **Tell someone that the section changed.**

---

# 🎨 Part 48 — `render()` begins building the header

The `render()` method creates:

`document.createElement('header')`

This time the application uses the semantic HTML element:

`<header>`

rather than a generic `<div>`.

It then assigns:

`header.className = 'app-header'`

The resulting conceptual HTML is:

`<header class="app-header">`

This gives the element both:

**🏗️ semantic meaning** — it is a header

and

**🎨 styling identity** — CSS can target `.app-header`

---

# 🏷️ Part 49 — Creating the title

The class then creates:

`document.createElement('h1')`

and gives it:

`className = 'app-title'`

and:

`textContent = 'Midgard Hex Grid'`

The `<h1>` element represents the primary heading of the application.

The important property here is:

### `textContent`

`textContent` places ordinary text inside an element.

Conceptually:

**empty `<h1>`**

⬇️ `textContent = 'Midgard Hex Grid'`

`<h1>Midgard Hex Grid</h1>`

This is a simple and safe way to insert plain text into the DOM.

---

# 🧭 Part 50 — Creating semantic navigation

The header then creates:

`document.createElement('nav')`

A `<nav>` element represents a collection of navigation controls.

It receives:

`className = 'header-navigation'`

So CSS can control how the navigation is positioned and styled.

At this point the header structure is becoming:

**🏷️ `<header>`**

├── **`<h1>` Midgard Hex Grid**  
└── **`<nav>` ...**

This is meaningful HTML structure rather than an arbitrary collection of generic elements.

---

# ♿ Part 51 — `setAttribute()` and accessibility

The navigation receives:

`navigation.setAttribute('aria-label', 'Main navigation')`

This introduces:

### `setAttribute()`

HTML elements can contain attributes.

For example:

`class`  
`id`  
`aria-label`

The method `setAttribute()` allows TypeScript to assign such an attribute dynamically.

Here it creates an accessibility label:

`aria-label="Main navigation"`

ARIA stands for **Accessible Rich Internet Applications**.

The label gives assistive technologies, such as screen readers, a meaningful description of what this navigation represents.

So this line does not primarily change how the page looks.

It improves the **semantic accessibility** of the interface.

---

# 🏭 Part 52 — One method creates both navigation buttons

Instead of manually repeating all the DOM code required for each button, `render()` calls:

`this.createNavigationButton('test', 'Test Page')`

and:

`this.createNavigationButton('notes', 'Project Notes')`

This is a useful example of extracting repeated work into a method.

Both buttons need the same general construction process.

Only two pieces of information differ:

**1. Which section does the button represent?**

**2. What text should the user see?**

So the helper method receives:

**section**

and:

**label**

The method handles everything else.

This avoids unnecessary duplication.

---

# 🧠 Part 53 — Parameters separate behaviour from data

Consider the two calls conceptually:

**Button recipe + `'test'` + `'Test Page'`**

⬇️

**🧪 Test Page button**

and:

**Button recipe + `'notes'` + `'Project Notes'`**

⬇️

**📚 Project Notes button**

The algorithm for constructing a button stays the same.

Only the data changes.

This is one of the simplest but most useful forms of abstraction:

> ♻️ **Write the general behaviour once and supply different values through parameters.**

---

# 🌳 Part 54 — Completing the header DOM tree

After the buttons have been added to the navigation, the class calls:

`header.append(title, navigation)`

The resulting structure is approximately:

**🏷️ `<header class="app-header">`**

├── **📖 `<h1 class="app-title">`**  
│ └── Midgard Hex Grid  
│  
└── **🧭 `<nav class="header-navigation">`**  
    ├── 🧪 Test Page  
    └── 📚 Project Notes

Then:

`this.element = header`

stores the actual DOM element inside the object.

Finally:

`return header`

gives the completed element to the caller.

---

# 🔄 Part 55 — `setActiveSection()` changes state

The public method:

`setActiveSection(section: HeaderSection): void`

allows the active header section to change.

The first operation is:

`this.activeSection = section`

This updates the object's state.

For example:

**Before**

`activeSection → 'test'`

⬇️ user chooses Project Notes

**After**

`activeSection → 'notes'`

But changing the stored value alone would not be enough.

The visible buttons also need to change appearance.

That is why the method continues by updating the DOM.

---

# 🛡️ Part 56 — Guarding against a missing element

Before touching the rendered header, the method checks:

`if (!this.element)`

followed by:

`return`

This is called a **guard clause**.

The logic is:

> 🛡️ If no rendered header element exists, stop here.

Remember that `element` can be:

`HTMLElement | null`

So this check handles the `null` possibility safely.

It also makes the remaining method easier to understand.

After the guard clause, TypeScript knows:

> `this.element` must now be an actual element.

---

# 🔎 Part 57 — Finding several elements with `querySelectorAll`

Chapter 1 introduced `querySelector()`, which finds a matching element.

Here the code uses:

`querySelectorAll<HTMLButtonElement>(...)`

The difference is important.

### 🔍 `querySelector()`

Find one matching element.

### 🔎 `querySelectorAll()`

Find **all** matching elements.

The selector used here is:

`.header-navigation-item`

So the method gathers all header navigation buttons.

---

# 🧠 Part 58 — The generic type `<HTMLButtonElement>`

Inside:

`querySelectorAll<HTMLButtonElement>`

the part:

`<HTMLButtonElement>`

tells TypeScript what kind of elements are expected.

This means that when the code later works with each result, TypeScript understands:

> 🔘 This is an HTML button element.

That gives more precise type checking and better editor assistance.

This angle-bracket syntax is an example of a **generic type argument**.

Generics will appear in other contexts too, but the central idea is:

> 🧠 **A generic allows code to work with a type that is supplied as additional information.**

Here, that additional information is:

`HTMLButtonElement`

---

# 🔁 Part 59 — `for...of` loops through the buttons

The code then uses:

`for (const button of buttons)`

This is a **`for...of` loop**.

It means:

> 🔁 For each button contained in `buttons`, perform the following operations.

If there are two buttons:

**Test Page**

**Project Notes**

then the loop runs twice.

Conceptually:

**First iteration**  
`button → Test Page`

**Second iteration**  
`button → Project Notes`

This is a clean way to process every element in a collection.

---

# 🎨 Part 60 — `classList.toggle()` with a condition

For each button, the code uses:

`button.classList.toggle(...)`

Earlier, `classList.add()` was used to add a CSS class.

`toggle()` can add or remove a class depending on a condition.

The class being controlled is:

`is-active`

The condition is:

`button.dataset.section === section`

So:

**If the button represents the selected section**

➡️ add `is-active`

**If it represents another section**

➡️ remove `is-active`

This keeps the visual state synchronized with the logical state.

---

# 🏷️ Part 61 — `dataset` stores application information in HTML

The expression:

`button.dataset.section`

introduces another useful browser feature.

HTML elements can contain custom `data-*` attributes.

For example, conceptually:

`data-section="test"`

or:

`data-section="notes"`

JavaScript and TypeScript expose these through:

`element.dataset`

So:

`data-section`

becomes:

`dataset.section`

This gives each button a small piece of application-specific metadata:

> 🏷️ **Which HeaderSection does this button represent?**

That information can later be used without examining the visible button text.

---

# 🏭 Part 62 — `createNavigationButton()` as a private helper

The method:

`createNavigationButton(...)`

is marked:

`private`

because it exists only to help `Header` perform its own work.

Other parts of the application do not need to create header buttons directly.

Its parameters are:

`section: HeaderSection`

and:

`label: string`

Its return type is:

`HTMLButtonElement`

So its contract can be read almost like a sentence:

> 🏭 Give the method a valid header section and a text label, and it will return an HTML button element.

This is a nicely focused helper method.

---

# 🔘 Part 63 — Building the button

The helper creates:

`document.createElement('button')`

Then:

`button.type = 'button'`

This explicitly defines the button as an ordinary clickable button.

The class:

`header-navigation-item`

connects it to the CSS styling.

The line:

`button.dataset.section = section`

stores its logical section identity.

And:

`button.textContent = label`

sets the visible text.

So each button contains two different kinds of information:

**👁️ Visible information**

The label the user sees.

**🧠 Program information**

The section the button represents.

For example:

**Visible:** `Test Page`

**Internal section:** `'test'`

This is a useful separation.

---

# 🟢 Part 64 — Setting the initial active appearance

When a button is created, the method checks:

`if (section === this.activeSection)`

If true:

`button.classList.add('is-active')`

This ensures that the current state is reflected immediately when the header is first rendered.

Because:

`activeSection = 'test'`

the Test Page button initially receives:

`is-active`

while Project Notes does not.

The visual interface therefore emerges from the object's state rather than being independently hard-coded.

---

# 🖱️ Part 65 — `addEventListener()` makes the button interactive

The button becomes interactive through:

`button.addEventListener('click', ...)`

An event listener tells the browser:

> 👂 **When this event happens to this element, run this function.**

The event here is:

`'click'`

So the application is reacting to user interaction.

This introduces the central pattern of browser applications:

**👤 User action**

⬇️

**⚡ Browser event**

⬇️

**👂 Event listener**

⬇️

**🧠 TypeScript function executes**

Without event listeners, the interface could be displayed, but it would not respond to the user.

---

# ➡️ Part 66 — Arrow functions

The click listener uses the syntax:

`() => { ... }`

This is an **arrow function**.

It creates a function directly at the place where it is needed.

The empty parentheses:

`()`

mean that this particular function does not declare any parameters.

The arrow:

`=>`

separates the parameters from the function body.

Conceptually:

`() => { do something }`

means:

> Create a function that takes no arguments and performs these actions.

Arrow functions are extremely common in modern TypeScript and JavaScript, especially for event handlers and callbacks.

---

# 🔄 Part 67 — What happens when a header button is clicked?

Inside the click listener, two things happen.

First:

`this.setActiveSection(section)`

This updates the Header's own state and styling.

Then:

`this.onSectionSelect(section)`

This calls the callback supplied by `App`.

So one click produces two consequences:

**1️⃣ Internal consequence**

Header updates itself.

**2️⃣ External consequence**

Header informs the rest of the application.

The complete chain is:

**👤 Click Project Notes**

⬇️

**🔘 Button's click listener runs**

⬇️

**🏷️ Header changes `activeSection`**

⬇️

**🎨 Active button styling changes**

⬇️

**📞 Header calls `onSectionSelect('notes')`**

⬇️

**🏛️ App receives the change**

⬇️

**🧭 Navigation and 🖥️ DemoArea can respond**

This is the bridge between browser interaction and application architecture.

---

# 🔌 Part 68 — Header is deliberately loosely connected

An important design detail is that `Header` does **not** contain code such as:

**“Open this particular document.”**

or:

**“Replace the left menu with these items.”**

It simply reports:

> 📢 **The user selected this section.**

That keeps `Header` relatively independent.

Its world is small:

**HeaderSection**

**buttons**

**active state**

**selection callback**

It does not need to understand `DemoArea`, Markdown files, hexagon demos or SVG graphics.

This is a useful form of **low coupling**.

> 🔌 **A component is easier to understand when it depends on as few unrelated details as possible.**

---

# 🧠 Part 69 — State → DOM → event → state

`Header.ts` demonstrates an important cycle found throughout interactive applications.

### 🧠 State

`activeSection`

⬇️

### 🌳 DOM

Buttons are rendered according to that state.

⬇️

### 👤 Event

The user clicks a button.

⬇️

### 🔄 State change

`activeSection` changes.

⬇️

### 🎨 DOM update

The `is-active` class moves to the correct button.

This cycle is fundamental to user-interface programming.

Even without a framework such as React, the same underlying idea exists:

> **Application state determines what the interface should look like, and user events can change that state.**

---

# 🧰 TypeScript and browser concepts introduced in Chapter 3

This chapter adds several important concepts.

### 🔤 String literal union type

`'test' | 'notes'`

restricts a value to a specific set of strings.

### ⚪ `null`

Represents the absence of a value.

### 🔀 Union types

`HTMLElement | null`

allows a value to have one of several specified types.

### 📞 Function types

`(section: HeaderSection) => void`

describes the expected shape of a function.

### ♿ ARIA attributes

Provide semantic information that can improve accessibility.

### 🔎 `querySelectorAll()`

Finds multiple matching DOM elements.

### 🧠 Generic type argument

`<HTMLButtonElement>`

provides more precise type information.

### 🔁 `for...of`

Processes each value in a collection.

### 🏷️ `dataset`

Provides access to custom HTML `data-*` attributes.

### 👂 `addEventListener()`

Connects browser events to program behaviour.

### ➡️ Arrow functions

Provide concise function syntax commonly used for callbacks.

---

# 🎯 Chapter 3 — The central idea

`Header.ts` is the first file where the test app becomes visibly **interactive**.

It combines:

**🧠 state**

**🌳 DOM elements**

**🎨 CSS classes**

**👂 browser events**

**📞 callbacks**

while keeping its responsibility narrow.

The Header does not control the whole application.

It only knows:

> 🧭 **Which top-level section is active, how to display that state, and how to report a new selection.**

The architecture now becomes clearer:

`main.ts`

⬇️ starts

**🏛️ `App.ts`**

⬇️ coordinates

**🏷️ `Header.ts`**

⬇️ reports top-level selections

The next component can then focus on the much larger side-navigation system without needing to repeat these concepts.
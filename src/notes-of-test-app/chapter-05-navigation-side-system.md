# 📘 MIDGARD TEST APP

## Chapter 5 — `Navigation.ts`

### 🧭 Part 83 — The application's side-navigation system

`Navigation.ts` is responsible for the menu running down the left side of the application.

At first glance, that sounds simple: create some buttons and react when they are clicked.

But this class actually solves a more interesting problem.

The application has **two different side menus**.

When the top header is on **Test Page**, the side menu contains the demos:

🏠 **Home**  
⬡ **Single Hex**  
↔️ **X-Dominated Grid**  
↕️ **Y-Dominated Grid**  
🎨 **CSS Styling**  
🌲 **SVG Terrain**  
🔗 **Neighbours**

When the top header is on **Project Notes**, the same physical navigation area instead contains the chapters of the documentation.

So `Navigation` is not simply a list of buttons.

It is a component that manages:

📚 **multiple collections of menu items**

🧠 **separate active selections**

🔄 **switching between navigation sections**

🎨 **active-button styling**

📞 **communication back to `App`**

This makes `Navigation.ts` one of the central state-management classes in the test application.

---

# 📦 Part 84 — The two imported types

The file begins by importing **`HeaderSection`** and **`MenuItem`**.

Both are imported with `import type`.

These concepts have already been introduced, but here they meet for an important reason.

**`HeaderSection`** answers:

🏷️ **Which major section are we in?**

**`MenuItem`** answers:

🧭 **What selectable items exist inside that section?**

The relationship is therefore:

**HeaderSection**

⬇️ determines

**collection of MenuItems**

This is the fundamental idea behind the entire class.

---

# 🧪 Part 85 — The Test Page menu

The first array is declared as **`private readonly items: MenuItem[]`**.

The type **`MenuItem[]`** means:

> 📚 **An array containing `MenuItem` objects.**

The square brackets after a type are TypeScript's common syntax for an array of that type.

So:

**`string[]`** means an array of strings.

**`number[]`** means an array of numbers.

**`MenuItem[]`** means an array of menu items.

The current Test Page array contains seven entries.

Each follows the interface introduced in Chapter 4:

**`id` + `label`**

For example:

🆔 **`single-hex`**  
🏷️ **Single Hex**

and:

🆔 **`svg-terrain`**  
🏷️ **SVG Terrain**

The array is therefore a collection of objects with the same structure.

---

# 📚 Part 86 — The Project Notes menu

The second collection is **`private readonly noteItems: MenuItem[]`**.

It uses exactly the same `MenuItem` structure, but contains the documentation chapters instead of demos.

This is an elegant consequence of using the shared interface.

From Navigation's point of view, these are both simply collections of **`MenuItem[]`**.

The class does not need an entirely different rendering system for documentation.

Conceptually:

🧪 **Test menu**  
→ `MenuItem[]`

📚 **Notes menu**  
→ `MenuItem[]`

Therefore, the same methods can render and manage both.

This is a major benefit of giving different kinds of data the same useful structure.

---

# 🆔 Part 87 — IDs connect navigation to application behaviour

Each menu item has an internal ID.

For the Test Page, examples include:

🏠 **`home`**

⬡ **`single-hex`**

🎨 **`css-styling`**

🌲 **`svg-terrain`**

For the notes, examples include:

📖 **`chapter-00-introduction`**

📖 **`chapter-09-hex-grid`**

📖 **`chapter-28-design-patterns`**

These IDs are not just arbitrary labels.

They become the identifiers through which other parts of the application understand what was selected.

For example:

🧭 **Navigation**

sends an item with:

`id = 'svg-terrain'`

⬇️

🏛️ **App**

passes it onward

⬇️

🖥️ **DemoArea**

recognizes the ID and creates the SVG Terrain demo.

The ID therefore forms a small communication bridge between otherwise separate classes.

---

# 📞 Part 88 — The selection callback

The class stores **`private readonly onSelect: (item: MenuItem) => void`**.

This is the same callback pattern seen earlier.

Navigation does not need to know exactly what the rest of the application will do after a selection.

It only needs a function capable of receiving a **`MenuItem`**.

So its responsibility ends with:

> 📢 **This item has been selected.**

`App` decides what happens next.

This keeps `Navigation` focused on navigation rather than content rendering.

---

# 🧠 Part 89 — Navigation remembers three pieces of state

The class contains three particularly important state fields:

🏷️ **`activeSection`**

🧪 **`activeTestId`**

📚 **`activeNotesId`**

They represent three related but different facts.

### 🏷️ `activeSection`

Which major section is currently visible?

**`'test'` or `'notes'`**

### 🧪 `activeTestId`

Which Test Page item was last selected?

### 📚 `activeNotesId`

Which Project Notes chapter was last selected?

This means the application does **not** use one universal active menu ID.

It remembers a separate selection for each section.

---

# 🧠 Part 90 — Why two active IDs are useful

Imagine this sequence:

**1️⃣ Test Page → SVG Terrain**

Then:

**2️⃣ Project Notes → Chapter 28**

Then the user returns to:

**3️⃣ Test Page**

Because Navigation has **`activeTestId`** and **`activeNotesId`** separately, it can remember both contexts.

Conceptually:

🧪 **Test state**

`activeTestId = 'svg-terrain'`

📚 **Notes state**

`activeNotesId = 'chapter-28-design-patterns'`

The currently active section determines which remembered value matters.

This is a good example of designing state around the behaviour expected from the interface.

---

# ⚪ Part 91 — The rendered element begins as `null`

Navigation also stores **`private element: HTMLElement | null = null`**.

This follows the same pattern as `Header`.

Before `render()` has run:

⚪ **element → `null`**

After rendering:

🌳 **element → actual navigation DOM element**

Storing the element allows the class to modify or replace its own rendered interface later.

That becomes particularly important when switching between Test Page and Project Notes.

---

# 🏗️ Part 92 — The constructor establishes the initial selections

The constructor first stores the callback.

Then it initializes **`activeTestId`** using the first item in the Test Page array and **`activeNotesId`** using the first item in the notes array.

The syntax **`array[0]`** means:

> 🔢 **Access the first element of an array.**

JavaScript and TypeScript arrays are **zero-indexed**.

That means:

**`[0]` → first element**

**`[1]` → second element**

**`[2]` → third element**

So the first Test Page item becomes the initial test selection, while the first notes chapter becomes the initial notes selection.

---

# 🏠 Part 93 — Why the first item becomes active automatically

The first Test Page item is **Home**.

Therefore:

**`activeTestId` → `'home'`**

The first Project Notes item is **Chapter 00 — Introduction**.

Therefore:

**`activeNotesId` → `'chapter-00-introduction'`**

This produces sensible defaults without duplicating the IDs elsewhere.

Instead of separately writing:

> “The default must be `'home'`”

the code says:

> 🧭 **Whatever the first menu item is, use that as the default.**

That connects the default state directly to the menu configuration.

---

# 🔎 Part 94 — `getActiveItem()` asks an important question

The public method **`getActiveItem(): MenuItem`** answers:

> 🔎 **Which complete `MenuItem` is currently active?**

Notice that the class stores active **IDs**, not entire active menu objects.

So the method must:

**1️⃣ Determine which menu collection is currently relevant**

**2️⃣ Determine which ID is active**

**3️⃣ Find the corresponding `MenuItem`**

The first two steps are delegated to the helper methods **`getCurrentItems()`** and **`getCurrentActiveId()`**.

This keeps `getActiveItem()` readable at a high level.

---

# 🔍 Part 95 — Searching an array with `.find()`

Once the current array and ID are known, the code uses the array method **`.find()`**.

Its purpose is:

> 🔎 **Search through an array and return the first element satisfying a condition.**

The condition asks whether:

`item.id === activeId`

For example:

🎯 Active ID = **`'neighbours'`**

⬇️ search

🏠 Home ❌  
⬡ Single Hex ❌  
↔️ X-Dominated Grid ❌  
↕️ Y-Dominated Grid ❌  
🎨 CSS Styling ❌  
🌲 SVG Terrain ❌  
🔗 Neighbours ✅

⬇️

Return the **Neighbours `MenuItem`**.

---

# ➡️ Part 96 — The arrow function receives each item

Inside `.find()`, an arrow function receives each candidate menu item.

Its logical question is:

> 🧪 **Does this item's ID equal the active ID?**

For every candidate it produces either:

✅ **`true`** — this is the matching item

or:

❌ **`false`** — continue searching

A function whose job is to test a condition and produce `true` or `false` is often called a **predicate**.

Predicates appear frequently with array methods such as `.find()`, `.filter()` and `.some()`.

---

# ⚖️ Part 97 — Strict equality with `===`

The comparison uses **`===`**.

This is JavaScript's **strict equality operator**.

Here it asks whether two IDs are exactly equal.

Both values are strings, so the intention is:

> ⚖️ **Do these two string IDs represent the same menu item?**

Modern TypeScript and JavaScript generally prefer strict equality over the looser `==` comparison.

---

# ⚠️ Part 98 — `.find()` may return nothing

Even if the programmer expects a matching item to exist, `.find()` cannot guarantee that it will find one.

Conceptually, the result can therefore be:

`MenuItem | undefined`

The new possibility here is:

### ❓ `undefined`

`undefined` represents the absence of a value.

Navigation therefore checks whether an active item was actually found.

If not, it throws an error containing the problematic ID.

This protects an important rule of the class:

> 🛡️ **The active ID should always correspond to a real menu item.**

If that rule is somehow broken, the program reports the problem clearly.

---

# 🆚 Part 99 — `undefined` and `null`

The application has now encountered both **`null`** and **`undefined`**.

Both can represent absence, but they often arise differently.

In this project:

⚪ **`null`**

is deliberately assigned to fields such as `element` to mean:

> No rendered element currently exists.

❓ **`undefined`**

can naturally result from something such as `.find()` when no matching value exists.

A useful practical mental model is:

**⚪ `null` → deliberately no value**

**❓ `undefined` → a value was not found or supplied**

---

# 🔄 Part 100 — `setSection()` changes navigation mode

The public method **`setSection(section: HeaderSection): void`** performs two important operations.

First:

🧠 **Update `activeSection`**

Then:

🔄 **Call `refresh()`**

The first changes the logical state.

The second changes the visible navigation.

This illustrates an important user-interface principle:

**🧠 State changes**

⬇️

**🎨 Interface must reflect the new state**

When the Header tells App that the user changed section, App calls this method.

Navigation then knows whether it should behave as:

🧪 **Test Page navigation**

or:

📚 **Project Notes navigation**

---

# 🏗️ Part 101 — `render()` builds the side navigation

The `render()` method creates a semantic **`<nav>`** element and gives it the CSS class **`navigation`**.

It also gives the navigation an ARIA label.

But the label is dynamic.

When the active section is Test Page:

♿ **Test page navigation**

When the active section is Project Notes:

♿ **Project notes navigation**

This is useful because the same component has two different semantic roles depending on its current state.

---

# ❓ Part 102 — The ternary operator

The dynamic ARIA label introduces another common TypeScript and JavaScript expression:

**condition ? value A : value B**

This is called the **ternary operator**.

Its mental model is:

❓ **Is the condition true?**

↙️ YES　　　　　　　　　NO ↘️

✅ **use value A**　　　　❌ **use value B**

Here the condition asks:

**Is `activeSection` equal to `'test'`?**

If yes:

➡️ **Test page navigation**

If no:

➡️ **Project notes navigation**

It is essentially a compact expression form of an `if/else` decision.

---

# 📋 Part 103 — Why the menu uses `<ul>` and `<li>`

Navigation creates a **`<ul>`**, and each menu entry is placed inside an **`<li>`**.

This is semantically meaningful HTML.

A navigation menu is fundamentally a **list of navigation choices**.

The conceptual structure is:

🧭 **Navigation**

└── 📋 **Unordered list**  
　　├── 🔘 Menu item  
　　├── 🔘 Menu item  
　　├── 🔘 Menu item  
　　└── 🔘 Menu item

The CSS may remove ordinary bullet points and change the appearance completely, but the underlying HTML still expresses the correct semantic idea:

> 📋 **This is a list of choices.**

---

# 🔁 Part 104 — Rendering whichever menu is current

The central rendering logic can be understood as:

> 🔁 **For every item in the currently relevant menu, create a navigation item and add it to the list.**

This is powerful because the rendering logic does not care whether it receives:

🧪 **7 Test Page items**

or:

📚 **31 Project Notes chapters**

It simply receives:

`MenuItem[]`

This is where the shared `MenuItem` interface pays off.

One rendering algorithm can handle both collections.

---

# 🧠 Part 105 — `getCurrentItems()` hides a decision

The private helper **`getCurrentItems(): MenuItem[]`** answers one simple question:

> 📚 **Which collection of menu items matters right now?**

If the active section is Test Page:

➡️ return the Test Page items

Otherwise:

➡️ return the Project Notes items

The important design idea is that the rest of the class does not repeatedly need to ask:

> “Am I in Test Page or Project Notes?”

Instead it can simply ask:

> 📚 **Give me the current items.**

The helper hides the decision behind a meaningful name.

---

# 🎯 Part 106 — `getCurrentActiveId()` uses the same pattern

The next helper asks:

> 🎯 **Which active ID matters in the current section?**

If the active section is Test Page:

➡️ use **`activeTestId`**

Otherwise:

➡️ use **`activeNotesId`**

The two helper methods therefore work together:

📚 **`getCurrentItems()`**  
→ Which collection matters?

🎯 **`getCurrentActiveId()`**  
→ Which selection matters?

This reduces duplicated conditional logic throughout the class.

---

# 🏭 Part 107 — `createItem()` turns data into DOM

The private method **`createItem(item: MenuItem): HTMLLIElement`** receives one data object and transforms it into an interactive piece of the interface.

Conceptually:

📦 **MenuItem data**

**ID + label**

⬇️

🏭 **`createItem()`**

⬇️

🌳 **DOM**

**list item + button**

This creates a clean separation:

📚 The arrays describe **what items exist**.

🏭 `createItem()` describes **how one item becomes part of the interface**.

---

# 🔘 Part 108 — Building each navigation button

Each menu item creates:

📋 **a list item**

and:

🔘 **a button**

The button receives several pieces of information:

🎨 **CSS class:** `navigation-item`

🆔 **data ID:** taken from `item.id`

🏷️ **visible text:** taken from `item.label`

This maps the `MenuItem` interface directly onto the DOM.

Conceptually:

🆔 **`item.id`**

⬇️

🏷️ **HTML `data-id`**

and:

🏷️ **`item.label`**

⬇️

👁️ **visible button text**

The data object has now become an interactive user-interface element.

---

# 🟢 Part 109 — Determining whether the button is active

When each button is created, Navigation compares:

**the item's ID**

with:

**the current active ID**

If they match:

➡️ the CSS class **`is-active`** is added.

This ensures that rendering is based on current application state.

The CSS can then give an active navigation button a different appearance.

Again, the pattern is:

🧠 **application state**

⬇️

🏷️ **CSS class**

⬇️

🎨 **visual appearance**

The visual interface is therefore a representation of the internal state.

---

# 🖱️ Part 110 — Clicking a side-menu item

When a navigation button is clicked, two important things happen.

### 1️⃣ Internal update

Navigation records which item is now active and updates its own appearance.

### 2️⃣ External notification

Navigation tells `App` which `MenuItem` was selected.

Imagine clicking:

🌲 **SVG Terrain**

The flow becomes:

👤 **Click SVG Terrain**

⬇️

🧭 **Navigation**

⬇️

🎯 active ID becomes **`svg-terrain`**

⬇️

🎨 active-button styling changes

⬇️

📞 Navigation calls its selection callback

⬇️

🏛️ **App receives the `MenuItem`**

⬇️

🖥️ **DemoArea displays SVG Terrain**

Navigation therefore manages its own selection state but delegates content decisions to the rest of the application.

---

# 💾 Part 111 — `setActive()` stores the selection in the correct place

The private method **`setActive(id: string)`** contains an important decision.

If the current section is:

🧪 **Test Page**

the ID is stored in:

`activeTestId`

If the current section is:

📚 **Project Notes**

the ID is stored in:

**`activeNotesId`**

So the same click mechanism updates different state depending on the current context.

Conceptually:

🧪 **Test mode**

selection  
⬇️  
**`activeTestId`**

📚 **Notes mode**

selection  
⬇️  
**`activeNotesId`**

After storing the new selection, Navigation updates the visible active button.

---

# 🎨 Part 112 — Updating only the active styling

The method **`updateActiveButton()`** does not rebuild the entire navigation.

Instead, it finds all currently rendered navigation buttons and updates their **`is-active`** class.

The process is:

🛡️ **Check that the navigation has been rendered**

⬇️

🎯 **Get the current active ID**

⬇️

🔎 **Find all navigation buttons**

⬇️

🔁 **Visit every button**

⬇️

🧪 **Does its `data-id` match the active ID?**

↙️ YES　　　　　　　　　NO ↘️

🟢 add `is-active`　　　⚪ remove `is-active`

This is a **targeted DOM update**.

Only the visual selection has changed, so there is no reason to reconstruct the whole menu.

---

# 🔄 Part 113 — `refresh()` performs a full navigation replacement

Changing the major section is different.

When moving from:

🧪 **Test Page**

to:

📚 **Project Notes**

the actual collection of menu items changes.

Updating one CSS class is no longer enough.

Navigation therefore uses **`refresh()`**.

Its logic is:

🌳 **Remember the old navigation element**

⬇️

🏗️ **Render a new navigation element**

⬇️

🔄 **Replace the old element with the new one**

So:

🧪 **old Test menu**

⬇️ section changes

🏗️ **render again**

⬇️

📚 **new Project Notes menu**

This is a full component refresh.

---

# 🆚 Part 114 — Two different update strategies

Navigation therefore uses two different strategies depending on what changed.

### 🎨 Menu selection changed

The menu items themselves remain the same.

Only the active styling changes.

➡️ **Use `updateActiveButton()`**

### 🔄 Major section changed

The entire collection of menu items changes.

➡️ **Use `refresh()`**

This demonstrates an important user-interface design idea:

> 🔧 **Update only as much of the DOM as the state change requires.**

A small state change gets a small DOM update.

A structural state change gets a larger DOM update.

---

# 🧩 Part 115 — Navigation's internal model

The whole class can be understood through four categories.

### 📚 Available data

`items`

`noteItems`

### 🧠 Current state

`activeSection`

`activeTestId`

`activeNotesId`

### 🌳 Rendered representation

`element`

### 📞 Communication outward

`onSelect`

These four categories form a useful mental model:

📚 **Data**

⬇️ interpreted using

🧠 **State**

⬇️ creates

🌳 **DOM**

⬆️ changed by

👤 **User events**

⬇️ reported through

📞 **Callback**

This pattern appears in many interactive applications.

---

# 🔀 Part 116 — Navigation as a small state machine

Another useful way to understand the class is as a simple **state machine**.

It can be in one of two major section states:

🧪 **Test**

or:

📚 **Notes**

Each state has:

📋 **its own menu**

and:

🎯 **its own remembered active item**

Events cause transitions.

🏷️ **Header selection**

➡️ changes section state

🖱️ **Menu click**

➡️ changes active-item state

The rendered interface is then synchronized with that state.

No formal state-machine library is being used, but the underlying idea is present:

> 🔀 **The interface has defined states, and events move it between those states.**

---

# 🔌 Part 117 — Navigation does not know `DemoArea`

One architectural detail is especially important.

`Navigation.ts` does **not** import `DemoArea`.

It does not contain knowledge such as:

> “If SVG Terrain is clicked, construct the SVG Terrain demo.”

That would tightly connect navigation to content.

Instead, Navigation only reports:

> 📢 **This `MenuItem` was selected.**

Then the information travels outward through the callback.

The responsibilities remain separated:

🧭 **Navigation**  
→ knows menu state

🏛️ **App**  
→ coordinates components

🖥️ **DemoArea**  
→ knows what content to display

This is a cleaner separation of concerns.

---

# 🧰 TypeScript and JavaScript concepts introduced in Chapter 5

### 📚 Typed arrays

`MenuItem[]`

means an array containing `MenuItem` values.

### 🔢 Zero-based indexing

`array[0]`

accesses the first array element.

### 🔎 `.find()`

Searches an array for the first element satisfying a condition.

### 🧪 Predicate

A function can test whether an item satisfies a condition and return `true` or `false`.

### ⚖️ Strict equality

`===`

performs a strict equality comparison.

### ❓ `undefined`

Can represent a value that was not found.

### ❔ Ternary operator

**condition ? value A : value B**

selects one of two values depending on a condition.

### 📋 Semantic lists

HTML list elements describe a navigation menu as a collection of choices.

### 🔄 DOM replacement

An existing rendered element can be replaced by a newly created one when the structure needs to change.

---

# 🎯 Chapter 5 — The central idea

`Navigation.ts` is much more than a collection of buttons.

It manages a small but meaningful piece of application state:

🏷️ **Which section is active?**

🧪 **Which Test Page item is active?**

📚 **Which Project Notes item is active?**

It then turns that state into the correct DOM and reports user selections back to `App`.

Its central responsibility can therefore be summarized as:

> 🧭 **Maintain the side-navigation state, render the appropriate menu, and report selections without needing to know what the selected content actually does.**

The architecture has now reached:

🌐 **`main.ts` — starts**

⬇️

🏛️ **`App.ts` — coordinates**

↙️　　　　　　　　　↘️

🏷️ **`Header.ts`**　　🧭 **`Navigation.ts`**

　　　　　⬇️

📦 **`MenuItem` carries the selection**

　　　　　⬇️

🖥️ **`DemoArea`**

The next chapter can therefore move into `DemoArea.ts` — the component that takes these menu selections and decides **what should actually appear in the main content area**.
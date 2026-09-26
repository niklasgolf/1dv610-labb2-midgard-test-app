## Chapter 20 — Vite, Modules and the Development Environment

### 🛠️ Part 603 — There is more around the source code than the source code itself

The previous chapters concentrated on the TypeScript, DOM, SVG and CSS that make up the application.

But something else is needed to turn those source files into a working browser application.

The project uses:

⚡ **Vite**

Vite provides the development environment in which the Test App can:

📦 load modules

🔷 process TypeScript

🎨 load CSS

📄 import Markdown as text

🌐 run in the browser during development

🏗️ create a production build.

The source code describes the application.

Vite provides much of the machinery that allows that source code to become a runnable web application.



---



# 🌐 Part 604 — The browser ultimately needs web resources

The source project contains different kinds of files:

🔷 `.ts`

🎨 `.css`

📄 `.md`

These have different purposes.

The browser ultimately needs executable JavaScript and web resources it understands.

So there is a transformation pipeline:

📁 **source project**

⬇️

⚡ **Vite and related tooling**

⬇️

📦 **processed modules/assets**

⬇️

🌐 **browser**

⬇️

🖥️ **running Test App**

This tooling layer sits between development source and browser execution.



---



# 📦 Part 605 — The project is built from modules

The Test App is divided into modules.

Examples include:

```
main.ts
App.ts
Header.ts
Navigation.ts
DemoArea.ts
```

and the files under:

```
src/demos/
```

These modules communicate using:

```
import
```

and:

```
export
```

This makes dependencies explicit.

For example:

```
main.ts
```

needs:

🏗️ `App`

while:

```
App.ts
```

needs:

⬛ `Header`

🧭 `Navigation`

📄 `DemoArea`.



---



# 🕸️ Part 606 — Imports form a dependency graph

The modules can be visualized as a graph.

🚀 `main.ts`

⬇️

🏗️ `App.ts`

↙️　　　↓　　　↘️

⬛ `Header.ts`　🧭 `Navigation.ts`　📄 `DemoArea.ts`

　　　　　　　　　　　　　　　⬇️

　　　　　　　　　　　　　🧩 Demo classes

　　　　　　　　　　　　　　　⬇️

　　　　　　　　　　　　　📦 Midgard

This graph describes which modules need which other modules.

Vite can follow these imports to understand how the application fits together.



---



# 📤 Part 607 — `export` defines what a module exposes

A module can contain many implementation details.

Only some need to be available to other modules.

The keyword:

```
export
```

marks something as available outside its own module.

Examples from the application include exported:

🏗️ classes

🧩 interfaces

🔤 types.

This creates a boundary.

Conceptually:

📄 module

├── 🔒 internal details\
└── 📤 exported API

This idea exists both at the small file level and at the larger Midgard library level.



---



# 📥 Part 608 — `import` declares a dependency

When a file uses:

```
import
```

it explicitly says:

> 📥 **This module needs something provided by another module.**

That is useful architecturally because dependencies become visible near the top of the file.

A reader can quickly see which external concepts the module relies upon.

For example, a terrain demo importing `HexGrid` immediately reveals:

> 📦 This demonstration depends on the Midgard library.



---



# 🏷️ Part 609 — Named imports

The application frequently uses named imports.

Conceptually:

**import `{ Something }` from another module**

means:

> 📥 Import the exported member named `Something`.

This corresponds to the other module exporting that named member.

The braces are therefore not merely decoration.

They indicate the **named export/import** mechanism.



---



# 🧠 Part 610 — Type-only imports

Some imports exist only because TypeScript needs type information.

The application uses:

```
import type
```

for such cases.

This communicates:

> 🧠 **This dependency is needed for static typing, not as a runtime JavaScript value.**

Examples include types such as:

```
MenuItem
```

or:

```
Demo
```

when they are used purely as type information.

This makes the distinction between:

🧠 compile-time dependency

and:

⚙️ runtime dependency

more explicit.



---



# 👻 Part 611 — Type imports can disappear from runtime output

Because interfaces and purely type-level constructs do not need runtime representation, type-only imports can be removed when the TypeScript is transformed.

Conceptually:

📄 TypeScript source

contains:

🧠 type import

⬇️

TypeScript checks usage

⬇️

👻 runtime does not need that import.

This connects directly to Chapter 19's distinction between the TypeScript type world and the JavaScript runtime world.



---



# 🎨 Part 612 — CSS can also be imported

`main.ts` imports:

```
./style.css
```

This is different from importing a class.

The code does not need a variable representing the stylesheet.

Instead the purpose is:

> 🎨 **Make this stylesheet part of the application.**

This is often called a **side-effect import**.

The import causes something to happen rather than providing a value that the TypeScript code later calls.



---



# 🔄 Part 613 — A side-effect import

Compare two conceptual imports.

### 📦 Value import

Import `App`

⬇️

use `App`

⬇️

```
new App(...)
```

### 🎨 Side-effect import

Import `style.css`

⬇️

Vite processes stylesheet

⬇️

styles become part of application

There is no need for:

```
const stylesheet = ...
```

The act of importing is itself the purpose.



---



# 📄 Part 614 — Markdown introduces another kind of import

`DemoArea.ts` contains many Markdown imports.

These use:

```
?raw
```

That is particularly interesting because the application does not want the Markdown file treated as executable code.

It wants:

> 📄 **the contents of the file as a string.**

Conceptually:

📄 `chapter-01-....md`

⬇️

⚡ Vite `?raw`

⬇️

🧵 Markdown text string

This is a Vite-specific resource transformation.



---



# 🧠 Part 615 — `?raw` changes what an import means

Normally, importing a TypeScript module means:

> Give access to its exports.

But:

```
?raw
```

means conceptually:

> Give the file's raw textual contents.

So:

📄 Markdown file

contains:

headings

paragraphs

icons

inline code

⬇️

⚡ `?raw`

⬇️

🧵 one JavaScript string

The application can then decide what to do with that string.



---



# 📝 Part 616 — Marked performs the next transformation

Vite does not itself turn these raw Markdown strings into the displayed documentation in `DemoArea`.

The application uses:

**Marked**

for that next step.

So the pipeline is:

📄 Markdown file

⬇️

⚡ Vite `?raw`

⬇️

🧵 Markdown string

⬇️

📝 `marked.parse(...)`

⬇️

🌐 HTML string

⬇️

🌳 `innerHTML`

⬇️

👁️ rendered documentation

Each stage has one responsibility.



---



# 🔌 Part 617 — Vite and Marked solve different problems

This distinction is useful.

### ⚡ Vite

gets the Markdown file into the module system as text.

### 📝 Marked

interprets the Markdown syntax and generates HTML.

### 🌳 Browser

parses that HTML and creates DOM content.

So:

⚡ **loading**

is different from:

📝 **parsing**

which is different from:

🌳 **rendering**.

Keeping these steps conceptually separate makes the system easier to understand.



---



# 📦 Part 618 — External packages are modules too

Marked is not one of the Test App's own source files.

It is an external package.

Yet it can be imported through the module system.

Conceptually:

📁 own module

```
./Demo.ts
```

versus:

📦 package dependency

```
marked
```

The import syntax helps reveal this difference.

A relative path such as:

```
./...
```

points toward project files.

A package name such as:

```
marked
```

refers to an installed dependency.



---



# 🗺️ Part 619 — Relative module paths

A path beginning with:

```
./
```

means:

> 📍 Start from the current module's directory.

So:

```
./App.ts
```

means conceptually:

> Find `App.ts` relative to this file.

A path containing:

```
../
```

means:

> 📍 Move one directory upward.

Relative paths therefore describe relationships within the project's folder structure.



---



# 🌳 Part 620 — Folder structure and module structure reinforce each other

The project separates:

📁 `src/`

from:

📁 `src/demos/`

This gives the folder structure meaning.

The main application infrastructure lives at one level:

🏗️ App

⬛ Header

🧭 Navigation

📄 DemoArea

while concrete demonstrations live together under:

🧩 `demos/`

The filesystem therefore helps communicate architecture before any code is even opened.



---



# 📚 Part 621 — Documentation has its own folder

The project also has:

📁 `src/project-notes/`

containing Markdown chapters.

This creates another clear boundary:

⚙️ application source

🧩 demo implementations

📚 documentation content.

Even though Vite eventually brings all of these resources together, their source organization communicates different responsibilities.



---



# ⚡ Part 622 — Why a development server is useful

Modern browser applications are usually more convenient to develop through a development server than by opening files directly from disk.

A tool such as Vite can provide an environment where:

📦 modules resolve correctly

🔷 TypeScript source is processed

🎨 CSS imports work

📄 raw imports work

🔄 changes can be reflected rapidly during development.

This creates a short feedback loop:

✍️ edit

⬇️

💾 save

⬇️

⚡ tooling updates

⬇️

👁️ inspect result.



---



# 🔄 Part 623 — Fast feedback matters

During development of visual features such as:

🌲 SVG terrain

🎨 CSS styling

🔗 neighbour highlighting

it is useful to make a small change and quickly see its effect.

A long edit-build-deploy cycle would slow experimentation.

Development tooling therefore affects more than convenience.

It influences how easily programmers can:

🧪 test ideas

🔍 inspect behaviour

🐛 find problems

🎨 refine visual details.



---



# 🏗️ Part 624 — Development and production are different situations

During development, priorities include:

⚡ speed

🔍 debugging

🔄 rapid changes.

For deployment, the goal is different:

📦 prepare the application for users.

Vite therefore supports a production **build** in addition to the development workflow.

Conceptually:

### Development

source

→ development server

→ browser

### Production

source

→ build

→ production assets

→ hosting

→ browser.

The same application source participates in both workflows.



---



# 📦 Part 625 — What “build” means conceptually

A build takes development source and prepares deployable output.

The exact internal machinery can be sophisticated, but the important mental model is simple:

📁 TypeScript/CSS/assets

⬇️

🏗️ build process

⬇️

📦 browser-ready application files.

The build step creates a distribution form of the application rather than requiring users to work with the development project itself.



---



# 🧠 Part 626 — Source code and build output serve different audiences

The source code is optimized for:

👨‍💻 programmers

with:

📁 meaningful files

🔤 TypeScript types

📚 Markdown sources

🧩 modular organization.

The built application is optimized for:

🌐 browsers and deployment.

These are different concerns.

A production user does not need to understand:

```
DemoAreaSvgTerrain.ts
```

to use the resulting page.



---



# 🔷 Part 627 — `vite-env.d.ts` supports TypeScript's understanding of Vite

The project also contains:

```
vite-env.d.ts
```

with a reference to Vite's client types.

A `.d.ts` file is a **TypeScript declaration file**.

Its role is primarily to provide type information rather than ordinary runtime behaviour.

Conceptually:

⚡ Vite introduces special capabilities

such as:

📄 resource imports

⬇️

🧠 TypeScript needs type information about that environment

⬇️

📜 declaration file helps describe it.

This is another example of the distinction between runtime behaviour and compile-time knowledge.



---



# 📜 Part 628 — Declaration files describe things TypeScript needs to know

A declaration file can tell TypeScript about APIs or module behaviour that exists outside ordinary TypeScript source definitions.

The broad pattern is:

🌐 runtime/tooling capability exists

⬇️

📜 declaration describes it

⬇️

🧠 TypeScript can reason about code using it.

This is common when TypeScript interacts with:

🌐 browser APIs

📦 JavaScript libraries

⚡ build tools

or other environments.



---



# 🔄 Part 629 — Vite participates in the module graph

When Vite sees imports, it can follow their relationships.

Conceptually:

🚀 `main.ts`

imports:

🎨 CSS

🏗️ App

Then App imports:

⬛ Header

🧭 Navigation

📄 DemoArea

DemoArea imports:

🧩 demos

📄 Markdown

📦 Marked

and demos import:

📦 Midgard.

So Vite can discover much of the application by following the dependency graph outward from the entry point.



---



# 🌐 Part 630 — The entry point anchors the graph

This gives `main.ts` another significance.

Earlier it was described as the application bootstrap.

From the module perspective it also sits near the root of the application's dependency graph.

Conceptually:

🚀 `main.ts`

⬇️

everything reachable through imports

⬇️

🖥️ application.

The entry point therefore connects:

⚙️ runtime startup

with:

📦 module dependency discovery.



---



# 🧩 Part 631 — Modules create local scope

Modules also help prevent unrelated files from accidentally sharing every variable.

A variable declared inside one module normally belongs to that module unless deliberately exported.

So:

📄 Module A

can have:

```
const something
```

while:

📄 Module B

can independently have its own:

`const something`.

This is far safer than placing all application variables into one global namespace.



---



# 🔒 Part 632 — Modules provide another form of encapsulation

Earlier, encapsulation was discussed at class level through:

`private`.

Modules provide encapsulation at another level.

Conceptually:

📄 module

├── internal implementation\
├── internal helpers\
└── 📤 selected exports

Only the exported surface becomes available to consumers.

So encapsulation exists at several scales:

🔒 method/class level

📄 module level

📦 library level.



---



# 📦 Part 633 — The Midgard package is a larger module boundary

The same principle extends to:

```
midgard-hex-grid
```

The Test App does not import arbitrary internal implementation files from the library.

It consumes the package's intended exports.

Conceptually:

🖥️ Test App

⬇️

📦 Midgard public API

⬇️

🔒 Midgard internals.

This protects the library's implementation freedom.

Consumers should depend on the public contract rather than internal file organization.



---



# 🧠 Part 634 — Public APIs reduce knowledge requirements

Without a public module boundary, the Test App might need to know:

📁 where coordinate positioning is implemented

📁 where geometry is calculated

📁 where layering is performed

📁 how range filling works.

Instead it can know:

📦 `HexGrid`

and the public types it needs.

This is another example of abstraction reducing cognitive load.



---



# 🧪 Part 635 — The Test App is a separate consumer for a reason

Keeping the Test App separate from the library itself demonstrates an important package-design principle.

The library can be developed as:

📦 reusable functionality

while the Test App acts as:

🖥️ one consumer.

This helps reveal whether the library really has a usable public API.

If the demo required access to private internals, that could indicate a weakness in the public design.



---



# 🏗️ Part 636 — Build tooling should not define the domain

Vite is important infrastructure.

But Vite does not define what:

📍 a Midgard coordinate is

or:

🔗 which cells are neighbours.

Those are domain rules.

This distinction matters:

⚡ **tooling**

helps build and run the software

while:

📦 **domain code**

defines the software's core concepts and rules.

The domain should not become conceptually confused with the tool used to package it.



---



# 🔄 Part 637 — Tools can change more easily than domain concepts

A useful architectural goal is that infrastructure can evolve without rewriting the meaning of the application.

For example, changing some build tooling should ideally not alter the mathematical definition of:

📍 valid coordinates

or:

⬡ hexagon geometry.

This is another benefit of separating concerns.

Tools serve the code.

The domain should not unnecessarily serve the tools.



---



# 🧭 Part 638 — The complete development pipeline

The overall development picture can now be represented as:

👨‍💻 **Developer writes**

🔷 TypeScript\
🎨 CSS\
📄 Markdown

⬇️

⚡ **Vite processes the project**

⬇️

📦 resolves modules and resources

⬇️

🌐 **Browser receives runnable application**

⬇️

🚀 `main.ts`

⬇️

🏗️ App starts

⬇️

🌳 DOM + SVG created

⬇️

🎨 styles applied

⬇️

👁️ Test App appears.

This connects the development environment to the runtime architecture studied in previous chapters.



---



# 🔍 Part 639 — A second pipeline exists for documentation

The notes have their own pipeline inside the larger one:

✍️ Markdown authoring

⬇️

📄 `.md`

⬇️

⚡ Vite `?raw`

⬇️

🧵 string

⬇️

📝 Marked

⬇️

🌐 HTML

⬇️

🌳 DOM

⬇️

👁️ chapter displayed.

This is a good example of several small tools cooperating rather than one technology doing everything.



---



# 🎨 Part 640 — A third pipeline exists for styling

The styling path is:

✍️ `style.css`

⬇️

📥 imported by `main.ts`

⬇️

⚡ Vite includes/processes it

⬇️

🌐 browser receives styles

⬇️

🔍 selectors match DOM elements

⬇️

🎨 computed styles

⬇️

👁️ final visual appearance.

Again, source, tooling and browser each have distinct responsibilities.



---



# 📦 Part 641 — A fourth pipeline exists for Midgard

The library relationship can be seen as:

📦 Midgard package

⬇️

📥 imported by demos

⬇️

⚡ module system resolves dependency

⬇️

⚙️ demo calls public API

⬇️

📍 geometry returned

⬇️

🔷 converted to SVG

⬇️

👁️ displayed.

This shows why the module system is central.

It connects application code to both:

📁 local modules

and:

📦 reusable packages.



---



# 🧠 Part 642 — Vite should become almost invisible conceptually

A good development tool can be very important without dominating application architecture.

Once the environment works, the programmer can mostly think in terms of:

📦 modules

🧩 classes

📍 data

🌳 DOM

🔷 SVG

🎨 CSS

rather than manually orchestrating every transformation between files.

That is one of the purposes of tooling:

> 🛠️ **Handle repetitive infrastructure so development can focus on application concepts.**



---



# 🎯 Chapter 20 — The central idea

Vite is the infrastructure that helps connect the Test App's different source resources into a runnable browser application.

The project contains:

🔷 TypeScript modules

🎨 CSS

📄 Markdown

📦 external dependencies

📦 the Midgard library.

The module system makes relationships explicit through:

📤 `export`

and:

📥 `import`.

Vite then enables useful project-level behaviour such as:

⚡ development serving

🔷 TypeScript-oriented development

🎨 stylesheet imports

📄 raw Markdown imports

🏗️ production building.

The most useful mental model is:

✍️ **Source**

⬇️

⚡ **Tooling**

⬇️

📦 **Processed application**

⬇️

🌐 **Browser runtime**

But those layers should remain conceptually distinct.

Vite does not define the Midgard domain.

Marked does not control navigation.

CSS does not calculate neighbours.

The browser does not decide which coordinates belong in a grid.

Each technology contributes a particular capability.

> 🧠 **Modern web development works by composing specialized tools and modules while keeping the application's own responsibilities clearly separated from the infrastructure that runs them.**
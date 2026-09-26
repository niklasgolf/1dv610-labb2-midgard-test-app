## Chapter 21 — State, Events and the Flow of Control

### 🔄 Part 643 — A browser application is constantly changing

The Test App is not a static document.

After startup, things can change:

🧭 another menu item becomes active

⬛ another top-level section becomes active

📄 different content appears

🖱️ the pointer enters a hexagon

✨ neighbours become highlighted

🖱️ the pointer leaves

🌱 the original appearance returns

To understand these changes, three concepts are especially important:

🧠 **State**

📣 **Events**

🔄 **Flow of control**

Together they explain how the application moves from one situation to another.



---



# 🧠 Part 644 — What is state?

**State** is information describing the current condition of a running program or object.

For example, Navigation needs to know:

> Which section is active?

> Which Test Page item is active?

> Which notes chapter is active?

Those values can change over time.

Therefore they are part of the application's state.

Conceptually:

🧠 **State = information that can affect future behaviour.**



---



# 📸 Part 645 — State is like a snapshot

Imagine taking a snapshot of the navigation system at one moment.

It might conceptually say:

⬛ active section: Test Page

🧭 active item: SVG Terrain

At another moment:

⬛ active section: Project Notes

📚 active item: Chapter 12

The program is still the same program.

What changed is its:

🧠 **state**.



---



# 🔒 Part 646 — Not every value is state

A constant configuration value is not necessarily application state in the same sense.

For example, a fixed:

📏 hex diameter

used to construct one demo may simply be configuration.

But:

🎯 which menu item is currently selected

clearly represents changing runtime state.

A useful question is:

> ❓ **Does this information describe the current situation and influence what happens next?**

If yes, it is probably state.



---



# 🧭 Part 647 — Navigation contains persistent state

`Navigation` is a good stateful object.

It remembers different active selections.

This matters because the object remains alive between user actions.

Conceptually:

🚀 application starts

⬇️

🧭 Navigation object created

⬇️

🎯 initial state established

⬇️

⏳ waits

⬇️

🖱️ user selects something

⬇️

🧠 state changes

⬇️

⏳ waits again.

The object preserves information across time.



---



# 🧱 Part 648 — State belongs with the behaviour that manages it

The active navigation state is stored inside `Navigation`.

That is a sensible ownership relationship because `Navigation` also contains operations that manipulate that state.

So:

🧠 active navigation data

- \


⚙️ navigation behaviour

live together.

This is a central object-oriented idea:

> 🧱 **Keep related state and behaviour together when they form one coherent responsibility.**



---



# 🔐 Part 649 — Encapsulation protects state

If every other object freely changed Navigation's internal fields, it would become difficult to reason about valid states.

Instead, state changes occur through controlled methods.

Conceptually:

❌ external code:

“Directly rewrite all internal fields.”

Better:

✅ external code:

“Switch to this section.”

Then Navigation can decide what internal changes are necessary.

This is encapsulation protecting state transitions.



---



# 🔄 Part 650 — A state transition

A **state transition** means moving from one valid state to another.

For example:

🎯 Test Page active

⬇️ user chooses Project Notes

📚 Project Notes active

This can be written abstractly as:

**State A**

→ event/action →

**State B**

Many interactive programs can be understood as systems of state transitions.



---



# 🧠 Part 651 — The application can be viewed as a small state machine

A **state machine** is a model in which:

🧠 the system has a current state

📣 something happens

🔄 the state changes according to rules.

The Test App is not implemented as a formal state-machine framework.

But parts of it can be understood this way.

For the header:

**Test**

⇄

**Notes**

The user's selection determines the transition.



---



# 🧭 Part 652 — Navigation has nested state

The sidebar state is slightly more interesting.

There is:

1️⃣ current section

and:

2️⃣ active item inside each section.

Conceptually:

🧠 Navigation state

├── active section\
├── active Test Page item\
└── active notes item

This allows the application to remember separate selections for separate sections.

That is more sophisticated than storing only one universal active menu ID.



---



# 💾 Part 653 — Why remember separate selections?

Suppose:

🧪 Test Page

has:

🔗 Neighbours

selected.

Then the user switches to:

📚 Project Notes

and selects:

📖 Chapter 15.

If the application remembers both selections, switching back can conceptually restore:

🔗 Neighbours.

The state model therefore preserves useful context for each section.

This is a good example of designing state around user-interface meaning.



---



# 📣 Part 654 — What is an event?

An **event** represents something that happened.

Examples include:

🖱️ click

🖱️ mouseenter

🖱️ mouseleave

The browser detects these occurrences and can notify registered JavaScript functions.

Conceptually:

🌐 browser

detects:

🖱️ interaction

⬇️

📣 creates/distributes event

⬇️

⚙️ listener executes.

This is the foundation of event-driven browser programming.



---



# 👂 Part 655 — Event listeners express interest

A program can register an event listener.

Conceptually:

> 👂 **When this particular event happens to this element, run this function.**

The program does not need to repeatedly check the mouse position manually.

Instead:

⚙️ register listener once

⬇️

⏳ wait

⬇️

🌐 browser detects event

⬇️

📣 browser calls listener.

This inversion is central to graphical user interfaces.



---



# 🔄 Part 656 — Flow of control changes in event-driven programs

In a simple sequential program, the programmer largely controls the order:

1️⃣ do A

2️⃣ do B

3️⃣ do C

4️⃣ finish.

In an event-driven application:

1️⃣ initialize

2️⃣ register behaviour

3️⃣ wait

4️⃣ user does something

5️⃣ event handler runs

6️⃣ wait again

So after startup, the **user and browser events strongly influence what executes next**.



---



# 🌐 Part 657 — The browser owns the outer event loop

The application does not contain a giant loop such as:

> Check whether Test Page was clicked.

> Check whether Project Notes was clicked.

> Check whether mouse entered a hexagon.

> Repeat forever.

The browser provides the runtime environment that processes events.

Application code registers callbacks for events it cares about.

Conceptually:

🌐 Browser event system

↙️　　　↓　　　↘️

🖱️ click　mouseenter　mouseleave

↓　　　　　↓　　　　　↓

⚙️ handlers execute when needed.



---



# 🔘 Part 658 — Header button click flow

Consider a top-level navigation click.

👤 user clicks **Project Notes**

⬇️

🌐 browser dispatches `click`

⬇️

⬛ Header's event handler runs

⬇️

🧠 Header updates active section

⬇️

🎨 active button classes update

⬇️

📣 callback informs App

⬇️

🏗️ App coordinates the rest of the change.

One physical action causes a chain of software events and state changes.



---



# 🔗 Part 659 — A callback continues the control flow

The browser event handler does not need to perform the entire application update itself.

Instead it can invoke a callback.

So control moves:

🌐 browser

⬇️

⬛ Header

⬇️

📣 callback

⬇️

🏗️ App

This is an important idea:

> 🔄 **Control can move between components through function calls rather than one component directly manipulating the entire system.**



---



# 🏗️ Part 660 — App translates an event into coordinated actions

Once App receives the section-selection notification, it can coordinate:

⬛ Header state

🧭 Navigation section

📄 DemoArea content.

This separates:

📣 **what happened**

from:

🏗️ **what the whole application should do about it**.

Header knows:

> “A section was selected.”

App knows:

> “That means several components must now be synchronized.”



---



# 🔄 Part 661 — Synchronization matters

A user-interface state can become inconsistent if components disagree.

Imagine:

⬛ header says **Project Notes**

but:

🧭 sidebar still shows Test Page demos

and:

📄 main area still shows SVG Terrain.

Each component individually works, but the application as a whole is inconsistent.

Coordination exists partly to keep related states synchronized.



---



# 🎯 Part 662 — One logical state can have several visual representations

When a section becomes active, that fact appears in several ways:

🧠 internal state says:

**notes**

⬇️

⬛ header button receives active styling

⬇️

🧭 sidebar displays note items

⬇️

📄 content displays a note.

These are different manifestations of one broader application situation.

This is why state management becomes increasingly important as interfaces grow.



---



# 🎨 Part 663 — State and DOM should correspond

The application often follows this relationship:

🧠 state

⬇️

🌳 DOM state

⬇️

🎨 visual state.

For example:

🧠 active item ID

⬇️

🏷️ matching button gets `is-active`

⬇️

🎨 CSS displays green active state.

If the internal state changes without updating the DOM, the screen becomes stale.

If the DOM changes without updating internal state, program logic may become stale.

Keeping them aligned is essential.



---



# 🔄 Part 664 — Two update strategies appear in the Test App

The application demonstrates two broad approaches to updating the DOM.

### 🏗️ Rebuild/replace

Create new DOM content and replace old content.

### 🎯 Targeted mutation

Find existing elements and modify only particular properties.

Both approaches are useful.



---



# 🏗️ Part 665 — Replacing content

`DemoArea` can replace the current demo content with the element returned by another Demo.

Conceptually:

🗺️ old demo

⬇️

🗑️ remove/replace

⬇️

🏭 render new demo

⬇️

🌳 insert new content.

This is appropriate because switching demos represents a large content change.

There is little reason to manually transform every element of the old demo into the new one.



---



# 🎯 Part 666 — Targeted mutation

The Neighbours demo uses a different approach.

When the pointer enters the home hexagon, the entire grid does not need to be recreated.

Instead:

🔍 find relevant neighbour polygons

⬇️

🎨 modify their appearance.

This is a localized state change.

So targeted mutation is appropriate.



---



# ⚖️ Part 667 — Update granularity should match the change

This suggests a useful principle.

### Large conceptual change

🧭 switch from Single Hex to SVG Terrain

→ replace substantial content.

### Small visual change

🖱️ highlight six neighbours

→ update only affected elements.

The best update strategy often depends on the **granularity of the state change**.



---



# 🖱️ Part 668 — The Neighbours demo has transient interaction state

When the pointer enters the home cell:

✨ neighbours become highlighted.

When it leaves:

🌱 they return to normal.

This state is temporary.

It exists only while a particular interaction condition is true.

Conceptually:

🌱 normal

⬇️ `mouseenter`

✨ highlighted

⬇️ `mouseleave`

🌱 normal.

This is another tiny state machine.



---



# 🔁 Part 669 — Enter and leave are complementary events

The two event handlers form a pair.

```
mouseenter
```

activates a visual state.

```
mouseleave
```

restores the previous appearance.

This pairing is common in interactive interfaces.

Other conceptual pairs include:

focus / blur

press / release

open / close

select / deselect.

Thinking in transitions helps ensure both directions are handled.



---



# 🧠 Part 670 — Derived state

Some information does not need to be stored independently because it can be calculated from other state.

For example:

> Is this button active?

can be derived by comparing:

🆔 button ID

with:

🎯 active item ID.

Conceptually:

```
button.id === activeId
```

⬇️

true

⬇️

🎨 add active appearance.

This is called **derived state**.



---



# ⚠️ Part 671 — Duplicating state can create inconsistency

Suppose the application stored both:

🎯 `activeId`

and:

🔘 `buttonIsActive`

as unrelated mutable state.

Now two pieces of information must remain synchronized.

If one changes without the other:

❌ inconsistent state.

Whenever information can be reliably derived from another authoritative value, storing another independent copy may be unnecessary.



---



# 📍 Part 672 — Single source of truth

This connects to the idea of a:

**single source of truth**.

For example:

📍 the coordinate is authoritative domain data.

From it the application can derive:

🏷️ `hex-4-6`

rather than separately maintaining an unrelated ID mapping.

Likewise:

🎯 active item ID

can determine:

🎨 which button receives `is-active`.

Derived values reduce synchronization problems.



---



# 🧮 Part 673 — Midgard itself is a source of truth for grid rules

The same principle appears at a larger architectural level.

The Test App does not store a second independent definition of neighbour relationships.

Instead:

📦 Midgard

is the source of truth.

The demo asks:

```
getNeighbours(...)
```

and visualizes the returned result.

This prevents application state from drifting away from library domain rules.



---



# 🧠 Part 674 — State should have a clear owner

A useful question for every mutable value is:

> ❓ **Who owns this state?**

Examples:

⬛ active top-level section

→ Header/App coordination

🧭 active sidebar item

→ Navigation

📍 Midgard geometry

→ library-generated domain data

✨ neighbour highlight

→ interactive demo.

Unclear ownership often leads to multiple components trying to modify the same information.

That makes behaviour harder to predict.



---



# 🔌 Part 675 — Events should cross boundaries through meaningful messages

A component does not always need to expose raw browser events to the rest of the application.

For example, the meaningful application event may be:

📣 **section selected**

rather than:

🖱️ **MouseEvent with coordinates and browser details**.

This is a useful abstraction.

The component can translate:

🌐 low-level browser event

into:

🧠 high-level application meaning.



---



# 🔄 Part 676 — Low-level event → application event

Conceptually:

🖱️ browser click

⬇️

🔘 button handler

⬇️

🧠 determine selected section

⬇️

📣 callback with `HeaderSection`

The rest of the application receives:

**what the click meant**

rather than every low-level detail about the physical event.

This reduces coupling to browser mechanics.



---



# 🧩 Part 677 — Event handlers should remain focused

An event handler is easier to understand when it performs a coherent response.

For example:

🖱️ button clicked

⬇️

🎯 establish selected item

⬇️

🎨 update active appearance

⬇️

📣 notify interested component.

If the same handler also performed unrelated operations such as:

📐 hex geometry

📄 Markdown parsing

🌲 tree drawing

then responsibilities would become tangled.

Events do not remove the need for clean separation.



---



# ⏱️ Part 678 — Events happen over time

Traditional code reading often encourages thinking spatially:

> Which line comes after this line?

Interactive code also requires thinking temporally:

> What happens now?

> What remains stored?

> What happens when the user acts later?

This temporal perspective is important.

For example:

🚀 object created now

⬇️

👂 listener registered now

⬇️

⏳ ten seconds pass

⬇️

🖱️ user interacts later

⬇️

⚙️ callback executes using still-existing state.

Browser programming is programming **across time**.



---



# 🪝 Part 679 — Closures connect different moments in time

A callback can remember values from when it was created.

This allows:

📦 data available during setup

to remain accessible when:

🖱️ an event occurs later.

So closures provide a bridge:

**setup time**

➡️ **event time**.

This is one reason arrow functions and callbacks are so common in JavaScript user interfaces.



---



# 🌳 Part 680 — DOM elements can also carry useful identity

The application sometimes stores identity directly in the DOM.

Examples include:

🏷️ `data-section`

🏷️ `data-id`

🆔 SVG IDs.

This lets event and update logic connect visible elements back to application concepts.

Conceptually:

🔘 DOM button

contains:

🏷️ application identity

⬇️

🖱️ event occurs

⬇️

⚙️ code determines what that element represents.



---



# 🧳 Part 681 — `dataset` provides custom element metadata

HTML supports:

```
data-*
```

attributes.

JavaScript exposes these through:

**`dataset`**.

This is useful when an element needs lightweight application-specific metadata.

For example, a navigation button can carry information representing:

🧭 which section

or:

🆔 which item

it corresponds to.

The DOM element therefore becomes connected to the application's data model without changing its semantic HTML role.



---



# ⚖️ Part 682 — DOM state versus application state

Not all information should necessarily live in the DOM.

The DOM is excellent for:

🌳 document structure

🏷️ element identity

🎨 visual classes

🧳 lightweight element metadata.

Application objects are often better for:

🧠 behavioural state

📦 domain objects

🔗 relationships

⚙️ program logic.

The Test App uses both.

The important question is not:

> “Should all state be in TypeScript?”

or:

> “Should all state be in the DOM?”

It is:

> **Where does this information naturally belong?**



---



# 🔄 Part 683 — Flow of control through the whole application

A complete Test Page selection can be written as:

👤 **User**

⬇️ clicks

🧭 **Navigation button**

⬇️ browser event

⚙️ **Navigation handler**

⬇️ updates state

🎯 **active item**

⬇️ callback

🏗️ **App**

⬇️

📄 **DemoArea.show()**

⬇️

🏭 **create Demo**

⬇️

🎨 **Demo.render()**

⬇️

📦 **Midgard calls if needed**

⬇️

🌳 **DOM/SVG**

⬇️

🎨 **CSS**

⬇️

👁️ **new visible state**

This is the application's flow of control from interaction to result.



---



# 🔁 Part 684 — Then control returns to waiting

After the update finishes, the application does not terminate.

It returns conceptually to:

⏳ **waiting for the next event**.

So the larger runtime cycle is:

🚀 initialize

⬇️

👁️ display

⬇️

⏳ wait

⬇️

📣 event

⬇️

🧠 update state

⬇️

🌳 update interface

⬇️

⏳ wait

⬇️

📣 next event

⬇️

…

This is the heartbeat of an interactive browser application.



---



# 🧠 Part 685 — The user drives much of the program order

After initialization, the exact order of actions is not predetermined.

The user might choose:

⬡ Single Hex

then:

🌲 SVG Terrain

then:

📚 Project Notes

then:

🔗 Neighbours.

Or an entirely different order.

The program must remain valid regardless of the permitted sequence of interactions.

That is why clear state management is so important in interactive software.



---



# 🧪 Part 686 — State transitions are valuable testing targets

Stateful behaviour naturally suggests tests.

For example:

Given:

🧭 Test Page is active

When:

📚 notes section is selected

Then:

🎯 notes should become active.

Or:

Given:

🌱 neighbours are normal

When:

🖱️ pointer enters home

Then:

✨ neighbour highlighting should appear.

Thinking in:

**Given → When → Then**

is a useful way to describe behaviour driven by state transitions.



---



# 🐛 Part 687 — Many UI bugs are state synchronization bugs

Common interface problems include:

❌ wrong button appears active

❌ content does not match selected menu

❌ switching sections loses unexpected state

❌ highlight remains after interaction ends

❌ DOM says one thing while internal state says another.

These are often not drawing problems.

They are problems with:

🧠 state

🔄 transitions

or:

🔗 synchronization.

Recognizing this makes debugging more systematic.



---



# 🔍 Part 688 — Debugging state means asking precise questions

When an interface behaves incorrectly, useful questions include:

1️⃣ What was the state before the event?

2️⃣ Which event occurred?

3️⃣ Which handler received it?

4️⃣ Which state changed?

5️⃣ Which callback ran?

6️⃣ Which DOM elements were updated?

7️⃣ Does the visible UI now match the internal state?

This follows the same chain as the application itself.



---



# 🧭 Part 689 — State flow should be understandable

For a small application, one of the best qualities a state architecture can have is:

> 🧭 **It is possible to follow where a change came from and where it goes.**

The Test App's general flow is relatively explicit:

event

→ component

→ callback

→ App

→ target component.

This can be easier to reason about than state changes occurring invisibly from many unrelated locations.



---



# 🌱 Part 690 — More sophisticated state systems are not automatically better

Large frontend applications sometimes use dedicated state-management libraries.

Those can solve real problems.

But this Test App currently has relatively modest state requirements.

Its state can be managed through:

🏗️ objects

🔒 private fields

📣 callbacks

🌳 DOM updates.

Introducing a large state framework without a real need could make the application harder rather than easier to understand.

Again:

> 🧠 **Architecture should match the scale of the problem.**



---



# 🎯 Chapter 21 — The central idea

The Test App is an **event-driven, stateful browser application**.

Its behaviour can be understood through a repeating cycle:

🧠 **State describes the current situation**

⬇️

📣 **An event occurs**

⬇️

⚙️ **A handler interprets the event**

⬇️

🔄 **State changes**

⬇️

🌳 **The DOM is updated**

⬇️

🎨 **The browser displays the new state**

⬇️

⏳ **The application waits for another event**

Several important design principles follow:

🔒 state should have a clear owner

📣 components should communicate meaningful events

🎯 derived information should not be duplicated unnecessarily

🔄 state and visible DOM should remain synchronized

🧱 large changes can rebuild content

🎯 small changes can update targeted elements

📦 domain rules should remain authoritative in Midgard

The deepest mental model is:

> 🧠 **Interactive programming is programming across time.**

The source code defines what *can* happen.

The current state records what *is true now*.

Events determine what happens *next*.

And the browser continually turns those changing states into the interface visible on screen.
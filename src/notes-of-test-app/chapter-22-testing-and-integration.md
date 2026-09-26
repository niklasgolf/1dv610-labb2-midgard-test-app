## Chapter 22 — Testing the Test App and Understanding Integration

### 🧪 Part 691 — The Test App is itself a form of testing

The Midgard library has automated tests.

But the Test App provides another kind of verification.

It asks practical questions such as:

⬡ Can a returned hexagon actually be rendered?

🗺️ Does a complete grid visually fit together?

🎨 Can individual hexagons be targeted with CSS?

🌲 Can the geometry support detailed SVG terrain?

🔗 Do calculated neighbours appear in the expected spatial positions?

This makes the Test App a form of **integration and visual verification**.

It does not replace automated tests.

It examines the software from another perspective.



---



# 🧩 Part 692 — Unit testing and integration testing answer different questions

A **unit test** normally examines a relatively small piece of behaviour in isolation.

For example:

📍 coordinate

⬇️

🔗 `getNeighbours()`

⬇️

📚 expected coordinate list.

The important question is:

> 🧪 **Does this operation return the expected result?**

Integration testing asks a broader question:

> 🔗 **Do several parts work correctly together?**

The Test App naturally exercises these integrations.



---



# 🔗 Part 693 — What is being integrated?

Consider the Neighbours demo.

It combines:

📦 Midgard

🔗 neighbour calculation

📍 coordinate data

⚙️ TypeScript application logic

🏷️ DOM IDs

🔷 SVG polygons

🖱️ browser events

🎨 visual highlighting.

A unit test of `getNeighbours()` may prove that the mathematical result is correct.

But the interactive demo also checks whether that result can travel through the rest of the system successfully.



---



# 🧱 Part 694 — Integration means crossing boundaries

An integration point exists where one part of the system communicates with another.

The Test App contains many such boundaries:

🖥️ Test App ↔ 📦 Midgard

🧭 Navigation ↔ 🏗️ App

🏗️ App ↔ 📄 DemoArea

📄 DemoArea ↔ 🧩 Demo

📄 DemoArea ↔ 📝 Marked

⚙️ TypeScript ↔ 🌳 DOM

📍 geometry ↔ 🔷 SVG

🌳 DOM ↔ 🎨 CSS.

Each boundary is a place where individually correct components can still fail to cooperate correctly.



---



# ⚠️ Part 695 — Correct parts can still produce a broken system

Suppose:

📦 Midgard correctly returns points.

And:

🔷 SVG polygons work correctly.

But the application converts the points into the wrong SVG string format.

Then:

✅ library correct

✅ browser correct

❌ integration incorrect.

This is why testing only isolated units cannot prove that the entire application works.

Interfaces between components matter.



---



# 🧪 Part 696 — The Single Hex demo is a small integration test

The Single Hex demo exercises a compact pipeline:

📦 `HexGrid`

⬇️

⬡ `createSingleHexagon()`

⬇️

📍 polygon points

⬇️

🔷 SVG polygon

⬇️

👁️ visible hexagon.

If the resulting hexagon appears correctly, several pieces have cooperated successfully.

This is more information than merely knowing that one mathematical helper returned numbers.



---



# ↔️ Part 697 — The grid demos test larger structures

The X-Dominated and Y-Dominated demos exercise more of the library.

They involve:

📐 orientation

🗺️ skeleton configuration

📚 multiple hexagons

🪜 z-index information

📍 many polygon points

📐 complete SVG bounds.

This checks whether the high-level library API can produce a coherent structure that a real consumer can use.



---



# 🎨 Part 698 — CSS Styling tests a different integration boundary

The CSS Styling demo adds:

🏷️ coordinate-derived SVG IDs

🏷️ shared CSS classes

🎨 stylesheet selectors.

The pipeline becomes:

📍 coordinate

⬇️

🏷️ SVG identity

⬇️

🔍 CSS selector

⬇️

🎨 fill

⬇️

👁️ terrain-like appearance.

This verifies something the library's mathematical unit tests do not need to test:

> Can library output be integrated naturally with ordinary web styling?



---



# 🌲 Part 699 — SVG Terrain tests expressive flexibility

The terrain demo asks a different architectural question:

> ❓ **Is the geometry sufficiently useful to support a richer graphical consumer?**

Midgard itself knows nothing about:

🌲 trees

🌊 waves

🏰 towers

✂️ clipping.

Yet the demo can build all of these on top of the returned geometry.

That is evidence about the flexibility of the library boundary.



---



# 🔗 Part 700 — Neighbours tests behaviour, not only appearance

The Neighbours demo goes further because it is interactive.

It verifies a chain:

📍 home coordinate

⬇️

📦 Midgard neighbour calculation

⬇️

🏷️ DOM identity

⬇️

🖱️ browser interaction

⬇️

✨ visual highlighting.

The result is not merely a picture.

The user can trigger behaviour and inspect the relationship dynamically.



---



# 👁️ Part 701 — Visual verification has strengths

Humans are very good at noticing certain spatial problems.

For example:

❌ a hexagon shifted incorrectly

❌ a strange gap between cells

❌ wrong orientation

❌ clipping outside a hexagon

❌ highlighting the wrong spatial neighbour

may be immediately obvious visually.

A visual demo therefore provides a useful kind of feedback for geometric software.



---



# ⚠️ Part 702 — Visual verification also has weaknesses

Human observation is not precise enough for every question.

A grid may **look** correct while a coordinate is mathematically wrong.

A polygon may appear aligned even though one floating-point value differs from the specification.

A human may simply fail to notice an error.

So:

👁️ “Looks right”

is useful evidence,

but not a substitute for:

🤖 exact assertions.



---



# 🤖 Part 703 — Automated tests are repeatable

An automated test can repeatedly ask:

> For this input, is the exact expected output returned?

The computer does not become tired.

It does not forget what happened yesterday.

It does not judge approximately.

So automated tests are excellent for:

🎯 exact rules

🔁 regression detection

📚 many cases

⚡ rapid repeated verification.



---



# 🔁 Part 704 — Regression testing

A **regression** occurs when previously working behaviour stops working after a change.

For example:

🔧 neighbour algorithm refactored

⬇️

something accidentally changes

⬇️

❌ old neighbour case now fails.

Automated tests are particularly valuable here.

They preserve expectations from earlier development.

Conceptually:

✅ behaviour established

⬇️

🧪 test records expectation

⬇️

🔧 future change

⬇️

🧪 test reruns

⬇️

✅ still works

or:

🚨 regression detected.



---



# 👁️ Part 705 — The Test App can reveal visual regressions too

Suppose a change preserves all mathematical outputs but accidentally alters:

🎨 CSS

📐 SVG viewBox

✂️ clipping

🏷️ DOM identity.

The library tests might still pass.

Opening the Test App could reveal:

❌ terrain clipped incorrectly

❌ grid positioned strangely

❌ active menu styling broken.

Different test surfaces catch different classes of problem.



---



# 🧱 Part 706 — A useful testing pyramid idea

Software testing is sometimes described as a pyramid.

At the broad conceptual level:

　　　　🔺 fewer broad tests

　　　🔗 integration

　　🤖 many focused tests

The exact proportions vary by project.

The important idea is that:

🧪 small tests

and:

🔗 broader tests

serve complementary purposes.

The Midgard project already demonstrates this distinction naturally.



---



# 🎯 Part 707 — Focused tests localize failures

Suppose a unit test specifically for:

```
getNeighbours()
```

fails.

That gives a strong clue:

🔗 neighbour calculation has a problem.

But suppose only the visual Neighbours demo appears wrong.

The problem could be in:

📦 neighbour calculation

🏷️ ID conversion

🔍 DOM selection

🎨 highlighting

🔷 SVG rendering.

Broad tests give confidence across systems, but focused tests often make failures easier to diagnose.



---



# 🔗 Part 708 — Integration tests catch broken contracts

Imagine Midgard changes a returned structure.

The library itself might still work internally.

But the Test App expects the previous public contract.

Now the consumer breaks.

This reveals an important purpose of integration testing:

> 🔗 **Verify that components still agree about their shared contract.**

This is especially important for libraries because their usefulness depends on consumers being able to rely on their public API.



---



# 📦 Part 709 — A library is defined partly by its consumer contract

From inside Midgard, a refactoring may seem harmless.

But if it changes:

🏷️ public names

📚 returned structures

⚙️ method signatures

📐 documented semantics

then consumers may be affected.

The Test App is valuable because it behaves like a real consumer.

It exercises the library from the outside.



---



# 🧪 Part 710 — The Test App is a consumer test environment

This gives the Test App an important role:

📦 Midgard says:

> “This is my public API.”

The Test App replies:

> “Then I will use that API as an external application would.”

That provides practical pressure toward a clean API.

If every demo needs awkward workarounds, the problem may not be the demos.

It may reveal friction in the library design.



---



# 📚 Part 711 — Examples can test usability

Traditional tests often ask:

> Is the output correct?

Examples can additionally reveal:

> Is the API understandable?

For example:

```
createSingleHexagon({ hexDiameter: 300 })
```

communicates its purpose fairly directly.

Likewise:

```
createGrid(...)
```

expresses a high-level operation.

A demo that can use the API clearly becomes evidence about developer usability.



---



# 🧠 Part 712 — Correctness has several dimensions

For this project, correctness can be considered at several levels.

### 🧮 Mathematical correctness

Are coordinates and geometry correct?

### 📦 API correctness

Does the library return what its public contract promises?

### 🔗 Integration correctness

Can the consumer use those results correctly?

### 🎨 Presentation correctness

Does the browser display the intended result?

### 🖱️ Interaction correctness

Does user interaction produce the intended behaviour?

One testing technique rarely covers all five equally well.



---



# 🔍 Part 713 — Testing should follow responsibility boundaries

The architecture itself suggests where tests belong.

📦 Midgard domain rules

→ library tests

🧭 navigation state

→ application/component tests if needed

🔗 component cooperation

→ integration tests

👁️ visual appearance

→ visual/manual inspection or visual testing techniques

🖱️ browser interaction

→ interaction tests and/or manual demonstration.

Good testing often mirrors the architecture.



---



# 🎯 Part 714 — Test observable behaviour

A useful testing principle is:

> 🎯 **Prefer testing meaningful observable behaviour rather than internal implementation details.**

For example, if the important rule is:

> `(4,6)` has these six neighbours,

then the test should care about the returned neighbours.

It generally should not need to care exactly which private helper calls occurred internally.

That leaves implementation freedom.



---



# 🔒 Part 715 — Private implementation should be allowed to change

Suppose neighbour calculation is refactored internally.

If:

📥 same valid input

still produces:

📤 same promised result,

then consumers should not care how the implementation changed.

Tests tied too tightly to internal details can make safe refactoring unnecessarily difficult.

This connects testing directly to encapsulation.



---



# 🧩 Part 716 — Public behaviour is the stable boundary

A strong library test often focuses on:

📥 public input

⬇️

📦 public API

⬇️

📤 public result.

That is also how a consumer sees the library.

So testing the public contract aligns:

🧪 testing

with:

📦 API design

and:

🔒 encapsulation.



---



# 🐛 Part 717 — When a visual demo fails, work backward through the pipeline

Suppose a hexagon does not appear.

A systematic debugging path is:

👁️ Is the SVG visible?

⬆️

🔷 Was the polygon inserted?

⬆️

📍 Does it have valid points?

⬆️

📦 Did Midgard return the expected hexagon?

⬆️

⚙️ Was the correct Demo created?

⬆️

🧭 Was the correct MenuItem selected?

This is far more effective than randomly changing code.



---



# 🔍 Part 718 — Debugging follows dependency direction in reverse

Normal execution might be:

🧭 Navigation

→ 📄 DemoArea

→ 🧩 Demo

→ 📦 Midgard

→ 🔷 SVG

→ 👁️ screen.

Debugging a visible failure often travels backward:

👁️ screen problem

→ 🔷 inspect SVG

→ 📍 inspect geometry

→ 📦 inspect library result

→ 🧩 inspect demo

→ 📄 inspect routing.

Understanding architecture therefore directly improves debugging.



---



# 🧪 Part 719 — Small demos isolate concepts visually

The menu design also helps debugging because demos are deliberately focused.

⬡ Single Hex isolates one shape.

↔️ X-Dominated Grid isolates one orientation.

↕️ Y-Dominated Grid isolates the other.

🎨 CSS Styling isolates selector-based styling.

🌲 SVG Terrain isolates richer graphics.

🔗 Neighbours isolates interaction and neighbour relationships.

This reduces the number of possible causes when something looks wrong.



---



# 🧠 Part 720 — A showcase can double as a diagnostic tool

A demo page is often thought of as marketing or presentation.

But a well-designed showcase can also be diagnostic.

For example:

If:

⬡ Single Hex works

but:

↔️ X Grid fails,

then the problem probably lies beyond basic single-hex geometry.

If:

🗺️ grids work

but:

🎨 CSS Styling fails,

the issue may be in the application styling/identity layer rather than core grid creation.

The demos form a rough ladder of increasing integration complexity.



---



# 🪜 Part 721 — The demos form an integration ladder

The progression can be viewed as:

### 1️⃣ Home

application shell

⬇️

### 2️⃣ Single Hex

basic library geometry + SVG

⬇️

### 3️⃣ X/Y Grid

multiple hexagons + layering

⬇️

### 4️⃣ CSS Styling

DOM identity + CSS

⬇️

### 5️⃣ SVG Terrain

complex graphical composition

⬇️

### 6️⃣ Neighbours

domain relationship + interaction

Each step introduces additional cooperating systems.

That makes the menu pedagogically useful as well as visually useful.



---



# 📚 Part 722 — Documentation adds another verification layer

The Library Notes explain what the code is intended to do.

That creates another useful relationship:

📚 documentation says:

> This is the intended behaviour.

🧪 tests say:

> This behaviour is verified programmatically.

🖥️ demos say:

> This behaviour can be observed in a consumer.

When these agree, understanding and confidence improve.

When they disagree, something needs investigation.



---



# ⚠️ Part 723 — Documentation can also become stale

Documentation is not automatically correct forever.

Suppose the API changes but a chapter still describes the old behaviour.

Then:

📦 implementation

and:

📚 documentation

disagree.

The same applies to examples.

So documentation is part of the project's maintenance responsibility.

Executable demos have one advantage: if an API changes incompatibly, they may stop compiling or running, making the mismatch more obvious.



---



# 🔄 Part 724 — Compilation itself catches integration problems

Because the Test App is written in TypeScript and imports Midgard types, some API mismatches can be detected before runtime.

For example, if a public method signature changes incompatibly:

📦 library changes

⬇️

🖥️ consumer code no longer matches

⬇️

🧠 TypeScript detects mismatch

⬇️

🚨 development/build error.

Static typing therefore provides another layer of verification between library and consumer.



---



# 🛡️ Part 725 — Several safety nets cooperate

The project can therefore have multiple safety nets:

🧠 **TypeScript**

catches many structural/type problems.

🤖 **Vitest**

checks exact automated behaviour.

🖥️ **Test App**

checks practical consumer integration.

👁️ **visual inspection**

checks spatial and presentation behaviour.

📚 **documentation**

records intended concepts and usage.

No single layer proves everything.

Together they provide stronger confidence.



---



# 🎯 Part 726 — Tests should make refactoring safer

One major purpose of testing is not merely proving today's code works.

It is enabling tomorrow's changes.

Suppose internal code is cleaned up.

Without tests:

😟 “Hopefully nothing broke.”

With meaningful tests:

🔧 refactor

⬇️

🤖 run tests

⬇️

🖥️ inspect relevant integration demos

⬇️

✅ greater confidence.

Testing therefore supports maintainability.



---



# 🧹 Part 727 — Refactoring and behaviour

**Refactoring** means changing the internal structure of code without intentionally changing its observable behaviour.

For example:

🧹 extract helper method

🏷️ improve internal name

🧩 reorganize responsibilities

while preserving:

📥 inputs

📤 outputs

and:

🖱️ expected behaviour.

Tests help establish whether that behavioural contract remains intact.



---



# 🔒 Part 728 — Good tests permit implementation freedom

A paradox appears:

Tests can either:

🛡️ make refactoring safer

or:

⛓️ make refactoring painful.

The difference often depends on what they test.

Tests focused on meaningful public behaviour provide protection while allowing internals to evolve.

Tests tightly coupled to every internal implementation step can resist harmless changes.

So test design matters as much as test quantity.



---



# 🧪 Part 729 — More tests does not automatically mean better testing

A project with 1,000 weak tests may provide less confidence than a smaller collection of carefully chosen tests.

Useful tests should cover meaningful:

📐 rules

⚠️ edge cases

🔄 transitions

📦 public contracts

🐛 regression risks.

Testing quality is about the relationship between tests and important behaviour, not merely a count.



---



# 🎯 Part 730 — Confidence should be evidence-based

The purpose of the testing system is ultimately:

> 🛡️ **Provide evidence that important behaviour works as intended.**

Different evidence answers different questions:

🤖 assertions

→ exact computational evidence

🧠 type checking

→ structural evidence

🖥️ running demos

→ integration evidence

👁️ visual inspection

→ presentation evidence.

Software quality improves when confidence comes from several relevant forms of evidence rather than assumption.



---



# 🧭 Part 731 — A practical verification flow after a change

A sensible conceptual workflow after modifying Midgard could be:

🔧 make change

⬇️

🧠 TypeScript checks

⬇️

🤖 run automated tests

⬇️

🏗️ build

⬇️

🖥️ open relevant Test App demo

⬇️

👁️ inspect behaviour

⬇️

✅ commit when confidence is sufficient.

Different changes may require different emphasis, but the layers complement one another.



---



# 🔗 Part 732 — The Test App validates separation itself

There is another subtle benefit.

The demos prove that Midgard can be consumed **without owning the rendering system**.

The library returns:

📍 geometry and domain information.

The consumer independently chooses:

🔷 SVG

🎨 CSS

🌲 terrain

🖱️ interaction.

That practical separation is stronger evidence than merely claiming in documentation:

> “The library is rendering-independent.”

The Test App demonstrates it.



---



# 📦 Part 733 — A second consumer could render differently

Because Midgard does not require SVG, another consumer could conceptually use:

🖼️ Canvas

🎮 WebGL

📊 another visualization system

or:

🧪 no graphics at all.

The current Test App uses SVG because it suits the demonstration.

That rendering choice belongs to the consumer.

This is precisely the kind of architectural property that a real consumer application can help validate.



---



# 🎯 Chapter 22 — The central idea

The Midgard project benefits from several different forms of verification.

### 🤖 Automated library tests

ask:

> **Are exact domain rules and outputs correct?**

### 🧠 TypeScript

asks:

> **Do the structures and contracts fit together as declared?**

### 🖥️ Test App

asks:

> **Can a real consumer actually use the library successfully?**

### 👁️ Visual and interactive inspection

asks:

> **Does the integrated result look and behave correctly?**

These approaches are complementary.

The Test App is particularly valuable because it crosses boundaries:

📦 library

→ ⚙️ TypeScript application

→ 🌳 DOM

→ 🔷 SVG

→ 🎨 CSS

→ 🖱️ interaction

→ 👁️ visible result.

That makes it both:

🎨 a showcase

📖 executable documentation

🧪 an integration environment

🔍 and a debugging aid.

The deeper lesson is:

> 🧠 **Software quality is not established by one test or one tool. Confidence grows when independent forms of evidence verify the system at different levels.**

Focused tests establish precise rules.

Integration demonstrates cooperation.

Visual inspection reveals spatial and presentation problems.

And a real consumer shows whether the public API is genuinely usable outside the library itself.
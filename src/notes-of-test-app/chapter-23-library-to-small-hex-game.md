## Chapter 23 — From Library Showcase to a Small Hex Game

### 🎮 Part 734 — The Test App already contains the foundations of a game

The current Test App is deliberately a **library showcase**, not a complete game.

Yet several demonstrations already contain concepts that appear in strategy games:

⬡ hexagonal cells

🗺️ grids

🌱 terrain

🌊 water

🌲 vegetation

🏰 buildings

🔗 neighbours

🖱️ interaction

📍 coordinates

🪜 rendering order

The interesting question is therefore:

> **How could the existing architecture grow into a small game without turning Midgard itself into a game engine?**

This is an architectural question more than a graphics question.



---



# 📦 Part 735 — Midgard should remain Midgard

The most important principle is that the Midgard library does not need to become aware of game concepts.

Midgard can continue knowing about:

📍 coordinates

⬡ hexagons

🔗 neighbours

📐 geometry

🪜 layers

while the future game knows about:

🌱 grass

🌲 forest

🌊 water

🏰 cities

🧙 units

⚔️ movement

🎯 selection

🛣️ roads.

Conceptually:

📦 **Midgard**

provides the world structure

⬇️

🎮 **Game**

adds game meaning.



---



# 🧠 Part 736 — Geometry is not gameplay

This distinction is fundamental.

Midgard may answer:

> 🔗 Which six coordinates neighbour `(4,6)`?

A game might answer:

> ⚔️ Which neighbouring cells may this unit move to?

Those questions are related, but they are not identical.

The first is geometric.

The second depends on game rules.

For example:

📦 Midgard says:

> `(5,7)` is a neighbour.

But the game may say:

> 🌊 `(5,7)` contains deep water, so this knight cannot move there.

The game builds rules on top of Midgard rather than changing Midgard's definition of neighbour.



---



# 🗺️ Part 737 — A game adds a world model

The current SVG Terrain demo assigns terrain directly from coordinates.

That is perfect for a demonstration.

A larger game would benefit from representing the world as actual data.

Conceptually:

📍 coordinate `(2,4)`

- \


🌱 terrain: grass

- \


🏰 structure: tower

- \


🧙 unit: none

This creates a distinction between:

⬡ **the geometric hexagon**

and:

🌍 **what exists on that hexagon**.



---



# 🧩 Part 738 — A cell can combine several concepts

A future game cell might conceptually contain:

📍 Coordinate

🌱 Terrain

🏰 Structure

🧙 Unit

🛣️ Road

These are separate ideas.

A forest is not a coordinate.

A coordinate is not a unit.

A tower is not a hexagon.

Instead:

📍 the coordinate identifies **where**

🌱 terrain describes **what the ground is**

🏰 structure describes **what is built there**

🧙 unit describes **who occupies it**.

This is domain modeling.



---



# 🌍 Part 739 — Midgard supplies space; the game supplies meaning

A useful mental model is:

📦 Midgard:

> **Where can things exist?**

🎮 Game:

> **What exists there, and what can it do?**

This separation allows the same Midgard coordinate system to support many different applications.

One consumer might create:

🎮 strategy game

another:

🗺️ map editor

another:

📊 scientific visualization.

The geometry remains reusable because application meaning stays outside it.



---



# 🌱 Part 740 — Terrain becomes domain data

In the current terrain demonstration, terrain type is a small local concept:

```
grass
water
tower
```

A game would probably distinguish ground terrain from structures more carefully.

For example:

🌱 grass

🌲 forest

⛰️ mountain

🌊 water

could be terrain.

While:

🏰 tower

🏘️ village

🌉 bridge

might be structures.

That distinction would allow richer rules later.



---



# 🧠 Part 741 — Domain modeling asks what things really are

A useful modeling question is:

> ❓ **Are these two things really the same kind of concept?**

If both `water` and `tower` are placed inside one `TerrainType`, the design is simple.

For a small demo, that is excellent.

But in a game:

🌊 water

describes the ground,

while:

🏰 tower

is something built on the ground.

The domain has become richer, so the model may need to become richer too.

Architecture can evolve as the problem becomes better understood.



---



# 🧱 Part 742 — A possible layered world

A future cell could be imagined visually as layers:

　　　　　🧙 **Unit**

　　　　　　⬆️

　　　　　🏰 **Structure**

　　　　　　⬆️

　　　　　🛣️ **Road**

　　　　　　⬆️

　　　　　🌲 **Terrain**

　　　　　　⬆️

　　　　　⬡ **Hex geometry**

　　　　　　⬆️

　　　　　📍 **Coordinate**

Each layer adds meaning.

This resembles the architecture of the application itself: specialized information is added on top of more general foundations.



---



# 🔗 Part 743 — Neighbours become the foundation for movement

The existing:

```
getNeighbours()
```

operation is especially valuable for a future game.

A movement system could begin:

🧙 unit at `(4,6)`

⬇️

📦 Midgard

⬇️

🔗 six geometric neighbours

⬇️

🎮 game rules

⬇️

🚶 legal destinations.

The game does not need to reinvent hex-grid adjacency.

It filters Midgard's result according to gameplay rules.



---



# 🚫 Part 744 — Geometric neighbour does not mean legal move

Suppose Midgard returns six neighbours.

The game could then ask:

🌊 Is destination water?

⛰️ Is it impassable mountain?

🧙 Is another unit occupying it?

🚪 Is entry allowed?

⚡ Does the unit have enough movement points?

So:

📦 geometric possibilities

⬇️

🎮 rule filtering

⬇️

✅ legal moves.

This is an excellent example of layering domain logic.



---



# 🧠 Part 745 — Different units could interpret the same grid differently

Imagine:

🧙 infantry

🚢 ship

🦅 flying unit.

Midgard gives all of them the same geometric neighbour relationships.

But game rules could interpret terrain differently.

For example:

🌊 water

Infantry → ❌

Ship → ✅

Flying unit → ✅

The geometry remains constant.

Behaviour varies at the game layer.

This is exactly why keeping geometry and gameplay separate is powerful.



---



# 🎯 Part 746 — Selection would introduce explicit game state

A game would need to remember things such as:

🎯 selected cell

🧙 selected unit

🔗 possible destinations

🔄 current turn

👤 current player.

These are game states.

The Test App already demonstrates simpler state concepts through:

🧭 navigation

and:

✨ neighbour highlighting.

So the transition from showcase to game would introduce more state, but not an entirely new programming idea.



---



# 🖱️ Part 747 — Hover could become selection

Currently:

🖱️ pointer enters home

⬇️

✨ neighbours highlight.

A game might instead use:

🖱️ click unit

⬇️

🎯 unit becomes selected

⬇️

📦 get neighbours

⬇️

🎮 calculate legal moves

⬇️

✨ legal destinations highlight.

The existing Neighbours demo is therefore conceptually close to a basic movement-selection system.



---



# 🔄 Part 748 — A second click could perform an action

The next interaction might be:

✨ legal destination displayed

⬇️

👤 clicks destination

⬇️

🎮 validate move

⬇️

🧙 update unit position

⬇️

🧠 update game state

⬇️

🔷 update rendering.

This follows exactly the event/state cycle from Chapter 21:

📣 event

→ 🧠 state change

→ 🌳 visual update.



---



# 🧮 Part 749 — Game state should be authoritative

A crucial architectural principle would be:

> 🎮 **The visual SVG should represent the game state, not become the game state itself.**

For example, a unit should not conceptually exist merely because an SVG drawing happens to be positioned over one hexagon.

Instead:

🧠 game state says:

> unit is at `(4,6)`

Then rendering produces:

🧙 SVG unit at the geometric center of `(4,6)`.

So:

🧠 data

⬇️

🎨 rendering

not:

🎨 drawing

⬇️

🧠 infer entire game state.



---



# 📍 Part 750 — Coordinates provide stable logical identity

This is where Midgard coordinates become especially useful.

A unit can store:

📍 `(4,6)`

rather than:

❌ pixel position `x = 427.3, y = 318.9`.

Why?

Because the coordinate expresses the logical game location.

Midgard can calculate the graphical center when rendering is needed.

So:

🎮 game logic

uses:

📍 grid coordinates

while:

🎨 renderer

uses:

📐 pixel/SVG positions.

This keeps gameplay independent of display geometry.



---



# 🖥️ Part 751 — Logical position versus visual position

This distinction is fundamental in games.

### 🎮 Logical position

```
Coordinate { x, y }
```

means:

> Which cell contains the unit?

### 🎨 Visual position

SVG center coordinates mean:

> Where should the unit be drawn?

Midgard connects the two.

📍 logical coordinate

⬇️

📦 Midgard positioning

⬇️

🎯 geometric center

⬇️

🔷 SVG position.

The game should generally reason at the logical level.



---



# 🌲 Part 752 — Rendering can become richer without changing the model

Suppose a forest is represented in game state simply as:

🌲 `forest`.

The renderer might initially draw:

🌳 one simple tree.

Later it could draw:

🌲🌲🌲 several trees

shadows

textures

animation

without changing the fundamental game rule:

> This cell contains forest terrain.

That is another advantage of separating model and presentation.



---



# 🎨 Part 753 — The same model could support several visual themes

A game model might say:

🌊 water.

One renderer could display:

🔷 flat blue SVG.

Another could display:

〰️ animated waves.

Another could display:

🧊 frozen-looking northern water.

The domain meaning remains:

🌊 water.

Presentation can evolve independently.

This is the same principle already demonstrated by Midgard itself.



---



# 🏰 Part 754 — Structures can be separate renderable entities

The current tower is drawn directly as part of terrain rendering.

A richer architecture could conceptually treat:

🏰 tower

as a structure associated with a cell.

Then rendering could proceed:

⬡ draw terrain

⬇️

🛣️ draw road

⬇️

🏰 draw structure

⬇️

🧙 draw unit

⬇️

✨ draw selection/highlight.

This creates predictable visual layering.



---



# 🪜 Part 755 — Midgard's z-index can support rendering order

Midgard already returns:

```
LayeredHexagon
```

with:

**`zIndex`**.

This provides useful information about ordering hexagon rows.

A game renderer could combine that with application-level layers.

Conceptually:

📦 Midgard row order

- \


🎮 object layer

⬇️

🎨 final rendering order.

The library provides spatial ordering.

The game decides what objects occupy that space.



---



# 🧠 Part 756 — Rendering order is not the same as game importance

A unit may be visually drawn above terrain.

That does not mean the unit is conceptually “more important” in the domain.

Rendering order answers:

> 🎨 What should visually overlap what?

Game logic answers:

> 🎮 What rules govern these objects?

These concerns should remain distinct.



---



# 🛣️ Part 757 — Roads introduce relationships between cells

A road is interesting because it may not belong conceptually to only one point.

It may connect:

📍 cell A

and:

📍 cell B.

This introduces another kind of domain relationship.

The game could ask:

> Is there a road between these neighbouring coordinates?

Midgard supplies:

🔗 neighbour relationship.

The game adds:

🛣️ road relationship.

Again, application semantics are layered onto geometry.



---



# 🌉 Part 758 — Bridges show why domain distinctions matter

A bridge might allow movement across terrain that would otherwise be blocked.

For example:

🌊 water

normally:

🧙 ❌ infantry movement.

But:

🌉 bridge

may change the rule:

🧙 ✅ movement permitted.

So game rules may depend on combinations:

📍 coordinate

- \


🌊 terrain

- \


🌉 structure

- \


🧙 unit type.

This demonstrates why game logic should not be hidden inside drawing functions.



---



# 🎨 Part 759 — Drawing functions should draw

A method such as:

```
drawTower()
```

should ideally remain concerned with:

> 🏰 **How should a tower look?**

It should not become responsible for deciding:

❌ whether a player owns the tower

❌ whether movement is permitted

❌ how much gold the tower produces

❌ whether the tower can attack.

Those belong to the game model and rules.

This is Single Responsibility applied to game architecture.



---



# 🧠 Part 760 — Game rules should work without SVG

A useful architectural test is:

> ❓ **Could the game rules run without rendering anything?**

Ideally:

yes.

For example, the program should be able to calculate:

🧙 unit at `(4,6)`

⬇️

🔗 neighbours

⬇️

🌊 terrain restrictions

⬇️

✅ legal destinations

without creating an SVG polygon.

That indicates that game logic and presentation are properly separated.



---



# 🧪 Part 761 — This would make game logic easier to test

If movement rules do not depend on the DOM, automated tests could say:

Given:

🧙 infantry at `(4,6)`

and:

🌊 water at `(5,7)`

When:

🚶 legal moves are calculated

Then:

❌ `(5,7)` should not be included.

No browser interaction is necessary for the rule test.

Then the Test App can separately demonstrate the result visually.

This mirrors the testing philosophy already used by Midgard.



---



# 🧱 Part 762 — A future architecture could add a game layer

The current architecture can conceptually grow into:

📦 **Midgard**

geometry and grid rules

⬆️

🎮 **Game domain**

terrain, units, structures, movement

⬆️

🎨 **Renderer**

SVG representation

⬆️

🖱️ **Interaction**

clicks, hover, selection

⬆️

👤 **Player**

This is a clean direction of dependency.

Higher layers depend on lower capabilities.

Lower layers do not need to know about higher-level meaning.



---



# 🔄 Part 763 — Interaction should request changes, not secretly rewrite the world

Suppose the player clicks a destination.

A clean flow would be:

🖱️ click

⬇️

📣 request move

⬇️

🎮 game logic validates request

⬇️

🧠 game state changes

⬇️

🎨 renderer reflects new state.

The click handler should not simply drag the SVG unit somewhere and declare the move complete.

Game rules should remain authoritative.



---



# 🛡️ Part 764 — Validation belongs before mutation

A move request might be invalid.

For example:

❌ destination not neighbouring

❌ water blocked

❌ occupied cell

❌ wrong player's unit.

So:

📣 requested action

⬇️

🧪 validate

⬇️

either:

❌ reject

or:

✅ update state.

This protects domain invariants.

The same general principle appears in Midgard's coordinate validity rules.



---



# 🔒 Part 765 — Games contain invariants too

A future game might define invariants such as:

> A unit occupies exactly one cell.

> Two exclusive units cannot occupy the same cell.

> A land unit cannot end movement on deep water.

> A structure belongs to a valid cell.

> Selected coordinates must exist in the world.

These rules should be enforced by the game domain rather than merely assumed by the renderer.



---



# 🧩 Part 766 — Domain classes could emerge naturally

As the game becomes richer, concepts might deserve their own classes or types.

For example:

🌍 `GameMap`

🌱 `Terrain`

🧙 `Unit`

🏰 `Structure`

🎯 `Selection`

🚶 `Movement`

But these should emerge because the domain requires them.

The goal is not:

> “Create many classes because this is OOP.”

The goal is:

> 🧠 **Give important concepts clear representations and responsibilities.**



---



# ⚖️ Part 767 — Not every concept needs a class

A terrain category might be perfectly represented by a union type.

For example conceptually:

🌱 grass

🌲 forest

🌊 water

⛰️ mountain.

If terrain contains little behaviour, a lightweight type may be enough.

A class becomes more useful when a concept has meaningful:

🧠 state

⚙️ behaviour

🔒 invariants

or:

🧩 identity.

Good OOP does not mean turning every noun into a class.



---



# 🗺️ Part 768 — A map is more than an array of graphics

A future `GameMap` concept might own questions such as:

> What terrain exists at this coordinate?

> Is there a structure here?

> Which unit occupies this cell?

It would represent the logical world.

The SVG would then be a **view** of that world.

Conceptually:

🌍 GameMap

⬇️

🎨 render

⬇️

🔷 SVG map.

This separation becomes increasingly important as interaction grows.



---



# 🔄 Part 769 — Re-rendering from state becomes possible

If game state is authoritative, the entire visual map can theoretically be reconstructed from it.

For example:

🧠 current game state

⬇️

🎨 renderer

⬇️

🔷 complete SVG.

This is a powerful property.

It means the visual representation is reproducible rather than containing hidden game information that exists nowhere else.



---



# 💾 Part 770 — Persistent game state becomes easier too

The same separation would later help persistence.

If the important game information exists as data:

📍 coordinates

🌱 terrain

🏰 structures

🧙 units

then it can potentially be serialized and stored.

Later:

💾 saved state

⬇️

📥 loaded

⬇️

🧠 game model reconstructed

⬇️

🎨 SVG regenerated.

The SVG itself does not need to be the saved game.



---



# 🎮 Part 771 — The current demos are prototypes of future systems

Several existing demos can be reinterpreted as small prototypes.

### ⬡ Single Hex

prototype of basic cell rendering.

### ↔️ / ↕️ Grid

prototype of map rendering.

### 🎨 CSS Styling

prototype of terrain/cell state appearance.

### 🌲 SVG Terrain

prototype of world visualization.

### 🔗 Neighbours

prototype of movement and interaction.

This does not mean they need to be rewritten immediately.

Their current simplicity is useful.



---



# 🧪 Part 772 — Prototypes help discover the domain

Small demos are valuable because they allow ideas to be explored before a large architecture is committed.

For example, the Neighbours demo proves:

📦 Midgard neighbour data

can be connected to:

🏷️ SVG identities

and:

🖱️ interaction.

That practical experiment provides knowledge.

Later architecture can be based on what has actually been learned.

This is preferable to designing an enormous game system entirely in advance.



---



# 🌱 Part 773 — Grow from working slices

A sensible evolution is:

1️⃣ render one hex

2️⃣ render a grid

3️⃣ style cells

4️⃣ add terrain

5️⃣ add interaction

6️⃣ add selection

7️⃣ add movement

8️⃣ add units

9️⃣ add game rules.

Each stage creates a working vertical slice.

The system grows through functioning capabilities rather than a huge unfinished architecture.



---



# 🧠 Part 774 — This is compatible with Agile thinking

The progression naturally supports an iterative development style.

Instead of designing every future system first:

🔧 implement a small capability

⬇️

🧪 test it

⬇️

👁️ inspect it

⬇️

🧠 learn from it

⬇️

🔄 refine architecture

⬇️

➕ add next capability.

Architecture evolves alongside knowledge of the problem.

That is particularly useful for exploratory projects such as a small strategy game.



---



# 🚫 Part 775 — The Test App does not need to become a game immediately

The current v1.0 has an important purpose:

> 🧪 **Show and exercise the Midgard library clearly.**

Turning every demo immediately into a game system could obscure that purpose.

So it is useful to preserve the conceptual distinction:

### 🧪 Test Page v1.0

library showcase

### 🎮 possible later version

small application/game using the library.

The library demonstration remains valuable even after richer applications exist.



---



# 🧭 Part 776 — The existing architecture provides a good starting direction

The key relationships can remain:

📦 **Midgard**

provides geometry

⬇️

🎮 **application domain**

adds meaning and rules

⬇️

🎨 **renderer**

creates SVG

⬇️

🖱️ **interaction**

produces requests/events

⬇️

🧠 **domain state changes**

⬇️

🎨 **renderer updates**

This extends ideas already present in the current Test App rather than abandoning them.



---



# 🎯 Chapter 23 — The central idea

The current Test App already demonstrates many of the technical ingredients needed for a small hex-based game.

But the most important future step would not be adding more SVG graphics.

It would be introducing a clear **game domain layer** between Midgard and rendering.

The dependency should remain:

📦 **Midgard**

knows geometry

⬇️

🎮 **Game**

knows terrain, units, structures and rules

⬇️

🎨 **Renderer**

knows how those concepts look

⬇️

🖱️ **Interaction**

captures player actions

while state changes flow back through the game rules.

The essential separation is:

📍 **Coordinate**

is not:

🌱 **Terrain**

which is not:

🏰 **Structure**

which is not:

🧙 **Unit**

which is not:

🔷 **SVG drawing**.

Each represents a different concept.

Midgard provides the spatial foundation upon which those concepts can be built.

> 🧠 **A reusable library becomes powerful not by knowing every future application, but by providing a stable foundation upon which applications can add their own meaning.**

That is exactly what the existing Test App already begins to demonstrate.
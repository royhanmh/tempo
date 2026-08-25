# Tempo Design Direction

Dial: ENERGY 1 / RHYTHM 1 / MOTION 1

## Identity

Tempo is a personal timer workspace. One person, one screen, one timer that matters at a time. The design should feel like a quiet desk clock, not a productivity dashboard.

## Palette

Core neutrals (warm, not sterile):

- `tempo-bg` #F5F4F0 warm cream base. Reason: a pure white page reads clinical; cream reads calm and analog.
- `tempo-card` #FFFFFF panels. Reason: lifts content one elevation above the base without shadow noise.
- `tempo-border` #E5E3DC hairlines. Reason: separates surfaces with warmth instead of grey coldness.
- `tempo-text` #1C1D21 near-black charcoal. Reason: softer than pure black, matches the warm base.
- Dark mode mirrors these (#121316 / #1A1B1E / #292B31). Reason: timers get used at night; dark is a user choice via toggle, not a default.

Accent:

- Emerald green for "running/live" state only. Reason: one deliberate accent at the key moment (the active timer), nowhere else by default.

User-assigned category colors (green/orange/red/purple/blue) appear only on timer card left borders. Reason: they are data, not decoration. The user assigns them per timer to tell categories apart at a glance; the app itself never picks an accent color on its own.

## Typography

- Inter for UI text. Reason: neutral humanist sans, highly legible at small sizes, no personality competing with the numerals.
- Space Mono for all time digits (`font-mono-num`, tabular). Reason: monospaced tabular digits prevent layout jitter as seconds tick, and give the clock a mechanical, instrument-like character. This is the identity motif of the product.

## Radius system

- Pill (rounded-full): only circular action buttons and the search field. Reason: they are round controls, the radius describes their shape.
- rounded-2xl / 3xl: cards and modals. Reason: soft containers for touch.
- rounded-xl: inputs and small controls. Reason: one step down from cards, marks them as form elements.

## Motion

MOTION dial 1: hover/active states and the running-state pulse only. No scroll reveals, no entrance animations. Reason: a timer must feel stable; motion would compete with the ticking numbers.

The emerald status dot pulses only while a timer is running. Reason: it signals a live process, so it stops when nothing runs.

## Hierarchy

1. Time (largest element, always)
2. Current activity name
3. Primary control (start/pause)
4. Other timers
5. Secondary controls

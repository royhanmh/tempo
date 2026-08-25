# Tempo

## Frontend Product Requirements Document

**Version:** 1.1
**Status:** Frontend MVP
**Project Type:** Portfolio Project
**Frontend:** Vite + React JS + Tailwind CSS

---

# 1. Product Overview

## 1.1 Product Name

**Tempo**

## 1.2 Product Concept

Tempo is a modern personal timer workspace.

Users can create and manage timers for different activities such as:

- Deep work
- Study
- Workout rest
- Cooking
- Gaming
- Custom activities

Tempo is **not a Pomodoro clone**.

The core product idea is:

> **One clean workspace for every timer you need.**

The application must support persistent, accurate timers that continue to calculate correctly even after the user refreshes the browser or leaves the application.

---

# 2. Product Goal

Build a portfolio-quality frontend that demonstrates:

- Strong React fundamentals
- Clean component architecture
- State management
- Accurate time-based logic
- Browser persistence
- Responsive design
- Modern UI/UX
- Professional frontend development practices

The project should feel like a real product rather than a tutorial project.

---

# 3. Technology Stack

## Core

- Vite
- React JS
- JavaScript
- Tailwind CSS

## Supporting Libraries

- React Router DOM
- Zustand
- Lucide React

## Browser APIs

- localStorage
- Notifications API
- Page Visibility API

---

# 4. Development Intelligence Stack

The project must use the following tools and skills during development.

## 4.1 Caveman

Use **Caveman** as a development discipline and quality-control layer.

Caveman should be used to prevent:

- Overengineering
- Unnecessary abstractions
- Excessive dependencies
- Premature complexity
- Features without clear user value

### Caveman Rule

Before implementing a feature, ask:

> **What is the simplest implementation that provides a complete and good user experience?**

Example:

Do not build:

```text
Timer Engine
├── Event Bus
├── Plugin System
├── Strategy Factory
├── Command Pattern
└── Microservice Adapter
```

For a frontend MVP.

Instead:

```text
Timer
├── Timer state
├── Timestamp calculation
├── UI controls
└── Persistence
```

Simple architecture is preferred unless additional complexity has a clear reason.

---

# 4.2 Web Development Skills

Apply relevant web-development skills throughout the project.

## React

Use best practices for:

- Functional components
- Hooks
- State management
- Props
- Component composition
- Conditional rendering
- List rendering
- Effect cleanup

Avoid:

- Giant components
- Excessive prop drilling
- Unnecessary `useEffect`
- Duplicated state

---

## Responsive Web Design

The application must work across:

- Mobile
- Tablet
- Desktop

Use a mobile-first approach.

The interface must adapt naturally rather than simply shrinking the desktop design.

---

## Accessibility

The frontend should include:

- Semantic HTML
- Accessible button labels
- Keyboard navigation
- Visible focus states
- Sufficient color contrast
- Icons accompanied by accessible labels when necessary

---

## Performance

Prioritize:

- Minimal dependencies
- Efficient rendering
- Correct React state updates
- Avoiding unnecessary re-renders

Do not optimize prematurely, but avoid obvious performance problems.

---

## UI/UX

Follow these principles:

> **Timer first. Interface second. Decoration last.**

Avoid AI-slop UI patterns such as:

- Excessive gradients
- Glassmorphism everywhere
- Random floating cards
- Too many colored badges
- Unnecessary charts
- Huge marketing-style headings
- Excessive rounded containers
- Decorative elements without purpose

---

# 4.3 Context7

**Context7 must be used when current library or framework documentation is required.**

Before implementing functionality involving external libraries, retrieve current documentation rather than relying on potentially outdated assumptions.

Use Context7 for topics such as:

- React
- Vite
- Tailwind CSS
- Zustand
- React Router DOM
- Lucide React

## Context7 Rule

When implementing a library-specific feature:

```text
Need library implementation
        ↓
Check Context7
        ↓
Retrieve current documentation
        ↓
Implement according to documentation
        ↓
Verify implementation
```

Do not invent APIs.

Do not assume old syntax still applies.

---

# 5. Development Workflow

Every feature should follow this workflow.

```text
Understand requirement
        ↓
Check existing project architecture
        ↓
Use Context7 if library knowledge is needed
        ↓
Choose simplest viable implementation
        ↓
Implement
        ↓
Review UI and functionality
        ↓
Check for unnecessary complexity
        ↓
Refactor only if justified
```

---

# 6. MVP Features

## 6.1 Create Timer

Users can create a timer with:

- Name
- Icon
- Timer type
- Duration

### Supported Types

- Countdown
- Stopwatch

---

## 6.2 Timer Controls

Users can:

- Start
- Pause
- Resume
- Reset
- Delete

---

## 6.3 Multiple Timers

Users can create multiple timers.

Example:

```text
Deep Work       Running    52:14
Study           Idle       45:00
Gym Rest        Idle       02:00
Cooking         Paused     08:42
```

---

## 6.4 Persistent Timer Engine

This is the most important engineering feature.

Timers must remain accurate when:

- The browser refreshes
- The user changes tabs
- The browser throttles background JavaScript
- The user closes and reopens the application

### Correct Countdown Logic

Do not depend exclusively on:

```js
remainingTime = remainingTime - 1;
```

Instead:

```text
Start timer
    ↓
Calculate end timestamp
    ↓
Persist end timestamp
    ↓
Calculate:
end timestamp - current timestamp
```

The displayed time is derived from the actual current time.

---

# 7. UI Structure

## Main Page

```text
┌──────────────────────────────────────┐
│ TEMPO                          ⚙     │
│                                      │
│ What are you timing?                 │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │          DEEP WORK               │ │
│ │                                  │ │
│ │            52:14                 │ │
│ │                                  │ │
│ │       [ Pause ] [ Reset ]        │ │
│ └──────────────────────────────────┘ │
│                                      │
│ YOUR TIMERS                          │
│                                      │
│ ┌────────────┐ ┌────────────┐        │
│ │ 📚 Study   │ │ 🏋️ Rest    │        │
│ │ 45:00      │ │ 02:00      │        │
│ │ ▶ Start    │ │ ▶ Start    │        │
│ └────────────┘ └────────────┘        │
│                                      │
│         + Create Timer               │
└──────────────────────────────────────┘
```

---

# 8. Pages

## Home

The primary timer workspace.

Contains:

- Header
- Active timer
- Timer grid
- Create timer action

## Focus Mode

A distraction-free timer screen.

Contains only:

- Back action
- Timer icon
- Timer name
- Large timer
- Progress indicator
- Primary controls

---

# 9. Component Architecture

```text
src/
│
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   └── Input.jsx
│   │
│   └── timer/
│       ├── ActiveTimer.jsx
│       ├── TimerCard.jsx
│       ├── TimerControls.jsx
│       ├── TimerDisplay.jsx
│       └── CreateTimerModal.jsx
│
├── pages/
│   ├── Home.jsx
│   └── Focus.jsx
│
├── hooks/
│   ├── useTimer.js
│   └── useNotification.js
│
├── store/
│   └── timerStore.js
│
├── utils/
│   ├── time.js
│   └── storage.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 10. State Management

Use Zustand for global timer state.

The store should manage:

```text
Timers
├── Create
├── Update
├── Delete
├── Start
├── Pause
├── Resume
└── Reset
```

Do not put all UI state into Zustand.

Use local React state for temporary UI state such as:

- Open modal
- Form input
- Selected icon

---

# 11. Data Model

```js
{
  id: "uuid",
  name: "Deep Work",
  icon: "Laptop",

  type: "countdown",
  status: "running",

  duration: 5400,
  remainingTime: 3134,

  endTime: "2026-08-24T10:30:00.000Z",

  createdAt: "2026-08-24T09:00:00.000Z"
}
```

---

# 12. Visual Design

## Design Direction

Modern, minimal, calm, and functional.

### Visual Hierarchy

```text
1. Time
2. Current activity
3. Primary action
4. Other timers
5. Secondary controls
```

The user should always know what the most important timer is.

---

# 13. Responsive Requirements

## Mobile

- Single-column layout
- Large touch targets
- Timer fills the primary viewport
- Simple bottom/modal interactions

## Desktop

- Centered max-width container
- Responsive timer grid
- More whitespace
- Active timer remains dominant

---

# 14. Quality Rules

Before considering a feature complete, check:

### Functionality

- [ ] Feature works correctly
- [ ] Edge cases are handled
- [ ] Timer remains accurate

### React

- [ ] Components have clear responsibility
- [ ] No unnecessary state
- [ ] No unnecessary effects

### UI

- [ ] Works on mobile
- [ ] Works on desktop
- [ ] Clear visual hierarchy
- [ ] No unnecessary decoration

### Documentation

- [ ] Context7 used when library-specific documentation was needed
- [ ] No invented library APIs

### Simplicity

- [ ] Simplest reasonable implementation selected
- [ ] No unnecessary dependencies
- [ ] No premature abstraction

---

# 15. Development Order

The project should be built incrementally.

## Phase 1 — Foundation

- Create Vite project
- Install dependencies
- Configure Tailwind CSS
- Create base layout
- Create design tokens

## Phase 2 — Static UI

- Header
- Active timer
- Timer cards
- Create timer modal

## Phase 3 — Timer Logic

- Countdown
- Stopwatch
- Start
- Pause
- Resume
- Reset

## Phase 4 — Persistence

- Zustand persistence
- localStorage
- Timestamp-based calculations
- Refresh recovery

## Phase 5 — Polish

- Responsive design
- Dark mode
- Keyboard accessibility
- Notifications
- Loading and empty states

---

# 16. Definition of Done

Tempo MVP is complete when:

- [ ] Users can create countdown timers
- [ ] Users can create stopwatches
- [ ] Users can run multiple timers
- [ ] Running timers remain accurate after refresh
- [ ] Timers persist in localStorage
- [ ] Users can pause, resume, reset, and delete timers
- [ ] The UI works on mobile and desktop
- [ ] The UI is modern and minimal
- [ ] Relevant web-development best practices are applied
- [ ] Context7 is used for current external-library documentation
- [ ] The implementation follows the Caveman principle of avoiding unnecessary complexity

---

# Final Development Principle

> **Build the simplest timer application that feels like a real product.**

Do not add features simply to make the project look technically complicated.

The strongest portfolio result will come from:

```text
Simple idea
+ Excellent execution
+ Accurate timer logic
+ Clean React architecture
+ Modern UI
= Strong portfolio project
```

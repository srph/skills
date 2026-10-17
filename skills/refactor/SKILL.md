---
name: refactor
description: Restructure existing code without changing behavior. Use when the user invokes /refactor. Two modes: cleanup (fix what sticks out) and rehaul (redesign the structure from first principles)
disable-model-invocation: true
---

# Refactor

Change the shape, never the behavior. Same inputs, outputs, side-effects, and UI.

- Read all affected files and understand the current design
- Ask: "if we were writing this from scratch with this new requirement, what would we build?"
- Propagate the change through every reference: types, docs, examples, rationale sections
- Think about the whole redesign, then deliver it incrementally

This is the method for preserving option value when integrating changes into an existing design.

## Axes
| | Cleanup | Rehaul |
| ----- | ----- | ---- |
| When | A few things sticks out | The structure itself needs correction (often vibe-coded) |
| Scope | Files named or being worked in | The whole feature or module |
| Moves | Rename, inline, extract, dedupe, delete dead code | New boundaries, new file layout, data flow |
| Plan first? | No | Yes, wait for approval |

## Before touching any code
- Read every affected files and its callers
- Pin behavior: find the tests that cover it. If none, write characterization tests, or state how you'll verify
- Conventions come from this project, not generic best practice

## Cleanup
- Fix only what sticks out. List what you noticed but leave it alone.
- No new abstractions, no file moves unless asked.

# Rehaul
- Ask: "If we rewrote this from scratch, knowing everything it does today, how would we build it?"
- Understand what it does first, including edge cases and quirk callers rely on
- Show the target before executing: before/after file tree, new boundaries. Use /kier-plan when it's large
- Delete don't deprecate: no shims, no v2 files, no compat re-exports unless it's a public API
- Apply to every reference: imports, types, tests, docs, stories
- Deliver in steps that each leave the build green

## Out of scope
- Bugs founds: list them, do not fix them silently. Fixing changes behavior.
- Features, perf changes, dependency upgrades are out of scope.

## Done
- Tests, typechecks, and lint pass as they did before
- Report what changed structurally, what was left alone, and what bugs you found

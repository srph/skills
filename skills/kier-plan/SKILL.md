---
name: kier-plan
description: Write implementation plans as standalone HTML artifacts. Use when the user invokes /kier-plan or asks for a plan, implementation approach, rollout plan, migration plan, or technical planning document in HTML.
---

# Kier Plan

Create one polished, glanceable HTML implementation plan. Diagrams and snippets first; words are captions, not essays. The reader gets the shape of the change in ten seconds and the details by zooming in.

## Output

- Write to `.kier/plans/XXXX-<summary>.html` (`XXXX` short unique id, `<summary>` kebab-case). If file writing is unavailable, return the HTML.
- If command execution is available, serve the directory with `http-server` on `0.0.0.0` and report the local URL, Tailscale URL or host/port, and file path.
- The page is a neutral reading surface. Only UI mockups inside canvases use the target app's look.

## Before writing

- Ask when requirements, tradeoffs, or preferences are unclear. Never assume on meaningful product, technical, or design choices.
- Fold extra details from the prompt into the structure rather than treating them as replacement instructions.
- Later prompts adjust the plan. They are not approval to run it.

## Visual vocabulary

Every section leads with a visual. Prose is a one-line caption under it.

| To show | Use |
|---|---|
| Architecture, data flow, request path | Inline SVG with labelled boxes and arrows; changed parts in colour, unchanged in grey, not-yet-existing dashed |
| Before vs after | The same diagram twice, stacked or side by side, differences highlighted |
| Where new code lives, what moves, what splits | File tree of the affected directories after the change, every touched path badged new / modified / deleted / moved, untouched siblings in grey for context |
| Tables, columns, relations added or changed | Entity diagram: one box per table listing its columns, lines for relations, touched tables and columns badged new / modified / deleted, untouched tables in grey; the migration as a snippet beneath |
| Phases, rollout, sequence | Horizontal timeline, then one card per phase |
| Files touched | Badges on each phase card marked new, modified, or deleted |
| State or branching logic | State diagram |
| A UI change | Mockup in a framed canvas at real size, the new part highlighted |
| Options or tradeoffs | Side-by-side cards, recommended option marked |
| Risks | Cards with a severity badge and one-line mitigation |
| Verification | Checklist |

Diagrams are hand-authored inline SVG or CSS grid, never ASCII art or images.

## Code

- Snippets show the critical change only. Under 30 lines each; elide with `// ...`.
- Label each snippet with its file path and a new / modify badge. Use diff format when modifying.
- Comments inside the snippet carry the explanation. No paragraph above or below; one caption at most.
- Render in `<pre><code class="language-...">` with highlight.js from a CDN and a readable dark theme. Escape content.

## Word budget

- Under 500 words outside code, SVG labels, headings, file paths, and badges. Captions, card bodies, and checklist items all count.
- No paragraphs. Captions are one sentence. List items and card bodies are one line.
- No sections for background, context restatement, or generic advice. Say those in chat.
- Longer reasoning goes in a collapsed `<details>` with a one-line summary.
- If a sentence still makes sense without a visual or snippet beside it, it belongs in chat.

## Zoom

- The top of the page is the overview: headline, fact cards, one diagram of the whole change, the tree if files are added or moved, the schema diagram if tables or columns change, the mockup if there is UI.
- Each phase is a `<details>` card, closed by default. Closed: number, name, one-line outcome, file badges. Open: the snippets.
- Nothing below the overview is required to understand the plan.
- Every `<details>` keeps a visible caret on its summary so the reader can tell it opens. Never hide the disclosure marker; if the default one is restyled, draw a replacement that rotates when open.

## Structure

1. **Headline.** The objective in under 12 words. Under it, a row of small fact cards: surface, shape, files touched, governing rule, status.
2. **Shape.** One diagram of the whole change. Before and after if modifying. One caption.
3. **Tree.** Only if the change adds, moves, splits, or deletes files. The affected directories as they will look after the change, touched paths badged, untouched siblings in grey. One caption on what the boundaries mean. Rendered as described under Tree.
4. **Schema.** Only if the change adds, alters, or drops tables, columns, indexes, or relations. Its own section, never folded into a phase or the tree. Entity diagram of the affected tables after the change, touched tables and columns badged, untouched tables in grey. Under it, the migration as a snippet with its file path, and a one-line note on backfill or downtime if either applies. Rendered as described under Schema.
5. **What it looks like.** Only if UI changes. Mockup in a canvas at real size. One caption.
6. **Phases.** Timeline, then one collapsed card per phase with its snippets inside.
7. **Decisions.** One card per decision: question, options with the pick marked, one-line why.
8. **Risks.** One card per risk: severity badge, risk, one-line mitigation.
9. **Verify.** Checklist with the command or "manual" on each item.
10. **Next.** One sentence naming the first action. Nothing after it.

## Tree

Render the tree as nested lists, never indented text in a `<pre>`. A directory's children are a `<ul>` inside that directory's `<li>`. Connector lines drawn with CSS: one vertical rule per nesting level, one horizontal tick per item. Directories bold with a trailing slash. Touched paths carry an inline badge; untouched siblings are grey; deleted paths are struck through. Monospace for names, no bullets, no box-drawing characters.

```css
.tree, .tree ul { list-style: none; margin: 0; padding: 0 }
.tree ul { position: relative; padding-left: 20px }
.tree ul::before { content: ""; position: absolute; left: 6px; top: 0; bottom: 14px; border-left: 1px solid var(--line) }
.tree li { position: relative; padding-left: 14px }
.tree li::before { content: ""; position: absolute; left: -14px; top: 13px; width: 20px; border-top: 1px solid var(--line) }
.tree > li { padding-left: 0 }
.tree > li::before { display: none }
```

## Schema

Render each table as a card: table name as the header, one row per column with name, type, and a key marker (PK, FK, unique). Cards laid out on a CSS grid. Every FK row names its target table (`booking_id  FK → bookings`) so relations read without lines; draw an inline SVG line between cards only when the layout keeps it straight. New tables and columns carry a new badge, altered columns a modified badge, dropped columns struck through, untouched tables and columns in grey. Only the affected tables and their direct neighbours appear. The migration snippet follows the Code rules: file path, new / modify badge, under 30 lines.

## Follow-up prompts

- Adjust: edit the plan in place and keep the file id.
- Alternative approach: add it as a side-by-side option in Decisions or as a second Shape diagram. Never replace the original.
- A follow-up file names its parent file in the headline cards.

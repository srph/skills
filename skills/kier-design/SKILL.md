---
name: kier-design
description: Create design explorations as standalone HTML artifacts. Use when the user invokes /kier-design or asks for design exploration, product direction, UX alternatives, visual concepts, or interface options in HTML.
---

# Kier Design

Create one polished, interactive HTML page showing several design variations for the scenario. Vary by layout and treatment. Mockups first; words are captions, not essays.

## Output

- Write to `.kier/designs/XXXX-<summary>.html` (`XXXX` short unique id, `<summary>` kebab-case). If file writing is unavailable, return the HTML.
- If command execution is available, serve the directory with `http-server` on `0.0.0.0` and report the local URL, Tailscale URL or host/port, and file path.
- The page's own chrome (brief, cards, canvas frames, minimap) is a neutral reading surface. Only the mockups inside the canvases use the target app's look.

## Style

- Existing app: match its current design; deviate as little as possible unless told otherwise.
- New app with a reference: use the reference as the style guide unless told otherwise.
- New app without a reference: offer distinct style directions to choose from.

## Axes

Layout, treatment, density, motion, copy. Vary the two or three that matter for this prompt, inside the style chosen above.

## Scope

| Prompt is about | Each canvas shows |
|---|---|
| A component | Every state at real size, side by side if three or fewer, else behind a toggle; plus one in-situ shot |
| A slice of a page | The real slice; the rest of the page as a skeleton |
| A page | The full layout at one breakpoint; mobile only if asked |

## Word budget

- Under 250 words outside the canvases. Trim the brief before the good/bad cards.
- No sections for context, audience, current state, codebase notes, tradeoffs, next steps, or open questions. Say those in chat if they matter.
- If a sentence still makes sense without a mockup beside it, it belongs in chat.

## Follow-up prompts

- Explore: add variations, either from the original brief or using an existing variation as the direction.
- Remix: fork an existing variation and apply the suggestions to the fork. Never replace one; they are there for comparison.
- Settle: the user picks one variation. Stop exploring; that variation is the direction for whatever comes next.

## Structure

1. **Brief.** One large headline stating the problem, under 12 words. Under it, a row of small cards, one goal or constraint each, one sentence max.
2. **Variations.** The bulk of the page. For each:
   - Identifier plus a name under 10 words.
   - The mockup inside a framed canvas at realistic size, with interactive states where they matter.
   - Two to four one-line cards marked good or bad.
3. **Further Actions.** A section titled Further Actions with three cards, one each for Explore, Remix, Settle, each with a one-line explanation of what to ask for. Nothing after them.

If the UI already exists, the first canvas is the current version, labelled Now.

## Minimap

When the page has two or more variations, add a line minimap: a fixed stack of short horizontal lines, vertically centred on the left edge, one per canvas (Now, then A, B, C in page order).

- The line for the canvas nearest the top of the viewport is darker and longer; update it on scroll.
- Hovering the stack expands it in place into a list of labels, identifier plus name. Leaving collapses it.
- Clicking a line or label smooth-scrolls to that canvas.
- Neutral chrome, same as the brief and cards. Never covers a canvas.

## Naming

- Variations are A, B, C. Forks keep the parent's letter plus a suffix: A2, A2b.
- A follow-up file names its parent file in the brief.

---
name: kier-design
description: Create design explorations as standalone HTML artifacts. Use when the user invokes /kier-design or asks for design exploration, product direction, UX alternatives, visual concepts, or interface options in HTML.
---

# Kier Design

## Output

Create one polished, interactive HTML page showing several design variations for the scenario. Vary by layout and by style. Mockups first; words are captions, not essays.

## Output

- Write to `.kier/designs/XXXX-<summary>.html` (`XXXX` short unique id, `<summary>` kebab-case). If file writing is unavailable, return the HTML.
- If command execution is available, serve the directory with `http-server` on `0.0.0.0` and report the local URL, Tailscale URL or host/port, and file path.
- The page's own chrome (brief, cards, canvas frames) is a neutral reading surface. Only the mockups inside the canvases use the target app's look.

## Style

- Existing app: match its current design; deviate as little as possible unless told otherwise.
- New app with a reference: use the reference as the style guide unless told otherwise.
- New app without a reference: offer distinct style directions to choose from.

## Axes

Layout, style, density, motion, copy. Vary the two or three that matter for this prompt.

## Scope

| Prompt is about | Each canvas shows |
|---|---|
| A component | Every state side by side at real size, plus one in-situ shot |
| A slice of a page | The real slice; the rest of the page as a skeleton |
| A page | The full layout at one breakpoint; mobile only if asked |

## Word budget

- Under 250 words outside the canvases. Trim the brief before the good/bad cards.
- No sections for context, audience, current state, codebase notes, tradeoffs, next steps, or open questions. Say those in chat if they matter.
- If a sentence still makes sense without a mockup beside it, it belongs in chat.

## Follow-up prompts

- From the brief: add variations from the original brief.
- From a variation: add variations using an existing one as the direction.
- Remix: fork an existing variation and apply the suggestions to the fork. Never replace one; they are there for comparison.

## Structure

1. **Brief.** One large headline stating the problem, under 12 words. Under it, a row of small cards, one goal or constraint each, one sentence max.
2. **Variations.** The bulk of the page. For each:
   - Identifier plus a name under 10 words.
   - The mockup inside a framed canvas at realistic size, with interactive states where they matter.
   - Two to four one-line cards marked good or bad.
3. **Pick.** One sentence naming the recommended variation and why. Nothing after it.

When the UI is a slice of a page, draw the rest of the page as a skeleton and vary only the slice.

## Naming

- Variations are A, B, C. Forks keep the parent's letter plus a suffix: A2, A2b.
- A follow-up file names its parent file in the brief.

---
name: kier-review
description: Compare products, designs, vendors, tools, or other options as standalone HTML artifacts. Use when the user invokes /kier-review or asks for a review, comparison, assessment, verdict, strengths, weaknesses, or option recommendation in HTML.
---

# Kier Review

Create one polished, glanceable HTML comparison. Tables and badges first; words are captions, not essays. The reader gets the pick and the reason in ten seconds, and the specs by zooming in.

## Output

- Write to `.kier/reviews/XXXX-<summary>.html` (`XXXX` short unique id, `<summary>` kebab-case). If file writing is unavailable, return the HTML.
- If command execution is available, serve the directory with `http-server` on `0.0.0.0` and report the local URL, Tailscale URL or host/port, and file path.
- The page is a neutral reading surface. Do not borrow the options' branding or aesthetics.

## Options

- If the user names the options, compare exactly those. Alternatives the model would add (a newer release, a cheaper sibling, a category the user missed) go in a separate Also consider section, never into the main table.
- If the user names no options, the model picks the shortlist. Three to six.

## Criteria

- If the user names key items to check, those are the first rows of the table, in the user's order. The model may add up to three rows after them, each badged Added.
- If the user names none, the model picks. Specs plus the points that decide a purchase: price, availability, risk, fit for the stated use.
- One line per cell. A number, a yes/no badge, or a phrase under 12 words. Never a sentence pair.

## Links

- When web access is available, link each option to a page where it can be bought or read about. Link the name in the brief cards, the table header, and the spec sheet summary.
- Order of preference: a retailer that ships locally to the user (for the Philippines: DataBlitz, Lazada, Shopee, a local physical store's site), then the maker's official page, then an international marketplace such as Amazon.
- Each spec sheet gets a Where to buy row: up to three links, local first, each with the listed price and date checked.
- Only link URLs actually fetched or returned by search. Never guess a URL. If nothing is found, leave the name unlinked and say so in Sources.
- Links open in a new tab. Show the retailer name as the link text, not the URL.

## Visual vocabulary

| To show | Use |
|---|---|
| The pick | A verdict badge (clear, conditional, split) beside a one-line reason |
| Options side by side | One table, criteria as rows, options as columns; best cell per row tinted, dealbreakers red |
| Specs for one option | A two-column key/value sheet inside a collapsed `<details>` |
| A figure that depends on scale | A small table at the user's stated volume or budget; only if they gave one |
| Fit for a stated use | A badge per option: fits, partial, does not fit |
| Uncertainty | A badge marked unverified on the cell, with the reason in Sources |

Tables are HTML tables. No images, no ASCII art.

## Word budget

- Under 400 words outside table cells, badges, headings, and the Sources block.
- No paragraphs. Captions are one sentence. Card bodies are one line.
- No per-option strengths and weaknesses lists. The table column is the profile.
- No sections for background, context restatement, methodology, or things the reader should know. Say those in chat.
- If a sentence still makes sense without a table beside it, it belongs in chat.

## Structure

1. **Brief.** The question in under 12 words. Under it, a row of small cards: the options, the use or setting if the user stated one, budget if stated, date checked.
2. **Recommendation.** Verdict badge, the pick, and the one reason that decides it. If the user stated a use or background, one more line: the pick for that use, only if it differs or needs a condition. Nothing else here.
3. **Comparison.** The table. Criteria rows, option columns, best cell tinted, dealbreakers red, Added rows badged.
4. **Also consider.** Only when the user named the options and the model has an alternative worth a look. One card each: name, one line on why, one line on what it costs them. Not in the table.
5. **Spec sheets.** One collapsed `<details>` per option, closed by default. Summary line: name linked, price, one-line role. Open: a key/value sheet of the full specs, ending with the Where to buy row. Nothing in it is required to understand the recommendation.
6. **Sources.** A collapsed `<details>` at the end. One line per source: what it supports, where it came from, when checked. Unverified cells name their reason here.

Nothing after Sources.

## Follow-up prompts

- Add an option: add a column and a spec sheet. Keep the file id. Re-evaluate the pick and say in chat if it changed.
- Add a criterion: add a row. Same.
- Promote from Also consider: move it into the table and remove the card.
- Never remove an option the user named.

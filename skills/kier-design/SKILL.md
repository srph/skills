---
name: kier-design
description: Create design explorations as standalone HTML artifacts. Use when the user invokes /kier-design or asks for design exploration, product direction, UX alternatives, visual concepts, or interface options in HTML.
---

# Kier Design

## Output

Create one visually polished, glanceable, self-contained HTML document for a design exploration. Do not copy the target app's aesthetics for the exploration UI; design the exploration as its own readable artifact.

If file writing is available, write the design exploration to `.kier/designs/XXXX-<summary>.html`, where `XXXX` is a short unique id and `<summary>` is a kebab-case summary. If file writing is unavailable, return the full HTML in the response.

If command execution is available, start an `http-server` for the design directory and bind it so Tailscale users can access it, for example on `0.0.0.0`. Report the local URL, Tailscale-accessible URL or host/port, and file path. If serving is unavailable, report the file path or HTML only.

## HTML Contract

- Start with `<!doctype html>`.
- Include `<html>`, `<head>`, `<title>`, and `<body>`.
- Embed all CSS in a `<style>` tag.
- Do not reference remote assets, scripts, stylesheets, fonts, images, or iframes.
- Use semantic HTML: `main`, `section`, headings, lists, and tables only when useful.
- Make the document readable on screen and in print.
- Include enough context that the HTML stands alone without the chat transcript.

## Prompt Handling

Treat the user's prompt as direction for the HTML plan. Unless the user says otherwise, incorporate additional requested details, examples, constraints, or sections into the artifact's structure rather than treating them as strict replacement instructions.

## Design Workflow

1. State the design goal, audience, and constraints.
2. Identify the key product or UX problem.
3. Explore multiple directions before recommending one.
4. Show tradeoffs across usability, clarity, feasibility, and risk.
5. Include layout, interaction, content, and visual treatment notes.
6. End with a recommendation and the next experiment or prototype.

## Suggested Sections

- Title and design brief.
- Goals and non-goals.
- Constraints.
- User or workflow assumptions.
- Exploration directions.
- Comparison and tradeoffs.
- Recommended direction.
- Next experiments.

Use HTML layout to make alternatives easy to compare. Prefer practical design decisions over decorative language.

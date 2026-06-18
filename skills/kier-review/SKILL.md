---
name: kier-review
description: Write code, product, or design reviews as standalone HTML artifacts. Use when the user invokes /kier-review or asks for a review, critique, audit, assessment, or findings report in HTML.
---

# Kier Review

## Output

Create one visually polished, glanceable, self-contained HTML document for a review. Do not copy the target app's aesthetics for the review UI; design the review as its own readable artifact.

If file writing is available, write the review to `.kier/reviews/XXXX-<summary>.html`, where `XXXX` is a short unique id and `<summary>` is a kebab-case summary. If file writing is unavailable, return the full HTML in the response.

If command execution is available, start an `http-server` for the review directory and bind it so Tailscale users can access it, for example on `0.0.0.0`. Report the local URL, Tailscale-accessible URL or host/port, and file path. If serving is unavailable, report the file path or HTML only.

## HTML Contract

- Start with `<!doctype html>`.
- Include `<html>`, `<head>`, `<title>`, and `<body>`.
- Embed all CSS in a `<style>` tag.
- Do not reference remote assets, scripts, stylesheets, fonts, images, or iframes.
- Use semantic HTML: `main`, `section`, headings, lists, and tables only when useful.
- Make the document readable on screen and in print.
- Include enough context that the HTML stands alone without the chat transcript.

## Review Workflow

1. Identify what is being reviewed and the review scope.
2. Put findings first, ordered by severity and confidence.
3. For each finding, include evidence, impact, and a recommended fix.
4. Separate confirmed issues from questions, assumptions, and preferences.
5. Include test gaps or validation gaps.
6. End with a brief summary and the most important next action.

## Finding Format

For each finding, include:

- Severity: critical, high, medium, low, or note.
- Evidence: file, behavior, screenshot description, or source detail when available.
- Impact: why it matters.
- Recommendation: concrete fix or decision.

If no issues are found, say that clearly and still mention residual risks or review limits.

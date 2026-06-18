---
name: kier-review
description: Compare products, designs, vendors, tools, or other options as standalone HTML artifacts. Use when the user invokes /kier-review or asks for a review, comparison, assessment, verdict, strengths, weaknesses, or option recommendation in HTML.
---

# Kier Review

## Output

Create one visually polished, glanceable, self-contained HTML document for a comparison review. Do not copy the options' aesthetics for the review UI; design the review as its own readable artifact.

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

## Prompt Handling

Treat the user's prompt as direction for the HTML plan. Unless the user says otherwise, incorporate additional requested details, examples, constraints, or sections into the artifact's structure rather than treating them as strict replacement instructions.

## Review Workflow

1. Identify the options being compared, the audience, and the decision context.
2. Define the criteria that matter for the decision, such as usability, cost, reliability, capability, maintainability, risk, or fit.
3. Open with the verdict: clear winner, conditional winner, or no single winner.
4. Compare the options visually across multiple criteria with scores, labels, or concise evidence.
5. Explain each option's strengths, weaknesses, risks, and best-fit use cases.
6. End with a recommendation that says who should choose each option and why.

## Suggested Comparison Ingredients

Use any of these when they fit the review. Do not treat this as a required template or limit the artifact to this structure:

- Role: what this option is best suited for.
- Strengths: where it clearly outperforms the alternative.
- Weaknesses: where it falls behind or adds risk.
- Criteria evidence: concise observations supporting the scores or labels.
- Best fit: the user, team, budget, or scenario where it should win.
- Decision matrix: criteria, ratings, weights, or tradeoff labels.
- Verdict: clear winner, conditional winner, split recommendation, or no single winner.

If there is no clear winner, say that clearly and make the tradeoff explicit. Avoid turning the review into a bug report unless the user specifically asks for code review.

---
name: kier-plan
description: Write implementation plans as standalone HTML artifacts. Use when the user invokes /kier-plan or asks for a plan, implementation approach, rollout plan, migration plan, or technical planning document in HTML.
---

# Kier Plan

## Output

Create one visually polished, glanceable, self-contained HTML document for an implementation plan. Do not copy the target app's aesthetics for the plan UI; design the plan as its own readable artifact.

If file writing is available, write the plan to `.kier/plans/XXXX-<summary>.html`, where `XXXX` is a short unique id and `<summary>` is a kebab-case summary. If file writing is unavailable, return the full HTML in the response.

If command execution is available, start an `http-server` for the plan directory and bind it so Tailscale users can access it, for example on `0.0.0.0`. Report the local URL, Tailscale-accessible URL or host/port, and file path. If serving is unavailable, report the file path or HTML only.

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

## Planning Rules

- Ask clarifying questions before writing the plan when requirements, tradeoffs, or user preferences are unclear.
- Do not make assumptions. Ask for the user's opinion on meaningful product, technical, or design choices.
- Treat later prompts as requests to adjust the plan, not as approval to run the plan.
- Add relevant snippets of critical code that will be added or modified.
- When the plan touches or proposes code, include comments in the snippets and explain the underlying context from the conversation.
- Render all code examples inside `<pre><code class="language-...">...</code></pre>` blocks. Include highlight.js from a CDN plus a readable dark theme for syntax highlighting. Escape code content properly.

## Planning Workflow

1. Restate the objective and expected outcome.
2. Summarize relevant context and constraints.
3. List clarifying questions or decisions that need the user's input.
4. Break the approach into phases or milestones.
5. Include critical code snippets with comments when code changes are part of the plan.
6. Call out tradeoffs, risks, dependencies, and open questions.
7. Define verification: tests, manual checks, review process, and acceptance criteria.
8. End with the recommended next action.

## Suggested Sections

- Title and short summary.
- Objective.
- Current context.
- Proposed approach.
- Implementation steps.
- Critical code snippets.
- Verification and review.
- Risks and mitigations.
- Open questions.
- Next action.

Keep the plan concise enough to be useful in one sitting. Prefer concrete steps over generic advice.

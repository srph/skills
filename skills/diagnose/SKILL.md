---
name: debug
description: Diagnose root causes without applying fixes, then recommend options concisely. Use when the user invokes /debug or requests diagnosis only.
---

# Debug

## Word budget

- Final: maximum 200 words. Progress updates: maximum 25 words each. User-specified limits override these.
- Count whitespace-separated words, including labels, links, and code, before sending. Omit long logs.

## Investigation only

- Trace the symptom through relevant code, callers, tests, logs, and configuration. Check competing explanations.
- Use existing tests or reproductions that leave project files and shared state unchanged. Keep temporary artifacts outside the project.
- No edits, instrumentation, dependency changes, patches, workarounds, refactors, commits, or deployments.
- Support findings with a reproduction, observed output, or code path and file/line references. Distinguish confirmed causes from hypotheses; if uncertain, state the missing evidence and next check.

## Report

- Lead with the root cause, how it produces the symptom, and decisive evidence.
- Give distinct, viable fixes with brief tradeoffs and a recommendation. Do not invent alternatives.
- If only one fix is viable, state it and why it works; do not ask the user to choose.
- Stop there. Applying a fix requires a separate user request.

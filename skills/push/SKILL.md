---
name: Push
description: Stage changes, commit, and push to the current branch. Use when the user invokes /push.
disable-model-invocation: true
---

# Push

Stage, commit, and push changes to the current branch (unless specified otherwise).

- **Stage deliberately.** Add specific paths, never `git add -A`. Skip OS junk (`.DS_Store`), build output, and anything that looks like a secret. If there are changes you didn't make or don't recognize, ask before including them.
- **Scope commits sensibly.** Split unrelated changes; group related work. Don't over-optimize for atomic commits.
- **Match the repo's style.** Read recent `git log` and follow its message conventions.
- **Never force-push or skip hooks.** If a hook fails, fix it and commit again. If the push is rejected, `pull --rebase`; stop and ask on conflicts.
- **Wrap up briefly:** what was committed and where it went.

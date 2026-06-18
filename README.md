# skills

Harness-agnostic skills for producing standalone HTML artifacts:

- `/kier-plan`: implementation plans.
- `/kier-review`: option comparison reviews.
- `/kier-design`: design explorations.

Each skill writes a visually polished, self-contained `.html` document with embedded CSS and no remote assets. The skills do not depend on Cursor, Canvas, MCP, shell tools, or a specific agent harness.

When file writing is available, outputs use `.kier/`:

- `/kier-plan`: `.kier/plans/XXXX-<summary>.html`
- `/kier-review`: `.kier/reviews/XXXX-<summary>.html`
- `/kier-design`: `.kier/designs/XXXX-<summary>.html`

When command execution is available, the skill should also start an `http-server` bound for Tailscale access and report the file path plus reachable URL or host/port. If serving is unavailable, the HTML file or response is still the source of truth.

## Install

Install all three skills for Cursor globally:

```bash
npx skills add <owner>/<repo> --skill kier-plan --skill kier-review --skill kier-design -a cursor -g
```

Install every skill from this repo to every supported agent:

```bash
npx skills add <owner>/<repo> --all
```

Use one skill without installing:

```bash
npx skills use <owner>/<repo> --skill kier-plan
```

Replace `<owner>/<repo>` with the published GitHub repository, for example `kier/skills`.

## Local Development

From the repo root, install the local working copy:

```bash
npx skills add . --skill kier-plan --skill kier-review --skill kier-design -a cursor -g
```

The Skills CLI supports local paths. Its default behavior is best for development when symlinks work because edits are reflected immediately.

On Windows machines where symlink permissions are unavailable or inconsistent, install copies instead:

```bash
npx skills add . --skill kier-plan --skill kier-review --skill kier-design -a cursor -g --copy
```

When using `--copy`, rerun the command after edits.

## Verify

Run deterministic repo checks:

```bash
npm test
```

Validate generated HTML artifacts:

```bash
npm run test:html -- examples/generated/*.html
```

## Manual Review Loop

1. Install locally with `npx skills add . ...`.
2. Generate one artifact with each skill using the prompts in `examples/prompts/`.
3. Run `npm run test:html -- examples/generated/*.html`.
4. Open each HTML file in a browser.
5. Check whether the artifact is readable, print-friendly, and understandable without chat context.

## Repo Layout

```text
skills/
  kier-plan/SKILL.md
  kier-review/SKILL.md
  kier-design/SKILL.md
scripts/
  validate-skills.mjs
  validate-html.mjs
examples/
  prompts/
  generated/
```


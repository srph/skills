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

Install every skill from this repo to every supported agent:

```bash
npx skills add srph/skills
```

Install every skill for Cursor globally:

```bash
npx skills add srph/skills -a cursor -g
```

Install one skill for Cursor globally:

```bash
npx skills add srph/skills --skill kier-plan -a cursor -g
```

Use one skill without installing:

```bash
npx skills use srph/skills --skill kier-plan
```

## Update

Rerun the same install command to update installed skills from the latest `srph/skills` version:

```bash
npx skills add srph/skills -a cursor -g
```

For one installed skill:

```bash
npx skills add srph/skills --skill kier-plan -a cursor -g
```

If you installed from a local copy with `--copy`, rerun the local install command after edits.

## Local Development

From the repo root, install every local skill:

```bash
npx skills add . -a cursor -g
```

The Skills CLI supports local paths. Its default behavior is best for development when symlinks work because edits are reflected immediately.

On Windows machines where symlink permissions are unavailable or inconsistent, install copies instead:

```bash
npx skills add . -a cursor -g --copy
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


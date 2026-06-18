# skills

Harness-agnostic skills for producing standalone HTML artifacts:

- `/kier-plan`: implementation plans
- `/kier-review`: option comparison reviews
- `/kier-design`: design explorations

Each skill writes a visually polished, self-contained html file. When file writing is available, outputs use `.kier/`:

- `/kier-plan`: `.kier/plans/XXXX-<summary>.html`
- `/kier-review`: `.kier/reviews/XXXX-<summary>.html`
- `/kier-design`: `.kier/designs/XXXX-<summary>.html`

## Install

Install every skill from this repo to every supported agent:

```bash
npx skills add srph/skills
```

Install one skill:

```bash
npx skills add srph/skills --skill kier-plan
```

Use one skill without installing:

```bash
npx skills use srph/skills --skill kier-plan
```

## Update

Rerun the same install command to update installed skills from the latest `srph/skills` version:

```bash
npx skills add srph/skills
```

For one installed skill:

```bash
npx skills add srph/skills --skill kier-plan
```

If you installed from a local copy with `--copy`, rerun the local install command after edits.

## Local Development

From the repo root, install every local skill:

```bash
npx skills add .
```

The Skills CLI supports local paths. Its default behavior is best for development when symlinks work because edits are reflected immediately.

On Windows machines where symlink permissions are unavailable or inconsistent, install copies instead:

```bash
npx skills add . --copy
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


# skills

Harness-agnostic skills for producing standalone HTML artifacts:

- `/scope`: implementation plans
- `/compare`: option comparisons
- `/explore`: design explorations

Each skill writes a visually polished, self-contained html file. When file writing is available, outputs use `.kier/`:

- `/scope`: `.kier/scope/NNNN-<summary>.html`
- `/compare`: `.kier/compare/NNNN-<summary>.html`
- `/explore`: `.kier/explore/NNNN-<summary>.html`

`NNNN` counts up per folder: `0001`, `0002`, and so on.

## Install

Install every skill from this repo to every supported agent:

```bash
npx skills add srph/skills
```

Install one skill:

```bash
npx skills add srph/skills --skill scope
```

Use one skill without installing:

```bash
npx skills use srph/skills --skill scope
```

## Update

Rerun the same install command to update installed skills from the latest `srph/skills` version:

```bash
npx skills add srph/skills
```

For one installed skill:

```bash
npx skills add srph/skills --skill scope
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


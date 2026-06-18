import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skillsDir = path.join(root, "skills");
const expectedSkills = new Set(["kier-plan", "kier-review", "kier-design"]);
const errors = [];

function fail(message) {
  errors.push(message);
}

function parseFrontmatter(content, filePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    fail(`${filePath}: missing YAML frontmatter`);
    return {};
  }

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([a-zA-Z0-9-]+):\s*(.*)$/);
    if (field) {
      data[field[1]] = field[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return data;
}

function validateReferences(content, skillName, filePath) {
  const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];
  for (const [, href] of links) {
    if (/^[a-z]+:/i.test(href) || href.startsWith("#")) continue;
    const normalized = href.replaceAll("\\", "/");
    if (normalized.includes("../") || normalized.split("/").length > 1) {
      fail(`${filePath}: reference "${href}" must stay one level deep`);
      continue;
    }
    if (!normalized.endsWith(".md")) {
      fail(`${filePath}: reference "${href}" should point to a markdown support file`);
    }
  }
}

function validateHarnessAgnostic(content, filePath) {
  const forbidden = [
    /must use cursor/i,
    /requires cursor/i,
    /must use canvas/i,
    /requires canvas/i,
    /must use mcp/i,
    /requires mcp/i,
    /must use shell/i,
    /requires shell/i,
    /use_figma/i
  ];

  for (const pattern of forbidden) {
    if (pattern.test(content)) {
      fail(`${filePath}: contains harness-specific requirement matching ${pattern}`);
    }
  }
}

async function main() {
  let entries;
  try {
    entries = await readdir(skillsDir);
  } catch {
    fail("skills/: directory is missing");
    entries = [];
  }

  const skillNames = [];
  for (const entry of entries) {
    const fullPath = path.join(skillsDir, entry);
    if (!(await stat(fullPath)).isDirectory()) continue;
    skillNames.push(entry);
  }

  for (const expected of expectedSkills) {
    if (!skillNames.includes(expected)) {
      fail(`skills/${expected}: expected skill directory is missing`);
    }
  }

  for (const skillName of skillNames) {
    const relativePath = path.join("skills", skillName, "SKILL.md").replaceAll("\\", "/");
    const filePath = path.join(skillsDir, skillName, "SKILL.md");
    let content;
    try {
      content = await readFile(filePath, "utf8");
    } catch {
      fail(`${relativePath}: missing SKILL.md`);
      continue;
    }

    const lineCount = content.split(/\r?\n/).length;
    if (lineCount > 500) {
      fail(`${relativePath}: has ${lineCount} lines; keep SKILL.md under 500`);
    }

    const frontmatter = parseFrontmatter(content, relativePath);
    if (!/^[a-z0-9-]{1,64}$/.test(frontmatter.name ?? "")) {
      fail(`${relativePath}: name must be lowercase kebab-case, max 64 chars`);
    }
    if (frontmatter.name !== skillName) {
      fail(`${relativePath}: name "${frontmatter.name}" must match directory "${skillName}"`);
    }
    if (!frontmatter.description || frontmatter.description.length > 1024) {
      fail(`${relativePath}: description must be non-empty and under 1024 chars`);
    }
    if (!/use when/i.test(frontmatter.description ?? "")) {
      fail(`${relativePath}: description should include trigger wording like "Use when"`);
    }
    if (!content.includes("/" + skillName)) {
      fail(`${relativePath}: should mention the slash invocation /${skillName}`);
    }
    if (!content.includes("<!doctype html>")) {
      fail(`${relativePath}: should require <!doctype html>`);
    }
    if (!/self-contained HTML document/i.test(content)) {
      fail(`${relativePath}: should require a self-contained HTML document`);
    }

    validateReferences(content, skillName, relativePath);
    validateHarnessAgnostic(content, relativePath);
  }

  if (errors.length) {
    console.error(`Skill validation failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Validated ${skillNames.length} skill(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

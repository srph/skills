import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const errors = [];

function fail(filePath, message) {
  errors.push(`${filePath}: ${message}`);
}

async function expandArg(arg) {
  if (!arg.includes("*")) return [arg];

  const normalized = arg.replaceAll("\\", "/");
  const starIndex = normalized.indexOf("*");
  const baseDir = normalized.slice(0, starIndex).replace(/\/[^/]*$/, "") || ".";
  const filePattern = normalized.slice(normalized.lastIndexOf("/") + 1);
  const regex = new RegExp(
    "^" +
      filePattern
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replaceAll("*", ".*") +
      "$"
  );

  let entries;
  try {
    entries = await readdir(baseDir);
  } catch {
    return [];
  }

  return entries
    .filter((entry) => regex.test(entry))
    .map((entry) => path.join(baseDir, entry));
}

async function collectFiles(args) {
  const expanded = [];
  for (const arg of args) {
    expanded.push(...(await expandArg(arg)));
  }

  const files = expanded.length ? expanded : await expandArg("examples/generated/*.html");
  const existingFiles = [];
  for (const file of files) {
    try {
      if ((await stat(file)).isFile()) existingFiles.push(file);
    } catch {
      fail(file, "file does not exist");
    }
  }
  return existingFiles;
}

function validateHtml(filePath, content) {
  const lower = content.toLowerCase();

  if (!lower.startsWith("<!doctype html>")) {
    fail(filePath, "must start with <!doctype html>");
  }
  for (const tag of ["<html", "<head", "<title", "<body", "</html>"]) {
    if (!lower.includes(tag)) {
      fail(filePath, `missing ${tag}`);
    }
  }
  if (!/<style[\s>]/i.test(content)) {
    fail(filePath, "must embed CSS in a <style> tag");
  }
  if (!/<main[\s>]/i.test(content)) {
    fail(filePath, "should include semantic <main>");
  }
  if ((content.match(/<h[1-6][\s>]/gi) ?? []).length < 2) {
    fail(filePath, "should include at least two headings");
  }
  if (/<script[\s>]/i.test(content)) {
    fail(filePath, "must not include scripts");
  }
  if (/\s(?:src|href)=["']https?:\/\//i.test(content)) {
    fail(filePath, "must not reference remote src or href assets");
  }
  if (/\s(?:src|href)=["']\/\//i.test(content)) {
    fail(filePath, "must not reference protocol-relative assets");
  }
  if (/<link[\s>]/i.test(content)) {
    fail(filePath, "must not include external stylesheets or resource links");
  }
  if (/^\s*```/m.test(content) || /^\s{0,3}#{1,6}\s+/m.test(content)) {
    fail(filePath, "looks like markdown leaked into the HTML");
  }
}

async function main() {
  const files = await collectFiles(process.argv.slice(2));
  if (!files.length) {
    fail("examples/generated/*.html", "no HTML files found");
  }

  for (const file of files) {
    const content = await readFile(file, "utf8");
    validateHtml(file.replaceAll("\\", "/"), content.trimStart());
  }

  if (errors.length) {
    console.error(`HTML validation failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Validated ${files.length} HTML artifact(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

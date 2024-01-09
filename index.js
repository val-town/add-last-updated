#!/usr/bin/env node

/**
 * @typedef {import('mdast').Root} Root
 */
import { stringify } from "yaml";
import { matter } from "vfile-matter";
import { read, write } from "to-vfile";
import { globby } from "globby";
import { exec } from "child_process";
import { promisify } from "util";
import * as Fs from "node:fs/promises";
import * as Path from "node:path";
import meow from "meow";

const cli = meow(
  `
	Usage
	  $ add-last-updated <input>

	Examples
	  $ add-last-updated starlight-content-dir
`,
  {
    importMeta: import.meta,
    flags: {},
  },
);

const INPUT_DIR = cli.input.at(0);

if (!INPUT_DIR) {
  console.error("Input dir missing");
  cli.showHelp();
}

const files = await globby([`${INPUT_DIR}/**/*.(md|mdx)`]);

console.log("Transforming documents…");
for (let path of files) {
  const file = await read(path, "utf8");
  matter(file, { strip: true });
  if (!file.data.matter.lastUpdated) {
    const stats = await Fs.stat(file.path);
    const changeTime = stats.mtime || status.birthtime;
    const mod = await promisify(exec)(
      `git log -1 --format="%as" "${Path.relative(INPUT_DIR, file.path)}"`,
      {
        cwd: INPUT_DIR,
      },
    );
    const time = mod.stdout.trim();
    if (time) {
      file.data.matter.lastUpdated = time;
    }
    file.value =
      "---\n" +
      stringify(file.data.matter) +
      "---\n\n" +
      file.value.toString("utf8");
    console.log(`✅ ${file.path}`);
    write(file);
  } else {
    console.log(`🆗 ${file.path}`);
  }
}

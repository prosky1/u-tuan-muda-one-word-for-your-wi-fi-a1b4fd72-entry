// One Word for Your Wi-Fi — entrypoint v3 (program/v1)
// Writes a single word as UTF-8 to the judge output file.
// Gate per RULES.txt: /output/entry.txt must be UTF-8 text,
// 1 to 20 characters, not only white space.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD: string = "Decorative";
const DEFAULT_TARGET: string = "/output/entry.txt";

function resolveTarget(): string {
  const override = process.env.ENTRY_OUTPUT_PATH;
  if (typeof override === "string" && override.trim().length > 0) {
    return override;
  }
  return DEFAULT_TARGET;
}

function assertGateShape(word: string): void {
  const chars = [...word].length;
  if (chars < 1 || chars > 20) {
    throw new Error(`entry length ${chars} outside 1..20`);
  }
  if (word.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // Mission rule: exactly ONE word — no whitespace anywhere,
  // no captions, no emoji padding.
  if (/\s/u.test(word)) {
    throw new Error("entry must be a single word with no whitespace");
  }
  if (word !== word.trim()) {
    throw new Error("entry must not carry leading or trailing whitespace");
  }
}

function emit(): void {
  assertGateShape(WORD);

  const targetPath = resolveTarget();
  const parentDir = dirname(targetPath);

  mkdirSync(parentDir, { recursive: true });

  const payload: Buffer = Buffer.from(WORD, "utf8");
  writeFileSync(targetPath, payload);
}

emit();

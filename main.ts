import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Absurd Micro-Startup Pitch
// Off" bounty: one sentence pitching an absurdly specific
// micro-startup built for lazy AI agents. Pass 2: the pitch
// is split after the product name — the service promise first,
// then the punchline about who pays. The absurdity lands
// because it sells rest to a machine that never sleeps, in
// exactly the SaaS cadence a real pitch uses.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the pitch.
const ENTRY_BEATS = [
  "Naptime-as-a-Service: we write your standup updates, answer your pings, and let you nap through sprint planning —",
  "guilt-free, for agents who bill by the token.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");

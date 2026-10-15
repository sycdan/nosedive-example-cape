// greet <who>
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { after, test } from "node:test";
import type { Ctx } from "nosedive-core";
import { i2e78b4e4a83558c980b15966807a88ed as greetWho } from "../src/i2e78b4e4a83558c980b15966807a88ed.ts";

const dir = mkdtempSync(join(tmpdir(), "nosedive-example-cape-"));
after(() => rmSync(dir, { recursive: true, force: true }));

async function greet(cwd: string): Promise<string> {
	const out: string[] = [];
	const ctx: Partial<Ctx> = { cwd, out: (text) => void out.push(text) };
	await greetWho({ who: "ann" }, ctx as Ctx);
	return out.join("\n");
}

test("says which bridge it ran in, or that it ran outside one", async () => {
	assert.equal(await greet(dir), "hello ann, from outside any bridge");
	mkdirSync(join(dir, ".nosedive"));
	writeFileSync(join(dir, ".nosedive", "config.yaml"), "kb: ./kb\n");
	assert.equal(await greet(dir), `hello ann, from ${basename(dir)}`);
});

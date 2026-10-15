import { basename } from "node:path";
import type { Args, Ctx } from "nosedive-core";
import { i01a1335485c67c95b7efdf2f0e03cfd6 as findBridge } from "nosedive-core";

export async function i2e78b4e4a83558c980b15966807a88ed(args: Args, ctx: Ctx): Promise<void> {
	const bridge = findBridge(ctx.cwd);
	ctx.out(`hello ${String(args.who)}, from ${bridge ? basename(bridge.dir) : "outside any bridge"}`);
}

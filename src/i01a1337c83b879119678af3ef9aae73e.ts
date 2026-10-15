import type { ActionCall } from "nosedive-core";
import { i2e78b4e4a83558c980b15966807a88ed } from "./i2e78b4e4a83558c980b15966807a88ed.ts";

export async function i01a1337c83b879119678af3ef9aae73e(call: ActionCall): Promise<void> {
	switch (call.usage) {
		case "u2e78b4e4a83558c980b15966807a88ed": // greet <who>
			return i2e78b4e4a83558c980b15966807a88ed(call.args, call.ctx);
		default:
			throw new Error(`greet has no impl for ${call.usage}`);
	}
}

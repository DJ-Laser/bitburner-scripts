import { NS } from "@ns";
import { validateArgs } from "/lib/types";

export async function main(ns: NS) {
  const [target, sleepTime] = validateArgs(
    ns.args,
    ["string", "number"] as const,
    [undefined, 0]
  );
  await ns.sleep(sleepTime);
  await ns.hack(target);
}

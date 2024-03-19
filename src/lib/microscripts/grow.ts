import { NS } from "@ns";
import { args } from "/lib/types";

export function main(ns: NS) {
  const target = args.toString(ns.args[0]);
  if (target == undefined) {
    throw TypeError("Target (script arg 0) must not be undefined!");
  }
  ns.sleep(args.toNumber(ns.args[1]) ?? 0);
  ns.grow(target);
}

import { NS } from "@ns";

export async function main(ns: NS) {
  const target = "n00dles";
  const securityThresh = ns.getServerMinSecurityLevel(target);
  const moneyThresh = ns.getServerMaxMoney(target);

  while (true) {
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      // If the server's security level is above our threshold, weaken it
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      // Otherwise, if the server's money is less than our threshold, grow it
      await ns.grow(target);
    } else {
      // Otherwise, hack it
      await ns.hack(target);
    }
  }
}

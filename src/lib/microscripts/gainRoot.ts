import { NS } from "@ns";
import { KeyOfType } from "/lib/types";

export function main(ns: NS) {
  gainRoot({ ns: ns, server: ns.args[0].toString() });
}

const portOpeners: KeyOfType<NS, (host: string) => void>[] = [
  "brutessh",
  "ftpcrack",
  "relaysmtp",
  "httpworm",
  "relaysmtp",
];

export default function gainRoot({ ns, server }: { ns: NS; server: string }) {
  const portsNeeded = ns.getServerNumPortsRequired(server);
  let portsOpened = 0;
  // Run all port openers
  for (let i = 0; portsOpened < portsNeeded; i++) {
    // Don't nuke if not enough ports were opened
    if (i == portOpeners.length) {
      return;
    }
    portsOpened++;
    try {
      ns[portOpeners[i]](server);
    } catch (e) {
      // Don't increment portsOpened if program failed;
      portsOpened--;
    }
  }

  // NUKE once enough ports are open
  ns.nuke(server);
}

function satisfyRamChecker(ns: NS, server: string) {
  ns.brutessh(server);
  ns.ftpcrack(server);
  ns.relaysmtp(server);
  ns.httpworm(server);
  ns.sqlinject(server);
}

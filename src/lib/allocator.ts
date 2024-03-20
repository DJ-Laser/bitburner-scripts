import { NS } from "@ns";
import { validateArgs } from "/lib/types";
import findAllServers from "/lib/microscripts/findServers";

export async function main(ns: NS) {
  const [script] = validateArgs(ns.args, ["string"] as const);
  const servers = await findAllServers(ns);

  for (const server of servers) {
    if (ns.hasRootAccess(server)) {
      const ramAvailable =
        ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
      const ramNeeded = ns.getScriptRam(script);
      const threads = Math.floor(ramAvailable / ramNeeded);

      ns.scp(script, server);
      if (threads > 0) {
        ns.exec(script, server, threads);
      }
    }
  }
}

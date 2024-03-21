import { NS } from "@ns";
import crawl from "/lib/crawler";

export async function main(ns: NS) {
  crawl(ns, ({ server, depth }) => {
    ns.tprint(
      `${"==".repeat(depth)}> ${server} Root: ${
        ns.hasRootAccess(server) ? "YES" : "NO "
      }`
    );
  });
}

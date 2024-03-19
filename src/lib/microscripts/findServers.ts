import { NS } from "@ns";
import crawl from "../crawler";

export function main(ns: NS) {
  const output = findAllServers(ns);
}

export default function findAllServers(ns: NS) {
  const servers: string[] = [];
  crawl(ns, ({ server }) => {
    servers.push(server);
  });
  return servers;
}

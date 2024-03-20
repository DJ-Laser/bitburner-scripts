import { NS } from "@ns";
import MicroscriptStorage from "/lib/storage";
import crawl from "/lib/crawler";

export async function main(ns: NS) {
  const output = await findAllServers(ns);
  MicroscriptStorage.store("findServers", output);
}

export default async function findAllServers(ns: NS) {
  const servers: string[] = [];
  await crawl(ns, ({ server }) => {
    servers.push(server);
  });
  return servers;
}

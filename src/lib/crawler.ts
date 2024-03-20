import { NS } from "@ns";

interface crawlerLocationData {
  ns: NS;
  server: string;
  parent?: string;
  depth: number;
}

type crawlerFn = (data: crawlerLocationData) => void | Promise<unknown>;

export default async function crawl(ns: NS, func: crawlerFn, host = "home") {
  await _crawl({ ns: ns, server: host, depth: 0 }, func);
}

async function _crawl(opts: crawlerLocationData, func: crawlerFn) {
  const { ns, server, parent, depth } = opts;
  func(opts);
  const connections = ns.scan(server);
  for (const newServer of connections) {
    if (newServer !== parent) {
      await _crawl(
        { ns: ns, server: newServer, parent: server, depth: depth + 1 },
        func
      );
    }
  }
}

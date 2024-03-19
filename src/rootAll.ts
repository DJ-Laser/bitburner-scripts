import { NS } from "@ns";
import gainRoot from "./lib/microscripts/gainRoot";
import crawl from "/lib/crawler";

export async function main(ns: NS) {
  await crawl(ns, gainRoot);
}

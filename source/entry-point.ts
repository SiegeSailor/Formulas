import figlet from "figlet";
import { Command } from "commander";
import { readdirSync } from "fs";
import { join } from "path";

import Package from "../package.json";

console.error(figlet.textSync("Formulas", "Banner"));

const program = new Command();

program
  .name(Package.name)
  .version(Package.version)
  .description(Package.description);

program
  .command("list")
  .description("List available algorithms.")
  .action(() => {
    readdirSync(join(process.cwd(), "algorithms")).forEach((item) => {
      const isDirectory = item.indexOf(".") == -1;
      if (isDirectory) return;

      console.log(item);
    });
  });

program.parse();

export {};

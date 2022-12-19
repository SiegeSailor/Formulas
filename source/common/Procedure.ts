import chalk from "chalk";
import inquirer from "inquirer";

import { ESymbols } from "./constants";

export default class Procedure {
  public run: () => Promise<void>;

  constructor(name: string, callback: () => Promise<void>) {
    this.run = async function () {
      try {
        console.log(
          chalk.bgCyan.bold(`\n ${ESymbols.ArrowDownloadBottom} ${name} `)
        );
        await callback();
        while (true) {
          const { _: isRestart } = await inquirer.prompt([
            {
              type: "confirm",
              name: "_",
              message: "Do you want to restart this file?",
            },
          ]);
          if (isRestart) await callback();
          else break;
        }
        console.log(
          chalk.bgCyan.bold(` ${ESymbols.ArrowDownloadTop} ${name} `)
        );
        console.log(chalk.gray("Going back to the main menu.\n"));
      } catch (error) {
        throw error;
      }
    };
  }
}

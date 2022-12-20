import chalk from "chalk";
import inquirer from "inquirer";

import { ESymbols } from "./constants";

export default class Procedure {
  public run: () => Promise<void>;

  constructor(name: string, callback: () => Promise<void>) {
    const wrap = async () => {
      console.time(chalk.bold("\tTime consumed"));
      await callback();
      console.timeEnd(chalk.bold("\tTime consumed"));
    };

    this.run = async function () {
      try {
        console.log(
          chalk.bgCyan.bold(`\n ${ESymbols.ArrowDownloadBottom} ${name} `)
        );
        await wrap();

        while (true) {
          const { _: isRestart } = await inquirer.prompt([
            {
              type: "confirm",
              name: "_",
              message: "Do you want to restart this procedure?",
            },
          ]);
          if (isRestart) await wrap();
          else break;
        }
        console.log(
          chalk.bgCyan.bold(` ${ESymbols.ArrowDownloadTop} ${name} `)
        );
        console.log(chalk.gray("Going back to the previous menu.\n"));
      } catch (error) {
        throw error;
      }
    };
  }
}

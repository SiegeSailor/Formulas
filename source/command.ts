import inquirer from "inquirer";
import chalk from "chalk";
import nanospinner from "nanospinner";

import { ENames, EChoices } from "./constants";

function main() {
  inquirer
    .prompt([
      {
        type: "list",
        name: ENames.Purpose,
        message: "What do you want to do?",
        choices: [{ name: EChoices.Demonstrate }, { name: EChoices.Execute }],
      },
    ])
    .then(({ [ENames.Purpose]: purpose }) => {
      switch (purpose) {
        case EChoices.Demonstrate:
          break;
        case EChoices.Execute:
          break;
        default:
          throw new Error("Something wrong with the prompt flow.");
      }
    })
    .catch((error) => {
      console.error(chalk.red(error.message));
    })
    .finally(() => {
      const spinner = nanospinner
        .createSpinner(chalk.yellow("Processing"))
        .start();
      setTimeout(() => {
        spinner.success({ text: chalk.green("Done") });
        main();
      }, 200);
    });
}

main();

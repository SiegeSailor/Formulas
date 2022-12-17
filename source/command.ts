import inquirer from "inquirer";
import PressToContinuePrompt from "inquirer-press-to-continue";
import chalk from "chalk";
import { readdirSync } from "fs";
import { join } from "path";

import { ENames, EChoices } from "./common/constants";

inquirer.registerPrompt("press-to-continue", PressToContinuePrompt);

function execute() {}

function demonstrate() {
  inquirer
    .prompt([
      {
        type: "list",
        name: ENames.Demonstrate,
        message: "Which cryptograph procedure do you want to demonstrate?",
        choices: readdirSync(join(process.cwd(), "source/illustration")).map(
          (filename) => {
            return { name: filename };
          }
        ),
      },
    ])
    .then(async ({ [ENames.Demonstrate]: demonstrate }) => {
      const call = await import(
        join(process.cwd(), `source/illustration/${demonstrate}`)
      );
      call.default();
    });
}

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
          demonstrate();
          break;
        case EChoices.Execute:
          execute();
          break;
        default:
          throw new Error("Something wrong with the prompt flow.");
      }
    })
    .catch((error) => {
      console.error(chalk.red(error.message));
    });
}

main();

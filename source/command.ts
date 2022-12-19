import inquirer from "inquirer";
import PressToContinuePrompt from "inquirer-press-to-continue";
import chalk from "chalk";
import { readdirSync } from "fs";
import { join } from "path";

import { ENames, EChoices } from "./common/constants";

inquirer.registerPrompt("press-to-continue", PressToContinuePrompt);

function exit() {
  console.log(chalk.gray("Successfully terminated the program."));
}

async function execute() {
  try {
    const { [ENames.Execute]: execute } = await inquirer.prompt([
      {
        type: "list",
        name: ENames.Execute,
        message: "Which cryptograph algorithm do you want to execute?",
        choices: readdirSync(join(process.cwd(), "source/algorithms")).map(
          (folder) => {
            return { name: folder };
          }
        ),
      },
    ]);
    const call = await import(
      join(process.cwd(), `source/algorithms/${execute}/index.ts`)
    );
    if (call.prompt) await call.prompt();
    else
      throw new Error("The algorithm is not ready for interactive commands.");
  } catch (error) {
    throw error;
  }
}

async function demonstrate() {
  try {
    const { [ENames.Demonstrate]: demonstrate } = await inquirer.prompt([
      {
        type: "list",
        name: ENames.Demonstrate,
        message: "Which cryptograph procedure do you want to demonstrate?",
        choices: readdirSync(join(process.cwd(), "source/illustration")).map(
          (file) => {
            return { name: file };
          }
        ),
      },
    ]);
    const call = await import(
      join(process.cwd(), `source/illustration/${demonstrate}`)
    );
    await call.default();
  } catch (error) {
    throw error;
  }
}

async function main(message = "What do you want to do?") {
  return inquirer
    .prompt([
      {
        type: "list",
        name: ENames.Purpose,
        message,
        choices: [
          { name: EChoices.Demonstrate },
          { name: EChoices.Execute },
          { name: EChoices.Exit },
        ],
      },
    ])
    .then(async ({ [ENames.Purpose]: purpose }) => {
      switch (purpose) {
        case EChoices.Demonstrate:
          await demonstrate();
          console.log();
          main();
          break;
        case EChoices.Execute:
          await execute();
          console.log();
          main();
          break;
        case EChoices.Exit:
          exit();
          break;
        default:
          throw new Error("Something wrong with the prompt flow.");
      }
    })
    .catch((_) => {
      const error: Error = _;
      console.error(`\t${chalk.red(error.message)}`);
      main("Unexpected result. Please restart your flow.");
    });
}

main();

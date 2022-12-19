import inquirer from "inquirer";
import InquirerPluginPressToContinue from "inquirer-press-to-continue";
import chalk from "chalk";
import { readdirSync } from "fs";
import { join } from "path";

import { format } from "./common/utilities";
import { ENames, EChoices } from "./common/constants";

inquirer.registerPrompt("press-to-continue", InquirerPluginPressToContinue);

function exit() {
  console.log(chalk.gray("Successfully terminated the program."));
}

async function execute() {
  try {
    const arrayOfFolder = readdirSync(join(process.cwd(), "source/algorithms"));
    const { [ENames.Execute]: index } = await inquirer.prompt([
      {
        type: "rawlist",
        name: ENames.Execute,
        message: "Which cryptograph algorithm do you want to execute?",
        choices: arrayOfFolder.map((foldername, index) => {
          return {
            name: format.algorithm(foldername),
            value: index,
          };
        }),
        pageSize: Number.MAX_VALUE,
      },
    ]);

    const choseAlgorithm = arrayOfFolder[index];
    console.log(chalk.gray(format.algorithm(choseAlgorithm)));
    const { prompt } = await import(
      join(process.cwd(), `source/algorithms/${choseAlgorithm}/index.ts`)
    );
    if (!prompt)
      throw new Error("The algorithm is not ready for interactive commands.");

    await prompt();
    while (true) {
      const { [ENames.Restart]: isRestart } = await inquirer.prompt([
        {
          type: "confirm",
          name: ENames.Restart,
          message: "Do you want to restart this algorithm?",
        },
      ]);
      if (isRestart) await prompt();
      else {
        console.log(chalk.gray("Going back to the main menu."));
        break;
      }
    }
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

import inquirer from "inquirer";
import InquirerPluginPressToContinue from "inquirer-press-to-continue";
import chalk from "chalk";

import { format, inquire } from "./common/utilities";
import { EChoices } from "./common/constants";

inquirer.registerPrompt("press-to-continue", InquirerPluginPressToContinue);

async function main(message = "What do you want to do?") {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "_",
        message,
        choices: [
          { name: EChoices.Demonstrate },
          { name: EChoices.Execute },
          { name: EChoices.Exit },
        ],
      },
    ])
    .then(async ({ _: purpose }) => {
      switch (purpose) {
        case EChoices.Demonstrate:
          await inquire.procedure(
            "source/illustration",
            "Which cryptograph procedure do you want to demonstrate?",
            format.filename
          );
          main();
          break;
        case EChoices.Execute:
          await inquire.procedure(
            "source/algorithms",
            "Which cryptograph algorithm do you want to execute?",
            format.foldername
          );
          main();
          break;
        case EChoices.Exit:
          console.log(chalk.gray("Successfully terminated the program.\n"));
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

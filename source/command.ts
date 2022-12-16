import inquirer from "inquirer";
import chalk from "chalk";
import nanospinner from "nanospinner";

enum EName {
  Purpose = "Purpose",
}

enum EChoices {
  Demonstrate = "Demonstrate a cryptography procedure",
  Execute = "Execute individual algorithm",
  Discover = "Discover the story behind this project",
}

function discover() {
  console.log("This project was inspired by the course ");
}

function main() {
  inquirer
    .prompt([
      {
        type: "list",
        name: EName.Purpose,
        message: "What do you want to do?",
        choices: [
          { name: EChoices.Demonstrate },
          { name: EChoices.Execute },
          new inquirer.Separator(),
          { name: EChoices.Discover },
        ],
      },
    ])
    .then(({ [EName.Purpose]: purpose }) => {
      switch (purpose) {
        case EChoices.Demonstrate:
          break;
        case EChoices.Execute:
          break;
        case EChoices.Discover:
          discover();
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

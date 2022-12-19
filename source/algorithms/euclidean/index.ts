import chalk from "chalk";
import inquirer from "inquirer";

import { log } from "../../common/utilities";

export function _(left: bigint, right: bigint): bigint {
  const remainder = left % right;
  if (left % right === BigInt(0)) return BigInt(right);

  return _(right, remainder);
}

export async function prompt() {
  console.log("\tGCD(left, right) = result");
  console.log(chalk.gray("\tGCD(614, 513) = 1"));

  const { left, right } = await inquirer.prompt([
    {
      type: "number",
      name: "left",
      message: `Enter ${chalk.italic("left")}:`,
      default: 1,
    },
    {
      type: "number",
      name: "right",
      message: `Enter ${chalk.italic("right")}:`,
      default: 1,
    },
  ]);

  const result = _(BigInt(left), BigInt(right));
  log.highlight(`GCD(${left}, ${right}) = ${result}`);
}

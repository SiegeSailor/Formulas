import chalk from "chalk";
import inquirer from "inquirer";

import { log } from "../../common/utilities";

export function _(left: bigint, right: bigint) {
  const recursion = (left: bigint, right: bigint) => {
    if (right == BigInt(0)) return [left, BigInt(1), BigInt(0)];

    const arrayOfResult = _(right, left % right);
    return [
      arrayOfResult[0],
      arrayOfResult[2],
      arrayOfResult[1] - (left / right) * arrayOfResult[2],
    ];
  };

  return recursion(left, right);
}

export async function prompt() {
  console.log("\tGCD(left, right) = result");
  console.log(chalk.gray("\tGCD(106, 112) = -19 * 106 + 18 * 112 = 2"));

  const { left, right } = await inquirer.prompt([
    {
      type: "number",
      name: "left",
      message: `Enter ${chalk.italic("left")}:`,
      default: BigInt(1),
    },
    {
      type: "number",
      name: "right",
      message: `Enter ${chalk.italic("right")}:`,
      default: BigInt(1),
    },
  ]);

  const [result, x, y] = _(BigInt(left), BigInt(right));
  log.highlight(
    `GCD(${left}, ${right}) = ${x} * ${left} + ${y} * ${right} = ${result}`
  );
}

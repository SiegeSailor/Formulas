import chalk from "chalk";
import inquirer from "inquirer";

import { _ as euclidean } from "../euclidean";
import { math } from "../../common/utilities";

export function _(input: bigint) {
  let x = BigInt(2),
    y = BigInt(2),
    divisor = BigInt(1),
    count = BigInt(0),
    power = BigInt(1);

  while (divisor === BigInt(1)) {
    if (count === power) {
      x = y;
      power <<= BigInt(1);
    }
    y = (y * y + BigInt(1)) % input;
    x = (x * x + BigInt(1)) % input;
    divisor = euclidean(math.absolute(y - x), input);
    count++;
  }
  return divisor;
}

export async function prompt() {}

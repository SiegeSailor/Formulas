import chalk from "chalk";
import inquirer from "inquirer";

import { ESymbols } from "../../common/constants";

export function _(base: bigint, exponent: bigint, modulo: bigint): bigint {
  const recursion = (
    base: bigint,
    exponent: bigint,
    product: bigint,
    modulo: bigint
  ) => {
    if (!exponent) return BigInt(product);

    return exponent % BigInt(2) == BigInt(0)
      ? recursion((base * base) % modulo, exponent / BigInt(2), product, modulo)
      : recursion(
          base,
          exponent - BigInt(1),
          (base * product) % modulo,
          modulo
        );
  };

  return recursion(base, exponent, BigInt(1), modulo);
}

export async function prompt() {
  console.log(`\tbase^exponent % modulo ${ESymbols.Congruent} x. x = result`);
  console.log(chalk.gray(`\t2^100 % 71 ${ESymbols.Congruent} 20. x = 20`));
}

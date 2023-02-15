import chalk from "chalk";
import inquirer from "inquirer";

import { _ as millerRabinPrimarilyTest } from "../miller-rabin-primarily-test";

export function _(seed: number, bits: number) {
  if (seed <= 0 || bits <= 0)
    throw new Error("Given parameters must be higher than 0.");

  const p = generatePrime(bits, 3, 4, 5000);
  const q = generatePrime(bits, 3, 4, 5000);
  const n = p * q;
  let x = BigInt(seed) % n;

  function generatePrime(
    bits: number,
    congruent: number,
    modular: number,
    maxIterations: number
  ): bigint {
    let iterations = 0;
    while (iterations < maxIterations) {
      const candidate = randomOddNumber(bits);
      if (
        millerRabinPrimarilyTest(candidate, bits) &&
        candidate % BigInt(modular) === BigInt(congruent)
      ) {
        return candidate;
      }
      iterations++;
    }
    throw new Error(
      `Failed to generate prime after ${maxIterations} iterations`
    );
  }

  function randomOddNumber(bits: number): bigint {
    const min = 2n ** BigInt(bits - 1) + 1n;
    const max = 2n ** BigInt(bits) - 1n;
    const range = max - min;
    const random = BigInt(Math.floor(Math.random() * Number(range)));
    return min + random;
  }

  return () => {
    x = (x * x) % n;
    return x / n;
  };
}

export async function prompt() {
  console.log(`\tgenerate a 8-bit pseudo-random number x. x = result`);
  console.log(
    chalk.gray(`\tx is smaller or equal to ${Math.pow(2, 8) * Math.pow(2, 8)}`)
  );

  const { bits } = await inquirer.prompt([
    {
      type: "number",
      name: "bits",
      message: `Enter ${chalk.italic("bits")}:`,
      default: 1,
    },
  ]);

  const x = _(1, bits)();
  console.log(`\t${bits}-bit x = ${x}`);
}

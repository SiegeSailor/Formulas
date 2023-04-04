// import chalk from "chalk";
// import inquirer from "inquirer";

// import { _ as millerRabinPrimarilyTest } from "../miller-rabin-primarily-test";
// import { _ as pollardRho } from "../pollard-rho";

// export function _(seed: number, bits: number) {
//   if (seed <= 0 || bits <= 0)
//     throw new Error("Given parameters must be higher than 0.");

//   const p = generatePrime(bits, 3, 4, bits * 1000);
//   const q = generatePrime(bits, 3, 4, bits * 1000);
//   const product = p * q;
//   let x = BigInt(seed) % product;

//   function generatePrime(
//     bits: number,
//     congruent: number,
//     modular: number,
//     maxIterations: number
//   ): bigint {
//     let iterations = 0;
//     while (iterations < maxIterations) {
//       const candidate = randomOddNumber(bits);
//       if (
//         millerRabinPrimarilyTest(candidate, bits) &&
//         candidate % BigInt(modular) === BigInt(congruent)
//       ) {
//         return candidate;
//       }
//       const factor = pollardRho(candidate);
//       if (factor !== candidate && factor !== 1n) {
//         const z = factor;
//         const a = candidate / z;
//         if (z < a) {
//           return a;
//         } else {
//           return z;
//         }
//       }
//       iterations++;
//     }
//     throw new Error(
//       `Failed to generate prime after ${maxIterations} iterations.`
//     );
//   }

//   function randomOddNumber(bits: number): bigint {
//     const min = 2n ** BigInt(bits - 1) + 1n;
//     const max = 2n ** BigInt(bits) - 1n;
//     const range = max - min;
//     const random = BigInt(Math.floor(Math.random() * Number(range)));
//     return min + random;
//   }

//   return () => {
//     x = (x * x) % product;
//     return x / product;
//   };
// }

// export async function prompt() {
//   console.log(`\tgenerate a 8-bit pseudo-random number x. x = result`);
//   console.log(
//     chalk.gray(`\tx is smaller or equal to ${Math.pow(2, 8) * Math.pow(2, 8)}`)
//   );

//   const { bits } = await inquirer.prompt([
//     {
//       type: "number",
//       name: "bits",
//       message: `Enter ${chalk.italic("bits")}:`,
//       default: 1,
//     },
//   ]);

//   const x = _(1, bits)();
//   console.log(`\t${bits}-bit x = ${x}`);
// }

import chalk from "chalk";
import inquirer from "inquirer";
import random from "random-bigint";

export function _(bits: number) {
  if (bits <= 0) throw new Error("Given bits must be higher than 0.");

  const p = random(bits) + BigInt(1),
    q = random(bits) + BigInt(1),
    m = p * q;
  const seed = random(bits) + BigInt(1);
  let result = seed;

  return () => {
    result = result * result;
    result %= m;
    return result;
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

  const x = _(bits)();
  console.log(`\t${bits}-bit x = ${x}`);
}

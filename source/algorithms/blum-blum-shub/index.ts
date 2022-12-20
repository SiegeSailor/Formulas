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

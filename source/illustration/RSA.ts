import chalk from "chalk";
import nanospinner from "nanospinner";

import { _ as blumBlumShub } from "../algorithms/blum-blum-shub";
import { _ as millerRabinPrimarilyTest } from "../algorithms/miller-rabin-primarily-test";

const ALICE = "Alice",
  Bob = "Bob",
  Eve = "Eve";

function obtainPQ(bits: number, level: number) {
  const arrayOfPrime: bigint[] = [];

  while (arrayOfPrime.length != 2) {
    const numberPseudoRandom = blumBlumShub(bits)();
    if (millerRabinPrimarilyTest(numberPseudoRandom, level))
      arrayOfPrime.push(numberPseudoRandom);
  }

  return arrayOfPrime;
}

function obtainCandidates() {
  return;
}

function _() {
  console.log("== Demonstrating RSA Encryption ==");
  console.log("There are three people in this RSA encryption process:");
  console.log(`\t${ALICE}\n\t${Bob}\n\t${Eve}\n`);

  console.log("Alice is going to pick up prime numbers P and Q:");
  const bits = 30,
    level = 10;
  const spinner = nanospinner
    .createSpinner(
      chalk.yellow(`Picking ${bits}-bit prime numbers at random level ${level}`)
    )
    .start();
  const [p, q] = obtainPQ(bits, level),
    n = p * q,
    r = (p - BigInt(1)) * (q - BigInt(1));
  spinner.success({ text: chalk.green("Done") });
  console.table(
    [
      { name: "P", value: p },
      { name: "Q", value: q },
      { name: "n", value: n },
      { name: "r", value: r },
    ],
    ["name", "value"]
  );
}

export default _;

import chalk from "chalk";
import inquirer from "inquirer";
import nanospinner from "nanospinner";

import { blumBlumShub, millerRabinPrimarilyTest } from "../entry-point";
import { EActors } from "../common/constants";
import { inquireConfirm } from "../common/utilities";

function obtainPQ(bits: number, level: number) {
  const arrayOfPrime: bigint[] = [];

  while (arrayOfPrime.length != 2) {
    const numberPseudoRandom = blumBlumShub(bits)();
    if (millerRabinPrimarilyTest(numberPseudoRandom, level))
      arrayOfPrime.push(numberPseudoRandom);
  }

  return arrayOfPrime;
}

function obtainCandidates(r: bigint) {
  const arrayOfCandidate: bigint[] = [];

  let cache = r + BigInt(1);
  for (let i = 0; i < 10; i++) {
    arrayOfCandidate.push(cache);
    cache = cache + r;
  }

  return arrayOfCandidate;
}

async function _() {
  console.log("== Demonstrating RSA Encryption ==");
  console.log("There are three people in this RSA encryption process:");
  console.log(`\t${EActors.Alice}\n\t${EActors.Bob}\n\t${EActors.Eve}\n`);

  const r = await inquireConfirm(
    `${EActors.Alice} is going to pick up prime numbers P and Q:`,
    () => {
      const bits = 10,
        level = 5;
      const spinner = nanospinner
        .createSpinner(
          chalk.cyan(
            `Obtaining ${bits}-bit prime numbers at random level ${level}`
          )
        )
        .start({ color: "cyan" });
      const [p, q] = obtainPQ(bits, level);
      spinner.success({ text: chalk.cyan("Done") });

      const n = p * q;
      const r = (p - BigInt(1)) * (q - BigInt(1));
      console.table(
        [
          { name: "P", value: p },
          { name: "Q", value: q },
          { name: "n", value: n },
          { name: "r", value: r },
        ],
        ["name", "value"]
      );

      return r;
    }
  );

  inquireConfirm(
    `${EActors.Alice} is going to pick the candidates which equal % r = 1:`,
    () => {
      const arrayOfCandidate = obtainCandidates(r);
      console.table(
        arrayOfCandidate.map((candidate) => {
          return { value: candidate };
        }),
        ["value"]
      );
    }
  );
}

export default _;

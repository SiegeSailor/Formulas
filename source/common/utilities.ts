import inquirer from "inquirer";
import chalk from "chalk";
import type { KeyDescriptor } from "inquirer-press-to-continue";

import { blumBlumShub, millerRabinPrimarilyTest } from "../entry-point";

export const log = {
  highlight: (input: string) => {
    console.log("\n" + chalk.bold.cyan(input));
  },
  list: (listOfItem: { name: string; value: any }[]) => {
    listOfItem.forEach(({ name, value }) => {
      console.log(`\t${name}: ${chalk.gray(value)}`);
    });
  },
};

export const inquire = {
  confirm: async <T>(title: string, callback: () => T): Promise<T> => {
    try {
      log.highlight(title);
      await inquirer.prompt<{ key: KeyDescriptor }>({
        type: "press-to-continue",
        name: "_",
        anyKey: true,
        pressToContinueMessage: "Press a key to continue.\n",
      });

      return await callback();
    } catch (error) {
      throw error;
    }
  },
};

export const wrap = {
  randomize: (bits: number, level: number, count: number) => {
    const arrayOfPrime: bigint[] = [];

    while (arrayOfPrime.length != count) {
      const numberPseudoRandom = blumBlumShub(bits)();
      if (millerRabinPrimarilyTest(numberPseudoRandom, level))
        arrayOfPrime.push(numberPseudoRandom);
    }

    return arrayOfPrime;
  },
  remain: (modulo: bigint, remainder: bigint) => {
    if (remainder >= modulo)
      throw new Error(
        "Desired remainder can't be equal to or larger than the given modulo."
      );

    const arrayOfResult: bigint[] = [];

    let cache = modulo + remainder;
    for (let i = 0; i < 10; i++) {
      arrayOfResult.push(cache);
      cache = cache + modulo;
    }
    return arrayOfResult;
  },
  encrypt: (message: string, callback: (code: number) => bigint) => {
    return message.split("").map((character) => {
      const code = character.charCodeAt(0);
      return callback(code);
    });
  },
  decrypt: (
    arrayOfEncryptedCode: bigint[],
    callback: (codeEncrypted: bigint) => bigint
  ) => {
    return arrayOfEncryptedCode
      .map((codeEncrypted) => {
        const code = callback(codeEncrypted);
        return String.fromCharCode(Number(code));
      })
      .join("");
  },
};

import inquirer from "inquirer";
import type { KeyDescriptor } from "inquirer-press-to-continue";
import chalk from "chalk";
import { readdirSync } from "fs";
import { join } from "path";

import { blumBlumShub, millerRabinPrimarilyTest } from "../entry-point";
import Procedure from "./Procedure";

export const format = {
  foldername: (foldername: string) => {
    return foldername
      .split("-")
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(" ");
  },
  filename: (filename: string) => {
    return filename.split(".")[0];
  },
};

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
  continue: async <T>(title: string, callback: () => T): Promise<T> => {
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
  procedure: async (
    path: string,
    message: string,
    fileFormatter: (input: string) => string
  ) => {
    try {
      const arrayOfFile = readdirSync(join(process.cwd(), path));
      const { procedure: index } = await inquirer.prompt([
        {
          type: "rawlist",
          name: "procedure",
          message,
          choices: arrayOfFile.map((foldername, index) => {
            return {
              name: fileFormatter(foldername),
              value: index,
            };
          }),
          pageSize: Number.MAX_VALUE,
        },
      ]);

      const name = fileFormatter(arrayOfFile[index]);
      console.log(chalk.gray(name));
      const { prompt }: { prompt: () => Promise<void> } = await import(
        join(process.cwd(), `${path}/${arrayOfFile[index]}`)
      );
      if (!prompt)
        throw new Error("The file is not ready for interactive commands.");

      const procedure = new Procedure(name, prompt);
      await procedure.run();
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

import inquirer from "inquirer";
import chalk from "chalk";
import type { KeyDescriptor } from "inquirer-press-to-continue";

export const log = {
  highlight: (input: string) => {
    console.log("\n" + chalk.bold.cyan(input));
  },
  list: (listOfItem: { name: string; value: any }[]) => {
    listOfItem.forEach(({ name, value }) => {
      console.log(`\t${name}: ${value}`);
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

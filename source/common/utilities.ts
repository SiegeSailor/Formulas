import inquirer from "inquirer";
import chalk from "chalk";
import type { KeyDescriptor } from "inquirer-press-to-continue";

export function logHighlight(input: string) {
  console.log("\n" + chalk.bold.cyan(input));
}

export function logList(listOfItem: { name: string; value: any }[]) {
  listOfItem.forEach(({ name, value }) => {
    console.log(`\t${name}: ${value}`);
  });
}

export async function inquireConfirm<T>(
  title: string,
  callback: () => T
): Promise<T> {
  try {
    logHighlight(title);
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
}

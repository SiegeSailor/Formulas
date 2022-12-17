import inquirer from "inquirer";
import type { KeyDescriptor } from "inquirer-press-to-continue";

export async function inquireConfirm<T>(
  title: string,
  callback: () => T
): Promise<T> {
  try {
    console.log(title);
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

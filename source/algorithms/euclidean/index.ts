import inquirer from "inquirer";

export function _(left: bigint, right: bigint) {
  const remainder = left % right;
  if (left % right === BigInt(0)) return right;

  return _(right, remainder);
}

export function prompt() {
  inquirer.prompt([
    {
      type: "number",
      name: "left",
      message: "",
    },
  ]);
}

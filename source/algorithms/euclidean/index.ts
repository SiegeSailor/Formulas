import inquirer from "inquirer";

export function _(left: number, right: number) {
  const remainder = left % right;
  if (left % right === 0) return right;

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

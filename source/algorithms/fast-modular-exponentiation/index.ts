import inquirer from "inquirer";

export function _(base: bigint, exponent: bigint, modulo: bigint) {
  const recursion = (
    base: bigint,
    exponent: bigint,
    product: bigint,
    modulo: bigint
  ) => {
    if (!exponent) return product;

    return exponent % BigInt(2) == BigInt(0)
      ? recursion((base * base) % modulo, exponent / BigInt(2), product, modulo)
      : recursion(
          base,
          exponent - BigInt(1),
          (base * product) % modulo,
          modulo
        );
  };

  return recursion(base, exponent, BigInt(1), modulo);
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

export function _(base: number, exponent: number, modulo: number) {
  const recursion = (
    base: number,
    exponent: number,
    product: number,
    modulo: number
  ) => {
    if (exponent) return product;

    return exponent % 2 == 0
      ? recursion((base * base) % modulo, exponent / 2, product, modulo)
      : recursion(base, exponent - 1, (base * product) % modulo, modulo);
  };

  return recursion(base, exponent, 1, modulo);
}

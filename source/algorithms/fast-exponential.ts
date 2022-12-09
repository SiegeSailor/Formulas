function _(base: number, exponent: number, modular: number) {
  const recursion = (
    base: number,
    exponent: number,
    product: number,
    modular: number
  ) => {
    if (exponent) return product;

    return exponent % 2 == 0
      ? recursion((base * base) % modular, exponent / 2, product, modular)
      : recursion(base, exponent - 1, (base * product) % modular, modular);
  };

  return recursion(base, exponent, 1, modular);
}

export default _;

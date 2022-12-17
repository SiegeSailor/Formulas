export function _(base: bigint, modulo: bigint, number: number) {
  const main = (base: bigint, modulo: bigint) => {
    for (let inverse = BigInt(1); inverse < modulo; inverse++) {
      if (((base % modulo) * (inverse % modulo)) % modulo === BigInt(1))
        return inverse;
    }
    return BigInt(1);
  };

  const inverse = main(base, modulo);
  const arrayOfInverse: bigint[] = [];
  for (let count = BigInt(1); count <= number; count++) {
    arrayOfInverse.push(inverse * count);
  }

  return arrayOfInverse;
}

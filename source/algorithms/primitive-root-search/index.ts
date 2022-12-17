import { _ as fastModularExponentiation } from "./../fast-modular-exponentiation";
import { _ as millerRabinPrimarilyTest } from "./../miller-rabin-primarily-test";

export function _(prime: number): [number[][], number[]] {
  if (!millerRabinPrimarilyTest(BigInt(prime), 10))
    throw new Error("The Given number must be prime.");

  const phi = prime - 1;
  const table: number[][] = new Array(phi).fill(new Array(phi));

  const arrayOfResult: number[] = [];

  for (let indexRow = 0; indexRow < table.length; indexRow++) {
    const set: { [key: number]: boolean } = {};
    let isPrimitiveRoot = true;
    for (let indexColumn = 0; indexColumn < table[0].length; indexColumn++) {
      const exponent = fastModularExponentiation(
        BigInt(indexRow + 1),
        BigInt(indexColumn + 1),
        BigInt(prime)
      );
      const index = Number(exponent);
      table[indexRow][indexColumn] = index;

      if (set[index]) isPrimitiveRoot = false;
      set[index] = true;
    }

    if (isPrimitiveRoot) arrayOfResult.push(indexRow + 1);
  }

  return [table, arrayOfResult];
}

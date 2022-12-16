import { _ as fastModularExponentiation } from "./fast-modular-exponentiation";

function _(prime: number) {
  const phi = prime - 1;
  const table: number[][] = [];

  const arrayOfResult: number[] = new Array(phi).fill(-1);

  for (let indexRow = 0; indexRow < table.length; indexRow++) {
    const set: { [key: number]: boolean } = {};
    let isPrimitiveRoot = false;
    for (let indexColumn = 0; indexColumn < table[0].length; indexColumn++) {
      const exponent = fastModularExponentiation(
        indexRow + 1,
        indexColumn + 1,
        prime
      );
      table[indexRow][indexColumn] = exponent;

      if (set[exponent]) isPrimitiveRoot = false;
      set[exponent] = true;
    }

    if (isPrimitiveRoot) arrayOfResult[indexRow] = indexRow + 1;
  }

  return arrayOfResult;
}

_(131).forEach((result) => {
  if (result != -1) console.log(result);
});

export default _;

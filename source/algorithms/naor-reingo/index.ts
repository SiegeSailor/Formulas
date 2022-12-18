export function _(count: number, digits: number) {
  if (digits < 1) throw new Error("Numbers can't have digits less than 1.");
  const arrayOfResult: number[] = [];

  const arrayOfLib: number[] = [1, 2, 2, 1];
  const arrayOfBin: number[] = [];

  for (let i = 0; i < count; i++) {
    let x = Math.random() % 16;
    for (let j = 3; j >= 0; j--) {
      arrayOfBin[j] = x % 2;
      x /= 2;
    }

    let multiple = 1;
    for (let l = 0; l < 4; l++)
      multiple *= Math.pow(arrayOfLib[l], arrayOfBin[l]);
    arrayOfResult.push(
      Math.floor(Math.pow(2, multiple) * Math.pow(10, digits - 1))
    );
  }

  return arrayOfResult;
}

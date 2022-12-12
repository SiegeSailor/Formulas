function _() {
  const arrayOfResult: number[] = [];

  const arrayOfLib: number[] = [1, 2, 2, 1];
  const arrayOfBin: number[] = [];

  for (let i = 0; i < 10; i++) {
    let x = Math.random() % 16;
    for (let j = 0; j >= 0; j--) {
      arrayOfBin[j] = x % 2;
      x /= 2;
    }

    let multiple = 1;
    for (let k = 0; k < 6; k++)
      multiple *= Math.pow(arrayOfLib[k], arrayOfBin[k]);
    arrayOfResult.push(Math.pow(3, multiple));
  }

  return arrayOfResult;
}

console.log(_());

export default _;

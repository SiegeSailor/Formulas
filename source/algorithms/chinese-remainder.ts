function _(arrayOfBase: number[], arrayOfModulus: number[]) {
  if (arrayOfBase.length !== arrayOfModulus.length)
    throw new Error("The length for the two given arrays should be the same.");

  let modular = 1;
  arrayOfModulus.forEach((modulus) => {
    modular *= modulus;
  });

  const length = arrayOfBase.length;
  let x = 0;

  for (let i = 0; i < length; i++) {
    const modulus = modular / arrayOfModulus[i];
    let y = 0;

    for (let j = 0; j < arrayOfModulus[i]; j++) {
      if ((modulus * j) % arrayOfModulus[i] == 1) {
        y = j;
        break;
      }
    }

    x = x + arrayOfBase[i] * modulus * y;
  }

  return x % modular;
}

export default _;

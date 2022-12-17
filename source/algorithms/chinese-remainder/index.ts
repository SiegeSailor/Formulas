export function _(arrayOfBase: number[], arrayOfModulo: number[]) {
  if (arrayOfBase.length !== arrayOfModulo.length)
    throw new Error("The length for the two given arrays should be the same.");

  let modular = 1;
  arrayOfModulo.forEach((modulo) => {
    modular *= modulo;
  });

  const length = arrayOfBase.length;
  let x = 0;

  for (let i = 0; i < length; i++) {
    const modulo = modular / arrayOfModulo[i];
    let y = 0;

    for (let j = 0; j < arrayOfModulo[i]; j++) {
      if ((modulo * j) % arrayOfModulo[i] == 1) {
        y = j;
        break;
      }
    }

    x = x + arrayOfBase[i] * modulo * y;
  }

  return x % modular;
}

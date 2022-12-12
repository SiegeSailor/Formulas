import fastExponential from "./fast-exponential";

function _(base: number, congruent: number, modular: number) {
  const numberOfSteps = Math.ceil(Math.sqrt(modular));

  const arrayOfExponent = new Array(numberOfSteps).map((_, index) => {
    return fastExponential(base, numberOfSteps * index, modular);
  });

  const arrayOfCollision: [number, number][] = [];
  for (let step = 0; step < numberOfSteps; step++) {
    const result =
      (congruent * fastExponential(base, modular - (step + 1), modular)) %
      modular;

    for (let index = 0; index < arrayOfExponent.length; index++) {
      if (result === arrayOfExponent[index]) {
        arrayOfCollision.push([index, step]);
        break;
      }
    }
  }

  let value = 0;
  arrayOfCollision.forEach(([index, step]) => {
    value = numberOfSteps * index + (step % modular);
  });

  return value;
}

export default _;

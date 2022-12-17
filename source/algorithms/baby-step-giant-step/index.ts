import { _ as euclidean } from "../euclidean";
import { _ as fastModularExponentiation } from "../fast-modular-exponentiation";

export function _(generator: bigint, base: bigint, modulo: bigint) {
  if (modulo <= 1) throw new Error("Given modulo must be higher than 1");
  if (euclidean(generator, modulo) != BigInt(1))
    throw new Error("Given generator must satisfy GCD(generator, modulo) = 1");
  if (euclidean(base, modulo) != BigInt(1))
    throw new Error("Given base must satisfy GCD(base, modulo) = 1");

  const numberOfSteps = Math.ceil(Math.sqrt(Number(modulo))) + 1;

  const arrayOfCollision = new Array(Number(modulo)).fill(0);
  for (let i = numberOfSteps; i >= 1; --i) {
    const remainder = fastModularExponentiation(
      generator,
      BigInt(i * numberOfSteps),
      modulo
    );
    arrayOfCollision[Number(remainder)] = i;
  }

  for (let j = 0; j < numberOfSteps; ++j) {
    const indexCurrent = Number(
      (fastModularExponentiation(generator, BigInt(j), modulo) * base) % modulo
    );

    if (arrayOfCollision[indexCurrent] > 0) {
      const result = BigInt(arrayOfCollision[indexCurrent] * numberOfSteps - j);
      if (result < modulo) return result;
    }
  }

  return -1;
}

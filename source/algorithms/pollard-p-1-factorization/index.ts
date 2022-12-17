import { _ as euclidean } from "../euclidean";
import { _ as millerRabinPrimarilyTest } from "../miller-rabin-primarily-test";
import { _ as fastModularExponentiation } from "../fast-modular-exponentiation";

export function _(input: bigint) {
  const main = (input: bigint) => {
    let base = BigInt(2);
    let exponent = BigInt(2);
    while (exponent < input) {
      base = fastModularExponentiation(base, exponent, input);
      let factor = euclidean(base - BigInt(1), input);
      if (factor > 1) return factor;
      exponent += BigInt(1);
    }

    return BigInt(-1);
  };

  if (millerRabinPrimarilyTest(input, 10)) return [];

  let cache = input;
  const arrayOfPrimeFactor: number[] = [];
  while (true) {
    let factor = main(cache);
    if (factor === BigInt(-1))
      throw new Error(`${cache} from ${input} doesn't have prime factors.`);
    arrayOfPrimeFactor.push(Number(factor));
    const quotient = cache / factor;
    if (millerRabinPrimarilyTest(quotient, 5)) {
      arrayOfPrimeFactor.push(Number(quotient));
      break;
    } else cache = quotient;
  }

  return arrayOfPrimeFactor;
}

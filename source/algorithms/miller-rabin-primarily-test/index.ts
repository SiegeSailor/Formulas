import { _ as fastModularExponentiation } from "../fast-modular-exponentiation";

export function _(input: bigint, level: number) {
  const main = (input: bigint, odd: bigint) => {
    let remainder = fastModularExponentiation(
      BigInt(
        (Math.floor(Math.random() * (Number(input) - 2)) %
          (Number(input) - 4)) +
          2
      ),
      odd,
      input
    );
    if (remainder === BigInt(1) || remainder === input - BigInt(1)) return true;

    let oddCache = odd;
    while (oddCache != input - BigInt(1)) {
      remainder = (remainder * remainder) % input;
      oddCache *= BigInt(2);

      if (remainder === BigInt(1)) return false;
      if (remainder === input - BigInt(1)) return true;
    }

    return false;
  };

  if (input <= 1 || input === BigInt(4)) return false;
  if (input <= 3) return true;

  let odd = input - BigInt(1);
  while (odd % BigInt(2) === BigInt(0)) odd /= BigInt(2);

  for (let count = 0; count < level; count++) {
    if (!main(input, odd)) return false;
  }

  return true;
}

import chalk from "chalk";

import { _ as multiplicativeInverse } from "./index";

describe("Finding the Multiplicative Inverses of the given numbers", () => {
  test.each([
    [87, 131, [128, 256, 384, 512, 640]],
    [23, 41, [25, 50, 75, 100, 125]],
    [11, 13, [6, 12, 18, 24, 30]],
    [2, 7, [4, 8, 12, 16, 20]],
    [1011, 913, [736, 1472, 2208, 2944, 3680]],
  ])(
    `%p has some multiplicative inverses with modulo %p.\n\tmultiplicative inverses = ${chalk.greenBright(
      "%p"
    )}`,
    (base, modulo, result) => {
      expect(
        multiplicativeInverse(BigInt(base), BigInt(modulo), 5).sort()
      ).toEqual(
        result
          .map((item) => {
            return BigInt(item);
          })
          .sort()
      );
    }
  );
});

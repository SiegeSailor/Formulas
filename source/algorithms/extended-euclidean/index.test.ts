import chalk from "chalk";

import { _ as extendedEuclidean } from "./index";

describe("Finding the Greatest Common Divisor of the given numbers in smallest integers form", () => {
  test.each([
    [106, 112, -19, 18, 2],
    [640, 531, 190, -229, 1],
    [9123879, 421891, -19310, 417601, 1],
    [102039129492, 13, 1, -7849163807, 1],
    [13, 26, 1, 0, 13],
  ])(
    `GCD(%p, %p) = x.\n\tx = ${chalk.greenBright("%p * left + %p * right")}`,
    (left, right, x, y, result) => {
      expect(extendedEuclidean(BigInt(left), BigInt(right))).toEqual([
        BigInt(result),
        BigInt(x),
        BigInt(y),
      ]);
    }
  );
});

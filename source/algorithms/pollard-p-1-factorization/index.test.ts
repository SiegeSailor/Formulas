import chalk from "chalk";

import { _ as pollardP1Factorization } from "./index";

describe("Factor the given number", () => {
  test.each([
    [273, [3, 7, 13]],
    [9123, [3, 3041]],
    [5131475204070199, [4139, 4252207, 291563]],
    [1403, [23, 61]],
    [41399374705903, [487, 291563, 291563]],
  ])(
    `%p is consist with some factors.\n\tfactors = ${chalk.greenBright("%p")}`,
    (input, result) => {
      expect(pollardP1Factorization(BigInt(input)).sort()).toEqual(
        result.sort()
      );
    }
  );
});

import chalk from "chalk";

import { _ as pollardRho } from "./index";

describe("Finding the factor for the given input", () => {
  test.each([
    [361187n, 379n],
    [29996224275867n, 1n],
    [7n ** 5n, 7n],
    [732564058083n * 605789375811n, 605789375811n],
  ])(
    `%p has a factor\n\tis equal to ${chalk.greenBright("%p")}`,
    (input, factor) => {
      expect(pollardRho(input)).toEqual(factor);
    }
  );
});

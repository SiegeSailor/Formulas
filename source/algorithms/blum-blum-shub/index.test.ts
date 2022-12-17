import chalk from "chalk";

import { _ as blumBlumShub } from "./index";

describe("Generate pseudo random numbers", () => {
  test.each([1, 5, 10, 20, 30])(
    `${chalk.greenBright(
      "%p"
    )}-bit random number\n\tit is smaller or equal to its base-10 value`,
    (bits) => {
      expect(
        blumBlumShub(bits)() <= BigInt(Math.pow(2, bits) * Math.pow(2, bits))
      ).toBeTruthy();
    }
  );
});

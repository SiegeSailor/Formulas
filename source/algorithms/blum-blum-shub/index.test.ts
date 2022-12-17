import chalk from "chalk";

import { _ as blumBlumShub } from "./index";

describe("Generate pseudo random numbers", () => {
  test.each([2, 5, 10, 20, 30])(
    `${chalk.greenBright("%p")}-bit random number <= its base-10 value`,
    (bits) => {
      expect(
        blumBlumShub(bits)() <= BigInt(Math.pow(2, bits) * Math.pow(2, bits))
      ).toBeTruthy();
    }
  );
});

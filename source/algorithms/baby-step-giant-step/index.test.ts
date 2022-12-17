import chalk from "chalk";

import { _ as babyStepGiantStep } from "./index";
import { ESymbols } from "../../constants";

describe("Finding the Discrete Log for the given numbers", () => {
  test.each([[394948, 615192, 1093427, 246298]])(
    `%p^x ${ESymbols.Congruent} %p % %p.\n\tx = ${chalk.greenBright("%p")}`,
    (generator, base, modulo, result) => {
      expect(
        babyStepGiantStep(BigInt(generator), BigInt(base), BigInt(modulo))
      ).toEqual(BigInt(result));
    }
  );
});

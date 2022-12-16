import { _ as fastExponentiation } from "./index";
import { ESymbols } from "./../../constants";

describe("euclidean", () => {
  test.each([
    [50, 70, 71, 1],
    [394948, 615192, 1093427, 1089500],
    [11, 2, 2, 1],
    [985019284, 118293113, 13, 6],
    [1314520, 17, 11, 4],
  ])(
    `%p^%p mod %p ${ESymbols.Congruent} %p`,
    (base, exponent, modulo, result) => {
      expect(fastExponentiation(base, exponent, modulo)).toEqual(result);
    }
  );
});

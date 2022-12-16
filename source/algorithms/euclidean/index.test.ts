import { _ as euclidean } from "./index";

describe("euclidean", () => {
  test.each([
    [816, 2260, 4],
    [30513, 40242, 3],
    [614, 513, 1],
    [5102048903, 307803219, 1],
  ])("GCD(%p, %p) = %p", (left, right, result) => {
    expect(euclidean(left, right)).toEqual(result);
  });
});

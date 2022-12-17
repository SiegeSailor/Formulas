import random from "random-bigint";

export function _(bits: number) {
  if (bits <= 1) throw new Error("Bits must be at least 2");

  const p = random(bits),
    q = random(bits),
    m = p * q;
  const seed = random(bits);
  let result = seed;

  return () => {
    result = result * result;
    result %= m;
    return result;
  };
}

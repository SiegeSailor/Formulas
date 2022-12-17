import random from "random-bigint";

export function _(bits: number) {
  const p = random(bits) + BigInt(1),
    q = random(bits) + BigInt(1),
    m = p * q;
  const seed = random(bits) + BigInt(1);
  let result = seed;

  return () => {
    result = result * result;
    result %= m;
    return result;
  };
}

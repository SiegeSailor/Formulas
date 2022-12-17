import blumBlumShubPseudoRandomNumberGenerator from "../algorithms/blum-blum-shub";
import { _ as millerRabinPrimarilyTest } from "../algorithms/miller-rabin-primarily-test";

const ALICE = "Alice",
  Bob = "Bob",
  Eve = "Eve";

function obtainPQ() {
  const arrayOfPrime: number[] = [];
  while (arrayOfPrime.length != 2) {
    const answer = blumBlumShubPseudoRandomNumberGenerator();
    if (millerRabinPrimarilyTest(answer, 5)) arrayOfPrime.push(answer);

    if (arrayOfPrime.length != 2) console.log("Generating...");
  }

  return arrayOfPrime;
}

function obtainCandidates() {
  return;
}

function _() {
  console.log("== Demonstrating RSA Encryption ==");
  console.log("There are three people in this RSA encryption process:");
  console.log(`\t${ALICE}\n\t${Bob}\n\t${Eve}\n`);

  console.log("Alice is going to pick up prime numbers P and Q:");
  const [p, q] = obtainPQ(),
    n = p * q,
    r = (p - 1) * (q - 1);
  console.log(`P: ${p}. Q: ${q}. n: ${n}. r: ${r}`);
}

export default _;

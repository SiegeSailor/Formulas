import chalk from "chalk";

import {
  blumBlumShub,
  fastModularExponentiation,
  millerRabinPrimarilyTest,
  pollardP1Factorization,
} from "../entry-point";
import { EActors } from "../common/constants";
import { logHighlight, logList, inquireConfirm } from "../common/utilities";

function obtainPQ(bits: number, level: number) {
  const arrayOfPrime: bigint[] = [];

  while (arrayOfPrime.length != 2) {
    const numberPseudoRandom = blumBlumShub(bits)();
    if (millerRabinPrimarilyTest(numberPseudoRandom, level))
      arrayOfPrime.push(numberPseudoRandom);
  }

  return arrayOfPrime;
}

function obtainCandidates(r: bigint) {
  const arrayOfCandidate: bigint[] = [];

  let cache = r + BigInt(1);
  for (let i = 0; i < 10; i++) {
    arrayOfCandidate.push(cache);
    cache = cache + r;
  }

  return arrayOfCandidate;
}

function encrypt(message: string, exponent: bigint, modulo: bigint) {
  return message.split("").map((character) => {
    const code = character.charCodeAt(0);
    return fastModularExponentiation(BigInt(code), exponent, modulo);
  });
}

function decrypt(
  arrayOfEncryptedCode: bigint[],
  exponent: bigint,
  modulo: bigint
) {
  return arrayOfEncryptedCode
    .map((codeEncrypted) => {
      const code = fastModularExponentiation(codeEncrypted, exponent, modulo);
      return String.fromCharCode(Number(code));
    })
    .join("");
}

async function _() {
  try {
    logHighlight("=== Demonstrating RSA Encryption ===");
    console.log("There are three people in this RSA encryption process:");
    console.log(
      `\t${EActors.Alice} - Receiver\n\t${EActors.Bob} - Sender\n\t${EActors.Eve} - Eavesdropper`
    );

    const [p, q, n, r] = await inquireConfirm(
      `${EActors.Alice} is going to pick up prime numbers P and Q:`,
      () => {
        const bits = 10,
          level = 5;
        const [p, q] = obtainPQ(bits, level);

        const n = p * q;
        const r = (p - BigInt(1)) * (q - BigInt(1));
        logList([
          { name: "P", value: p },
          { name: "Q", value: q },
          { name: "n", value: n },
          { name: "r", value: r },
        ]);

        return [p, q, n, r];
      }
    );

    const arrayOfCandidate = await inquireConfirm(
      `${EActors.Alice} is going to pick the candidates which equal % r = 1:`,
      () => {
        const arrayOfCandidate = obtainCandidates(r);
        arrayOfCandidate.forEach((candidate) => {
          console.log(`\t${candidate}`);
        });

        return arrayOfCandidate;
      }
    );

    const [e, d] = await inquireConfirm(
      `${EActors.Alice} selects the first value from the list as K to compute e and d`,
      () => {
        const arrayOfPrimeFactor = pollardP1Factorization(arrayOfCandidate[0]);
        console.log(`\tK has factors: ${arrayOfPrimeFactor}}`);

        return arrayOfPrimeFactor;
      }
    );

    const message = "This is a hardcoded secret message.";
    await inquireConfirm(
      `${EActors.Alice} chooses ${chalk.bgGray(
        message
      )} as the secret message.`,
      () => {
        console.log(`\tNow ${EActors.Alice} have the following numbers:`);
        logList([
          { name: "P", value: p },
          { name: "Q", value: q },
          { name: "n", value: n },
          { name: "r", value: r },
          { name: "e", value: e },
          { name: "d", value: d },
        ]);
        console.log(
          `\n\t${EActors.Alice} send e as the public key to ${EActors.Bob} and ${EActors.Eve}.`
        );

        const arrayOfEncryptedCode = encrypt(message, BigInt(e), n);
        console.log(
          `\n\t${EActors.Bob} encrypts the message and send it back to ${
            EActors.Alice
          } (while ${
            EActors.Eve
          } is eavesdropping).\n\tEncrypted message: ${chalk.gray(
            arrayOfEncryptedCode
          )}`
        );

        const messageDecrypted = decrypt(arrayOfEncryptedCode, BigInt(d), n);
        console.log(
          `\n\t${
            EActors.Alice
          } decrypts it since she has the needed keys.\n\tDecrypted message: ${chalk.gray(
            messageDecrypted
          )}`
        );
      }
    );
  } catch (error) {
    throw error;
  }
}

export default _;

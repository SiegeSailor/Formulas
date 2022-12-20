import chalk from "chalk";

import {
  babyStepGiantStep,
  fastModularExponentiation,
  pollardP1Factorization,
} from "../entry-point";
import { EActors } from "../common/constants";
import { log, inquire, wrap } from "../common/utilities";

export async function prompt() {
  try {
    console.log("There are three people in this RSA encryption process:");
    console.log(
      `\t${EActors.Alice} - Receiver\n\t${EActors.Bob} - Sender\n\t${EActors.Eve} - Eavesdropper`
    );

    const [p, q, n, r] = await inquire.continue(
      `${EActors.Alice} is going to pick prime numbers P and Q, and then generate n with P * Q, r with (P - 1) * (Q - 1):`,
      () => {
        const [p, q] = wrap.randomize(16, 5, 2);

        const n = p * q;
        const r = (p - BigInt(1)) * (q - BigInt(1));
        log.list([
          { name: "P", value: p },
          { name: "Q", value: q },
          { name: "n", value: n },
          { name: "r ((P - 1) * (Q - 1))", value: r },
        ]);

        return [p, q, n, r];
      }
    );

    const candidate = await inquire.continue(
      `${EActors.Alice} is going to pick the candidates which equal % r = 1:`,
      () => {
        const arrayOfCandidate = wrap.remain(r, BigInt(1));
        log.list(
          arrayOfCandidate.map((candidate, index) => {
            return { name: String(index + 1), value: candidate };
          })
        );

        return arrayOfCandidate[0];
      }
    );

    const [e, d] = await inquire.continue(
      `${EActors.Alice} selects the first value from the list to compute e and d:`,
      () => {
        const arrayOfPrimeFactor = pollardP1Factorization(candidate);
        console.log(`\t${candidate} has factors: ${arrayOfPrimeFactor}`);

        return arrayOfPrimeFactor;
      }
    );

    await inquire.continue(
      `${EActors.Alice} sends e and n as the public key to ${EActors.Bob} and ${EActors.Eve}.`,
      () => {
        console.log(`\t${EActors.Alice} has the following numbers:`);
        log.list([
          { name: "P", value: p },
          { name: "Q", value: q },
          { name: "n", value: n },
          { name: "r", value: r },
          { name: "e", value: e },
          { name: "d", value: d },
        ]);
      }
    );

    const message = "This is a hardcoded secret message.";
    const arrayOfEncryptedCode = await inquire.continue(
      `${EActors.Bob} encrypts the message and sends it back to ${EActors.Alice} (while ${EActors.Eve} is eavesdropping).`,
      () => {
        const arrayOfEncryptedCode = wrap.encrypt(message, (code) => {
          return fastModularExponentiation(BigInt(code), BigInt(e), n);
        });
        console.log(`\tEncrypted message: ${chalk.gray(arrayOfEncryptedCode)}`);

        const messageDecrypted =
          message ||
          wrap.decrypt(arrayOfEncryptedCode, (codeEncrypted) => {
            return fastModularExponentiation(codeEncrypted, BigInt(d), n);
          });
        console.log(
          `\n\t${
            EActors.Alice
          } can decrypt the message since she has the private key ${chalk.bold.bgCyan(
            "(d, n)"
          )}.\n\tDecrypted message: ${chalk.gray(messageDecrypted)}\n\t${
            EActors.Alice
          } verifies the message with ${EActors.Bob} privately.`
        );

        return arrayOfEncryptedCode;
      }
    );

    await inquire.continue(
      `${EActors.Eve} is going to decrypt the secret message.`,
      () => {
        console.log(`\tNow ${EActors.Eve} has the following stuff:`);
        log.list([
          { name: "n", value: n },
          { name: "e", value: e },
          { name: "secret message", value: arrayOfEncryptedCode },
        ]);

        console.log(
          `\n\t${
            EActors.Eve
          } is going to figure out what the private key d is using Discrete Log with the public key ${chalk.bold.bgCyan(
            "(e, n)"
          )} and other information.`
        );

        const dEavesdropped = babyStepGiantStep(n, BigInt(1), BigInt(e));
        console.log(
          `\tPrivate key ${chalk.bold.bgCyan("(d, n)")}: ${chalk.gray(
            `(${dEavesdropped}, ${n})`
          )}`
        );
        const messageEavesdropped =
          message ||
          wrap.decrypt(arrayOfEncryptedCode, (codeEncrypted) => {
            return fastModularExponentiation(codeEncrypted, dEavesdropped, n);
          });
        console.log(
          `\tDecrypted message: ${chalk.gray(messageEavesdropped)}\n\t${
            EActors.Eve
          } verifies the message with ${EActors.Bob}.`
        );
      }
    );
  } catch (error) {
    throw error;
  }
}

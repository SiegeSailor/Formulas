import chalk from "chalk";

import {
  babyStepGiantStep,
  fastModularExponentiation,
  naorReingo,
} from "../entry-point";
import { EActors } from "../common/constants";
import { log, inquire, wrap } from "../common/utilities";

async function _() {
  try {
    log.highlight("=== Demonstrating ElGamal Encryption ===");
    console.log("There are three people in this ElGamal encryption process:");
    console.log(
      `\t${EActors.Alice} - Receiver\n\t${EActors.Bob} - Sender\n\t${EActors.Eve} - Eavesdropper`
    );

    const [p, g, r, x, y] = await inquire.continue(
      `${EActors.Alice} is going to pick prime number P, generator g, and random numbers r and x:`,
      () => {
        const [p] = wrap.randomize(16, 5, 1);
        const [g, r, x] = naorReingo(3, 2);
        log.list([
          { name: "P", value: p },
          { name: "g", value: g },
          { name: "r", value: r },
          { name: "x", value: x },
        ]);

        console.log(`\n\t${EActors.Alice} generates y:`);
        const y = fastModularExponentiation(BigInt(g), BigInt(x), p);
        console.log(`\ty: ${chalk.gray(y)}`);

        console.log(
          `\n\t${EActors.Alice} sends ${chalk.bold.bgCyan(
            "(g, r, p, y)"
          )} as the public key to ${EActors.Bob} and ${EActors.Eve}.`
        );

        return [p, g, r, x, y];
      }
    );

    const message = "This is a hardcoded secret message.";
    const [keyEncrypted, arrayOfEncryptedCode] = await inquire.continue(
      `${EActors.Bob} encrypts the message and sends it back to ${EActors.Alice} (while ${EActors.Eve} is eavesdropping).`,
      () => {
        const keyEncrypted = fastModularExponentiation(BigInt(g), BigInt(r), p);
        const arrayOfEncryptedCode = wrap.encrypt(message, (code) => {
          return BigInt(code) * fastModularExponentiation(y, BigInt(r), p);
        });
        console.log(`\tEncrypted key: ${chalk.gray(keyEncrypted)}`);
        console.log(`\tEncrypted message: ${chalk.gray(arrayOfEncryptedCode)}`);

        const messageDecrypted =
          message ||
          wrap.decrypt(arrayOfEncryptedCode, (codeEncrypted) => {
            return (
              fastModularExponentiation(
                keyEncrypted,
                BigInt(Number(p) - 1 - x),
                p
              ) * codeEncrypted
            );
          });
        console.log(
          `\n\t${
            EActors.Alice
          } can decrypt the message since she has the random number ${chalk.bold.bgCyan(
            "(x)"
          )}.\n\tDecrypted message: ${chalk.gray(messageDecrypted)}\n\t${
            EActors.Alice
          } verifies the message with ${EActors.Bob} privately.`
        );
        return [keyEncrypted, arrayOfEncryptedCode];
      }
    );

    await inquire.continue(
      `${EActors.Eve} is going to decrypt the secret message.`,
      () => {
        console.log(`\tNow ${EActors.Eve} has the following stuff:`);
        log.list([
          { name: "g", value: g },
          { name: "r", value: r },
          { name: "p", value: p },
          { name: "y", value: y },
          { name: "secret key", value: keyEncrypted },
          { name: "secret message", value: arrayOfEncryptedCode },
        ]);

        console.log(
          `\n\t${EActors.Eve} is going to figure out what the random number x is using Discrete Log with the information she has.`
        );

        const xEavesdropped =
          x || babyStepGiantStep(BigInt(g), BigInt(r), BigInt(p));
        console.log(
          `\tRandom number ${chalk.bold.bgCyan("(x)")}: ${chalk.gray(
            `(${xEavesdropped})`
          )}`
        );
        const messageEavesdropped =
          message ||
          wrap.decrypt(arrayOfEncryptedCode, (codeEncrypted) => {
            return fastModularExponentiation(
              codeEncrypted,
              BigInt(xEavesdropped),
              p
            );
          });
        console.log(
          `\tDecrypted message: ${chalk.gray(messageEavesdropped)}\n\t${
            EActors.Eve
          } verifies the message with ${EActors.Bob}.`
        );
      }
    );

    log.highlight("=== End of ElGamal Encryption ===");
  } catch (error) {
    throw error;
  }
}

export default _;

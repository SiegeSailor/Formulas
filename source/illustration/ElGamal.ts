import chalk from "chalk";
import { naorReingo } from "entry-point";

import { EActors } from "../common/constants";
import { log, inquire, wrap } from "../common/utilities";

async function _() {
  try {
    log.highlight("=== Demonstrating ElGamal Encryption ===");
    console.log("There are three people in this ElGamal encryption process:");
    console.log(
      `\t${EActors.Alice} - Receiver\n\t${EActors.Bob} - Sender\n\t${EActors.Eve} - Eavesdropper`
    );

    await inquire.confirm(
      `${EActors.Alice} is going to pick prime number P, generator G, and private key K`,
      () => {
        const [p] = wrap.randomize(16, 5, 1);
        const g = naorReingo(1, 1)[0];
      }
    );

    log.highlight("=== End of ElGamal Encryption ===");
  } catch (error) {
    throw error;
  }
}

export default _;

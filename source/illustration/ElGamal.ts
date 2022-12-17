import chalk from "chalk";

import { EActors } from "../common/constants";
import { log, inquire } from "../common/utilities";

async function _() {
  try {
    log.highlight("=== Demonstrating ElGamal Encryption ===");
    console.log("There are three people in this ElGamal encryption process:");
    console.log(
      `\t${EActors.Alice} - Receiver\n\t${EActors.Bob} - Sender\n\t${EActors.Eve} - Eavesdropper`
    );

    log.highlight("=== End of ElGamal Encryption ===");
  } catch (error) {
    throw error;
  }
}

export default _;

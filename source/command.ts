import chalk from "chalk";
import nanospinner from "nanospinner";
import inquirer from "inquirer";

import RSA from "./illustration/RSA";
import ElGamal from "./illustration/ElGamal";

inquirer.prompt([{ type: "list", choices: ["A", "B"] }]);

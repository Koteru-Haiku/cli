import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation"
import figlet from "figlet";
import { createSpinner } from "nanospinner";

export function welcome() {
    console.clear();
    const msg = `Thank you for using my CLI`

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}
#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation"
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(chalk.bgGreen("hi Chinh"));

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Nothing in here <(")\n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('How to play')};
        I am a process in your computer.
        If you get any question wrong I will be ${chalk.bgRed('killed')};  
    `)
}

await welcome();

async function askName() {
    const answer = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    })

    playerName = answer.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question 1',
        type: 'list',
        message: 'Javascript was created in 10 days then released on\n',
        choices: [
            'May 23rd, 1994',
            'Dec 23rd, 1995',
            'May 23rd, 1996',
            'May 23rd, 1997',
        ],
    })
    console.log('Selected answer:', answers);

    return handleAnswer(answers[`question 1`] === 'Dec 23rd, 1995');
}

async function handleAnswer(isCorrect) {
    const spider = createSpinner('Checking answer..').start();
    await sleep();

    if(isCorrect) {
        spider.success({ text: `Nice work ${playerName}`});
    }
    else {
        spider.error({ text: `You loseee ${playerName}`});
        process.exit(1);
    }
} 

async function winner() {
    console.clear();
    const msg = `Congrats ${playerName}, you lose !`

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await askName();
await question1();
await winner();
import * as readline from 'readline';

import readlineSync from 'readline-sync';

export function question(prompt: string): string {
  return readlineSync.question(prompt);
}

export function createReadline() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return {
    question: (prompt: string): Promise<string> => {
      return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
          resolve(answer);
        });
      });
    },
    close: () => rl.close(),
  };
}
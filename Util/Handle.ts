import { createSpinner } from 'nanospinner';

const sleep = (ms: number = 2000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function handleAnswer(isCorrect: boolean, answer: string): Promise<void> {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  try {
    if (isCorrect) {
      spinner.success({ text: answer });
    } else {
      spinner.error({ text: answer });
      throw new Error('Incorrect answer');
    }
  } catch (error) {
    console.error('Error:', (error as Error).message);
    throw error; 
  } finally {
    spinner.stop();
  }
}
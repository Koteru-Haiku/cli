import chalk from 'chalk'
import axios from 'axios';

const base_url = 'https://vietnamese-dictionary-api.vercel.app'

const isValidWord = async (word: string): Promise<boolean | null> => {
    try {
        const response = await axios.get(`${base_url}/api/search?word=${word}`)
        if(response.status === 200) {
            const data = response.data;
            return data.valid;
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(chalk.red("Error when fetching api", (error as Error).message));
        return null;
    }
}

export { isValidWord }
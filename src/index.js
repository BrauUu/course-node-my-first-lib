import chalk from 'chalk';
import fs from 'fs';

async function getFile(filepath) {

    try {
        const res = await fs.promises.readFile(filepath, 'utf-8')
        return chalk.green(res);  
    } catch (err) {
        return chalk.red(err);
    }
}

console.log(await getFile('./src/assets/example.md'));


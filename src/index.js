import chalk from 'chalk';
import fs from 'fs';

async function getFile(filepath) {

    try {
        const text = await fs.promises.readFile(filepath, 'utf-8')
        return extractLinks(text);  
    } catch (err) {
        return chalk.red(err);
    }
}

function extractLinks(text) {
    const regex = /\[[^\]]*\]\([^\)]*\)/gm
    const result = text.match(regex)
    const arrResult = result.map(item => {
        let [title, url] = item.split(']')
        return {[title.slice(1, title.length)] : url.slice(1, url.length)}
    })
    return arrResult
}

console.log(await getFile('./src/assets/example.md'));


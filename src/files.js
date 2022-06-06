import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

function extractLinks(text) {
    const regex = /\[[^\]]*\]\([^\)]*\)/gm
    const result = text.match(regex) || []
    const arrResult = result.map(item => {
        let [title, url] = item.split(']')
        return { [title.slice(1, title.length)]: url.slice(1, url.length - 1) }
    })
    return arrResult.length === 0 ? "No one link identified" : arrResult
}

async function getSingleFile(absolutePath) {
    try {
        const text = await fs.promises.readFile(absolutePath, 'utf-8')
        return extractLinks(text);  
    } catch (err) {
        return err;
    }
}

async function getMultipleFile(absolutePath) {
    try {
        const files = await fs.promises.readdir(absolutePath, 'utf-8');
        const result = await Promise.all(files.map(async (file) => {
            const filePath = `${absolutePath}/${file}`;
            const text = await fs.promises.readFile(filePath, 'utf-8');
            return extractLinks(text)
        }))
        return result;
    } catch (err) {
        return err;
    }
}

async function getLinks(pathParam) {

    const absolutePath = path.join(__dirname, '..', pathParam);

    if (absolutePath.charAt(absolutePath.length - 1) !== '/') {
        return await getSingleFile(absolutePath)
    } else {
        return await getMultipleFile(absolutePath)
    }

}

export default getLinks;


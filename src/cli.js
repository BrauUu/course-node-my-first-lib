import getLinks from './files.js'
import validateLinks from './http.js'

const cliCommands = process.argv

async function processLinks(filePath) {
    const res = await getLinks(filePath)
    console.log("Link list:", await validateLinks(res))
}

processLinks(cliCommands[2])
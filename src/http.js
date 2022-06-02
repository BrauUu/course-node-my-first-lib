import fetch from "node-fetch"

export default async function validateLinks(linksArr) {

    let urlArr = [] 

    if (Array.isArray(linksArr[0])) {
        linksArr.map(arr => {
            arr.map(obj => {
                urlArr.push(Object.values(obj)[0])
            })
        })
    }
    else {
        urlArr = linksArr.map(obj => {
            return Object.values(obj)[0]
        })
    }

    const urlsStatus =  await Promise.all(urlArr.map(async (url) => {
        let res = await fetch(url)
        return res.status;
    }))
    return urlsStatus;
}
import fetch from "node-fetch"

export default async function validateLinks(linksArr) {

    try {
        let urlArr = getUrlOnly(linksArr)

        const urlsStatus = await Promise.all(
            urlArr.map(async (url) => {
                const res = await fetch(url)
                return `${res.status} - ${res.statusText}`
            })
        )

        return createResponseObj(linksArr, urlsStatus)
    } catch (err) {
        return err;
    }

}

function getUrlOnly(linksArr) {

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

    return urlArr;

}

function createResponseObj(linksArr, urlsStatus) {

    let res = []

    if (Array.isArray(linksArr[0])) {
        linksArr.map(arr => {
            arr.map((obj, i) => {
                return res.push({ ...obj, status: urlsStatus[i] })
            })
        })
    }
    else {
        res = linksArr.map((link, i) => {
            return { ...link, status: urlsStatus[i] }
        })
    }
    return res;
}
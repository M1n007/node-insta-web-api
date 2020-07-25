const fetch = require('node-fetch');

const nodeFetchInstagram = {
    post: (uri, payload, headers) => new Promise((resolve, reject) => {
        fetch(uri, {
            method:'POST',
            headers: headers,
            body:payload
        })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    }),
    postResJson: (uri, payload, headers) => new Promise((resolve, reject) => {
        fetch(uri, {
            method:'POST',
            headers: headers,
            body:payload
        })
        .then(async res => {
            resolve(await res.json())
        })
        .catch(err => {
            reject(err)
        })
    }),
    getCookie: (uri, headers) => new Promise((resolve, reject) => {
        fetch(uri, {
            method:'GET',
            headers: headers
        })
        .then(res => {
            const data = {
                cookie: res.headers.raw()['set-cookie'],
                claim: res.headers.raw()['x-ig-set-www-claim']
            }
            resolve(data)
        })
        .catch(err => {
            reject(err)
        })
    }),
    getText: (uri, headers) => new Promise((resolve, reject) => {
        fetch(uri, {
            method:'GET',
            headers: headers
        })
        .then(async res => {
            resolve(await res.text())
        })
        .catch(err => {
            reject(err)
        })
    })
}

module.exports = { nodeFetchInstagram }
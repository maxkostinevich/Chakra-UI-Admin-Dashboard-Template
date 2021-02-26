const server = "http://localhost:8080/api"

const authCall = (endpoint, body) => new Promise((resolve, reject) => {
    fetch(`${server}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(resp => {
        if (resp.response.data.status) {
            resolve(resp.response)
        } else {
            reject(resp.message)
        }
    }).catch(err => reject(err))
});

const postCall = (endpoint, body, token) => new Promise((resolve, reject) => {
    fetch(`${server}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(resp => {
        if (resp.status) {
            resolve(resp.response);
        } else {
            reject(resp);
        }
        resolve(resp.response)
    }, err => {
        reject(err)
    }).catch(err => reject(err))
});

const getCall = (endpoint, token) => new Promise((resolve, reject) => {
    fetch(`${server}/${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json()).then(resp => {
        if (resp.status === 200) {
            resolve(resp.response)
        } else {
            reject(resp.message)
        }
    }).catch(err => reject(err))
});



export { authCall, postCall, getCall }
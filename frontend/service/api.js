const BASE_URL = "https://wl69588jya.execute-api.us-east-1.amazonaws.com/cashmates";

async function sendRequest(path, body, token) {
    let headers = {
        'Content-Type': 'application/json',
    }
    if (token) {
        headers['Authorization'] = 'Bearer ' + token
    }
    return await fetch(BASE_URL + path, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    }).then(data => data.json())
    .catch(err => {
        console.log(err);
        return null;
    })
}

async function login(body) {
    console.log("send request")
    return await sendRequest('/login', body)
}

async function createRoom(body, token) {
    return await sendRequest('/createroom', body, token)
}

async function joinRoom(body, token) {
    return await sendRequest('/joinroom', body, token)
}

async function addNewExpense(body, token) {
    return await sendRequest('/addnewexpense', body, token)
}

async function expenses(body, token) {
    return await sendRequest("/expenses", body, token)
}

export {
    login,
    createRoom,
    joinRoom,
    addNewExpense,
    expenses
}
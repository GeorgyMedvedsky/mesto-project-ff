const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: '150d7da5-c5ff-47a3-9dc0-d14b9b96c88c',
        'Content-Type': 'application/json'
    }
};

function _checkResponse(res) {
    return !res.ok ? Promise.reject(`Ошибка: ${res.status}`) : res.json();
}

async function _response(url, options) {
    const response = await fetch(url, options);
    return await _checkResponse(response);
}

export async function getProfileData() {
    return _response(`${config.baseUrl}/users/me`, {
        headers: config.headers
    });
}

export async function getInitialCards() {
    return _response(`${config.baseUrl}/cards`, {
        headers: config.headers
    });
}

export async function updateProfile(name, about) {
    return _response(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    });
}

export async function addCard(name, link) {
    return _response(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    });
}

export async function removeCard(id) {
    return _response(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    });
}

export async function setLike(id) {
    return _response(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    });
}

export async function removeLike(id) {
    return _response(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    });
}
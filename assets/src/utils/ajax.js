export const ajaxJson = (url, method = 'get', params = {}) => {
    return fetch(url, {
        method,
        credentials: 'same-origin',
        headers: {"Content-type": "application/x-www-form-urlencoded"},
        body: 'loginData=' + JSON.stringify(params)
    })
        .then(response => response.json());
};

export const checkUser = (url, data) => {
    return ajaxJson(url, 'POST', data);
};
export const ajaxJson = (url, method = 'get', params) => {
    return fetch(url, {method: method, body: params})
        .then(response => response.json());
};

export const getJson = (url, params) => {
    if (params === undefined) {
        return ajaxJson(url);
    }
    return ajaxJson(url + '/' + params, 'get');
};

export const postJson = (url, params) => {
    return ajaxJson(url, 'POST', params);
};

export const putJson = (url, params) => {
    return ajaxJson(url, 'PUT', params);
};


export const deleteJson = (url) => {
    return ajaxJson(url, 'delete');
};

const publicPath = '/vvs-app/';

export const routeCodes = {
    REPORTS: publicPath,
    USERS: `${publicPath}users`
};

export const url = () => {
    let url = window.location.href;
    return url.split('/');
};
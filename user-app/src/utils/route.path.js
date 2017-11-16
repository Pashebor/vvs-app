const publicPath = '/vvs-app/';

export const routeCodes = {
    MAIN: publicPath,
    REPORTS: `${publicPath}my-reports`,
    LIST1: `${publicPath}list-one`
};

export const url = () => {
    let url = window.location.href;
    return url.split('/');
};
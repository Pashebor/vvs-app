const publicPath = '/vvs-app/';

export const routeCodes = {
    MAIN: publicPath,
    REPORTS: `${publicPath}report`,
    LISTS: `${publicPath}report/lists`
};

export const url = () => {
    let url = window.location.href;
    return url.split('/');
};
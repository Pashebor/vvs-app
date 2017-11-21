import {
    GET_USERS,
    GET_REPORTS,
    FILTER_SEARCH,
    ADD_USER,
    MODAL_SHOW,
    UPLOAD_REPORTS,
    SHOW_PRELOADER,
    GET_CURRENT_USER,
    DELETE_USER,
    DELETE_REPORT,
    SHOW_POPUP_FORMS,
    CLOSE_POPUP_FORMS} from './constants';

import {getJson, putJson, postJson, deleteJson} from '../utils/ajax';
import {url, routeCodes} from '../utils/route.path';

export const showPopupForms = (formsData) => {
    return{
        type: SHOW_POPUP_FORMS,
        payload: formsData
    }
};

export const closePopupForms = (formsData) => {
    return{
        type: CLOSE_POPUP_FORMS,
        payload: formsData
    }
};

export const deleteReportSuccess = (reportData) => {
    return{
        type: DELETE_REPORT,
        payload: reportData
    }
};

export const deleteUserSuccess = (userData) => {
    return{
        type: DELETE_USER,
        payload: userData
    }
};

export const getCurrentUserSuccess = (userData) => {
    return{
        type: GET_CURRENT_USER,
        payload: userData
    }
};

export const showPreloader = (state) => {
    return{
        type: SHOW_PRELOADER,
        isShown: state
    }
};

export const showModal = (state) => {
    return{
        type: MODAL_SHOW,
        isShown: state
    }
};

export const uploadReportsSuccess = (respone) => {
    return{
        type: UPLOAD_REPORTS,
        payload: respone
    }
};

export const addUserSuccess = (callback) => {
    return{
        type: ADD_USER,
        payload: callback
    }
};

export const getSuccessUsers = (callback) => {
    return{
        type: GET_USERS,
        payload: callback
    }
};

export const getSuccessReports = callback => {
    return{
        type: GET_REPORTS,
        payload: callback
    }
};

export const filterAction = filter_value => {
    return{
        type: FILTER_SEARCH,
        filterValue: filter_value
    }
};

/*Async actions*/

export const getCurrentUser = () => {
    return dispatch => {
        return postJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/users_ajax.php`)
            .then(json => {
                dispatch(getCurrentUserSuccess(json));
            }).catch(err => console.log(err))
    }
};

export const getUsers = () => {
    return dispatch => {
        dispatch(showPreloader(true));
        return getJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/users_ajax.php`)
            .then(json => {
                let data = json;
                data.forEach(item => {
                    item.ID = parseInt(item.ID);
                });
                dispatch(getSuccessUsers(data));
                dispatch(showPreloader(false));
            })
            .catch(err => console.log(err));
    }
};

export const addUser = (userData) => {
    return dispatch => {
        dispatch(showPreloader(true));
        return putJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/users_ajax.php`, userData)
            .then(json => {
                let data = json;
                data.ID = parseInt(data.ID);
                dispatch(addUserSuccess(data));
                dispatch(showPreloader(false));
                dispatch(showModal(true));
            })
            .catch(err => console.log('error'));
    }
};

export const uploadReports = reportsData => {
    return dispatch => {
        dispatch(showPreloader(true));
        return postJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/reports_ajax.php`, reportsData)
            .then(json => {
                let data = json;
                data.id = parseInt(data.id);
                dispatch(uploadReportsSuccess(data));
                dispatch(showPreloader(false));
                dispatch(showModal(true));
            }).catch(err => console.log(err))
    }
};

export const getReports = () => {
    return dispatch => {
        dispatch(showPreloader(true));
        return getJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/reports_ajax.php`)
            .then(json => {
                let data = json;
                data.forEach(item => {
                    item.id = parseInt(item.id);
                });
                dispatch(getSuccessReports(data));
                dispatch(showPreloader(false));
            }).catch(err => console.log(err));
    }
};

export const deleteUser = (userData) => {
    return dispatch => {
        dispatch(showPreloader(true));
        return deleteJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/users_ajax.php`, userData)
            .then(json => {
                let data = json;
                data.forEach(item => {
                    item.ID = parseInt(item.ID);
                });
                dispatch(deleteUserSuccess(data));
                dispatch(showPreloader(false));
            })
            .catch(err => console.log(err));
    }
};

export const deleteReport = (reportData) => {
    return dispatch => {
        dispatch(showPreloader(true));
        return deleteJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/reports_ajax.php`, reportData)
            .then(json => {
                let data = json;
                data.forEach(item => {
                    item.id = parseInt(item.id);
                });
                dispatch(deleteReportSuccess(data));
                dispatch(showPreloader(false));
            })
            .catch(err => console.log(err));
    }
};

export const addReportToUser = reportData => {
    return dispatch => {
        dispatch(showPreloader(true));
        return postJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/users_ajax.php`, reportData)
            .then(json => {
                let data = json;
                data.forEach(item => {
                    item.ID = parseInt(item.ID);
                });
                dispatch(getSuccessUsers(data));
                dispatch(showPreloader(false));
            }).catch(error => console.log(error));
    }
}

export const deleteReportFromUser = userData =>{
    return dispatch => {
        dispatch(showPreloader(true));
        return deleteJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/users_ajax.php`, userData)
            .then(json => {
                let data = json;
                data.forEach(item => {
                    item.ID = parseInt(item.ID);
                });
                dispatch(deleteUserSuccess(data));
                dispatch(showPreloader(false));
            })
            .catch(err => console.log(err));
    }
}

export const logoutUser = (data) => {
        return postJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/users_ajax.php`, data)
            .then(json => {
                if (json.callback === true) {
                    location.href = `${routeCodes.REPORTS}`;
                }
            }).catch(err => console.log(err))
}

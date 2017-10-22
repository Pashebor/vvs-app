import {GET_USERS, GET_REPORTS, FILTER_SEARCH, ADD_USER, MODAL_SHOW} from './constants';
import {getJson, putJson} from '../utils/ajax';
import {url, routeCodes} from '../utils/route.path';

export const showModal = (state) => {
    return{
        type: MODAL_SHOW,
        isShown: state
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

export const getReports = () => {
    return{
        type: GET_USERS,
        payload: 'yes'
    }
};

export const filterAction = filter_value => {
    return{
        type: FILTER_SEARCH,
        filterValue: filter_value
    }
};

/*Async actions*/

export const getUsers = () => {
    return dispatch => {
        return getJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/users_ajax.php`)
            .then(json => {
                let data = json;
                data.forEach(item => {
                    item.ID = parseInt(item.ID);
                });
                dispatch(getSuccessUsers(data));
            })
            .catch(err => console.log('error'));
    }
};

export const addUser = (userData) => {
    return dispatch => {
        return putJson(`${url()[0]}//${url()[2]}${routeCodes.REPORTS}utils/users_ajax.php`, userData)
            .then(json => {
                let data = json;
                data.ID = parseInt(data.ID);
                dispatch(addUserSuccess(data));
                dispatch(showModal(true));
            })
            .catch(err => console.log('error'));
    }
}
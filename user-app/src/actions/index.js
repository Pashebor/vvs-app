import {
    FILTER_SEARCH,
    MODAL_SHOW,
    SHOW_PRELOADER,
    GET_CURRENT_USER} from './constants';

import {getJson, putJson, postJson, deleteJson} from '../utils/ajax';
import {url, routeCodes} from '../utils/route.path';


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

export const filterAction = filter_value => {
    return{
        type: FILTER_SEARCH,
        filterValue: filter_value
    }
};

/*Async actions*/

export const getCurrentUser = () => {
    return dispatch => {
        return postJson(`${url()[0]}//${url()[2]}${routeCodes.MAIN}utils/users_ajax.php`)
            .then(json => {
                dispatch(getCurrentUserSuccess(json));
            }).catch(err => console.log(err))
    }
};


export const logoutUser = (data) => {
        return postJson(`${url()[0]}//${url()[2]}${routeCodes.MAIN}utils/users_ajax.php`, data)
            .then(json => {
                if (json.callback === true) {
                    location.reload();
                }
            }).catch(err => console.log(err))
}

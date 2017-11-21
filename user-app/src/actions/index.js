import {
    FILTER_SEARCH,
    MODAL_SHOW,
    SHOW_PRELOADER,
    GET_CURRENT_USER,
    GET_USER_REPORTS,
    GET_LIST_ONE, GET_LIST_TWO, GET_LIST_THREE, GET_LIST_FOUR, GET_LIST_FIVE
} from './constants';

import {getJson, putJson, postJson, deleteJson} from '../utils/ajax';
import {url, routeCodes} from '../utils/route.path';

export const getListOneSuccess = (listData) => {
    return{
        type: GET_LIST_ONE,
        payload: listData
            };
};

export const getListTwoSuccess = (listData) => {
    return{
        type: GET_LIST_TWO,
        payload: listData
    };
};

export const getListThreeSuccess = (listData) => {
    return{
        type: GET_LIST_THREE,
        payload: listData
    };
};

export const getListFourSuccess = (listData) => {
    return{
        type: GET_LIST_FOUR,
        payload: listData
    };
};

export const getListFiveSuccess = (listData) => {
    return{
        type: GET_LIST_FIVE,
        payload: listData
    };
};

export const getUserReportsSuccess = userReports => {
    return{
        type: GET_USER_REPORTS,
        payload: userReports
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
                const data = json;
                data.reportId = parseInt(data.reportId);
                dispatch(getCurrentUserSuccess(data));
            }).catch(err => console.log(err))
    }
};

export const getUserReports = () => {
    return dispatch => {
        dispatch(showPreloader(true));
        return postJson(`${url()[0]}//${url()[2]}${routeCodes.MAIN}utils/users_ajax.php`)
            .then(json => {
                let data = {};
                data.name = json.reportName;
                data.id = parseInt(json.reportId);
                dispatch(getUserReportsSuccess(data));
                dispatch(showPreloader(false));
            }).catch(error => console.log(error));
    }
};

export const getLists = (reportId) => {
    return dispatch => {
        dispatch(showPreloader(true));
        let reportData = new FormData();
        reportData.append('report_id', reportId);
        return postJson(`${url()[0]}//${url()[2]}${routeCodes.MAIN}utils/subscriber_ajax.php`, reportData)
            .then(json => {
                const data = json;
                for (let report in data) {
                    data[report].forEach(row=>{
                        row.id = parseInt(row.id);
                    })
                }
                dispatch(getListOneSuccess(data.one));
                dispatch(getListTwoSuccess(data.two));
                dispatch(getListThreeSuccess(data.three));
                dispatch(getListFourSuccess(data.four));
                dispatch(getListFiveSuccess(data.five));
                dispatch(showPreloader(false));
            }).catch(error => console.log(error));
    }
}


export const logoutUser = (data) => {
        return postJson(`${url()[0]}//${url()[2]}${routeCodes.MAIN}utils/users_ajax.php`, data)
            .then(json => {
                if (json.callback === true) {
                    location.href = routeCodes.MAIN;
                }
            }).catch(err => console.log(err))
}

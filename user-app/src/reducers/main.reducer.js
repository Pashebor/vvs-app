import {SHOW_PRELOADER, MODAL_SHOW, GET_USER_REPORTS} from '../actions/constants';

const initialState = {
    isShowModal: false,
    isPreloader: false,
    userReport: null
};

const mainReducer = (state = initialState, action = {}) => {
    switch (action.type){
        case SHOW_PRELOADER:
            return Object.assign({}, state, {isPreloader: action.isShown});
        case MODAL_SHOW:
            return Object.assign({}, state, {isShowModal: action.isShown});
        case GET_USER_REPORTS:
            return Object.assign({}, state, {userReport: action.payload});
    }
    return state;
};

export default mainReducer;
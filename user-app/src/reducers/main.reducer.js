import {SHOW_PRELOADER, MODAL_SHOW} from '../actions/constants';

const initialState = {
    isShowModal: false,
    isPreloader: false
};

const mainReducer = (state = initialState, action = {}) => {
    switch (action.type){
        case SHOW_PRELOADER:
            return Object.assign({}, state, {isPreloader: action.isShown});
        case MODAL_SHOW:
            return Object.assign({}, state, {isShowModal: action.isShown});
    }
    return state;
};

export default mainReducer;
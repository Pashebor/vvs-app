import {SHOW_POPUP_FORMS, CLOSE_POPUP_FORMS} from '../actions/constants';

const initialState = {
    popupFormState: false,
    popupFormType: '',
    popupFormsData: null
};

const popupFormsReducer = (state = initialState, action = {}) => {
    switch (action.type){
        case SHOW_POPUP_FORMS:
            return Object.assign({}, state, {
                popupFormState: action.payload.state,
                popupFormType: action.payload.type,
                popupFormsData: action.payload.data
            });
        case CLOSE_POPUP_FORMS:
            return Object.assign({}, state, {
                popupFormState: action.payload.state,
                popupFormType: action.payload.type,
                popupFormsData: action.payload.data
            });
            break;
    }
    return state;
};

export default popupFormsReducer;
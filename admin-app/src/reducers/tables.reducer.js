import {GET_USERS, GET_REPORTS, ADD_USER, MODAL_SHOW, SHOW_PRELOADER,
    UPLOAD_REPORTS,
    DELETE_USER} from '../actions/constants';

const initialState = {
    users: [],
    reports:  [],
    isShowModal: false,
    isPreloader: false
};

const tablesReducer = (state = initialState, action = {}) => {
    switch (action.type){
        case GET_USERS:
            return Object.assign({}, state, {users: action.payload});
        case GET_REPORTS:
            return Object.assign({}, state, {reports: action.payload});
        case ADD_USER:
            return Object.assign({}, state, {users: [...state.users, {
                ID: action.payload.ID,
                NAME: action.payload.NAME,
                EMAIL: action.payload.EMAIL,
                PASSWORD: action.payload.PASSWORD
            }]});
        case DELETE_USER:
            return Object.assign({}, state, {users: action.payload});
        case UPLOAD_REPORTS:
            return Object.assign({}, state, {reports: [...state.reports, {
                id: action.payload.id,
                name: action.payload.name,
                assocName: action.payload.assocName,
                dCreated: action.payload.dCreated
            }]});
        case SHOW_PRELOADER:
            return Object.assign({}, state, {isPreloader: action.isShown});
        case MODAL_SHOW:
            return Object.assign({}, state, {isShowModal: action.isShown});
    }
    return state;
};

export default tablesReducer;
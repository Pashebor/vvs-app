import {GET_CURRENT_USER} from '../actions/constants';

const initialState = {
    userData: null
};

const headerReducer = (state = initialState, action = {}) => {
    switch (action.type){
        case GET_CURRENT_USER:
            return Object.assign({}, state, {userData: action.payload});
    }
    return state;
};

export default headerReducer;
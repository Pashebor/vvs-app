import {GET_USERS} from '../actions/constants'

const initialState = {
    approachItem: 0
};

const tablesReducer = (state = initialState, action = {}) => {
    switch (action.type){
        case GET_USERS:
            return Object.assign({}, state, {approachItem: action.payload})
    }
    return state;
};

export default tablesReducer;
import {
    GET_LIST_ONE,
    GET_LIST_TWO,
    GET_LIST_THREE,
    GET_LIST_FOUR,
    GET_LIST_FIVE
} from '../actions/constants';

const initialState = {
    listOne: null,
    listTwo: null,
    listThree: null,
    listFour: null,
    listFive: null
};

const listsReducer = (state = initialState, action = {}) => {
    switch (action.type){
        case GET_LIST_ONE:
            return Object.assign({}, state, {listOne: action.payload});
        case GET_LIST_TWO:
            return Object.assign({}, state, {listTwo: action.payload});
        case GET_LIST_THREE:
            return Object.assign({}, state, {listThree: action.payload});
        case GET_LIST_FOUR:
            return Object.assign({}, state, {listFour: action.payload});
        case GET_LIST_FIVE:
            return Object.assign({}, state, {listFive: action.payload});
    }
    return state;
};

export default listsReducer;
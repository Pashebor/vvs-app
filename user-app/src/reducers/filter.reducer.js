import {FILTER_SEARCH} from '../actions/constants';
const initialState = '';



const filterReducer =  ( state = initialState, action) => {
    switch (action.type) {
        case FILTER_SEARCH:
            let newState = action.filterValue;
            return newState;
    }
    return state;
};

export default filterReducer;
import { combineReducers } from 'redux';

import tablesReducer from './tables.reducer.js';
import filterReducer from './filter.reducer';

const reducers = combineReducers({
    tablesReducer: tablesReducer,
    filterState: filterReducer
});

export default reducers;
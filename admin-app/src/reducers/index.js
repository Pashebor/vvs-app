import { combineReducers } from 'redux';

import tablesReducer from './tables.reducer.js';
import filterReducer from './filter.reducer';
import headerReducer from './header.reducer';

const reducers = combineReducers({
    tablesReducer: tablesReducer,
    filterState: filterReducer,
    headerReducer: headerReducer

});

export default reducers;
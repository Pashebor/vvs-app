import { combineReducers } from 'redux';

import tablesReducer from './tables.reducer.js';

const reducers = combineReducers({
    tablesReducer: tablesReducer
});

export default reducers;
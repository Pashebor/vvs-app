import { combineReducers } from 'redux';

import tablesReducer from './tables.reducer.js';
import filterReducer from './filter.reducer';
import headerReducer from './header.reducer';
import popupFormsReducer from './popup.forms.reducer';

const reducers = combineReducers({
    tablesReducer: tablesReducer,
    filterState: filterReducer,
    headerReducer: headerReducer,
    popupFormsReducer: popupFormsReducer

});

export default reducers;
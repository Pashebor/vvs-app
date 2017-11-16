import { combineReducers } from 'redux';

import mainReducer from './main.reducer';
import filterReducer from './filter.reducer';
import headerReducer from './header.reducer';

const reducers = combineReducers({
    headerStore: headerReducer,
    filterStore: filterReducer,
    mainStore: mainReducer
});

export default reducers;
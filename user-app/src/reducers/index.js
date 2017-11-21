import { combineReducers } from 'redux';

import mainReducer from './main.reducer';
import filterReducer from './filter.reducer';
import headerReducer from './header.reducer';
import listsReducer from './lists.reducer';

const reducers = combineReducers({
    headerStore: headerReducer,
    filterStore: filterReducer,
    mainStore: mainReducer,
    listsStore: listsReducer
});

export default reducers;
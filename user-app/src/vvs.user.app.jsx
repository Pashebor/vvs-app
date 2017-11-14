import {render} from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import middleWare from 'redux-thunk';
import reducers from './reducers';
import VVSUserApp from './components/VVSUserApp';

const store = createStore(reducers, {}, applyMiddleware(middleWare));

render(
    <Provider store={store}>
        <VVSUserApp/>
    </Provider>, document.getElementById('user-app')
);
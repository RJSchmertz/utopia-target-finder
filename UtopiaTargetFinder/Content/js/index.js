import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import Application from './containers/application';
import HelloWorld from './containers/helloWorld';
import './styles.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { createHashHistory } from 'history';
import thunk from 'redux-thunk';
import { reducer } from './store/reducer';

const hashHistory = createHashHistory();
const routeMiddleware = routerMiddleware(hashHistory);
const createStoreWithMiddleware =
  applyMiddleware(thunk, routeMiddleware)(createStore);

const store =
  createStoreWithMiddleware(
    combineReducers(
      {
        reducer,
        routing: routerReducer
      }
    )
  );

const history = syncHistoryWithStore(hashHistory, store);
const rootElement = document.getElementById('app');

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={Application} >
          <IndexRoute name="index" component={HelloWorld} />
        </Route>
      </Router>
    </div>
  </Provider>,
  rootElement
);

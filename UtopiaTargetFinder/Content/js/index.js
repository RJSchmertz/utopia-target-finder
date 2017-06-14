import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import Application from './containers/application';
import ProvinceFinder from './containers/ProvinceFinder';
import './styles.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { createHashHistory } from 'history';
import thunk from 'redux-thunk';
import { utoReducer } from './store/utoReducer';

const hashHistory = createHashHistory();
const routeMiddleware = routerMiddleware(hashHistory);
const createStoreWithMiddleware =
  applyMiddleware(thunk, routeMiddleware)(createStore);

const store =
  createStoreWithMiddleware(
    combineReducers(
      {
        utoReducer,
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
          <IndexRoute name="index" component={ProvinceFinder} />
          <Route name="provfinder" path="/provfinder" component={ProvinceFinder} />
        </Route>
      </Router>
    </div>
  </Provider>,
  rootElement
);

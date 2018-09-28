import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import store from './components/Store/store';
// import '../node_modules/font-awesome/css/font-awesome.min.css';

import Master from './components/Master/Master';

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={Master} path="/" />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

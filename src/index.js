import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
// import {createStore} from 'redux';
// import reducer from './reducers';
import ProfileSettings from './components/SettingPage/ProfileSettings';
import store from '../src/components/Store/store';
import { ConnectedRouter } from 'react-router-redux';
import SingIn from './components/Login/SingIn';
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import SingUp from './components/Login/SingUp';
import Favicon from 'react-favicon';
import config from './config/config';

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Favicon url={`${config.BASE_URL}images/favicon/favicon.ico`} />
        <Route component={SingIn} exact path="/" />
        <Route component={App} exact path="/auth" />
        <Route component={ProfileSettings} exact path="/auth/profile" />
        <Route component={SingUp} exact history={history} path="/singup" />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

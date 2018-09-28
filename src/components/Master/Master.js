import React from 'react';
import { Row, Col } from 'antd';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import Favicon from 'react-favicon';
import { routesArray } from './routes';
import store from '../Store/store';
// import config from './config/config';

class Master extends React.Component {
  state = {
    test: null,
  };

  render() {
    const { test } = this.state;
    return (
      <Provider store={store}>
        <Switch>
          <Row style={{ minHeight: 'calc(100vh - 80px)' }}>
            <Col span={24} style={{ minHeight: 'calc(100vh - 80px)' }}>
              {routesArray.map(({ exact, path, component }) => (
                <Route key={path} component={component} exact={exact} path={path} />
              ))}
            </Col>
          </Row>
        </Switch>
      </Provider>
    );
  }
}
// <Favicon url={`${config.BASE_URL}images/favicon/favicon.ico`} />;
export default Master;

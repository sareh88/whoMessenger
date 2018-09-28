import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Col, Row, Icon } from 'antd';

import UserAvater from './UserAvater';
import ProfileSettings from '../SettingPage/ProfileSettings';
import FormDialog from '../Modal/dialog';
import config from '../../config/config';

import './stylesheets/SideViewHeader.scss';

class SideViewHeader extends Component {
  state = {
    open: false,
    redirect: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  logOut = () => {
    const token = localStorage.getItem('token');
    const url = `${config.BASE_URL}auth/logout`;
    console.log('Asdfd');

    fetch(url, {
      method: 'Get',
      headers: {
        Authorization: `TOKEN ${token}`,
      },
    })
      .then(res => res.json())
      .then((data) => {
        localStorage.removeItem('token');
        this.setState({ redirect: true });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { user } = this.props;

    const { profile } = user;
    console.log(profile);
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Row align="middle" className="header-wrapper" justify="space-around" type="flex">
        <Col span={5}>
          <Icon
            onClick={this.handleClickOpen}
            theme="outlined"
            type="setting"
            spin
            style={{ color: '#fff', fontSize: '18px' }}
          />
          <FormDialog compo={<ProfileSettings />} handleClose={this.handleClose} open={this.state.open} />
        </Col>
        <Col span={10} >
          <UserAvater userProfile={profile} />
        </Col>
        <Col span={5}>
          <Icon onClick={this.logOut} theme="outlined" type="logout" spin style={{ color: '#fff', fontSize: '18px' }} />
        </Col>
      </Row>
    );
  }
}

export default SideViewHeader;

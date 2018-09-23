import React, { Component } from 'react';
import { Col, Row } from 'antd';
import IconButton from 'material-ui/IconButton';
import Avatar from './skypeAvatar';
import ProfileSettings from '../SettingPage/ProfileSettings';
import FormDialog from '../Modal/dialog';
import config from '../../config/config';
import { Redirect } from 'react-router';

class UserAvatar extends Component {
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
    let avatarURL;

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Row align="middle" justify="space-between" style={{ border: '1px solid red' }} type="flex">
        <Col span={5} style={{ padding: 0, color: '#fff' }}>
          <IconButton onClick={this.handleClickOpen} style={{ zIndex: 1 }}>
            <i className="material-icons" style={{ color: '#fff' }}>
              settings
            </i>
          </IconButton>
          <FormDialog compo={<ProfileSettings />} handleClose={this.handleClose} open={this.state.open} />
        </Col>
        <Col span={8}>
          <Avatar avatarUrl={this.props.avatarURL} />
        </Col>
        <Col span={5} style={{ padding: 0, color: '#fff', border: '1px solid orange' }}>
          <IconButton onClick={this.logOut}>
            <i className="material-icons" style={{ color: '#fff' }}>
              exit_to_app
            </i>
          </IconButton>
        </Col>
      </Row>
    );
  }
}

export default UserAvatar;

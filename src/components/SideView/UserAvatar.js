import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Avatar from './skypeAvatar';
import ProfileSettings from '../SettingPage/ProfileSettings';
import FormDialog from '../Modal/dialog';
import config from '../../config/config';
import { Redirect } from 'react-router';

const styles = {
  root: {
    flexGrow: 1,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    position: 'relative',
    padding: '1rem',
  },
  img: {
    width: '100%',
  },
};

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
      <div className={styles.root}>
        <div className="icons" style={{ padding: 0, color: '#fff' }}>
          <IconButton onClick={this.handleClickOpen} style={{ zIndex: 1 }}>
            <i className="material-icons" style={{ color: '#fff' }}>
              settings
            </i>
          </IconButton>
          <FormDialog compo={<ProfileSettings />} handleClose={this.handleClose} open={this.state.open} />

          <IconButton onClick={this.logOut} style={{ zIndex: 1 }}>
            <i className="material-icons" style={{ color: '#fff' }}>
              exit_to_app
            </i>
          </IconButton>
        </div>
        <div className={styles.avatar} style={{ padding: 10, marginTop: -60 }}>
          <Avatar avatar={this.props.avatarURL} size="100px" />
        </div>
      </div>
    );
  }
}

export default UserAvatar;

import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { Row, Col } from 'antd';
import config from '../../config/config';

import './stylesheets/UserAvatar.scss';

class UserAvater extends React.Component {
  state = {
    test: null,
  };

  render() {
    const { userProfile } = this.props;
    console.log(userProfile && userProfile.avatarURL);
    const url = `${config.BASE_URL}images/avatars/${userProfile && userProfile.avatarURL}`;
    const { firstName, lastName } = userProfile;
    return (
      <Row align="middle" className="user-avatar" justify="center" type="flex">
        <Col span={10}>
          <Avatar className="avatar" icon="user" size="large" src={url} />
        </Col>
        <Col span={15}>
          <h5>{`${firstName}${lastName}`}</h5>
        </Col>
      </Row>
    );
  }
}

UserAvater.propTypes = {
  userProfile: PropTypes.object.isRequired,
};

export default UserAvater;

import React from 'react';
import { Avatar } from 'antd';
import { Row, Col } from 'antd';
import config from '../../config/config';

class UserAvater extends React.Component {
  state = {
    test: null,
  };

  render() {
    const { userProfile } = this.props;
    console.log(userProfile.avatarURL);
    const url = `${config.BASE_URL}images/avatars/${userProfile.avatarURL}`;
    const { firstName, lastName } = userProfile;
    return (
      <Row style={{ border: '1px solid orange' }}>
        <Col span={24}>
          <Avatar alt={firstName} className="avatar" icon="user" size="large" src={url} />
        </Col>
        <Col span={24}>
          <h5 style={{ color: '#fff' }}>{`${firstName}${lastName}`}</h5>
        </Col>
      </Row>
    );
  }
}

export default UserAvater;

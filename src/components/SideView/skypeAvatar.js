import React from 'react';
import { Avatar } from 'antd';
import { Row, Col } from 'antd';

class SkypeAvatar extends React.Component {
  render() {
    const { avatarUrl, name } = this.props;

    return (
      <Row>
        <Col span={24}>
          <Avatar alt={name} className="avatar" icon="user" size="large" src={avatarUrl} />
          <h5 style={{ color: '#fff', display: 'inline', marginLeft: '5px' }}>
            {name}
            sareh almaaz
          </h5>
        </Col>
      </Row>
    );
  }
}

export default SkypeAvatar;

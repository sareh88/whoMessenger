import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import decode from 'jwt-decode';
import config from '../../config/config';

import MessageBaloun from './messageBaloun';
import SkypeAvatar from '../SideView/UserAvater';

class MessagesLog extends Component {
  constructor() {
    super();

    this.state = {
      moment: moment().calendar(),
    };
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behaviour: 'smooth' });
  }

  render() {
    const { messages, setCurrentFriend } = this.props;

    console.log('aabbddd', messages);

    const Message = messages.map((message, index, socketId) => {
      let order;
      let avatarURL;

      const user = decode(localStorage.getItem('token'));

      console.log('user', user);
      console.log('message', message);
      console.log('profile avatar hereee: ', user.profile.avatarURL);
      if (message.userID === user._id) {
        order = '';
        avatarURL = user.profile.avatarURL !== ''
          ? `${config.BASE_URL}images/avatars/${user.profile.avatarURL}`
          : `${config.BASE_URL}images/avatar_placeholder.png`;
      } else {
        order = 2;
        avatarURL = `${config.BASE_URL}images/avatars/${setCurrentFriend}`;
      }

      return (
        <Row key={index} align="middle" justify="space-between" style={{ border: '1px solid green' }} type="flex">
          <Col span={8} style={{ order }}>
            <SkypeAvatar avatar={avatarURL} />
          </Col>
          <Col span={16}>
            <MessageBaloun message={message} time={this.state.moment} />
          </Col>
        </Row>
      );
    });

    return (
      <div>
        {Message}
        <div
          ref={(el) => {
            this.el = el;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  setCurrentFriend: state.setCurrentFriendReducer,
});
export default connect(mapStateToProps)(MessagesLog);

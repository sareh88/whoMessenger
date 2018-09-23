import React, { Component } from 'react';
import MessageBaloun from './messageBaloun';
import SkypeAvatar from '../SideView/skypeAvatar';
import moment from 'moment';
import decode from 'jwt-decode';
import config from '../../config/config';
import { connect } from 'react-redux';

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
    const { messages } = this.props;

    console.log('aabbddd', messages);

    const Message = messages.map((message, index, socketId) => {
      let order,
        avatarURL;

      const user = decode(localStorage.getItem('token'));

      console.log('user', user);
      console.log('message', message);
      console.log('profile avatar hereee: ', user.profile.avatarURL);
      if (message.userID === user._id) {
        order = '';
        avatarURL =
          user.profile.avatarURL !== ''
            ? `${config.BASE_URL}images/avatars/${user.profile.avatarURL}`
            : `${config.BASE_URL}images/avatar_placeholder.png`;
      } else {
        order = 2;
        avatarURL = `${config.BASE_URL}images/avatars/${this.props.setCurrentFriend.avatarURL}`;
      }

      return (
        <div key={index}>
          <div className="message" style={{ margin: '1%' }}>
            <div style={{ order }}>
              <SkypeAvatar avatar={avatarURL} size={40} />
            </div>
            <MessageBaloun message={message} time={this.state.moment} />
          </div>
        </div>
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

import React, { Component } from 'react';
// import List, { ListItem, ListItemText } from 'material-ui/List';
import { Row, Col, List, message, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import SkypeAvatar from './skypeAvatar';
import decode from 'jwt-decode';
import config from '../../config/config';
import { setCurrentFriend } from '../Store/actions/setCurrentFriendAction';
import { connect } from 'react-redux';

import './stylesheets/ContactList.css';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

class ContactList extends Component {
  constructor() {
    super();
    this.state = {
      socketChanelId: '',
      selectedIndex: null,
    };
  }

  socketChanel(friend, e, i) {
    this.setState({ selectedIndex: i });

    const user = decode(localStorage.getItem('token'));
    // let userId = user._id;
    // let socketChanelId = userId+"--"+friend.userId;

    // AJAX call
    const url = `${config.BASE_URL}user/message/get`;

    const postData = {
      userID: user._id,
      friendID: friend.userId,
    };

    if (postData) {
      const parsedFields = Object.keys(postData)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(postData[key])}`)
        .join('&');

      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `TOKEN ${localStorage.getItem('token')}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: parsedFields,
      })
        .then(res => res.json())
        .then((data) => {
          console.log('ChatID Response: ', data);
          let chatInfo;

          if (data.messages !== undefined) {
            // old messages exists, should load them
            chatInfo = {
              chatID: data.chat._id,
              messages: data.messages,
            };
          } else {
            // no old messages to load
            chatInfo = {
              chatID: data._id,
              messages: [],
            };
          }

          console.log(chatInfo);

          this.setState({
            socketChanelId: chatInfo.chatID,
          });

          this.props.getId(chatInfo);
        })
        .catch(err => console.log(err));
    } else {
      console.log({ Error: 'Fields are required' }); // Handle errors here...
    }

    this.props.setCurrentFriend(friend);

    // console.log(friend);

    // console.log(socketChanelId)
  }

  render() {
    // const listItems = this.props.friendsList.map((item, index) => {
    //   const avatarURL =
    //     item.avatarURL !== ''
    //       ? `${config.BASE_URL}images/avatars/${item.avatarURL}`
    //       : `${config.BASE_URL}images/avatar_placeholder.png`;

    //   const highlightedFriend = index === this.state.selectedIndex ? '#01062e' : '';

    //   return (
    //     <ListItem
    //       key={item.userId}
    //       button
    //       className="list-item"
    //       dense
    //       onClick={event => this.socketChanel(item, event, index)}
    //       style={{ backgroundColor: highlightedFriend }}
    //     >
    //       <SkypeAvatar avatarURL={avatarURL} />
    //       <ListItemText primary={item.fullName} />
    //     </ListItem>
    //   );
    // });
    return (
      <Row className="demo-infinite-container">
        <Col span={24}>
          <List
            dataSource={this.props.friendsList}
            renderItem={item => (
              <List.Item key={item.userId}>
                <List.Item.Meta
                  avatar={<Avatar src={`${config.BASE_URL}images/avatars/${item.avatarURL}`} />}
                  title={item.fullName}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentFriend: (user) => {
    dispatch(setCurrentFriend(user));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(ContactList);

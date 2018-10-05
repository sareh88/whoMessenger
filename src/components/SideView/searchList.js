import React, { Component } from 'react';
import { Row, Col, List, Avatar, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import uuidv1 from 'uuid/v1';
import config from '../../config/config';

import './stylesheets/SearchList.scss';

class SearchList extends Component {
  constructor() {
    super();
    this.requestFriends = this.requestFriends.bind(this);
  }

  requestFriends(user) {
    const token = localStorage.getItem('token');
    const url = `http://localhost:3001/user/friend/add/${uuidv1()}`;
    const formData = {
      fullName: `${user.profile.firstName} ${user.profile.lastName}`,
      avatarURL: user.profile.avatarURL,
      userId: user._id,
    };
    if (user) {
      const searchParams = Object.keys(formData)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
        .join('&');

      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `TOKEN ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: searchParams,
      })
        .then(res => res.json())
        .then((data) => {
          // console.log(data );
          window.location.reload();
        })
        .catch(err => console.log(err));
    } else {
      console.log({ Error: 'Fields are required' }); // Handle errors here...
    }
  }

  handleClickOpen = () => {
    console.log(this.state);
    this.setState({ open: true });
  };

  render() {
    const { users } = this.props;
    return (
      <div>
        <InfiniteScroll initialLoad={false} pageStart={0} useWindow={false}>
          <List
            dataSource={users.usersList}
            renderItem={item => (
              <List.Item key={item._id}>
                <List.Item.Meta
                  avatar={<Avatar src={`${config.BASE_URL}images/avatars/${item.profile.avatarURL}`} />}
                  title={`${item.profile.firstName}${item.profile.lastName}`}
                />
                <div>
                  <Icon theme="outlined" type="plus" />
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    );
  }
}

export default SearchList;

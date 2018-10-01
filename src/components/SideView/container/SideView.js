import React, { Component } from 'react';
import { Row, Col } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import ContactList from '../contactList';
import SideViewHeader from '../SideViewHeader';
import SearchBar from '../SearchBar';

import '../stylesheets/SideView.scss';

class SideView extends Component {
  state = {
    test: null,
  };

  render() {
    const { friendsList, avatarURL, userId, user } = this.props;
    return (
      <Row className="sideBarContactListComponent" justify="space-between" type="flex">
        <Col span={24}>
          <SideViewHeader avatarURL={avatarURL} user={user} />
        </Col>
        <Col span={24}>
          <InfiniteScroll initialLoad={false} pageStart={0} useWindow={false}>
            <ContactList friendsList={friendsList} getId={userId} />
          </InfiniteScroll>
        </Col>
        <Col span={24}>
          <SearchBar friendsList={friendsList} />
        </Col>
      </Row>
    );
  }
}
export default SideView;

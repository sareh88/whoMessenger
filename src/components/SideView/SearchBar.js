import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Icon } from 'antd';
import { findDOMNode } from 'react-dom';
import { setFilter } from '../Store/actions/filterAction';
import FormDialog from '../Modal/dialog';
import AddContact from './Addcontact';

import './stylesheets/SearchBar.scss';

const mapDispatchToProps = dispatch => ({
  onFilter: filter => dispatch(setFilter(filter)),
});

class SearchBar extends Component {
  state = {
    showModal: false,
  };

  handleClickOpen = () => {
    this.setState({ showModal: true });
  };

  handleClickButton = () => {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button),
    });
  };

  searchFriends(e) {
    this.props.onFilter(e);
    // this.setState({ searchKeyword: e.target.value });
  }

  render() {
    const Search = Input.Search;
    const { showModal } = this.state;
    return (
      <Row className="search-bar-container">
        <Col push={1} span={16}>
          <Search style={{ width: 200 }} onSearch={e => this.searchFriends(e)} />
        </Col>
        <Col className="add-contact-icon" push={4} span={4}>
          <Icon
            style={{ color: '#fff', fontSize: '20px', marginLeft: '10px' }}
            theme="outlined"
            type="user-add"
            onClick={() => this.linkDialog.open()}
          />
        </Col>
        <FormDialog
          ref={(elem) => {
            this.linkDialog = elem;
          }}
          ModalContent={<AddContact />}
          title={<h3>Add new friend</h3>}
          visible={showModal}
        />
      </Row>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);

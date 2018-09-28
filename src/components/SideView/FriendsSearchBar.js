import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { FormControl } from 'material-ui/Form';
import Popover from 'material-ui/Popover';
import Input, { InputLabel } from 'material-ui/Input';
import { findDOMNode } from 'react-dom';
import { setFilter } from '../Store/actions/filterAction';
import FormDialog from '../Modal/dialog';
import AddContact from './Addcontact';

const mapDispatchToProps = dispatch => ({
  onFilter: filter => dispatch(setFilter(filter)),
});

class SearchBar extends Component {
  state = {
    open: false,
    contactAddOpen: false,
    anchorEl: null,
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'center',
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: 'anchorEl',
  };

  handleClickOpen = () => {
    this.setState({ contactAddOpen: true });
  };

  handleClickClose = () => {
    this.setState({
      contactAddOpen: false,
    });
  };

  handleClickButton = () => {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button),
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  searchFriends(e) {
    this.props.onFilter(e.target.value);
    this.setState({ searchKeyword: e.target.value });
  }

  button = null;

  render() {
    // const who = null;;
    const {
      open,
      anchorEl,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
      positionTop,
      positionLeft,
      anchorReference,
    } = this.state;
    return (
      <div>
        <AppBar
          style={{
            position: 'relative',
            height: 65,
            backgroundColor: '#726F6F',
            color: 'white',
            boxShadow: 'none',
          }}
        >
          <Toolbar className="friend-search-bar">
            <IconButton
              ref={(node) => {
                this.button = node;
              }}
              aria-label="Menu"
              id="cypress-friend-search-button"
              onClick={this.handleClickButton}
              style={{ position: 'absolute', top: 9, left: 2 }}
            >
              <i className="material-icons">search</i>
            </IconButton>

            <Popover
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: anchorOriginVertical,
                horizontal: anchorOriginHorizontal,
              }}
              anchorPosition={{ top: positionTop, left: positionLeft }}
              anchorReference={anchorReference}
              onClose={this.handleClose}
              open={open}
              transformOrigin={{
                vertical: transformOriginVertical,
                horizontal: transformOriginHorizontal,
              }}
            >
              <FormControl className="open-search-bar">
                <InputLabel htmlFor="searchContact">search</InputLabel>
                <Input
                  id="searchContact"
                  onChange={(e) => {
                    this.searchFriends(e);
                  }}
                  type="text"
                  value={this.state.searchKeyword}
                />
              </FormControl>
            </Popover>
            <IconButton
              aria-label="Menu"
              id="cypress-add-freind"
              onClick={this.handleClickOpen}
              style={{ position: 'absolute', top: 7, right: 2 }}
            >
              <i className="material-icons">add_circle</i>
            </IconButton>
            <FormDialog
              autoScrollBodyContent={false}
              compo={<AddContact />}
              fullScreen={false}
              handleClickOpen={this.handleClickOpen}
              handleClose={this.handleClickClose}
              open={this.state.contactAddOpen}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);

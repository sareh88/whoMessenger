import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
// import IconButton from "material-ui/IconButton";
import uuidv1 from 'uuid/v1';
// import FriendConfirmation from "./addFriendConfirmation";
import AddIcon from 'material-ui-icons/Add';
// import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import config from '../../config/config';
import Avatar from './UserAvater';

const styles = theme => ({
  root: {
    // width: '100%',
    backgroundColor: '#fff',
  },
  button: {
    minWidth: 10,
    height: '46px',
    width: '46px',
    borderRadius: '50%',
    fontSize: 24,
    backgroundColor: '#0d56a5',
    color: '#fff',
  },
});

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
    const who = null;

    let listItems = '';
    if (this.props.users !== '') {
      listItems = this.props.users.usersList.map(item => (
        // let avatarURL = `${config.BASE_URL}images/avatars/${newAvatar}`;
        // console.log(item,`${config.BASE_URL}images/avatars/${item.profile.avatarURL}`)
        <ListItem
          key={item._id}
          button
          className="list-item"
          dense
          onClick={() => {
            this.requestFriends(item);
            // this.handleClickOpen();
          }}
        >
          <Avatar avatar={`${config.BASE_URL}images/avatars/${item.profile.avatarURL}`} size={45} />
          <ListItemText primary={`${item.profile.firstName} ${item.profile.lastName}`} />
          <Button
            aria-label="Add"
            className={styles.button}
            color="primary"
            onClick={() => {
              this.requestFriends(item);

              // this.handleClickOpen();
            }}
            variant="fab"
          >
            <AddIcon />
          </Button>
        </ListItem>
      ));
    }
    return (
      <div className={styles.root} id="friend-list">
        <List>{listItems}</List>
      </div>
    );
  }
}

export default SearchList;

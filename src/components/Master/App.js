import React, { Component } from 'react';

import io from 'socket.io-client';
import moment from 'moment';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import decode from 'jwt-decode';
import './App.css';
import '../../style.css';

import config from '../../config/config';
import store from '../Store/store';
import UserAvatar from '../SideView/UserAvatar';
import ContactList from '../SideView/contactList';
import ContactDetail from '../SideView/contactDetail';
import MessagesLog from '../ChatApp/messagesLog';
import NewMessage from '../ChatApp/newMessage';
import { fetchContactList } from '../Store/actions/userActions';
import SearchBar from '../SideView/FriendsSearchBar';

function mapStateToProps(state, filter) {
  return {
    // currentUserData:state.changeSettingReducer.currentUserData,
    contactList: state.contactListReducers.contactList.filter(c => c.fullName.toLowerCase().indexOf(state.contactListFilterReducer.toLowerCase()) > -1

      // return c.name.toLowerCase().indexOf(state.contactListFilterReducer.toLowerCase()) > -1
    ),
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 'row',
      justify: 'flex-start',
      alignItems: 'stretch',
      socketId: '',
      socketChanelId: '',
      messages: [],
      moment: moment()
        .startOf('day')
        .fromNow(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.chatMessageHandler = this.chatMessageHandler.bind(this);

    this.socket = io(config.SOCKET_URL);
  }

  componentWillMount() {
    this.props.dispatch(fetchContactList());
    this.socket.on('connect', socket => this.connect(socket));
  }

  componentDidMount() {
    console.log(store.getState());
    console.log(this.props);
    console.log(this.props.contactList);
    // this.socket.on("message", message => {
    /* this.socket.on(this.state.socketChanelId, message => {
      console.log("received messages...")
      this.setState({ messages: [...this.state.messages, message] });
    }); */

    // FIXME: this is a hack, try to bind socket.io properly with "this"
    this.chatMessageHandler(this);
  }

  chatMessageHandler(thisKeyword) {
    this.socket.on('chatMessages', (data) => {
      // display data.message
      console.log('received: ', data);
      // console.log(state.messages)
      thisKeyword.setState({ messages: [...thisKeyword.state.messages, data] });
    });
  }

  connect(socket) {
    this.setState({
      socketId: this.socket.id,
    });
  }

  socketSignal(roomID, Sbody) {
    const body = Sbody;

    console.log(body);

    const id = this.state.socketId;
    const moment = <p>this.state.moment</p>;

    const message = {
      body,
      id,
      socketId: this.state.socketId,
      moment,
      roomID,
    };

    console.log('-----------');
    console.log(message);

    this.setState({ messages: [...this.state.messages, message] });

    this.socket.emit('privateMessage', message);
  }

  getSocketChanelId(chatInfo) {
    this.setState({
      socketChanelId: chatInfo.chatID,
    });

    const oldMessages = [];
    console.log('last hope: ', chatInfo.messages);
    chatInfo.messages.forEach((message) => {
      console.log('message: ', message);
      const oldMessage = {
        messageBody: message.message,
        userID: message.userID,
        roomID: chatInfo.chatID,
      };
      oldMessages.push(oldMessage);
    });
    console.log('Old Messages: ', oldMessages);

    this.setState({ messages: oldMessages });

    this.socket.emit('joinRoom', chatInfo.chatID);

    console.log('joining the roommmmm: ', chatInfo.chatID);

    // this.socketSignal(chatInfo.chatID, "aaaabbbbccc");
    /* setTimeout(() => {
      this.socketSignal(chatInfo.chatID, "xxddff");
    }, 100)
*/
    /* this.socket.emit('joinRoom', {
      roomID,
      participants: [roomID.split("--")[0], roomID.split("--")[1]]
    });


    this.socket.on('joinRoom', function(roomInfo) {
        console.log('joining room', roomInfo.roomID);

        let user = decode(localStorage.getItem("token"));

        if(user._id === roomInfo.friendID || user._id === roomInfo.userID) {
          this.socket.join(roomInfo.roomID);
        }
    });
*/
  }

  handleSubmit(event) {
    // this.socketSignal(this.state.socketChanelId, event.target.value)

    // this.socket.on('privateMessage', function(roomInfo) {
    // console.log('sending data to channel: ', this.state.socketChanelId);

    const user = decode(localStorage.getItem('token'));

    const messagePayload = {
      chatID: this.state.socketChanelId,
      userID: user._id,
      messageBody: event.target.value,
    };

    console.log('messagePayload: ', messagePayload);
    this.socket.emit('privateMessage', messagePayload);
    // });

    this.setState({ messages: [...this.state.messages, messagePayload] });

    event.target.value = '';
  }

  render() {
    const { alignItems, direction, justify } = this.state;
    let avatarURL;
    // Getting the information from the loged user
    const user = decode(localStorage.getItem('token'));
    const currentAvatar = user.profile.avatarURL;
    if (localStorage.getItem('updatedUserData')) {
      const updatedUserData = JSON.parse(localStorage.getItem('updatedUserData'));

      const newAvatar = updatedUserData.user.avatarURL;

      avatarURL = `${config.BASE_URL}images/avatars/${newAvatar}`;
    } else {
      avatarURL =
        currentAvatar !== ''
          ? `${config.BASE_URL}images/avatars/${currentAvatar}`
          : `${config.BASE_URL}images/avatar_placeholder.png`;
    }
    return (
      <Grid alignItems={alignItems} container direction={direction} item justify={justify} lg={12} sm={12}>
        <Grid className="app" item lg={3} sm={4} xs={12}>
          <Grid>
            <Paper>
              <Grid className="sideBarAvatarComponent" item sm={12}>
                <UserAvatar avatarURL={avatarURL} />
              </Grid>
              <Grid className="sideBarContactListComponent" item sm={12}>
                <ContactList friendsList={this.props.contactList} getId={this.getSocketChanelId.bind(this)} />
              </Grid>
              <Grid item sm={12}>
                <SearchBar friendsList={this.props.contactList} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid className="app" item lg={9} sm={8} xs={12}>
          <Grid className="messagesContactDetailComponent" item sm={12}>
            <ContactDetail />
          </Grid>
          <Grid className="messagesLogComponent" item sm={12}>
            <MessagesLog messages={this.state.messages} socketId={this.state.socketId} />
          </Grid>
          <Grid className="messagesNewMessageComponent" item sm={12}>
            <NewMessage handleSubmit={this.handleSubmit} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(App);

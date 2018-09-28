import React, { Component } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import decode from 'jwt-decode';
import { connect } from 'react-redux';
import { Layout, Col, Row } from 'antd';
import store from '../Store/store';
import config from '../../config/config';
import ContactDetail from '../SideView/contactDetail';
import MessagesLog from '../ChatApp/messagesLog';
import NewMessage from '../ChatApp/newMessage';
import { fetchContactList } from '../Store/actions/userActions';

// import '../../style.css';

// import Grid from 'material-ui/Grid';
// import Paper from 'material-ui/Paper';

import SideView from '../SideView/contaoner/SideView';
import 'antd/dist/antd.css';
import './stylesheets/App.scss';

const { Header, Footer, Sider, Content } = Layout;

function mapStateToProps(state, filter) {
  return {
    // currentUserData:state.changeSettingReducer.currentUserData,
    contactList: state.contactListReducers.contactList.filter(
      c => c.fullName.toLowerCase().indexOf(state.contactListFilterReducer.toLowerCase()) > -1

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
      avatarURL = currentAvatar !== ''
        ? `${config.BASE_URL}images/avatars/${currentAvatar}`
        : `${config.BASE_URL}images/avatar_placeholder.png`;
    }

    return (
      <Row>
        <Col span={24}>
          <Layout className="layout-container">
            <Sider theme="dark" width={350}>
              <SideView
                avatarURL={avatarURL}
                friendsList={this.props.contactList}
                userId={this.getSocketChanelId.bind(this)}
                user={user}
              />
            </Sider>
            <Layout>
              <Header>
                <ContactDetail />
              </Header>
              <Content>
                <MessagesLog
                  messages={this.state.messages}
                  setCurrentFriend={avatarURL}
                  socketId={this.state.socketId}
                />
              </Content>
              <Footer>
                <NewMessage handleSubmit={this.handleSubmit} />
              </Footer>
            </Layout>
          </Layout>
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps)(App);

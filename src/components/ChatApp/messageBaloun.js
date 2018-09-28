import React, { Component } from 'react';
import { Row, Col } from 'antd';
import decode from 'jwt-decode';

import './stylesheets/MessageBaloun.scss';

class ContactDetail extends Component {
  state = {
    test: null,
  };

  render() {
    const { message } = this.props;
    let align;
    // let time = this.props.time;

    const user = decode(localStorage.getItem('token'));

    console.log('message from ballon:', message);
    if (message.userID === user._id) {
      align = 'bubble me';
    } else {
      align = 'bubble you';
    }

    return (
      <Row className="chat">
        <Col className={align} span={24}>
          {message.messageBody}

          {/*
                     <span className="timer">
                    {time}
                  </span> */}
        </Col>
      </Row>
    );
  }
}

export default ContactDetail;

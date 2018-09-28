import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { connect } from 'react-redux';
import { login } from '../Store/actions/login';
import config from '../../config/config';

import './stylesheets/SignIn.scss';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      email: '',
      password: '',
      loginError: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      checked: event.target.checked,
    });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    localStorage.removeItem('updatedUserData');

    const url = `${config.BASE_URL}auth/login`;
    const formData = {
      checked: this.state.checked,
      username: this.state.email,
      password: this.state.password,
    };
    console.log(formData);

    if (formData) {
      const searchParams = Object.keys(formData)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
        .join('&');

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: searchParams,
      })
        .then(res => res.json())
        .then((data) => {
          const user = decode(data.token);
          console.log(user);
          localStorage.setItem('token', data.token);
          this.props.history.push('/main');
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loginError: err.message,
          });
        });
    } else {
      console.log({ Error: 'Fields are required' }); // Handle errors here...
    }
    /* let url = 'localhost:3001/login';
   let email = this.state.email;
   let password = this.state.password;
   loginRequest(url,email,password)


  this.props.login(this.state).then(
    (res) => this.context.router.push('/auth'),
  ) */
  }

  render() {
    return (
      <div className="main-container">
        <div className="middle-container">
          <div className="sign-in-details">
            <div>
              <img alt="logo" className="logo" src={`${config.BASE_URL}images/who_logo.png`} />
            </div>
            <form autoComplete="off" className="form-wrapper" noValidate onSubmit={this.handleSubmit.bind(this)}>
              <TextField id="email" label="Email" onChange={this.handleEmailChange} placeholder="Email" />
              <TextField
                id="password"
                label="Password"
                onChange={this.handlePasswordChange}
                placeholder="Password"
                type="password"
              />
              <Button className="login-button" color="secondary" raised type="submit">
                Login
              </Button>
            </form>
            <div className="additional-options">
              <Link className="link" to="/singup">
                <p>Register</p>
              </Link>
              <Link className="link" to="#">
                <p>Forgot Password?</p>
              </Link>
            </div>
            <span style={{ color: '#e80909' }}>{this.state.loginError}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(SignIn);

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import config from '../../config/config.js';
import Typography from 'material-ui/Typography/Typography';
import decode from 'jwt-decode';
import uuidv1 from 'uuid/v1';
import Grid from 'material-ui/Grid';
import { Redirect } from 'react-router';
// import { changeSetting } from "../actions/changeSetting";
// import compose from 'recompose/compose';
// import { connect } from "react-redux";
import ImageCropper from './ImageCropper.js';

const styles = theme => ({
  textField: {
    width: 300,
    float: 'left',
    marginBottom: 10,
  },
  emailAddress: {
    width: 300,
    float: 'left',
    marginBottom: 30,
  },

  pickerContainer: {
    width: 200,
  },

  datePicker: {
    width: 300,
  },
});

class UserPictureAndState extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      submittedImgValue: '',
      newUser: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        dateOfBirth: '',
        gender: '',
      },
      disabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleimageChange = this.handleimageChange.bind(this);
  }
  componentWillMount() {
    const oldCredentials = decode(localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('updatedUserData'));
    console.log('oldCredentials', oldCredentials);
    console.log('user', user);

    if (user) {
      this.setState({
        userCurrentData: {
          firstName: user.user.profile.firstName,
          lastName: user.user.profile.lastName,
          emailAddress: user.user.emailAddress,
          dateOfBirth: user.user.dateOfBirth,
          gender: user.user.profile.gender,
          avatarURL: user.user.profile.avatarURL,
        },
      });
    } else {
      this.setState({
        userCurrentData: {
          firstName: oldCredentials.profile.firstName,
          lastName: oldCredentials.profile.lastName,
          emailAddress: oldCredentials.emailAddress,
          dateOfBirth: oldCredentials.dateOfBirth,
          gender: oldCredentials.profile.gender,
          avatarURL: oldCredentials.profile.avatarURL,
        },
      });
    }
  }

  handleDataChange = (date) => {
    const checkedDate = date.format().substring(0, 10);
    this.setState({
      newUser: { ...this.state.newUser, dateOfBirth: checkedDate },
    });
  };

  handleimageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        newUser: {
          ...this.state.newUser,
          avatarURL: reader.result,
        },
        disabled: false,
      });
    };

    reader.readAsDataURL(file);
  }

  handleRadioChange = (e, value) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        gender: value,
      },
      value,
    });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      newUser: {
        ...this.state.newUser,
        [name]: value,
      },
    });
  }

  submitForm() {
    let changedEmail = false;
    const formData = new FormData(this.formSettings.target);

    // Only will be updated what the user changes
    // this.state.submittedImgValue === '' ? formData.append('file', this.state.userCurrentData.avatarURL) : formData.append('file', this.state.submittedImgValue);
    this.state.newUser.dateOfBirth === ''
      ? formData.append('dateOfBirth', this.state.userCurrentData.dateOfBirth)
      : formData.append('dateOfBirth', this.state.newUser.dateOfBirth);
    this.state.newUser.firstName === ''
      ? formData.append('firstName', this.state.userCurrentData.firstName)
      : formData.append('firstName', this.state.newUser.firstName);
    this.state.newUser.lastName === ''
      ? formData.append('lastName', this.state.userCurrentData.lastName)
      : formData.append('lastName', this.state.newUser.lastName);

    // if the email is empty it will no send nothing
    if (this.state.newUser.emailAddress !== '') {
      formData.append('emailAddress', this.state.newUser.emailAddress);
      changedEmail = true;
    }

    if (this.state.imageChanged) {
      formData.append('file', this.state.submittedImgValue);
    }

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    const url = `${config.BASE_URL}user/profile_edit/${uuidv1()}`;
    const token = localStorage.getItem('token');

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `TOKEN ${token}`,
      },
      body: formData,
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          localStorage.setItem('updatedUserData', JSON.stringify(data));

          console.log(changedEmail);
          //
          if (changedEmail) {
            const url = `${config.BASE_URL}auth/logout`;
            fetch(url, {
              method: 'Get',
              headers: {
                Authorization: `TOKEN ${token}`,
              },
            })
              .then(res => res.json())
              .then((data) => {
                localStorage.clear();
                this.setState({ redirect: true });
              })
              .catch(err => console.log(err));
          }
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch(err => console.log(err));
  }

  saveCropedImage(file) {
    // let objectURL = URL.createObjectURL(file);
    this.setState({ imageChanged: true, submittedImgValue: file });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Grid className={styles.row} container spacing={24}>
        <Grid item xs>
          <form
            ref={form => (this.formSettings = form)}
            autoComplete="off"
            encType="multipart/form-data"
            noValidate
            onSubmit={this.handleSubmit.bind(this)}
          >
            <TextField
              className={styles.textField}
              id="firstName"
              label={this.state.userCurrentData.firstName}
              name="firstName"
              onChange={this.handleInputChange}
            />

            <TextField
              className={styles.textField}
              helperText={this.state.errorMessagelastName}
              id="lastName"
              label={this.state.userCurrentData.lastName}
              name="lastName"
              onChange={this.handleInputChange}
            />

            <TextField
              className={styles.emailAddress}
              id="emailAddress"
              label={this.state.userCurrentData.emailAddress}
              name="emailAddress"
              onChange={this.handleInputChange}
            />

            <div className={styles.pickerContainer}>
              <Typography align="left" gutterBottom type="caption">
                Date of Birth
              </Typography>
             
            </div>

            <ImageCropper saveCropedImage={this.saveCropedImage.bind(this)} />

            <Button className="login-button" onClick={this.submitForm.bind(this)} type="button">
              SAVE
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default UserPictureAndState;

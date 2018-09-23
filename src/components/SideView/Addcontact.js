import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
// import Input from "material-ui/Input";
import SearchList from './searchList';
import TextField from 'material-ui/TextField';
// import { CircularProgress } from 'material-ui/Progress';
// import { FormControl, FormHelperText } from 'material-ui/Form';
class AddContact extends Component {
  constructor() {
    super();
    this.state = {
      users: '',
      error: '',
    };
    this.btnSearchClicked = this.btnSearchClicked.bind(this);
  }

  btnSearchClicked() {
    const token = localStorage.getItem('token');
    const searchValue = this.txtSearchInput.value;
    if (searchValue !== '') {
      fetch(`http://localhost:3001/user/contacts/search/${searchValue}`, {
        headers: { Authorization: `TOKEN ${token}` },
      })
        .then(res => res.json())
        .then((data) => {
          this.setState({
            users: data,
            error: '',
          });
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ error: 'please insert a name' });
    }
  }
  render() {
    // let error = this.state.error ? <div>{this.state.error}</div> : <div> </div>
    return (
      <div style={{ height: 500, width: 400 }}>
        <TextField
          helperText={this.state.error}
          id="cypress-add-new"
          inputRef={(thisInput) => {
            this.txtSearchInput = thisInput;
          }}
          label="Search For a Friends"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.btnSearchClicked();
            }
          }}
          style={{ width: '80%', marginLeft: 35 }}
        />

        <IconButton
          aria-label="Menu"
          id="cypress-ser-new-freind"
          onClick={this.btnSearchClicked}
          style={{
            position: 'absolute',
            top: 25,
            right: 60,
            backgroundColor: 'rgba(8,6,6,0)',
          }}
        >
          <i className="material-icons">search</i>
        </IconButton>

        <SearchList users={this.state.users} />
      </div>
    );
  }
}

export default AddContact;

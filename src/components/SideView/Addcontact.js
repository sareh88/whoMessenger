import React, { Component } from 'react';
import { Input } from 'antd';
import SearchList from './searchList';

const Search = Input.Search;
class AddContact extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
      error: '',
    };
    this.onSearchContact = this.onSearchContact.bind(this);
  }

  onSearchContact(value) {
    const token = localStorage.getItem('token');
    const searchValue = value;
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
    const { users } = this.state;
    return (
      <div style={{ height: 500, width: 400 }}>
        <Search enterButton placeholder="input search text" onSearch={value => this.onSearchContact(value)} />

        {users !== null ? <SearchList users={users} /> : null}
      </div>
    );
  }
}

export default AddContact;

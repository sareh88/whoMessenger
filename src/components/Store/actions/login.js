import axios from 'axios';

export function login(data) {
  return dispatch => axios.post('http://localhost:3001/auth/login', data);
}

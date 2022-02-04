import axios from 'axios';
const DEFAULT_URL = 'http://localhost:3333/api/';

class AuthService {
  healthCheck = () => {
    return axios.get(`${DEFAULT_URL}health`).then((res) => res.data);
  };
  login = (username, password) => {
    return axios
      .post(`${DEFAULT_URL}login`, {
        username,
        password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  logout = () => {
    return axios.post(`${DEFAULT_URL}logout`).then((res) => res.data);
  };
  transactions = () => {
    const currentUser = localStorage.getItem('user');
    const userObj = JSON.parse(currentUser);
    const token = userObj.token;
    return axios
      .get(`${DEFAULT_URL}banking/transactions`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err.message));
  };
}
export default new AuthService();

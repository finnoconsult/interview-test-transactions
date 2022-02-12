import axios from 'axios';
import { environment } from '../../../environments/environment';

export const login = (username: string, password: string) => {
  return axios
    .post(`${environment.DEFAULT_URL}login`, {
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

export const logout = () => {
  return axios.post(`${environment.DEFAULT_URL}logout`).then((res) => res.data);
};

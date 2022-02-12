import axios from 'axios';
import { CurrentUser } from '../../../typings/User';
import { environment } from '../../../environments/environment';

export const getTransactions = () => {
  const currentUser = localStorage.getItem('user') as string;
  const userObj: CurrentUser = JSON.parse(currentUser);
  const token = userObj.token;
  return axios
    .get(`${environment.DEFAULT_URL}banking/transactions`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};

import axios from 'axios';
import { environment } from '../../../environments/environment';

export const healthCheck = () => {
  return axios.get(`${environment.DEFAULT_URL}health`).then((res) => res.data);
};

import { atom } from 'recoil';
import { CurrentUser } from '../../../../typings/User';

export const userState = atom({
  key: 'userState',
  default: {
    username: null,
    loggedIn: false,
    token: null,
  } as CurrentUser,
});

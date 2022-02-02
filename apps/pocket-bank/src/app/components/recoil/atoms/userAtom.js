import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: { username: null, loggedIn: false, token: null },
});

import { atom } from 'recoil';
import currentWeekNumber from 'current-week-number';

export const weekState = atom({
  key: 'weekState',
  default: {
    year: new Date('2021.02.20').getFullYear(),
    week: currentWeekNumber(new Date('2021.02.20')),
  },
});

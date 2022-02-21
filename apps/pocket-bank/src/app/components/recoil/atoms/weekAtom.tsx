import { atom } from 'recoil';

interface DateInterface {
  fullDate: string | null | Date;
  year: number | null;
  week: number | null;
  scrolled: boolean;
}

export const weekState = atom({
  key: 'weekState',
  default: {
    fullDate: null,
    year: null,
    week: null,
    scrolled: false,
  } as DateInterface,
});

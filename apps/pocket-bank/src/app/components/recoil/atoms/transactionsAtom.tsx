import { atom } from 'recoil';
import { TransactionObj } from '../../../../typings/Transaction';

export const transactionState = atom({
  key: 'transactionState',
  default: [] as TransactionObj[],
});

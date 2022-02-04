import { useEffect, useState } from 'react';
import authService from '../../services/authService';
import Transaction from './Transaction';
import TransactionHeader from './TransactionHeader';
import currentWeekNumber from 'current-week-number';
import { useRecoilState } from 'recoil';
import { transactionState } from '../../recoil/atoms/transactionsAtom';

function Transactions() {
  const [transactions, setTransactions] = useRecoilState(transactionState);
  const [currency, setCurrency] = useState(null);

  const sortFunction = (arr) => {
    arr.sort(function (t1, t2) {
      const date1 = new Date(t1.date);
      const date2 = new Date(t2.date);
      return date1 - date2;
    });
    return arr.reverse();
  };

  useEffect(() => {
    const getTransactions = async () => {
      const res = await authService.transactions();
      if (res) {
        setTransactions(sortFunction(res));
        setCurrency(res[0].currency);
      }
    };
    getTransactions();
  }, []);

  return (
    <div className="bg-[#f2f2f2] min-h-screen flex flex-col max-w-screen-2xl">
      {transactions && <TransactionHeader currency={currency} />}
      <div className="my-2 ">
        {transactions ? (
          transactions.map(
            ({ amount, currency, title, date } = transaction, i) => (
              <div
                className="flex items-center relative px-5"
                key={
                  title + Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
                }
              >
                <Transaction
                  amount={amount}
                  currency={currency}
                  date={date}
                  title={title}
                  weeklyDate={
                    currentWeekNumber(date) !==
                    currentWeekNumber(transactions[i - 1]?.date)
                      ? true
                      : false
                  }
                />
              </div>
            )
          )
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
}

export default Transactions;

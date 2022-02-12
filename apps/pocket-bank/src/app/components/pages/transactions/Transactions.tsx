import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Transaction from './Transaction';
import TransactionHeader from './TransactionHeader';
import { getTransactions } from '../../services/transactionService';
import { transactionState } from '../../recoil/atoms/transactionsAtom';
import { TransactionObj } from '../../../../typings/Transaction';

function Transactions() {
  const [transactions, setTransactions] = useRecoilState(transactionState);
  const [currency, setCurrency] = useState<string | null>(null);

  const sortFunction = (arr: []) => {
    arr.sort(function (t1: TransactionObj, t2: TransactionObj) {
      const date1 = new Date(t1.date);
      const date2 = new Date(t2.date);
      return +date1 - +date2;
    });
    return arr.reverse();
  };

  useEffect(() => {
    const getAllTransaction = async () => {
      const res = await getTransactions();
      if (res) {
        setTransactions(sortFunction(res));
        setCurrency(res[0].currency);
      }
    };
    getAllTransaction();
  }, [setTransactions]);

  return (
    <div className="bg-[#f2f2f2] min-h-screen flex flex-col max-w-screen-2xl">
      {transactions && <TransactionHeader currency={currency || '€'} />}
      <div className="my-2 ">
        {transactions ? (
          transactions.map((t, i) => (
            <div
              className="flex items-center relative px-5"
              key={
                t.title +
                t.date +
                Math.random() * (9999 - 1000 + 1) +
                (1000).toString()
              }
            >
              <Transaction
                index={i}
                amount={t.amount}
                currency={t.currency}
                date={t.date}
                title={t.title}
              />
            </div>
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
}

export default Transactions;

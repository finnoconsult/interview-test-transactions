import { useEffect, useState } from 'react';
import authService from '../../services/authService';
import TransactionHeader from './TransactionHeader';

function Transaction() {
  const [transactions, setTransactions] = useState(null);
  const [allSpending, setAllSpending] = useState(null);
  const [currency, setCurrency] = useState(null);

  function sortFunction(arr) {
    arr.sort(function (t1, t2) {
      const date1 = new Date(t1.date);
      const date2 = new Date(t2.date);
      return date1 - date2;
    });
    return arr.reverse();
  }

  function allMySpending(arr) {
    const sum = arr.reduce((acc, curr) => acc + curr.amount, 0);
    return setAllSpending(sum.toFixed(2));
  }

  useEffect(() => {
    async function getTransactions() {
      const res = await authService.transactions();
      if (res) {
        setTransactions(sortFunction(res));
        allMySpending(res);
        setCurrency(res[0].currency);
      }
    }
    getTransactions();
  }, []);

  return (
    <div className="bg-[#f2f2f2] min-h-screen flex flex-col max-w-screen-2xl">
      {transactions&&<TransactionHeader
        currency={currency}
        toDate={transactions[0].date}
        fromDate={transactions[transactions.length - 1].date}
        totalAmount={allSpending}
      />}
      <div className="my-2">
        {transactions ? (
          transactions.map((transaction) => (
            <div
              className="flex items-center relative px-5"
              key={
                transaction.title +
                Math.floor(Math.random() * (9999 - 1000 + 1)) +
                1000
              }
            >
              <div className="w-96 border my-5 rounded-full p-2 flex items-center justify-between">
                <p>{transaction.title}</p>
                <p
                  className={`${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {transaction.amount}
                  {transaction.currency}
                </p>
              </div>
              <p className="text-[10px] absolute bottom-0 left-7 text-gray-400">
                {transaction.date}
              </p>
            </div>
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
}

export default Transaction;

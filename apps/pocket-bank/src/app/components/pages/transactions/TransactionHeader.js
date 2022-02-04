import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { transactionState } from '../../recoil/atoms/transactionsAtom';
import { weekState } from '../../recoil/atoms/weekAtom';
import currentWeekNumber from 'current-week-number';

function TransactionHeader({ currency }) {
  const [transactions, setTransactions] = useRecoilState(transactionState);
  const [dateState, setDateState] = useRecoilState(weekState);
  const [weeklySpending, setWeeklySpending] = useState(null);
  const [allSpending, setAllSpending] = useState(null);

  const weeklySpendings = () => {
    const sum = transactions
      .filter(
        (trans) =>
          currentWeekNumber(trans.date) === dateState.week &&
          new Date(trans.date).getFullYear() === dateState.year
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
    setWeeklySpending(sum.toFixed(2));
  };

  useEffect(() => {
    const sum = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    setAllSpending(sum.toFixed(2));
  }, []);

  useEffect(() => {
    weeklySpendings();
  }, [dateState.week, dateState.year]);

  return (
    <section className="sticky top-0 text-[12px] text-gray-400 px-2 h-10 bg-gray-200 z-40 shadow-md flex items-center justify-between">
      <p>
        {dateState.year}-{dateState.week}
      </p>
      <p className={weeklySpending > 0 ? 'text-green-600' : 'text-red-500'}>
        {currency}
        {weeklySpending ? weeklySpending : allSpending}
      </p>
    </section>
  );
}

export default TransactionHeader;

import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { transactionState } from '../../recoil/atoms/transactionsAtom';
import { weekState } from '../../recoil/atoms/weekAtom';
import currentWeekNumber from 'current-week-number';

interface Props {
  currency: string;
}

const TransactionHeader = ({ currency }: Props) => {
  const [transactions] = useRecoilState(transactionState);
  const [dateState, setDateState] = useRecoilState(weekState);
  const [weeklySpending, setWeeklySpending] = useState<string | null>(null);
  const [allSpending, setAllSpending] = useState<string | null>(null);

  const weeklySpendings = useCallback(() => {
    const sum = transactions
      .filter(
        (trans) =>
          currentWeekNumber(trans.date) === dateState.week &&
          new Date(trans.date).getFullYear() === dateState.year
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
    setWeeklySpending(sum.toFixed(2));
  }, [dateState.week, dateState.year, transactions]);

  useEffect(() => {
    const sum = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    setAllSpending(sum.toFixed(2));
    const fromStartToNow = `${transactions[0]?.date}-${
      transactions[transactions.length - 1]?.date
    }`;
    setDateState({
      fullDate: fromStartToNow,
      year: new Date('2021.02.20').getFullYear(),
      week: currentWeekNumber(new Date('2021.02.20')),
      scrolled: false,
    });
  }, [transactions, setDateState]);

  useEffect(() => {
    weeklySpendings();
  }, [weeklySpendings]);

  return (
    <section className="sticky top-0 text-[12px] text-gray-400 px-2 h-10 bg-gray-200 z-40 shadow-md flex items-center justify-between">
      <p>{dateState.fullDate}</p>
      <p
        className={
          weeklySpending && +weeklySpending > 0
            ? 'text-green-600'
            : 'text-red-500'
        }
      >
        {currency}
        {dateState.scrolled ? weeklySpending : allSpending}
      </p>
    </section>
  );
};

export default TransactionHeader;

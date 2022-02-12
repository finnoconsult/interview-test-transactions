import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { weekState } from '../../recoil/atoms/weekAtom';
import currentWeekNumber from 'current-week-number';
import { transactionState } from '../../recoil/atoms/transactionsAtom';

export interface TransactionObj {
  index: number;
  amount: number;
  currency: string;
  title: string;
  date: Date;
}

function Transaction({ index, amount, title, currency, date }: TransactionObj) {
  const [, setDateState] = useRecoilState(weekState);
  const [transactions] = useRecoilState(transactionState);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const weeklyDate =
    currentWeekNumber(date) !==
    currentWeekNumber(transactions[index - 1]?.date);

  useEffect(() => {
    const handleScroll = () => {
      if (
        dateRef.current &&
        dateRef?.current?.getBoundingClientRect().top < 50 &&
        dateRef?.current?.getBoundingClientRect().top > -50
      ) {
        setDateState({
          fullDate: date,
          year: new Date(date).getFullYear(),
          week: currentWeekNumber(new Date(date)),
          scrolled: true,
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [date, setDateState]);

  return (
    <div
      className={`w-full flex items-center ${
        amount < 0 ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`border space-x-2 my-5 rounded-full p-2 flex items-center justify-between`}
      >
        {weeklyDate && (
          <p
            ref={dateRef}
            className="text-[10px] absolute top-0 left-1/2 transform -translate-x-1/2 text-gray-400"
          >
            {date}
          </p>
        )}
        <p>{title}</p>
        <p className={`${amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
          {amount}
          {currency}
        </p>
      </div>
    </div>
  );
}

export default Transaction;

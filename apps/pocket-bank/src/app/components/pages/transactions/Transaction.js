import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { weekState } from '../../recoil/atoms/weekAtom';
import currentWeekNumber from 'current-week-number';

function Transaction({ amount, title, currency, date, weeklyDate }) {
  const [dateState, setDateState] = useRecoilState(weekState);
  const dateRef = useRef();

  const handleScroll = () => {
    const lastScrollTop = 0;
    const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    console.log(st);
    if (st > lastScrollTop) {
      if (
        dateRef?.current?.getBoundingClientRect().top < 50 &&
        dateRef?.current?.getBoundingClientRect().top > -50
      ) {
        setDateState({
          week: currentWeekNumber(new Date(date)),
          year: new Date(date).getFullYear(),
        });
      }
    } else return;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
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


function TransactionHeader({ fromDate, toDate, totalAmount, currency }) {
  return (
    <section className="sticky top-0 text-[12px] text-gray-400 px-2 h-10 bg-gray-200 z-40 shadow-md flex items-center justify-between">
      <p>
        {fromDate}-{toDate}
      </p>
      <p className={totalAmount > 0 ? 'text-green-600' : 'text-red-500'}>
        {totalAmount}
        {currency}
      </p>
    </section>
  );
}

export default TransactionHeader;

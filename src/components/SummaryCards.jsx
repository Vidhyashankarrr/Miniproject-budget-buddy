const SummaryCards = ({ transactions = [] }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Balance */}
      <div className="bg-white p-6 rounded shadow text-center">
        <p className="text-gray-500">Total Balance</p>
        <h2 className="text-2xl font-bold">₹{balance}</h2>
      </div>

      {/* Income */}
      <div className="bg-white p-6 rounded shadow text-center">
        <p className="text-gray-500">Total Income</p>
        <h2 className="text-2xl font-bold text-green-600">
          ₹{income}
        </h2>
      </div>

      {/* Expense */}
      <div className="bg-white p-6 rounded shadow text-center">
        <p className="text-gray-500">Total Expense</p>
        <h2 className="text-2xl font-bold text-red-600">
          ₹{expense}
        </h2>
      </div>
    </div>
    
  );
};

export default SummaryCards;


const RecentTransactions = ({ transactions, setTransactions }) => {
  const deleteTransaction = (id) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  if (!transactions.length) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        <p className="text-gray-500">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="font-semibold mb-4">Recent Transactions</h3>

      {transactions.map((t) => (
        <div
          key={t.id}
          className="flex justify-between items-center border-b py-2"
        >
          <div>
            <p className="font-medium">{t.title}</p>
            <p className="text-sm text-gray-500">{t.category}</p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`font-semibold ${
                t.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {t.type === "income" ? "+" : "-"}₹{t.amount}
            </span>

            <button
              onClick={() => deleteTransaction(t.id)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;

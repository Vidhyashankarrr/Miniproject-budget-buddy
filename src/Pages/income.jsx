import AddTransaction from "../components/AddTransaction";
import IncomeChart from "../components/IncomeChart";


const Income = ({ transactions, setTransactions }) => {
  const incomeList = transactions.filter(t => t.type === "income");

  return (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-6 text-center bg-white py-3 rounded-xl shadow">
  Income
</h2>


    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side – Form + List */}
      <div className="space-y-6">
        <AddTransaction
          transactions={transactions}
          setTransactions={setTransactions}
          fixedType="income"
        />

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Income List</h3>

          {incomeList.map(t => (
            <div
              key={t.id}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>{t.title}</span>
              <span className="text-green-600 font-medium">
                +₹{t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right side – Graph */}
      <IncomeChart incomeList={incomeList} />
    </div>
  </div>
);

};

export default Income;

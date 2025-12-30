import AddTransaction from "../components/AddTransaction";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Expense = ({ transactions, setTransactions }) => {
  const expenseList = transactions.filter((t) => t.type === "expense");

  const chartData = {
    labels: expenseList.map((t) => t.title),
    datasets: [
      {
        label: "Expense Amount",
        data: expenseList.map((t) => t.amount),
        backgroundColor: "#ef4444",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 space-y-8">
      {/* Page Title */}
      <h2 className="text-xl font-bold text-center">Expense</h2>

      {/* Form + Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Expense Form */}
        <div className="bg-white p-6 rounded-xl shadow">
          <AddTransaction
            transactions={transactions}
            setTransactions={setTransactions}
            fixedType="expense"
          />
        </div>

        {/* Expense Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Expense Trend</h3>
          <div className="h-72">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>

      {/* Expense List */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Expense List</h3>

        {expenseList.length === 0 ? (
          <p className="text-gray-500">No expenses added yet</p>
        ) : (
          expenseList.map((t) => (
            <div
              key={t.id}
              className="flex justify-between border-b py-2"
            >
              <span>{t.title}</span>
              <span className="text-red-500">-₹{t.amount}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Expense;

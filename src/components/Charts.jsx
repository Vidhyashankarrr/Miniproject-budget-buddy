import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Charts = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };
 
// Sort transactions by date (old → new)
const sortedTransactions = [...transactions].sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);

// X-axis labels (date)
const labels = sortedTransactions.map(t =>
  new Date(t.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  })
);

// Y-axis values
const trendData = sortedTransactions.map(t =>
  t.type === "expense" ? -t.amount : t.amount
);

  const lineData = {
  labels,
  datasets: [
    {
      label: "Transaction Amount",
      data: trendData,
      borderColor: "#7c3aed",
      backgroundColor: "rgba(124,58,237,0.2)",
      tension: 0.4,
    },
  ],
};

const categoryTotals = {};

transactions.forEach((t) => {
  if (t.type === "expense") {
    categoryTotals[t.category] =
      (categoryTotals[t.category] || 0) + t.amount;
  }
});

const categoryPieData = {
  labels: Object.keys(categoryTotals),
  datasets: [
    {
      data: Object.values(categoryTotals),
      backgroundColor: [
        "#f97316",
        "#ef4444",
        "#3b82f6",
        "#22c55e",
        "#a855f7",
      ],
    },
  ],
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
<div className="bg-white p-6 rounded-xl shadow-sm">
  <h3 className="font-semibold mb-4">Expense by Category</h3>

  {Object.keys(categoryTotals).length > 0 ? (
    <Pie data={categoryPieData} />
  ) : (
    <p className="text-gray-500 text-sm">No expense data</p>
  )}
</div>


      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-4">Transaction Trend</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default Charts;

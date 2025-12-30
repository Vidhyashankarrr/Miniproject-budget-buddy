import { useState } from "react";
import SummaryCards from "../components/SummaryCards";
import AddTransaction from "../components/AddTransaction";
import RecentTransactions from "../components/RecentTransactions";
import Charts from "../components/Charts";
import Sidebar from "../components/Sidebar";
import BudgetTracker from "../components/BudgetTracker";
import Reports from "../components/Reports"; // ✅ Import the Reports component

const Dashboard = ({ transactions, setTransactions }) => {
  const [view, setView] = useState("monthly");

  const now = new Date();

  const filteredTransactions = transactions.filter((t) => {
    const tDate = t.date ? new Date(t.date) : new Date();

    if (view === "monthly") {
      return (
        tDate.getMonth() === now.getMonth() &&
        tDate.getFullYear() === now.getFullYear()
      );
    }

    if (view === "yearly") {
      return tDate.getFullYear() === now.getFullYear();
    }

    return true;
  });

  return (
    <div className="min-h-screen flex"> {/* removed bg-gray-100 */ }
      <Sidebar />

      <div className="flex-1 max-w-6xl mx-auto p-6 space-y-6">

        {/* Toggle */}
        <div className="flex gap-4">
          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-2 rounded ${
              view === "monthly" ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setView("yearly")}
            className={`px-4 py-2 rounded ${
              view === "yearly" ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Summary */}
        <SummaryCards transactions={filteredTransactions} />

        {/* Budget Tracker */}
        <BudgetTracker transactions={filteredTransactions} />

        {/* Reports */}
        <Reports transactions={filteredTransactions} /> {/* ✅ Added Reports here */}

        {/* Form + Recent Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddTransaction
            transactions={transactions}
            setTransactions={setTransactions}
          />
          <RecentTransactions
            transactions={filteredTransactions}
            setTransactions={setTransactions}
          />
        </div>

        {/* Charts */}
        <Charts transactions={filteredTransactions} />

      </div>
    </div>
  );
};

export default Dashboard;


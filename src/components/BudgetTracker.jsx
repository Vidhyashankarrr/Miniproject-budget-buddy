import { useState, useEffect } from "react";

const BudgetTracker = ({ transactions }) => {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) || ""
  );

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  useEffect(() => {
    if (budget !== "") {
      localStorage.setItem("budget", budget);
    }
  }, [budget]);

  const isBudgetSet = budget !== "" && Number(budget) > 0;
  const isExceeded = isBudgetSet && expense > budget;
  const balance = isBudgetSet ? budget - expense : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-3 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-center">
        Monthly Budget
      </h3>

      <input
        type="number"
        placeholder="Enter budget amount"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="border p-2 w-full rounded"
      />

      {isBudgetSet && (
        <>
          <p className="text-sm text-gray-600 text-center">
            Spent: ₹{expense}
          </p>

          <p
            className={`text-center font-semibold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            Balance: ₹{balance}
          </p>
        </>
      )}
<div className="w-full bg-gray-200 rounded h-2">
  <div
    className={`h-2 rounded ${
      expense > budget ? "bg-red-500" : "bg-green-500"
    }`}
    style={{
      width: `${Math.min((expense / budget) * 100, 100)}%`,
    }}
  />
</div>

      {isExceeded && (
        <p className="text-red-600 font-semibold text-center">
          ⚠ Budget Limit Exceeded
        </p>
      )}
    </div>
  );
};

export default BudgetTracker;

import { useState } from "react";

const AddTransaction = ({ transactions, setTransactions, fixedType }) => {
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState(fixedType || "expense"); // local state for type

  const addTransaction = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      title: e.target.title.value,
      amount: Number(e.target.amount.value),
      type: fixedType || type, // use local type if fixedType is not provided
      category,
      date: new Date().toISOString(),
    };

    const updated = [newTransaction, ...transactions];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));

    e.target.reset();
  };

  return (
    <form onSubmit={addTransaction} className="bg-white p-6 rounded shadow">
      <input
        name="title"
        placeholder="Title"
        className="border p-2 w-full mb-3"
        required
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        className="border p-2 w-full mb-3"
        required
      />

      {/* Conditionally render type selector if fixedType is not provided */}
      {!fixedType && (
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full mb-3"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      )}

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-3"
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Salary</option>
        <option>Other</option>
      </select>

      <button className="bg-purple-600 text-white px-6 py-2 rounded">
        Add {fixedType || type}
      </button>
    </form>
  );
};

export default AddTransaction;

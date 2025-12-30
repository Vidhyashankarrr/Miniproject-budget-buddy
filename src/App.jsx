import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Income from "./Pages/income";
import Expense from "./Pages/Expense";
import Login from "./Pages/Login";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-r from-purple-100 via-purple-50 to-white">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard transactions={transactions} setTransactions={setTransactions} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income transactions={transactions} setTransactions={setTransactions} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expense"
          element={
            <ProtectedRoute>
              <Expense transactions={transactions} setTransactions={setTransactions} />
            </ProtectedRoute>
          }
        />
      </Routes>
   </div>
  );
}

export default App;



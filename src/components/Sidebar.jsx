import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const activeClass = "block p-2 bg-purple-600 text-white rounded";
  const normalClass = "block p-2 hover:bg-gray-100 rounded";

  return (
    <div className="w-60 bg-white min-h-screen p-4">
      <h2 className="font-bold text-xl mb-6">Expense Tracker</h2>

      <nav className="space-y-3">
        <Link
          to="/"
          className={location.pathname === "/" ? activeClass : normalClass}
        >
          Dashboard
        </Link>

        <Link
          to="/income"
          className={location.pathname === "/income" ? activeClass : normalClass}
        >
          Income
        </Link>

        <Link
          to="/expense"
          className={location.pathname === "/expense" ? activeClass : normalClass}
        >
          Expense
        </Link>

        {/* Logout aligned like others */}
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="block w-full p-2 text-left text-red-500 hover:bg-red-50 rounded mt-6"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;


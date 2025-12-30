import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  image from "../assets/image.jpg";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) navigate("/"); // Auto-login
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation
    if (!email || !password) return alert("Please enter email and password.");
    
    localStorage.setItem("isLoggedIn", "true");
    navigate("/"); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-100">
      
      {/* Left - Login Form */}
      <div className="flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-purple-600 text-center">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500">Please login to continue</p>

          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="text-purple-600 hover:underline text-sm">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>

      {/* Right - Illustration / Design */}
      <div className="hidden md:flex items-center justify-center bg-purple-50">
        
          <img src={image} alt="Finance Illustration" className="w-3/4" />

      
      </div>
    </div>
  );
};

export default Login;


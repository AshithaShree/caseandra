import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96 relative overflow-hidden">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-700">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 border-b-2 border-gray-300 focus:border-purple-500 focus:outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 border-b-2 border-gray-300 focus:border-purple-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-700 to-pink-600 text-white py-3 rounded-xl font-bold"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-700 font-semibold underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
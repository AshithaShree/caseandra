import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setSuccess("Registration successful! Redirecting...");
      setError("");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96 relative overflow-hidden">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-700">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="p-3 border-b-2 border-gray-300 focus:border-purple-500 focus:outline-none"
            required
          />
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
            Register
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 font-semibold underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
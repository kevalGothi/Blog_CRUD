import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", formData);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login Failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    // 1. OUTER CONTAINER: Peach Gradient & Centering
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300 p-4">
      {/* 2. CARD: Dark background, shadow, rounded corners */}
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-2xl">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400">
            Login to your blog account to continue
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* USERNAME INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Username</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full rounded-xl border-none bg-slate-800 p-4 pr-12 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              {/* Icon */}
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                person
              </span>
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border-none bg-slate-800 p-4 pr-12 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {/* Icon */}
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                lock
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button className="w-full rounded-full bg-cyan-600 py-3 font-bold text-white shadow-lg transition-transform hover:-translate-y-1 hover:bg-cyan-500">
            Sign In
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 flex justify-center gap-2 text-sm text-slate-400">
          <p>Don't have an account?</p>
          <Link
            to="/register"
            className="font-bold text-cyan-500 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

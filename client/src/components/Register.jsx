import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/register", formData);
      alert("Registration Successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center items-center overflow-hidden bg-linear-to-br from-[#ffecd2] to-[#fcb69f] py-6 sm:py-12">
      <div className="relative w-full max-w-120 flex flex-col gap-6 rounded-xl bg-[#121d20] p-6 shadow-2xl sm:p-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight">
            Create Account
          </h1>
          <p className="text-[#657f86] text-sm font-normal">
            Join our community today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <p className="text-white text-base font-medium">Username</p>
            <input
              className="flex w-full rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#2a383b] bg-[#1a2629] h-14 placeholder:text-[#657f86] p-3.75 text-base"
              placeholder="Choose a username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </label>

          <label className="flex flex-col gap-2">
            <p className="text-white text-base font-medium">Password</p>
            <input
              className="flex w-full rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#2a383b] bg-[#1a2629] h-14 placeholder:text-[#657f86] p-3.75 text-base"
              placeholder="Choose a password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>

          <button className="mt-2 flex w-full items-center justify-center rounded-full h-12 bg-primary text-black text-sm font-bold shadow-md hover:-translate-y-1 transition-all">
            Sign Up
          </button>
        </form>

        <div className="flex justify-center items-center gap-2">
          <p className="text-[#657f86] text-sm">Already have an account?</p>
          <Link
            to="/login"
            className="text-primary text-sm font-bold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

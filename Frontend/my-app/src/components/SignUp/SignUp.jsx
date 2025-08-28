"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    income: 0,
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ 
      ...formData,
      [name]: name === "income"? Number(value) : value,
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted:", formData);

  try {
    const response = await axios.post(
      `${API_URL}/api/auth/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if(response.status == 201){
      setFormData({
        username: "",
        email: "",
        income: 0,
        password: "",
      })
      router.push("/login");
      
    }

    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side (illustration) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center">
        <h1 className="text-white text-4xl font-bold px-8 text-center">
          Welcome to Personal Finance Tracker  
          <span className="block text-lg font-light mt-3">
            Track, save, and grow your money with ease.
          </span>
        </h1>
      </div>

      {/* Right side (form) */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-center mt-2 mb-6">
            Start tracking your finances today!
          </p>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Income */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Monthly Income (INR)</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
              min={0}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="25000"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Sign Up
          </button>

          {/* Login link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-500 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}


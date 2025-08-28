"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../Auth/Auth";

export default function LoginPage() {
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data:", formData);

    try {
    const response = await axios.post(
      `${API_URL}/api/auth/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if(response.status == 200){
      storeTokenInLS(response.data.token)
      setFormData({
        email: "",
        password: "",
      })
      router.push("/dashboard");
      
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
          Welcome Back!
          <span className="block text-lg font-light mt-3">
            Log in to track and manage your finances.
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
            Log In
          </h2>
          <p className="text-gray-500 text-center mt-2 mb-6">
            Access your Personal Finance Tracker account
          </p>

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

          {/* Password */}
          <div className="mb-6">
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
            Log In
          </button>

          {/* Signup link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-500 hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}


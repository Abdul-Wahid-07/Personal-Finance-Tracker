"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Auth/Auth";

function Contact() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if(isLoggedIn && user){
      setFormData({
        username: user.username,
        email: user.email,
        message: "",
      });

    }
  }, [user, isLoggedIn]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/contact`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      )

      if(res.status === 200){
        toast.success("Message send successfully");
        setFormData({
          username: user.username || "",
          email: user.email || "",
          message: "",
        })
      }

      console.log("Contact data:", formData); 
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Error sending message");      
    } 
  };

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Page Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have questions or feedback about our Personal Finance Tracker?  
          We’d love to hear from you!
        </p>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" >
              Username
            </label>
            <input
              id="name"
              name="username"
              type="text"
              value={formData.username}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-10 text-center text-gray-600">
          <p>Email: <span className="text-indigo-600">support@financetracker.com</span></p>
          {/* <p>Phone: <span className="text-indigo-600">+91 01010 10101</span></p> */}
        </div>
      </div>
    </main>
  );
}

export default Contact;


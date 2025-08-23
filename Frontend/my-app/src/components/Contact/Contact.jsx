// import React from 'react'


// const Contact = () => {
  //   return (
    //     <>
    //         <h1>Contact Page</h1>
    //     </>
    //   )
    // }
    
    // export default Contact
    
    
"use client"
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact data:", formData);
    alert("Message send successfully")
    // TODO: Connect this to your backend login API
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
          <p>Phone: <span className="text-indigo-600">+91 01010 10101</span></p>
        </div>
      </div>
    </main>
  );
}


"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

export default function Dashboard() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [data, setData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    transactions: [],
    categories: []
  });
  const [form, setForm] = useState({ description: "", amount: "", type: "income", category: "" });
  const [showAll, setShowAll] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/auth/dashboard/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
      // console.log(res.data.transactions);
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/auth/transactions/add`,
        {
          description: form.description,
          amount: Number(form.amount),
          type: form.type,
          category: form.type === "expense" ? form.category : "Income"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ description: "", amount: "", type: "income", category: "" }); // reset form
      fetchData(); // refresh dashboard
    } catch (err) {
      console.error("Error adding transaction:", err.response?.data || err.message);
    }
  };

  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const COLORS = data.categories.map((_, i) => 
    `hsl(${(i * 360) / data.categories.length}, 70%, 50%)`
  );


  return (
    <div className="p-4 md:p-8 grid gap-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-2xl font-bold text-blue-600">₹{data.balance}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold">Income</h2>
          <p className="text-2xl font-bold text-green-600">₹{data.income}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="text-2xl font-bold text-red-600">₹{data.expenses}</p>
        </div>
      </div>

      {/* Add Transaction Form */}
      <div className="bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Add Income / Expense</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="border rounded-xl p-2"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="border rounded-xl p-2"
            min={0}
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded-xl p-2"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {form.type === "expense" && (
            <input
              type="text"
              name="category"
              placeholder="Category (Food, Rent, etc.)"
              value={form.category}
              onChange={handleChange}
              className="border rounded-xl p-2"
            />
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 md:col-span-4"
          >
            Add Transaction
          </button>
        </form>
      </div>

      {/* Chart + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.categories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend with colored dots */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {data.categories.map((cat, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <ul className="space-y-3">
            {(showAll ? data.transactions : data.transactions.slice(0, 5)).length > 0 ? (
              (showAll ? data.transactions : data.transactions.slice(0, 5)).map((t, idx) => (
                <li key={idx} className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">{t.description}</span>
                  <span
                    className={`${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    } font-semibold`}
                  >
                    {t.type === "income" ? "+" : "-"}₹{t.amount}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No transactions found</p>
            )}
          </ul>
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      </div>
    </div>
  );
}

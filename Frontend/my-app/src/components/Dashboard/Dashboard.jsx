"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Auth/Auth";

const Dashboard = () => {

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
  const [username, setUsername] = useState(null);
  const [trendData, setTrendData] = useState([]);

  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/auth/dashboard/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);

      // ✅ Prepare trend data from transactions (group by month from createdAt)
      const grouped = {};
      res.data.transactions.forEach((t) => {
        if (t.type === "expense") {
          if (t.createdAt) {
            const d = new Date(t.createdAt);
            if (!isNaN(d)) {
              // Format as "Aug 2025"
              const month = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
              grouped[month] = (grouped[month] || 0) + t.amount;
            }
          }
        }
      });

      // Convert grouped object into array
      let formatted = Object.keys(grouped).map((month) => {
        // Parse back into Date for sorting
        const [mon, year] = month.split(" ");
        const date = new Date(`${mon} 1, ${year}`);
        return { month, spending: grouped[month], sortDate: date };
      });

      // ✅ Sort chronologically by date
      formatted = formatted.sort((a, b) => a.sortDate - b.sortDate);

      // Remove helper property
      formatted = formatted.map(({ month, spending }) => ({ month, spending }));

      setTrendData(formatted);

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
      const res = await axios.post(
        `${API_URL}/api/auth/transactions/add`,
        {
          description: form.description,
          amount: Number(form.amount),
          type: form.type,
          category: form.type === "expense" ? form.category : "Income"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if(res.status === 201){
        toast.success("Transaction added successfully");
        setForm({ description: "", amount: "", type: "income", category: "" }); // reset form
        fetchData(); // refresh dashboard
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error(err.response?.data?.message || err.response?.data || "Failed to add transaction");
    }
  };

  const COLORS = data.categories.map((_, i) => 
    `hsl(${(i * 360) / data.categories.length}, 70%, 50%)`
  );


  return (
    <div className="p-4 md:p-8 grid gap-6">
      {/* Welcome Header */}
      {username && (
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-blue-600">{username}</span>
        </h1>
      )}
      
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
            min={1}
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded-xl p-2 cursor-pointer"
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
            className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 md:col-span-4 cursor-pointer"
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

        {/* Line Chart for Spending Trends */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Spending Trends Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="spending" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow-lg rounded-2xl p-4 lg:col-span-2">
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
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

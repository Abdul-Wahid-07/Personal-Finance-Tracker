import express from "express";
import Transaction from "../models/Transaction.model.js";
import User from "../models/user.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// get dashboard data
router.route("/").get(authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user for base income
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all transactions of this user
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

    // Base income (set during signup)
    const baseIncome = user.income || 0;

    // Additional income from transactions
    const additionalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    // Expenses from transactions
    const expenses = transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    // Total income = base income + additional incomes
    const totalIncome = baseIncome + additionalIncome;

    // Balance
    const balance = totalIncome - expenses;

    // Group expenses by category
    const categoriesMap = {};
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => {
        categoriesMap[t.category] = (categoriesMap[t.category] || 0) + t.amount;
      });

    const categories = Object.keys(categoriesMap).map(key => ({
      name: key,
      value: categoriesMap[key]
    }));

    res.json({
      balance,
      income: totalIncome,
      baseIncome,       // 👈 also return separately if you want
      additionalIncome, // 👈 also return separately if you want
      expenses,
      transactions: transactions.slice(0, 5), // recent 5
      categories
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard data", error: err.message });
  }
});

export default router;

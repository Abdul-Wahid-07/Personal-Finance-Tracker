import express from "express";
import Transaction from "../models/Transaction.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add new transaction
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { description, amount, type, category } = req.body;

    const newTransaction = new Transaction({
      userId: req.user.userId,
      description,
      amount,
      type,
      category,
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
  } catch (err) {
    res.status(500).json({ message: "Error adding transaction", error: err.message });
  }
});

export default router;

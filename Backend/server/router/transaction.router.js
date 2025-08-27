import express from "express";
import Transaction from "../models/Transaction.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add new transaction
router.route("/").post(authMiddleware, async (req, res) => {
  try {
    const { description, amount, type, category } = req.body;
    const newTransaction = new Transaction({
      userId: req.user.userId,
      description,
      amount,
      type,
      category
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error: error.message });
  }
});

export default router;

import Transaction from "../models/Transaction.model.js";

// Add new transaction
const addTransaction = async (req, res) => {
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
};

export default addTransaction;

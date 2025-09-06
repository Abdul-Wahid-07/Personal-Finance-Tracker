import PDFDocument from "pdfkit";
import path from "path";
import Transaction from "../models/Transaction.model.js";
import User from "../models/user.model.js";

export const generateReport = async (req, res) => {
  try {
    const userId = req.userID;
    if (!userId) {
      return res.status(400).json({ message: "User not found in token" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transactions = await Transaction.find({ userId: userId });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
    doc.pipe(res);

    const fontPath = path.resolve("font/NotoSans-Regular.ttf");
    doc.font(fontPath);

    // Title
    doc.fontSize(20).text("Financial Report", { align: "center" });
    doc.moveDown();

    // User Info
    doc.fontSize(12).text(`User: ${user.username}`);
    doc.text(`Email: ${user.email}`);
    doc.moveDown();

    const default_income = user.income;

    let additionalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    let totalIncome = default_income + additionalIncome;

    let totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    let balance = totalIncome - totalExpense;

    doc.text(`Income: ₹${totalIncome}`);
    doc.text(`Expense: ₹${totalExpense}`);
    doc.text(`Balance: ₹${balance}`);
    doc.moveDown();

    // Transactions
    doc.fontSize(14).text("Transactions:", { underline: true });
    doc.moveDown();

    transactions.forEach((t, i) => {
      doc.fontSize(12).text(
        `${i + 1}. ${t.description} => ${
          t.type === "income" ? "+" : "-"
        } ₹${t.amount} (${new Date(t.createdAt).toLocaleDateString()})`
      );
    });

    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Error generating PDF", error: error.message });
    }
  }
};

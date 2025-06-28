import express, { Request, Response } from "express";
import Transaction from "../models/Transaction";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// GET /api/transactions - Get all transactions for the logged-in user
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// GET /api/overview
router.get("/overview", verifyToken, async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const transactions = await Transaction.find({ userId });

  const monthlyData: { [key: string]: { income: number; expenses: number } } = {};

  transactions.forEach((txn) => {
    const date = new Date(txn.date);
    const month = date.toLocaleString("default", { month: "short" }); // "Jan", "Feb", etc.

    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expenses: 0 };
    }

    if (txn.type === "Income") {
      monthlyData[month].income += txn.amount;
    } else if (txn.type === "Expense") {
      monthlyData[month].expenses += txn.amount;
    }
  });

  const formatted = Object.keys(monthlyData).map((month) => ({
    month,
    ...monthlyData[month],
  }));

  res.json(formatted);
});


export default router;

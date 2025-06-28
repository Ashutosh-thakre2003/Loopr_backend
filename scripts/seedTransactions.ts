import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Transaction from "D:/loopr/backend/src/models/Transaction";
import { MONGO_URI } from "D:/loopr/backend/src/config";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    const userId = "685c428ac6f8247618590e58"; // Replace with your real user _id

    const filePath = path.join(__dirname, "../data/transactions.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const transactions = JSON.parse(rawData);

    const updatedTransactions = transactions.map((txn: any) => {
      // Auto infer type from category
      const type = txn.category === "Income" ? "Income" : "Expense";

      return {
        ...txn,
        userId: new mongoose.Types.ObjectId(userId),
        type,
      };
    });

    await Transaction.deleteMany({});
    await Transaction.insertMany(updatedTransactions);

    console.log("✅ Transactions seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seed();

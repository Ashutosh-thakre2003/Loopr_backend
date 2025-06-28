import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Paid", "Pending", "Failed"],
    required: true
  },
  type :{
    type:String,
    enum: ["Income", "Expense"],
    required: true
  },
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

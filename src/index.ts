import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URI, PORT } from "./config";
import authRoutes from "./routes/auth";
import transactionRoutes from "./routes/transactions";
import overviewRoutes from "./routes/transactions";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", overviewRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB error:", err));

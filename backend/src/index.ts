import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import authRoutes from "./routes/authroutes";
import projectRoutes from "./routes/projectRoutes";
import userRoutes from "./routes/userRoutes";
import customerRoutes from "./routes/customerRoutes"; // Add this import

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes); // Add this line

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => console.log("Server running..."));
  })
  .catch((err) => console.log(err));

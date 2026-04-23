const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ==========================
// Middleware
// ==========================
app.use(express.json());
app.use(cors({
  origin: "*", // you can restrict later to frontend URL
}));

// ==========================
// Routes
// ==========================
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", expenseRoutes);

// ==========================
// Test Route
// ==========================
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ==========================
// DB Connection
// ==========================
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
    process.exit(1); // stop server if DB fails
  });

// ==========================
// Start Server (Render safe)
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// 🔹 Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const caseRoutes = require("./routes/caseRoutes");

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cases", caseRoutes);

// 🔹 Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// 🔹 Connect MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/caseio";
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// 🔹 Listen on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
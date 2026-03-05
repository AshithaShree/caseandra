const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ Needed to serve React build

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const caseRoutes = require("./routes/caseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 API Routes
app.use("/api/auth", authRoutes);     // login/register
app.use("/api/users", userRoutes);    // user profile/favourites
app.use("/api/cases", caseRoutes);    // case studies

// 🔹 Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// 🔹 Connect MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/caseio")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// 🔹 Listen on PORT (use environment variable for deployment)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
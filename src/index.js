// Load env variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ SIMPLE CORS - REPLACE YOUR CURRENT CORS WITH THIS
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (uploads folder)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/files", require("./routes/files"));
app.use("/api/ai", require("./routes/ai"));  

// ✅ Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Backend is running",
    timestamp: new Date().toISOString()
  });
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

// ✅ Server Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { 
  console.log(`🚀 Backend running on port ${PORT}`);
});
const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all registered users
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({}, "name email"); // only name & email return
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;

const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();
router.use(auth);

// Debug log
router.use((req, res, next) => {
  console.log("🟢 Task Route Hit:", req.method, req.originalUrl);
  next();
});

// 👉 Create Task
router.post("/", async (req, res) => {
  try {
    const { title, description, status, completed } = req.body;
    const task = await Task.create({
      title,
      description,
      status: status || "On Track",
      completed: completed || false,
      owner: req.userId,   // ✅ Logged in user set
    });
    console.log("✅ Task Created:", task._id, "Owner:", task.owner);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 👉 Get all tasks for logged in user
router.get("/", async (req, res) => {
  try {
    const owned = await Task.find({ owner: req.userId });
    res.json({ owned });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// 👉 Update Task
router.put("/:id", async (req, res) => {
  try {
    console.log("✏️ Update Task ID:", req.params.id);
    const task = await Task.findById(req.params.id);
    console.log("👉 Task from DB:", task);

    if (!task) return res.status(404).json({ error: "Task not found" });
    if (task.owner.toString() !== req.userId)
      return res.status(403).json({ error: "Not authorized" });

    const { title, description, status, completed } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.completed = completed ?? task.completed;

    await task.save();
    res.json({ message: "Task updated", task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 👉 Delete Task
router.delete("/:id", async (req, res) => {
  try {
    console.log("🗑️ Delete Task ID:", req.params.id);
    const task = await Task.findById(req.params.id);
    console.log("👉 Task from DB:", task);

    if (!task) return res.status(404).json({ error: "Task not found" });
    if (task.owner.toString() !== req.userId)
      return res.status(403).json({ error: "Not authorized" });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

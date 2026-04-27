const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = express.Router();
//create
router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    user: req.user,
    title: req.body.title,
  });
  res.json(task);
});

// GET 
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.user.toString() !== req.user) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.user.toString() !== req.user) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
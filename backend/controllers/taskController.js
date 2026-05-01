const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;

    const task = await Task.create({
      title,
      projectId,
      assignedTo,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Task creation failed" });
  }
};

// GET TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Fetching tasks failed" });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status, comment },
      { returnDocument: "after" } // fixed warning
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
const Project = require("../models/Project");
const Task = require("../models/Task");

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    const { title, createdBy } = req.body;

    const project = await Project.create({
      title,
      createdBy,
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Project creation failed" });
  }
};

// GET ALL PROJECTS (NEW)
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Fetching projects failed" });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // delete project
    await Project.findByIdAndDelete(id);

    // delete all tasks under this project
    await Task.deleteMany({ projectId: id });

    res.json({ message: "Project and its tasks deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = { createProject, getProjects, deleteProject };
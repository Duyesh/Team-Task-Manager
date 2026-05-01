const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  deleteProject
} = require("../controllers/projectController");

router.post("/create", createProject);
router.get("/", getProjects);

// NEW
router.delete("/delete/:id", deleteProject);

module.exports = router;
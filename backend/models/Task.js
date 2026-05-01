const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    comment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
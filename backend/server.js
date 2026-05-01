const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// load env variables
dotenv.config();

// connect database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
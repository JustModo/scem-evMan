const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

const { connectDB } = require("./controllers/dbCon");

// const compRoutes = require("./routes/compilerRoutes");
const testRoutes = require("./routes/contestRoutes");
const adminRoutes = require("./routes/adminRoutes");


const port = process.env.PORT || 8080;

// Connect to Database
connectDB();

// Initialize Cron Jobs
const initCron = require("./services/cron");
initCron();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SOSCEvMan API is running...");
});

// Routes

// Compiler Routes
// app.use("/cmp", compRoutes); 

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/test", testRoutes);

const submitRoutes = require("./routes/submitRoutes");
app.use("/api/submit", submitRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

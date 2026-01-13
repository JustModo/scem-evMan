const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

const { connectDB } = require("./controllers/dbCon");

// const compRoutes = require("./routes/compilerRoutes");
const testRoutes = require("./routes/contestRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dataRoutes = require("./routes/dataRoutes");

const port = process.env.PORT || 8080;

// Connect to Database
connectDB();

// Initialize Cron Jobs
const initCron = require("./services/cron");
initCron();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SOSCEvMan API is running...");
});

// Routes

// Compiler Routes
// app.use("/cmp", compRoutes); 

const authRoutes = require("./routes/authRoutes");
const testAccessRoutes = require('./routes/testAccessRoutes');
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/data", dataRoutes);

app.use("/api/test", testRoutes);
app.use("/api/test-access", testAccessRoutes);

const submitRoutes = require("./routes/submitRoutes");
app.use("/api/submit", submitRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express();
const compRoutes = require('./routes/compilerRoutes');
const testRoutes = require('./routes/contestRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('./controllers/userCon')
const { connectDB } = require('./controllers/dbCon');

const port = process.env.PORT || 8080;

// Connect to Database
connectDB();

// Initialize Cron Jobs
const initCron = require('./services/cron');
initCron();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send("SOSCEvMan API is running...") });

// Mount Routes
app.use('/cmp', compRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/data', require('./routes/dataRoutes'));
app.use('/api', testRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

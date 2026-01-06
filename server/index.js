const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express();
const compRoutes = require('./routes/compilerRoutes');
const testRoutes = require('./routes/contestRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { connectDB } = require('./controllers/dbCon');
connectDB();
require('./controllers/userCon')
const port = process.env.PORT || 8080;
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => { res.send("SOSCEvMan API is running...") })
app.use('/cmp', compRoutes);
app.use('/contest', testRoutes);
app.use('/api/admin', adminRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

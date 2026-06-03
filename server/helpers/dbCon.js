const mongoose = require('mongoose');
const { runMigrations } = require('../migrations/runner');

let isCon = false;
const connectDB = async () => {
  if (isCon) {
    return;
  }
  try {
    console.log(`Connecting to MongoDB at ${process.env.MONGODB_URI}...`);
    await mongoose.connect(process.env.MONGODB_URI);
    isCon = true;
    console.log('Conencted to MongoDB');

    // Run pending schema migrations
    await runMigrations();
  } catch (error) {
    console.error('MongoDB connection or migration error:', error);
    throw new Error('Failed to connect to MongoDB or run migrations');
  }
};

module.exports = { connectDB };

const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  try {
    const clerkUserId = req.auth?.userId;

    if (!clerkUserId) {
      return res.status(401).json({ message: 'Unauthorized: No Clerk user ID found' });
    }

    const user = await User.findOne({ clerkId: clerkUserId });

    if (!user) {
      return res.status(404).json({ message: 'User not found in database' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access only' });
    }

    next();
  } catch (error) {
    console.error('isAdmin Middleware Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = isAdmin;

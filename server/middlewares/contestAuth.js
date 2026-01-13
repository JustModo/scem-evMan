const Contest = require('../models/Contest');
const User = require('../models/User');
const { jwtVerify } = require('jose');

//IDENTITY CHECK (protect) Verifies the Next-Auth badge (JWT)//
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.headers.cookie) {
      const cookies = Object.fromEntries(
        req.headers.cookie.split("; ").map(c => c.split("="))
      );

      token =
        cookies["next-auth.session-token"] ||
        cookies["__Secure-next-auth.session-token"];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing"
      });
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

    const { payload } = await jwtVerify(token, secret);

    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired"
    });
  }
};

//PERMISSION CHECK (isContestActive)
const isContestActive = async (req, res, next) => {
    try {
        const contestId = req.params.id || req.body.contestId;
        
        
        const userId = req.user?._id || req.user?.id; 

        if (!contestId) {
            return res.status(400).json({ success: false, message: 'Contest ID is required' });
        }

        // Fetching data from MongoDB using the internal MongoDB ID
        const [contest, user] = await Promise.all([
            Contest.findById(contestId),
            User.findById(userId) // findById(userId) 
        ]);

        if (!contest) return res.status(404).json({ success: false, message: 'Contest not found' });
        if (!user) return res.status(404).json({ success: false, message: 'User profile not found' });

        const now = new Date();
        const end = new Date(contest.endTime);

        // Logic Check A: Contest already finished?
        if (now > end) {
            return res.status(403).json({ success: false, message: 'This contest has already ended.' });
        }

        // Logic Check B: Anti-Cheating (Violation Limit)
        if (contest.violations?.length > 0) {
            const userViolations = contest.violations.filter(
                v => v.user.toString() === user._id.toString()
            );
            if (userViolations.length >= 3) {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Access denied: Maximum violations exceeded.' 
                });
            }
        }

        // Pass the updated objects to the controller
        req.contest = contest;
        req.userProfile = user; // Renamed to avoid confusion with req.user (token)

        next();
    } catch (error) {
        console.error("Permission Error:", error.message);
        res.status(500).json({ success: false, message: 'Security check failed', error: error.message });
    }
};

module.exports = { protect, isContestActive };
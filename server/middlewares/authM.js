// const {requireAuth}=require('@clerk/express');
// const options={signInUrl: process.env.CLERK_SIGN_IN_URL}

// TEMPORARY: Bypass Auth for Debugging
const requireAuth = () => (req, res, next) => {
    console.log(`[Auth Bypass] Request to ${req.path}`);
    req.auth = { userId: "debug-user-id" }; // Mock generic user
    next();
};

const options = {};

module.exports = { requireAuth, options };
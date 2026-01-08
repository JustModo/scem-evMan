// const {requireAuth}=require('@clerk/express');
// const options={signInUrl: process.env.CLERK_SIGN_IN_URL}

const requireAuth = () => (req, res, next) => {
  console.log(`[Auth Bypass] Request to ${req.path}`);

  // TODO: Query ClerkJs, Fetch userId,
  req.auth = { userId: "debug-user-id" };
  next();
};

module.exports = { requireAuth };

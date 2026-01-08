const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataCon");
const { requireAuth } = require("../middlewares/checkAuth");

// Generic Data Endpoint (Option 1)
// Protected by Auth
router.post("/", requireAuth(), controller.getData);
router.post("/one", requireAuth(), controller.getOne);

module.exports = router;

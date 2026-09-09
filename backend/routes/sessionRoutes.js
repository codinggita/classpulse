// Session Routes - /api/sessions endpoints
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createSession,
  joinSession,
  endSession,
} = require("../controllers/sessionController");

// Teacher creates a new session
router.post("/", authMiddleware, createSession);

// Student joins an active session by code (Public)
router.post("/join", joinSession);

// Teacher ends an active session
router.post("/:sessionId/end", authMiddleware, endSession);

module.exports = router;

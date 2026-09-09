// Session Service - business logic for session lifecycle management
// Session Routes - /api/sessions endpoints
const Session = require("../models/Session");

const createSession = async (userId) => {
  
  const code = Math.floor(1000 + Math.random() * 9000).toString();

  const session = await Session.create({
    code,
    createdBy: userId,
    isActive: true,
  });
  return session;
};

const joinSession = async ({ code }) => {
  if (!code) {
    throw new Error("Session code is required");
  }
  const session = await Session.findOne({ code: code.toString() });
  if (!session) {
    throw new Error("Invalid session code");
  }
  if (!session.isActive) {
    throw new Error("This session has ended");
  }
  return {
    _id: session._id,
    code: session.code,
    isActive: session.isActive,
  };
};


const endSession = async (sessionId, userId) => {
  const session = await Session.findById(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  // Ensure only the teacher who created the session can end it
  if (session.createdBy.toString() !== userId.toString()) {
    throw new Error("Not authorized to end this session");
  }

  if (!session.isActive) {
    throw new Error("Session is already closed");
  }

  session.isActive = false;
  await session.save();

  return session;
};

module.exports = {
  createSession,
  joinSession,
  endSession,
};

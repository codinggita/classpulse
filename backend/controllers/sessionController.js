// Session Controller - handles session creation, join, and end HTTP concerns
const sessionService = require("../services/sessionService");

const createSession = async (req, res, next) => {
  try {
    const session = await sessionService.createSession(req.user.id);

    res.status(201).json({
      success: true,
      message: "Session created successfully",
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

const joinSession = async (req, res, next) => {
  try {
    const session = await sessionService.joinSession({ code: req.body.code });

    res.status(200).json({
      success: true,
      message: "Joined session successfully",
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

const endSession = async (req, res, next) => {
  try {
    const session = await sessionService.endSession(req.params.sessionId, req.user.id);

    res.status(200).json({
      success: true,
      message: "Session ended successfully",
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSession,
  joinSession,
  endSession,
};

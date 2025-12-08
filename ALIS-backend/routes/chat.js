// ALIS-backend/routes/chat.js
import express from "express";
import { groqChat } from "../services/groqService.js";

const router = express.Router();

// POST /api/chat
router.post("/", async (req, res) => {
  try {
    const { message, sessionId, user } = req.body || {};

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    // If GROQ key missing → safe fallback
    if (!process.env.GROQ_API_KEY) {
      return res.json({
        success: true,
        reply: "No response",
        agent: "ALIS",
      });
    }

    // Call Groq Llama model
    const replyText = await groqChat(message);

    return res.json({
      success: true,
      reply: replyText,
      agent: "ALIS",
      sessionId: sessionId || Date.now().toString(),
      user,
    });
  } catch (err) {
    console.error("Chat error:", err);

    return res.status(500).json({
      success: false,
      reply: "Error processing message",
      agent: "ALIS",
    });
  }
});

export default router;

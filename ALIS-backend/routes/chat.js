// routes/chat.js
import express from "express";
import { groqChat } from "../services/groqService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const message = req.body.message || "";
    if (!message.trim()) {
      return res.status(400).json({ success: false, error: "Message required" });
    }

    const reply = await groqChat(message);

    return res.json({
      success: true,
      agent: "ALIS",
      sessionId: Date.now().toString(),
      reply,
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return res.status(500).json({
      success: false,
      agent: "ALIS",
      reply: "Server error",
    });
  }
});

export default router;

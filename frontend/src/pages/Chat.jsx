import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/motionVariants";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: "bot", agent: "ALIS", text: "Hello! How can I assist you today?" },
  ]);

  const [input, setInput] = useState("");
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const text = input;
    setInput("");

    try {
      const res = await axios.post(`${API_BASE}/api/chat`, { message: text });

      if (res.data.reply) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", agent: res.data.agent, text: res.data.reply },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Error processing message." },
      ]);
    }
  }

  return (
    <div className="page container mx-auto px-6">
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-4xl font-bold text-white mb-6"
      >
        AI Chat
      </motion.h1>

      <div className="glass p-6 rounded-3xl">
        <div className="chat-window" ref={chatRef}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`msg msg-bubble ${
                  m.from === "user" ? "msg-user" : "msg-bot"
                }`}
              >
                {m.agent && (
                  <div className="agent-tag">{m.agent}</div>
                )}
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <input
            className="input"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

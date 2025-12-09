// src/pages/Chat.jsx
import React, { useState, useEffect } from "react";
import ChatInput from "../components/ChatInput"; // adjust path if needed
import MessageBubble from "../components/MessageBubble";
import QuickActions from "../components/QuickActions";
import { setPageBackground } from "../utils/backgroundController";

export default function Chat() {
  useEffect(() => {
    setPageBackground("/chat");
  }, []);

  const [messages, setMessages] = useState([
    { id: 1, from: "ALIS", text: "Welcome to ALIS. Ask about loans, upload salary slip, or type PAN." }
  ]);

  // placeholder send handler — replace with your API call
  async function handleSend(text) {
    // push user's message locally
    setMessages((m) => [...m, { id: Date.now(), from: "User", text }]);
    // call API and push reply (example)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages((m) => [...m, { id: Date.now() + 1, from: "ALIS", text: data.reply || "No response" }]);
    } catch (e) {
      setMessages((m) => [...m, { id: Date.now() + 1, from: "ALIS", text: "Error contacting server" }]);
    }
  }

  return (
    <div className="page relative overflow-hidden">
      <div className="container mx-auto px-6 pt-10 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-4">AI Chat</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat column */}
          <div className="md:col-span-2">
            <div className="bg-black/40 rounded-xl p-4 h-[60vh] overflow-y-auto">
              {messages.map((m) => (
                <MessageBubble key={m.id} from={m.from} text={m.text} />
              ))}
            </div>

            <div className="mt-4">
              <ChatInput onSend={handleSend} />
            </div>
          </div>

          {/* Right column: quick actions & tips */}
          <div className="md:col-span-1">
            <div className="bg-black/40 rounded-xl p-4 mb-4">
              <h3 className="text-sm text-white/80">Quick Actions</h3>
              <QuickActions />
            </div>

            <div className="bg-black/30 rounded-xl p-4">
              <div className="text-sm text-white/70">Tips</div>

              {/* IMPORTANT: use &lt; &gt; or <code> to avoid JSX parsing */}
              <ul className="text-white/60 mt-2 text-sm list-inside list-disc space-y-1">
                <li>Use <code>type: loan / PAN &lt;PAN&gt; / salary &lt;amount&gt;</code> for quick flow.</li>
                <li>Upload a salary slip to get underwrite suggestions.</li>
                <li>Click Demo Loan to see a sample sanction flow.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

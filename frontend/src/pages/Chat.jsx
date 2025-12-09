// src/pages/Chat.jsx
import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import QuickActions from "../components/QuickActions";
import { motion } from "framer-motion";

export default function Chat(){
  const [messages, setMessages] = useState([
    { id:1, from:"bot", text:"Welcome to ALIS. Ask about loans, upload salary slip, or type PAN." }
  ]);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef();

  useEffect(()=>{
    // scroll to bottom
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text){
    const userMsg = { id: Date.now()+1, from: "user", text };
    setMessages(m=>[...m, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      const reply = data?.reply || "No response";
      setMessages(m => [...m, { id: Date.now()+2, from: "bot", text: reply }]);
    } catch (e) {
      setMessages(m => [...m, { id: Date.now()+2, from: "bot", text: "Something went wrong while contacting the agent." }]);
    } finally {
      setLoading(false);
    }
  }

  const demoLoan = () => sendMessage("type: loan / PAN ABXXXX1234 / salary 40000 / sanction");
  const demoPAN = () => sendMessage("What's a PAN? show example ABCPD1234F");
  const upload = () => alert("Upload UI not implemented in this small package — your existing upload endpoint will work here.");

  return (
    <div className="page container-page relative px-4 py-6">
      <h2 className="text-3xl font-bold mb-6">AI Chat</h2>

      <div className="chat-shell">
        <div className="glass p-4">
          <div className="messages" ref={boxRef}>
            {messages.map(m => <MessageBubble key={m.id} from={m.from} text={m.text} />)}
            {loading && <div className="msg bot">ALIS is typing…</div>}
          </div>

          <div className="mt-4">
            <ChatInput onSend={sendMessage} />
          </div>
        </div>

        <div>
          <QuickActions onDemoLoan={demoLoan} onDemoPAN={demoPAN} onUpload={upload} />
          <div className="glass p-4 mt-4 neon-soft">
            <div className="text-sm text-white/70">Tips</div>
            <ul className="text-white/60 mt-2 text-sm">
              <li>• Use `type: loan / PAN <PAN> / salary <amount>` for quick flow.</li>
              <li>• Upload a salary slip to get underwrite suggestions.</li>
              <li>• Click Demo Loan to see a sample sanction flow.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
        }

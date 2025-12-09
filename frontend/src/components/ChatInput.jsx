// src/components/ChatInput.jsx
import React, { useState } from "react";

export default function ChatInput({ onSend }) {
  const [val, setVal] = useState("");

  const submit = (e) => {
    e?.preventDefault();
    const trimmed = val.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setVal("");
  };

  return (
    <form className="chat-input" onSubmit={submit}>
      <input
        className="flex-1 bg-transparent outline-none text-white/90 placeholder-white/40 px-3 py-2 rounded-md"
        placeholder="Type a message, upload salary slip, or try: type: loan / PAN AB1234F / salary 50000"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button type="submit" className="btn-glow">Send</button>
    </form>
  );
}

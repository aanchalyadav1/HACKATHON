// src/components/MessageBubble.jsx
import React from "react";

export default function MessageBubble({ from = "bot", text }) {
  const cls = from === "user" ? "msg user" : "msg bot";
  return (
    <div className={cls}>
      {from === "bot" && <div style={{fontSize:".72rem", color:"#9fb7d7", marginBottom:6}}>ALIS</div>}
      <div style={{whiteSpace: "pre-wrap"}}>{text}</div>
    </div>
  );
}

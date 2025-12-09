import React from 'react';
export default function ChatBubble({ from='bot', agent, children }) {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems: from==='user' ? 'flex-end' : 'flex-start' }}>
      <div className={`msg-bubble ${from==='user' ? 'msg-user' : 'msg-bot'}`} style={{maxWidth:'84%'}}>
        {agent && <div style={{fontSize:11, color:'var(--muted)', marginBottom:6}}>{agent}</div>}
        {children}
      </div>
    </div>
  );
}

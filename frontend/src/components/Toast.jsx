import React from 'react';
export default function Toast({ text }) {
  return (
    <div style={{position:'fixed', right:20, top:20, zIndex:9999}}>
      <div className="card p-3" style={{background:'rgba(0,0,0,0.6)'}}>{text}</div>
    </div>
  );
}

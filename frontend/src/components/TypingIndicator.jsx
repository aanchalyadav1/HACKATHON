import React from 'react';

export default function TypingIndicator(){
  return (
    <div style={{display:'flex',alignItems:'center',gap:6}}>
      <div style={{width:8,height:8,borderRadius:99,background:'#9ee0ff',opacity:0.9}}></div>
      <div style={{width:8,height:8,borderRadius:99,background:'#9ee0ff',opacity:0.6}}></div>
      <div style={{width:8,height:8,borderRadius:99,background:'#9ee0ff',opacity:0.4}}></div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero(){
  const nav = useNavigate();
  return (
    <div className="container hero py-10">
      <div className="card flex gap-8 items-center p-8" style={{overflow:'hidden'}}>
        <div style={{flex:1}}>
          <motion.h1 initial={{x:-40,opacity:0}} animate={{x:0,opacity:1}} className="hero-title">ALIS — <span style={{color:'var(--neon)'}}>Agentic Loan</span> Intelligence System</motion.h1>
          <p className="hero-lead">AI-powered multi-agent assistant for verification, underwriting & instant sanction letters — built for micro & retail lending in India.</p>

          <div className="mt-6 flex gap-3">
            <button className="btn" onClick={()=>nav('/chat')}>Start AI Chat</button>
            <button className="btn-ghost" onClick={()=>nav('/about')}>Learn More</button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="card p-4">
              <div style={{fontWeight:800}}>⚡ Fast Verification</div>
              <div style={{color:'var(--muted)'}}>PAN & salary slip checks — automated & auditable.</div>
            </div>
            <div className="card p-4">
              <div style={{fontWeight:800}}>🧠 Smart Underwriting</div>
              <div style={{color:'var(--muted)'}}>Scoring tuned for Indian salary ranges & MSME needs.</div>
            </div>
            <div className="card p-4">
              <div style={{fontWeight:800}}>📄 Instant Sanctions</div>
              <div style={{color:'var(--muted)'}}>Download brandable sanction PDFs.</div>
            </div>
          </div>
        </div>

        <div style={{width:380}} className="hidden md:block">
          <div style={{position:'relative'}}>
            <img src="/br/robot_bg.jpg" alt="robot" style={{width:'100%', borderRadius:12}}/>
            <div style={{position:'absolute', left:12, top:12}}><img src="/team_logo.png" style={{height:44}}/></div>
          </div>
        </div>
      </div>
    </div>
  );
}

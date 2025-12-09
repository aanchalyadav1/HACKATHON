import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar(){
  const loc = useLocation();
  return (
    <nav style={{background:'rgba(0,0,0,0.35)', borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img src="/team_logo.png" alt="logo" style={{height:36, borderRadius:8}}/>
          <div>
            <div style={{fontWeight:800}}>ALIS</div>
            <div style={{color:'var(--muted)', fontSize:12}}>VisionCoders</div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Link to="/" className={loc.pathname==='/' ? 'text-neon font-semibold' : ''}>Home</Link>
          <Link to="/chat" className={loc.pathname==='/chat' ? 'text-neon font-semibold' : ''}>Chat</Link>
          <Link to="/dashboard" className={loc.pathname==='/dashboard' ? 'text-neon font-semibold' : ''}>Dashboard</Link>
          <Link to="/about" className={loc.pathname==='/about' ? 'text-neon font-semibold' : ''}>About</Link>
          <Link to="/login" className="btn-ghost">Login</Link>
        </div>
      </div>
    </nav>
  );
}

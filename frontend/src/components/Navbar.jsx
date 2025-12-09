// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(){
  const loc = useLocation();
  const navClass = (p) => (loc.pathname === p ? "text-neon active" : "text-white/70 hover:text-white");

  return (
    <header className="site-nav glass">
      <div className="flex items-center gap-3">
        <img src="/team_logo.png" alt="logo" className="w-10 h-10 rounded-md object-contain" />
        <div className="text-white/90 font-semibold">ALIS</div>
        <div className="text-sm text-white/40 ml-1">VisionCoders</div>
      </div>

      <nav className="ml-auto hidden md:flex gap-5 items-center">
        <Link to="/" className={navClass('/')}>Home</Link>
        <Link to="/chat" className={navClass('/chat')}>Chat</Link>
        <Link to="/dashboard" className={navClass('/dashboard')}>Dashboard</Link>
        <Link to="/about" className={navClass('/about')}>About</Link>
        <Link to="/login" className="ml-6">
          <button className="btn-glow">Login</button>
        </Link>
      </nav>

      {/* mobile minimal nav */}
      <div className="md:hidden ml-auto">
        <Link to="/chat" className="text-white/70 px-3 py-2 rounded-md bg-transparent">Chat</Link>
      </div>
    </header>
  );
}

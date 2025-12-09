// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing(){
  const nav = useNavigate();

  return (
    <div className="page container-page px-4 py-16">
      <div className="max-w-3xl">
        <motion.h1
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          ALIS — <span style={{background:"linear-gradient(90deg,#00C2FF,#7b6bff)", WebkitBackgroundClip:"text", color:"transparent"}}>Agentic Loan</span>
          <br/> Intelligence System
        </motion.h1>

        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}} className="mt-4 text-white/75">
          AI-powered multi-agent orchestration for fast verification, practical underwriting,
          and downloadable sanction letters — purpose-built for India’s micro & retail lending.
        </motion.p>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.25}} className="flex gap-4 mt-8">
          <button className="btn-glow" onClick={()=>nav('/chat')}>Start AI Chat</button>
          <button className="btn-ghost" onClick={()=>nav('/about')}>Learn More</button>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <div className="card-hero neon-soft">
          <h3 className="font-semibold text-lg">⚡ Fast Verification</h3>
          <p className="text-white/70 mt-2">PAN & salary slip verification in seconds using multi-agent pipelines.</p>
        </div>
        <div className="card-hero neon-soft">
          <h3 className="font-semibold text-lg">🤖 Smart Underwriting</h3>
          <p className="text-white/70 mt-2">Scoring tuned for Indian salary ranges and MSME needs.</p>
        </div>
        <div className="card-hero neon-soft">
          <h3 className="font-semibold text-lg">📄 Sanction Letters</h3>
          <p className="text-white/70 mt-2">Download branded sanction PDFs instantly for approvals & records.</p>
        </div>
      </div>
    </div>
  );
}

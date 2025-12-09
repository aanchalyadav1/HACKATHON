// src/pages/About.jsx
import React from "react";

export default function About(){
  return (
    <div className="page container-page px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">About ALIS</h2>

      <div className="glass p-6 neon-soft">
        <p className="text-white/80">
          ALIS is a next-generation AI-powered multi-agent system built for fast, fair and auditable loan decisioning in India.
          We combine document verification, practical underwriting models and branded sanction letter generation into a single workflow.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div>
            <h4 className="font-semibold">Mission</h4>
            <p className="text-white/70 text-sm mt-1">Make small-ticket lending faster, more accurate and auditable for partners.</p>
          </div>
          <div>
            <h4 className="font-semibold">Built With</h4>
            <p className="text-white/70 text-sm mt-1">React, Tailwind, Node.js, Firebase, Groq (LLM), PDFKit</p>
          </div>
          <div>
            <h4 className="font-semibold">Team</h4>
            <p className="text-white/70 text-sm mt-1">VisionCoders — Aanchal & contributors</p>
          </div>
        </div>
      </div>
    </div>
  );
}

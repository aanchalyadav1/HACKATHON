// src/components/QuickActions.jsx
import React from "react";

export default function QuickActions({ onDemoLoan, onDemoPAN, onUpload }) {
  return (
    <div className="glass p-4 neon-soft">
      <div className="text-sm text-white/70 mb-3">Quick Actions</div>
      <div className="quick-actions">
        <button className="btn btn-glow" onClick={onDemoLoan}>Demo Loan</button>
        <button className="btn btn-glow" onClick={onDemoPAN}>Demo PAN</button>
        <button className="btn btn-ghost" onClick={onUpload}>Upload Salary</button>
        <button className="btn-ghost" style={{opacity:.9}}>Download Sanction</button>
      </div>
    </div>
  );
}

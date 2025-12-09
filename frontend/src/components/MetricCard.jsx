// src/components/MetricCard.jsx
import React from "react";
export default function MetricCard({ value, label }) {
  return (
    <div className="metric">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-white/60">{label}</div>
    </div>
  );
}

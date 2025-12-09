import React from 'react';
export default function StatCard({ title, value }) {
  return (
    <div className="card p-4">
      <div style={{fontWeight:800, fontSize:22}}>{value}</div>
      <div style={{color:'var(--muted)'}}>{title}</div>
    </div>
  );
}

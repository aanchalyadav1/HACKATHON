// src/components/CardHero.jsx
import React from "react";
export default function CardHero({ title, children }) {
  return (
    <div className="card-hero neon-soft">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-white/70 mt-2">{children}</p>
    </div>
  );
}

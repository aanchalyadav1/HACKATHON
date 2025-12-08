import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Dashboard() {
  const [stats, setStats] = useState({ sessions: 0, uploads: 0 });

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/admin/stats`)
      .then((r) => setStats(r.data))
      .catch(() => {});
  }, []);

  return (
    <div className="page container mx-auto px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl text-white font-semibold mb-6"
      >
        Dashboard
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="text-4xl text-white">{stats.sessions}</div>
          <p className="text-white/70">Active Sessions</p>
        </div>

        <div className="card">
          <div className="text-4xl text-white">{stats.uploads}</div>
          <p className="text-white/70">Uploaded Salary Slips</p>
        </div>

        <div className="card">
          <div className="text-4xl text-white">₹5k+</div>
          <p className="text-white/70">Typical Loan Range</p>
        </div>
      </div>
    </div>
  );
}

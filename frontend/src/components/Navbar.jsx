import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const loc = useLocation();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10"
    >
      <div className="container mx-auto px-6 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src="/team_logo.png" className="w-10 h-10" />
          <div className="text-white font-bold text-lg">ALIS</div>
        </Link>

        <div className="flex gap-6">
          {["/", "/chat", "/dashboard", "/about"].map((p) => (
            <Link
              key={p}
              to={p}
              className={`text-white/80 hover:text-white transition ${
                loc.pathname === p ? "text-blue-400" : ""
              }`}
            >
              {p === "/" ? "Home" : p.replace("/", "").toUpperCase()}
            </Link>
          ))}

          <Link
            to="/login"
            className="px-4 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

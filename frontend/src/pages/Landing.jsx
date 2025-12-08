import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeUp, fadeIn, staggerChildren } from "../animations/motionVariants";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="page relative overflow-hidden">

      {/* PARALLAX DECOR (LIGHT BEAMS) */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.2 }}
      >
        <img
          src="/br/hero_knight_bg.jpg"
          className="w-full h-full object-cover"
          alt="hero background"
        />
      </motion.div>

      {/* TINT LAYER */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 pt-10">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl font-bold text-white drop-shadow-xl leading-tight"
          >
            ALIS — <span className="text-blue-400">Agentic Loan</span>
            <br />
            Intelligence System
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-white/80 mt-4 max-w-xl"
          >
            AI-powered multi-agent system for instant verification, underwriting,
            loan scoring, and sanction letter generation — built for India’s
            micro-retail lending.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div variants={fadeUp} className="flex gap-4 mt-6">
            <button
              className="btn btn-glow"
              onClick={() => nav("/chat")}
            >
              Start AI Chat
            </button>

            <button
              className="btn-ghost"
              onClick={() => nav("/about")}
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* FEATURES SECTION */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          <div className="card-hero neon-soft">
            <h3 className="text-xl font-semibold text-white mb-2">
              ⚡ Fast Verification
            </h3>
            <p className="text-white/70">
              PAN & salary slip verification in seconds using multi-agent
              pipelines.
            </p>
          </div>

          <div className="card-hero neon-soft">
            <h3 className="text-xl font-semibold text-white mb-2">
              🤖 Smart Underwriting
            </h3>
            <p className="text-white/70">
              Custom scoring model built for Indian salary norms & MSME needs.
            </p>
          </div>

          <div className="card-hero neon-soft">
            <h3 className="text-xl font-semibold text-white mb-2">
              📄 Instant Sanction Letters
            </h3>
            <p className="text-white/70">
              Download branded sanction letters with a single click.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

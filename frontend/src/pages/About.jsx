import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/motionVariants";

export default function About() {
  return (
    <div className="page container mx-auto px-6">
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-4xl text-white font-bold mb-6"
      >
        About ALIS
      </motion.h1>

      <div className="card-hero">
        <p className="text-white/80 text-lg">
          ALIS is a next-generation AI-powered multi-agent system built for fast,
          fair, and auditable loan decisioning in India.
        </p>
      </div>
    </div>
  );
}

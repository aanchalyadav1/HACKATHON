import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/motionVariants";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="page container mx-auto px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="glass max-w-md mx-auto p-8 rounded-3xl"
      >
        <h1 className="text-3xl text-white font-bold mb-6">Register</h1>

        <input className="input mb-4" placeholder="Your Name" />
        <input className="input mb-4" placeholder="Email" type="email" />
        <input className="input mb-4" placeholder="Password" type="password" />

        <button className="btn w-full">Create Account</button>

        <p className="text-white/70 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

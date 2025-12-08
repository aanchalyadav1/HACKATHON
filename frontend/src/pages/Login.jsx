import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/motionVariants";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="page container mx-auto px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="glass max-w-md mx-auto p-8 rounded-3xl"
      >
        <h1 className="text-3xl text-white font-bold mb-6">Login</h1>

        <input className="input mb-4" placeholder="Email" type="email" />
        <input className="input mb-4" placeholder="Password" type="password" />

        <button className="btn w-full">Login</button>

        <p className="text-white/70 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

"use client";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

type Props = {
  language?: string;
  complexity?: string;
  functions?: { name: string; description: string }[];
  keyPoints?: string[];
  description?: string;
}

export default function Code({
  language = "unknown",
  complexity = "intermediate",
  functions = [],
  keyPoints = [],
  description = "No description available."

}: Props) {

 return (
  <motion.div
    className="w-full space-y-4"
    variants={container}
    initial="hidden"
    animate="show"
  >
    {/* Header */}
    <motion.div variants={card}>
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-900">{language}</h1>
          <span className="text-xs px-3 py-1 rounded-full border border-cyan-100 bg-cyan-50 text-cyan-800">
            {complexity}
          </span>
        </div>
      </div>
    </motion.div>

    {/* Description */}
    <motion.div variants={card}>
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
          What it does
        </span>
        <p className="text-sm leading-relaxed text-gray-700 mt-3">{description}</p>
      </div>
    </motion.div>

    {/* Functions */}
    {functions.length > 0 && (
      <motion.div variants={card}>
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 space-y-3">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Functions
          </span>
          <ul className="space-y-3 mt-3">
            {functions.map((fn, i) => (
              <li key={i} className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-cyan-800">{fn.name}</span>
                <span className="text-sm text-gray-600 leading-relaxed">{fn.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    )}

    {/* Key Points */}
    {keyPoints.length > 0 && (
      <motion.div variants={card}>
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 space-y-3">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Key Points
          </span>
          <ul className="space-y-2 mt-3">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="text-cyan-700 font-bold mt-0.5">→</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    )}
  </motion.div>
)



}





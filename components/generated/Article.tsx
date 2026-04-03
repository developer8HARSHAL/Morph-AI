"use client";

import { motion } from "framer-motion";
import SummaryBlock from "@/components/blocks/SummaryBlock";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

type Props = {
  title?: string;
  summary?: string;
  keyPoints?: string[];
  tags?: string[];
  readingTime?: number;
  intent?: string;
};

export default function Article({
  title = "Untitled",
  summary = "No summary available.",
  keyPoints = [],
  tags = [],
  readingTime = 1,
  intent = "summary",
}: Props) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >

      <motion.div variants={card} className="col-span-2">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">{title}</h1>
        </div>
      </motion.div>

      <motion.div variants={card} className="col-span-1">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Topics</span>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, i) => (
              <span key={i} className="text-xs bg-cyan-50 text-cyan-800 px-3 py-1 rounded-full border border-cyan-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={card} className="col-span-1">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-black text-cyan-800">{readingTime}</span>
          <span className="text-xs text-gray-400 mt-1">min read</span>
        </div>
      </motion.div>

      {/* Summary — only for summary and full */}
      {(intent === "summary" || intent === "full") && (
        <motion.div variants={card} className="col-span-2">
          <SummaryBlock summary={summary} />
        </motion.div>
      )}

      {/* Key Points — only for keypoints and full */}
      {(intent === "keypoints" || intent === "full") && keyPoints.length > 0 && (
        <motion.div variants={card} className="col-span-2">
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
  );
}
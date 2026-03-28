"use client";

import SummaryBlock from "@/components/blocks/SummaryBlock";

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
    <div className="w-full space-y-12">

      {/* Header card — always visible regardless of intent */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-lg font-bold text-gray-900 leading-snug">
            {title}
          </h1>
          <span className="shrink-0 text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-1 whitespace-nowrap">
            {readingTime} min read
          </span>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-cyan-50 text-cyan-800 px-3 py-1 rounded-full border border-cyan-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary — only for summary and full */}
      {(intent === "summary" || intent === "full") && (
        <SummaryBlock summary={summary} />
      )}

      {/* Key Points — only for keypoints and full */}
      {(intent === "keypoints" || intent === "full") && keyPoints.length > 0 && (
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
      )}

      {/* Tags detail — only for tags intent */}
      {intent === "tags" && tags.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 space-y-3">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Topics
          </span>
          <div className="flex flex-wrap gap-3 mt-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm bg-cyan-50 text-cyan-800 px-4 py-2 rounded-full border border-cyan-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Full brief — shows all three sections, already handled above */}
      {/* full intent renders summary + keypoints both via the conditions above */}

    </div>
  );
}
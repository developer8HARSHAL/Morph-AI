"use client";

type Props = {
  summary: string;
};

export default function SummaryBlock({ summary }: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 space-y-3">
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
        Summary
      </span>
      <p className="text-sm leading-relaxed text-gray-700 mt-3">
        {summary}
      </p>
    </div>
  );
}
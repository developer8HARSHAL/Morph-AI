"use client";

type Props = {
  title?: string;
  summary?: string;
  keyPoints?: string[];
  tags?: string[];
  sentiment?: "positive" | "negative" | "neutral";
  readingTime?: number;
};

const sentimentColor = {
  positive: "bg-green-100 text-green-700",
  negative: "bg-red-100 text-red-700",
  neutral: "bg-gray-100 text-gray-600",
};

export default function Summary({
  title = "Untitled",
  summary = "",
  keyPoints = [],
  tags = [],
  sentiment = "neutral",
  readingTime = 1,
}: Props) {
  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white  rounded-2xl shadow-lg p-6 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
            <p className="text-xs text-gray-500 mt-1">
              {readingTime} min read
            </p>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${sentimentColor[sentiment]}`}
          >
            {sentiment}
          </span>
        </div>

        {/* Summary + Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Summary Section */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Summary
            </h2>
            <p className="text-sm leading-relaxed bg-gray-50 rounded-lg p-4">
              {summary || "No summary available."}
            </p>
          </div>

          {/* Key Points Section */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Key Points
            </h2>

            {keyPoints.length > 0 ? (
              <ul className="space-y-2">
                {keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="text-sm bg-amber-50 rounded-lg p-3 border"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">
                No key points available.
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useTamboThreadInput, useTamboThread } from "@tambo-ai/react";

function ContentGenerator() {
  const { submit, setValue } = useTamboThreadInput();
  const { thread } = useTamboThread();

  const [input, setInput] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const trimmed = input.trim().slice(0, 2000);
      setValue(trimmed);
      await Promise.resolve();
      await submit();
      setHasGenerated(true);
    } finally {
      setLoading(false);
    }
  }




  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5f5] text-black">
      {/* HEADER */}
      <div className="w-full px-10 py-6">
        <h1 className="text-3xl font-semibold text-cyan-900">MORPH AI</h1>
      </div>

      <div className="flex-1 w-full mx-auto bg-[#f8f5f5] shadow-xl  p-8">
        {!hasGenerated ? (
          /* CENTER INPUT MODE */
          <div className="flex flex-col items-center justify-center h-[70vh] ">
            <h1 className="text-4xl font-bold font-sans text-center mb-12 text-cyan-950">
              Turn Content into Insight and Action
            </h1>

            <div className="flex flex-col items-center gap-5 w-full">
              <div className="w-[650px]  shadow-xl  rounded-xl p-6">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste article, email, notes or code..."
                  className="w-full h-40 bg-transparent outline-none resize-none text-lg"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-6 py-2 bg-cyan-800  text-white rounded-2xl hover:bg-cyan-900 disabled:opacity-50"
              >
                {loading ? "Analyzing your content ...." : "Unlock Insights"}
              </button>
            </div>
          </div>
        ) : (
          /* SPLIT UI MODE */
          <div className="flex gap-6 h-[75vh]">
            {/* LEFT 30% */}
            <div className="w-[30%] p-6 flex flex-col">
              <h2 className="text-sm font-semibold text-gray-500 mb-3">
                Your Content
              </h2>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none resize-none text-gray-800"
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Re-Generate"}
              </button>
            </div>

            {/* RIGHT 70% */}
            <div className="w-[70%] bg-white rounded-2xl  p-6 overflow-auto">
              <h2 className="text-sm font-semibold text-gray-500 mb-4">
                AI Insights
              </h2>
              {thread?.messages?.map((message) => (
                <div key={message.id}>
                  {message.role === "assistant" && message.renderedComponent}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return <ContentGenerator />;
}
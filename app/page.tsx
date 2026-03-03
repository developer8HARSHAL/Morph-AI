"use client";

import { useState } from "react";
import { useTamboThreadInput, useTamboThread } from "@tambo-ai/react";
import { features } from "process";

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
  const content=[
    {
    label: "Article",
    desc: "Summarise long articles into crisp key takeaways and actionable insights instantly.",
  },
  {
    label: "Notes",
    desc: "Transform scattered notes into structured outlines, action items and clear summaries.",
  },
  {
    label: "Code",
    desc: "Explain, review or document any code snippet — from a function to a full module.",
  },
  {
    label: "Email / Post",
    desc: "Rewrite, improve tone or extract key points from emails, tweets and social posts.",
  },

  ]

  function ContentCard({
    label,
    desc

  }:{
    label:string;
    desc:string;
  })
  {
  return(
    <div className="bg-white/50 mb-2 rounded-xl p-2 space-y-1">
      <h3 className="text-cyan-900 font-medium">{label}</h3>
      <p className="text-sm text-gray-500 leading-snug">{desc}</p>
    </div>
  )
  }

  return (
    // main
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#efeded]">

      {/* ── Header ── */}
      <header className="relative z-10 w-full px-10 py-5 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-cyan-900">MORPH AI</h1>
      </header>

      {!hasGenerated ? (
        /* ── LANDING / INPUT MODE — two column split ── */
        <div className="flex flex-1 min-h-[calc(100vh-53px)]">

          <div className="relative hidden md:flex flex-col justify-center w-1/2.4 bg-teal-800 overflow-hidden px-12 py-16">

            {/* Background Image */}
            <img
              src="https://i.pinimg.com/736x/92/53/0e/92530e688b518ede4dce08f5f7691840.jpg"
              alt="Portrait"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />

            {/* Overlay to control brightness */}
            <div className="absolute inset-0" />

            {/* Content */}
            <div className="relative z-10 space-y-6 max-w-lg">

              <h1 className="text-cyan-900 text-sm font-semibold uppercase tracking-widest mb-10">
                What can you Morph?
              </h1>

              <h2 className="text-3xl font-black text-white leading-snug mb-2">
                Any content.<br />Every insight.
              </h2>

              <p className="text-lg leading-snug text-gray-600 mt-5 pb-5 font-semibold">
                Drop in any content type and Morph AI will analyse, summarise,
                and restructure it for you.
              </p>

              <div className="text-lg ">
                {content.map((f)=>(
                  <ContentCard key={f.label}{...f}/>

                ))}
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN — input content */}
          <div className="flex-1 flex flex-col items-center justify-center px-10 py-16">
            <div className="w-full max-w-xl">
              <h2 className="text-4xl font-extrabold text-gray-600 mb-3 leading-tight">
                Turn{" "}
                <span className="text-cyan-800 bg-gray-200 px-2 py-0.5 rounded">
                  Content
                </span>{" "}
                into Insight and Action
              </h2>
              <p className="text-gray-400 text-sm mb-10">
                Paste any article, email, notes, or code below to get started.
              </p>

              <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 mb-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste article, email, notes or code..."
                  className="w-full h-44 bg-transparent outline-none resize-none text-gray-800 placeholder-gray-400 text-sm leading-relaxed"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-3 bg-cyan-800 font-semibold text-white rounded-2xl hover:bg-cyan-900 transition-colors disabled:opacity-50"
              >
                {loading ? "Analyzing your content…" : "Unlock Insights"}
              </button>
            </div>
          </div>
        </div>

      ) : (
        /* ── SPLIT / RESULTS MODE ── */
        <div className="flex flex-1 overflow-hidden ">

          <div className="w-[30%] min-w-[200px] flex flex-col border-r border-gray-200 bg-gray-100 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Your Content
            </h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none resize-none text-gray-700 text-sm leading-relaxed"
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-cyan-800 text-white text-sm font-medium rounded-xl hover:bg-cyan-900 transition-colors disabled:opacity-50"
            >
              {loading ? "Analyzing…" : "Re-Generate"}
            </button>
          </div>

          <div className="flex-1 flex flex-col p-6 overflow-auto ">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              AI Insights
            </h2>
            <div className="flex-1 space-y-4">
              {thread?.messages?.map((message) => (
                <div key={message.id}>
                  {message.role === "assistant" && message.renderedComponent}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default function Home() {
  return <ContentGenerator />;
}
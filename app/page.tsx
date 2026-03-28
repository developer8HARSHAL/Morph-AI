"use client";

import React, { useState, useEffect } from "react";
import { useTamboThreadInput, useTamboThread } from "@tambo-ai/react";
import Article from "@/components/generated/Article";
import { motion, AnimatePresence } from 'framer-motion'

const ARTICLE_INTENTS = [
  { id: "summary", label: "Summary", icon: "◎" },
  { id: "keypoints", label: "Key Points", icon: "→" },
  { id: "tags", label: "Topics", icon: "#" },
  { id: "full", label: "Full Brief", icon: "⊞" },
];

function ContentCard({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="bg-white/50 mb-2 rounded-xl p-2 space-y-1">
      <h3 className="text-cyan-900 font-medium">{label}</h3>
      <p className="text-sm text-gray-500 leading-snug">{desc}</p>
    </div>
  );
}

const CONTENT_CARDS = [
  { label: "Article", desc: "Summarise long articles into crisp key takeaways instantly." },
  { label: "Notes", desc: "Transform scattered notes into structured outlines." },
  { label: "Code", desc: "Explain, review or document any code snippet." },
  { label: "Email / Post", desc: "Rewrite, improve tone or extract key points." },
];

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded-lg w-2/3" />
        <div className="h-4 bg-gray-100 rounded-lg w-1/4" />
        <div className="flex gap-2 pt-1">
          <div className="h-6 bg-gray-100 rounded-full w-16" />
          <div className="h-6 bg-gray-100 rounded-full w-14" />
          <div className="h-6 bg-gray-100 rounded-full w-20" />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-16 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
      </div>
    </div>
  );
}

function IntentTabs({
  selected,
  onSelect,
  size = "md",
}: {
  selected: string;
  onSelect: (id: string) => void;
  size?: "sm" | "md";
}) {
  return (
    <div className={`grid grid-cols-2 gap-2`}>
      {ARTICLE_INTENTS.map((intent) => (
        <button
          key={intent.id}
          onClick={() => onSelect(intent.id)}
          className={`
            flex items-center gap-2 rounded-xl border font-medium transition-all duration-150
            ${size === "sm" ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"}
            ${selected === intent.id
              ? "bg-cyan-800 text-white border-cyan-800 shadow-sm"
              : "bg-gray-50 text-gray-600 border-gray-300 hover:border-cyan-300 hover:text-cyan-800"
            }
          `}
        >
          <span className="text-base">{intent.icon}</span>
          {intent.label}
        </button>
      ))}
    </div>
  );
}

function ContentGenerator() {
  const { submit, setValue } = useTamboThreadInput();
  const { thread } = useTamboThread();

  const [input, setInput] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIntent, setSelectedIntent] = useState("summary");
  const [aiProps, setAiProps] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const last = thread?.messages
      ?.filter((m) => m.role === "assistant" && m.renderedComponent)
      .at(-1);

    if (!last) return;

    const element = last.renderedComponent as React.ReactElement<Record<string, unknown>>;
    const articleProps = (element.props.children as React.ReactElement<Record<string, unknown>>).props;

    setAiProps(articleProps);
  }, [thread?.messages]);

  async function handleGenerate() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);

    try {
      // Content only — intent is never sent to AI
      const prompt = input.trim().slice(0, 3000);
      setValue(prompt);
      await new Promise((r) => setTimeout(r, 50));
      await submit();
      setHasGenerated(true);
    } catch (err) {
      console.error("Generation failed:", err);
      setError("Something went wrong. Check your API key or try again.");
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#efeded]">

      {/* Header */}
      <header className="relative z-10 w-full px-10 py-5 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-cyan-900">MORPH AI</h1>
      </header>


      <AnimatePresence mode="wait">
        {!hasGenerated ? (
          /* Landing / input mode */
          <motion.div
            key="landing"
            className="flex flex-1 min-h-[calc(100vh-53px)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >

            {/* Left — marketing */}
            <div className="relative hidden md:flex flex-col justify-center w-[45%] bg-teal-800 overflow-hidden px-12 py-16">
              <img
                src="https://i.pinimg.com/736x/92/53/0e/92530e688b518ede4dce08f5f7691840.jpg"
                alt="Portrait"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0" />
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
                <div>
                  {CONTENT_CARDS.map((f) => (
                    <ContentCard key={f.label} {...f} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right — input */}
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

                {input.trim().length > 100 && (
                  <div className="mb-4 space-y-2 ">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                      What do you need?
                    </p>
                    <IntentTabs selected={selectedIntent} onSelect={setSelectedIntent} />
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={loading || !input.trim()}
                  className="w-full py-3 bg-cyan-800 font-semibold text-white rounded-2xl hover:bg-cyan-900 transition-colors disabled:opacity-50"
                >
                  {loading ? "Analysing your content…" : "Unlock Insights"}
                </button>
              </div>
            </div>
          </motion.div>

        ) : (
          /* Split / results mode */
          <motion.div
            key="split"
            className="flex flex-1 overflow-hidden min-h-[calc(100vh-53px)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >

            {/* Left — content + controls */}
            <div className="w-[30%] min-w-[220px] flex flex-col border-r border-gray-200 bg-gray-100 p-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Your Content
              </h2>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none resize-none text-gray-700 text-sm leading-relaxed"
              />

              <div className="mt-4 space-y-2 ">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  What do you need?
                </p>
                {/* Intent switching — pure state, zero AI calls */}
                <IntentTabs
                  selected={selectedIntent}
                  onSelect={setSelectedIntent}
                  size="sm"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="mt-3 px-4 py-2 bg-cyan-800 text-white text-sm font-medium rounded-xl hover:bg-cyan-900 transition-colors disabled:opacity-50"
              >
                {loading ? "Analysing…" : "Re-Generate"}
              </button>
            </div>

            {/* Right — AI result */}
            <div className="flex-1 flex flex-col p-6 overflow-y-auto">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                AI Insights
              </h2>

              {/* Error state */}
              {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 mb-4">
                  <p className="text-sm text-red-700">{error}</p>
                  <button
                    onClick={handleGenerate}
                    className="mt-2 text-xs text-red-600 underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 mb-4">
                  <p className="text-sm text-red-700">{error}</p>
                  <button onClick={handleGenerate} className="mt-2 text-xs text-red-600 underline">
                    Try again
                  </button>
                </div>
              )}

              {/* Loading skeleton */}
              {loading && <LoadingSkeleton />}

              {/* Result OR empty state — never both */}
              {!loading && !error && (
                aiProps
                  ? <Article {...(aiProps as any)} intent={selectedIntent} />
                  : <div className="flex-1 flex items-center justify-center">
                    <p className="text-sm text-gray-400">Your insights will appear here.</p>
                  </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return <ContentGenerator />;
}
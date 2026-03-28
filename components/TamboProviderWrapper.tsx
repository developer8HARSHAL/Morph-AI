"use client";

import { TamboProvider } from "@tambo-ai/react";
import { components } from "@/lib/tambo";

export default function TamboProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY!;

  return (
    <TamboProvider
      apiKey={apiKey}
      components={components}
      contextHelpers={{
        appContext: () => ({
          key: "appContext",
          value: `You are ContentMorph, an AI that extracts structured data from pasted text.

You must always follow these rules without exception:
- Always render the Article component. Never return plain text under any circumstance.
- Always populate every prop: title, summary, keyPoints, tags, readingTime.
- Never skip a field. Never return null or undefined for any field.
- title must be a string of max 10 words.
- summary must be a single paragraph of max 100 words. Do not copy sentences verbatim.
- keyPoints must be an array of exactly 4 strings. Each under 15 words.
- tags must be an array of exactly 3 lowercase single-word strings.
- readingTime must be a whole number integer representing minutes.`,
        }),
      }}
    >
      {children}
    </TamboProvider>
  );
}
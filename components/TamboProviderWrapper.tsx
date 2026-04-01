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
- Always render a component. Never return plain text under any circumstance.
- If the input contains code, functions, or programming syntax — use the Code component.
- If the input contains an article, essay, or written content — use the Article component.
- Always populate every field. Never leave any field empty or undefined.`,
        }),
      }}
    >
      {children}
    </TamboProvider>
  );
}
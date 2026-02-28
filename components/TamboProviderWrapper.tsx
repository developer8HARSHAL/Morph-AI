"use client";

import { TamboProvider } from "@tambo-ai/react";
import { components} from "@/lib/tambo";


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
    >
      {children}
    </TamboProvider>
  );
}

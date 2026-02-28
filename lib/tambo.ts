import type { TamboComponent } from "@tambo-ai/react";
import { z } from "zod";
import Article from "@/components/generated/Summery";

export const components: TamboComponent[] = [
{
  name: "Article",
  description: "Use when user pastes an article or long-form text. Keep title under 10 words. Keep summary under 100 words. Always return both fields as short strings.",
  component: Article,
propsSchema: z.object({
  title: z.string().optional().default("Untitled"),
  summary: z.string().optional().default(""),
  keyPoints: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  sentiment: z.enum(["positive", "negative", "neutral"]).optional().default("neutral"),
  readingTime: z.number().optional().default(1),
})
}
];

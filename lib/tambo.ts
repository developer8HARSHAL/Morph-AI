import type { TamboComponent } from "@tambo-ai/react";
import { z } from "zod";
import Article from "@/components/generated/Article";

export const components: TamboComponent[] = [
  {
    name: "Article",
    description: `
      Use this component when the user pastes an article, blog post, news story,
      essay, or any long-form written content.

      STRICT RULES — follow all of them exactly:
      - Always render this component. Never respond with plain text.
      - Always populate every single field. Never leave any field empty.
      - title: Extract the actual title or main topic. Max 10 words. Must be a string.
      - summary: Write a clear paragraph summarizing the core argument. Max 100 words. Must be a string.
      - keyPoints: Extract exactly 4 key takeaways. Each point under 15 words. Must be an array of 4 strings.
      - tags: Extract exactly 3 topic labels. Single words only. Lowercase. Must be an array of 3 strings.
      - readingTime: Estimate reading time as a whole number in minutes. Must be an integer.
    `,
    component: Article,
propsSchema: z.object({
  title: z
    .string()
    .catch("Untitled")
    .describe("The article title or main topic. Max 10 words."),
  summary: z
    .string()
    .catch("No summary available.")
    .describe("Concise paragraph summarizing the content. Max 100 words."),
  keyPoints: z
    .array(z.string())
    .catch([])
    .describe("Exactly 4 key takeaway points. Each under 15 words."),
  tags: z
    .array(z.string())
    .catch([])
    .describe("Exactly 3 lowercase single-word topic tags."),
  readingTime: z
    .number()
    .catch(1)
    .describe("Estimated reading time in whole minutes. Integer only."),
}),
  },
];
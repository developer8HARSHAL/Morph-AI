import type { TamboComponent } from "@tambo-ai/react";
import { z } from "zod";
import Article from "@/components/generated/Article";
import Code from "@/components/generated/Code"


export const components: TamboComponent[] = [
  {
    name: "Article",
    description: `
      Use this component when the user pastes an article, blog post, news story,
      essay, or any long-form written content.

      STRICT RULES — follow all of them exactly:
      - Always render this component for articles and written content. Never respond with plain text.
      - Do NOT use this component if the input contains code snippets, functions, or programming syntax. Use the Code component instead.
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

  {

    name: "Code",
    description: `
  Use this component when the input contains a code snippet, function, 
  script, algorithm, or any programming code — with or without surrounding text.
  If the input contains code blocks, function definitions, or syntax from any 
  programming language, ALWAYS use this component over Article.

  STRICT RULES — follow all of them exactly:
  - Always render this component for code input. Never respond with plain text.
  - language: Identify the programming language. Must be a string.
  - complexity: Must be exactly one of: "beginner", "intermediate", "advanced".
  - functions: Extract all key functions. Each must have a name and plain English description.
  - keyPoints: Extract exactly 4 takeaways about what the code does. Each under 15 words.
  - description: Write a plain English explanation of the entire code. Max 80 words.
`,
    component: Code,
    propsSchema: z.object({
      language: z.string().catch("unknown").describe("Programming language of the code snippet."),
      complexity: z.string().catch("intermediate").describe("Complexity level: beginner, intermediate, or advanced."),
      functions: z.array(
        z.object({
          name: z.string().catch("unnamed").describe("Function name."),
          description: z.string().catch("No description.").describe("What this function does in plain English."),
        })
      ).catch([]).describe("Key functions found in the code."),
      keyPoints: z.array(z.string()).catch([]).describe("Exactly 4 key takeaways about the code."),
      description: z.string().catch("No description available.").describe("Plain English explanation of what this code does."),
    }),
  }
];
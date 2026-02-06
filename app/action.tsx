// "use server";

// import { components, tools } from "@/lib/tambo";

// export async function generateUI(content: string) {

//   const result = await streamUI({
//     model: "anthropic/claude-3-5-sonnet",
//     prompt: `
// You are a content analyzer.

// If user pastes long article/text:
// generate Article component.

// Return props:
// - title
// - summary

// Content:
// ${content}
//     `,
//     components,
//     tools,
//   });

//   return result;
// }

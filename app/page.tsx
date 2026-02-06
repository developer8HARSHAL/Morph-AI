"use client"

import { useState } from "react";

export default function Home() {

  const [input, setInput] = useState("");

  function contentClassify(text: string){
    console.log("User pasted:", text)

    if(text.includes("function") || text.includes("const")){
      console.log("Detected: CODE")
    } 
    else if(text.length > 200){
      console.log("Detected: ARTICLE")
    }
    else{
      console.log("Detected: MEETING / SHORT TEXT")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f6f7fb] via-[#eef1f7] to-[#e6ebf5] text-gray-900">

      <div className="w-full px-10 py-6">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          MORPH AI
        </h1>
      </div>

      <div className="flex-1 w-[95%] mx-auto rounded-3xl bg-white shadow-xl border border-gray-200 p-8 flex flex-col">
        
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 text-center leading-tight mt-10">
          Turn Content into Insight <br/>and Action
        </h1>

        <div className="flex-1 flex items-end justify-center pb-12">
          <div className="flex flex-col items-center gap-5 w-full">

            <div className="w-[600px] bg-[#f4f6fb] border border-gray-200 rounded-3xl shadow-inner p-5">
              <textarea
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                placeholder="Paste or write your content here..."
                className="w-full h-36 bg-transparent outline-none resize-none text-gray-800 placeholder-gray-400 text-[15px] leading-relaxed"
              />
            </div>

            <button
              onClick={()=>contentClassify(input)}
              className="h-12 px-10 rounded-2xl bg-gradient-to-r from-[#111827] to-[#1f2937] text-white font-medium shadow-lg hover:scale-[1.03] transition"
            >
              Generate
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

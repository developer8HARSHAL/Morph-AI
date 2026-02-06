"use client";

type Props = {
  title: string;
  summary: string;
};

export default function Article({ title, summary }: Props) {
  return (
    <div className="mt-10 w-[800px] mx-auto bg-white p-6 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>

      <div className="bg-gray-100 p-4 rounded-xl">
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}

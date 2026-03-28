import React from 'react';


interface ChecklistItem {
  id: number;
  checklist: string;
}

interface ChecklistBlockProps {
  checklist: ChecklistItem[]; 
}

export default function ChecklistBlock({ checklist }: ChecklistBlockProps) {
  return (
    <div>
      {checklist.map((checkl) => (
        <div key={checkl.id}>
          <h1>{checkl.id}</h1>
          <p>{checkl.checklist}</p>
        </div>
      ))}
    </div>
  );
}

// components/Terms.tsx
"use client";

import React from "react";

interface TermsProps {
  onSelectTerm: (term: string) => void; // Prop to send selected term to parent
}

const Terms: React.FC<TermsProps> = ({ onSelectTerm }) => {
  const terms = ["First Term", "Second Term", "Third Term"];

  return (
    <div className="flex flex-col items-center space-y-4">
        <h1 className="uppercase text-xl sm:text-3xl">terms</h1>
      {terms.map((term, index) => (
        <div
          key={index}
          className="cursor-pointer p-4 border rounded-md text-center bg-gray-100 hover:bg-gray-200 transition duration-300"
          onClick={() => onSelectTerm(term)} // Send the term to the parent when clicked
        >
          {term}
        </div>
      ))}
    </div>
  );
};

export default Terms;

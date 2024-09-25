// components/Dropdown.tsx
"use client";

import React,{ useState } from "react";

interface DropDown {
    isOpen: boolean,
    selectedTerm:string,
    handleSelect: (_:string) => void
    toggleDropdown: () => void
}
const Dropdown:React.FC<DropDown> = ({isOpen,selectedTerm,handleSelect,toggleDropdown}) => {
  return (
    <div className="relative inline-block text-left ml-36">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {selectedTerm}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>

      </button>

      {isOpen && (
        <div className="origin-center absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => handleSelect("First Term")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              First Term
            </button>
            <button
              onClick={() => handleSelect("Second Term")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Second Term
            </button>
            <button
              onClick={() => handleSelect("Third Term")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Third Term
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

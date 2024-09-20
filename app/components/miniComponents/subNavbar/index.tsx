"use client";
import React from "react";
interface Props {
  first: boolean;
  second: boolean;
  firstWord: string;
  secondWord: string;
  title: string;
  third?: boolean;
  thirdWord?:string; 
  classname?: string;
  thirdPresent?: boolean; 
  handleSwitch: (_: string) => void;
}
const SubNavbar = ({
  first = true,
  third = false,
  thirdWord,
  firstWord,
  second,
  secondWord,
  title,
  handleSwitch,
  thirdPresent,
  classname,
}: Props) => {
  return (
    <>
      <div className={`shadow px-5 pt-2 sm:pt-5 h-fit max-w-full ${classname}`}>
        <h1 className="capitalize text-3xl font-bold pb-1.5">{title}</h1>
        <div className="flex gap-7 h-fit justify-around">
          <div
            className={`capitalize flex flex-col cursor-pointer ${
              first ? "text-[#EE3A57]" : ""
            }`}
            onClick={() => handleSwitch("first")}
          >
            <h1>{firstWord}</h1>
            <span
              className={`h-1  ${first ? "bg-[#EE3A57] text-[#EE3A57]" : ""}`}
            ></span>
          </div>
          <div
            className={`capitalize  flex flex-col cursor-pointer ${
              second ? "text-[#EE3A57]" : ""
            }`}
            onClick={() => handleSwitch("second")}
          >
            <h1>{secondWord}</h1>
            <span
              className={`h-1  ${second ? "bg-[#EE3A57] text-[#EE3A57]" : ""}`}
            ></span>
          </div>
          {thirdPresent &&  <div
            className={`capitalize flex flex-col cursor-pointer ${
              third ? "text-[#EE3A57]" : ""
            }`}
            onClick={() => handleSwitch("third")}
          >
            <h1>{thirdWord}</h1>
            <span
              className={`h-1  ${third ? "bg-[#EE3A57] text-[#EE3A57]" : ""}`}
            ></span>
          </div>}
        </div>
      </div>
    </>
  );
};

export default SubNavbar;

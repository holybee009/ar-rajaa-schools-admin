"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cancel from "../../atoms/icons/cancel.svg"
import Image from "next/image";

interface ActiveState {
  news: boolean;
  events: boolean;
  recent: boolean;
  information: boolean;
  community: boolean;
  calendar: boolean;
}

interface Class {
  classnames?: string;
  className?:string;
  hideNav:() => void
}

const Navbar = ({ classnames,className,hideNav }: Class) => {
  const [active, setActive] = useState<ActiveState>({
    news: true,
    events: false,
    recent: false,
    information: false,
    community: false,
    calendar: false,
  });

  // useEffect(
  //   function toggleNav (key: keyof ActiveState){
  //   setActive((prevState) => {
  //     const newState = Object.keys(prevState).reduce((acc, curr) => {
  //       acc[curr as keyof ActiveState] = curr === key;
  //       return acc;
  //     }, {} as ActiveState);
  //     return newState;
  //   });
  //   toggleNav(activeState)
  // },[])
  const handleActive = (key: keyof ActiveState) => {
    setActive((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, curr) => {
        acc[curr as keyof ActiveState] = curr === key;
        return acc;
      }, {} as ActiveState);
      return newState;
    });
  };
  return (
    <div className={`bg-[#fff] w-full ${classnames} flex flex-col`}>
      <Image src={Cancel} alt="cancel" width={24} height={24} className={`${className} cursor-pointer sm:hidden`} onClick={hideNav}/>
      <Link
        href="/"
        className={`pr-2 py-1 flex justify-start gap-2`}
        onClick={() => handleActive("news")}
      >
        <span
          className={`w-1  ${active.news ? "bg-[#EE3A57] text-[#EE3A57]" : ""}`}
        ></span>
        <div
          className={`flex justify-center gap-2  px-3 py-1 ${
            active.news ? "bg-[#ee3a585b] text-[#EE3A57]" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
              clipRule="evenodd"
            />
            <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
          </svg>

          <p className="capitalize">news</p>
        </div>
      </Link>
      <Link
        href="/events"
        className={`pr-2 py-1 flex justify-start gap-2`}
        onClick={() => handleActive("events")}
      >
        <span
          className={`w-1  ${
            active.events ? "bg-[#EE3A57] text-[#EE3A57]" : ""
          }`}
        ></span>
        <div
          className={`flex justify-start gap-2  px-3 py-1 ${
           active.events ? "bg-[#ee3a585b] text-[#EE3A57]" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              clipRule="evenodd"
            />
          </svg>

          <p className="capitalize">events</p>
        </div>
      </Link>
      <Link
        href="/recent-activities"
        className={`pr-2 py-1 flex justify-start gap-2`}
        onClick={() => handleActive("recent")}
      >
        <span
          className={`w-1  ${
            active.recent ? "bg-[#EE3A57] text-[#EE3A57]" : ""
          }`}
        ></span>
        <div
          className={`flex justify-center gap-2  px-3 py-1 ${
            active.recent ? "bg-[#ee3a585b] text-[#EE3A57]" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
              clipRule="evenodd"
            />
          </svg>

          <p className="capitalize">recent activities</p>
        </div>
      </Link>
      <Link
        href="/information"
        className={`pr-2 py-1 flex justify-start gap-2`}
        onClick={() => handleActive("information")}
      >
        <span
          className={`w-1  ${
            active.information ? "bg-[#EE3A57] text-[#EE3A57]" : ""
          }`}
        ></span>
        <div
          className={`flex justify-center gap-2  px-3 py-1 ${
            active.information ? "bg-[#ee3a585b] text-[#EE3A57]" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>

          <p className="capitalize">information</p>
        </div>
      </Link>
      <Link
        href="/community"
        className={`pr-2 py-1 flex justify-start gap-2`}
        onClick={() => handleActive("community")}
      >
        <span
          className={`w-1  ${
            active.community ? "bg-[#EE3A57] text-[#EE3A57]" : ""
          }`}
        ></span>
        <div
          className={`flex justify-center gap-2  px-3 py-1 ${
            active.community ? "bg-[#ee3a585b] text-[#EE3A57]" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
              clipRule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
          </svg>

          <p className="capitalize">community</p>
        </div>
      </Link>
      <Link
        href="/calendar"
        className={`pr-2 py-1 flex justify-start gap-2`}
        onClick={() => handleActive("calendar")}
      >
        <span
          className={`w-1  ${
            active.calendar ? "bg-[#EE3A57] text-[#EE3A57]" : ""
          }`}
        ></span>
        <div
          className={`flex justify-center gap-2  px-3 py-1 ${
            active.calendar ? "bg-[#ee3a585b] text-[#EE3A57]" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              clipRule="evenodd"
            />
          </svg>

          <p className="capitalize">calendar</p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;

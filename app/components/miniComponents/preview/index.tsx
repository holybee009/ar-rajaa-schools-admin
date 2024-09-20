"use client";
import React from "react";
import Image from "next/image";
import Button from "../../atoms/button";

interface Props {
  title: string;
  content: string;
  src:string;
  onClick: () => void;
  children: string;
}

const Preview = ({ title, content, src , onClick,children }: Props) => {
  return (
    <div>
      <h1 className="text-bold capitalize mb-2">{title}</h1>
      <Image src={src} alt="news image" width={100} height={100} className="mb-2"/>
      <p className="mb-2 text-sm sm:text-auto first-letter:capitalize "><span className="p-2"></span>{content}</p>
      <Button href="#" children={children} onClick={onClick} />
    </div>
  );
};

export default Preview; 
"use client";
import React from "react";
import Image from "next/image";
import Button from "../../atoms/button";
import './customScrollbar.css';

interface Props {
  title: string;
  content: string;
  src:string;
  onClick: () => void;
  prevText: string;
}

const Preview = ({ title, content, src , onClick,prevText }: Props) => {
  return (
    <div>
      <div className="w-full h-mobileScroll sm:h-64 p-4 overflow-y-auto custom-scrollbar">
      <h1 className="text-bold capitalize mb-2">{title}</h1>
      <Image src={src} alt="news image" width={100} height={100} className="mb-2"/>
            <div>
            {content.split('\n').map((paragraph:string, index:number) => (
                paragraph.trim() && (  // Ensure we don't create empty paragraphs
                <p key={index} className="mb-4">
                    {paragraph}
                </p>
                )
            ))}
        </div>
       </div>
      <Button href="#" text={prevText} onClick={onClick} />
    </div>
  );
};

export default Preview; 

"use client";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  width?: string;
  color?: string;       // For text color
  bgColor?: string;     // New prop for background color
  radius?: string;
  href: string;
  children: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  width,
  color,       // Text color
  bgColor,     // Background color
  radius,
  href,
  onClick,
  className,
  children,
}: ButtonProps) => {
  return (
    <Link
      className={`text-[16px] rounded-[38px] w-full p-2 flex items-center justify-center capitalize border-2 ${className}`}
      style={{
        maxWidth: `${width}px`,
        borderRadius: radius,
        color: color || "#fff",          // Text color (defaults to white)
        backgroundColor: bgColor || "#EE3A57",  // Background color (defaults to red)
      }}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Button;

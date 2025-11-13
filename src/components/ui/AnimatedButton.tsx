"use client";
import { motion } from "framer-motion";
import clsx from "clsx";
import React from "react";

type AnimatedButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  as?: "button" | "a";
  href?: string;
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  variant = "primary",
  as = "button",
  ...rest
}) => {
  const Component = motion[as] as any;

  return (
    <Component
      whileHover={{ scale: 1.05, rotate: 0.5 }}
      whileTap={{ scale: 0.95 }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      className={clsx(
        "relative overflow-hidden rounded-md px-5 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400",
        variant === "primary"
          ? "bg-gradient-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 text-white shadow-md"
          : "bg-gradient-to-r from-slate-700 to-slate-900 text-cyan-200 border border-cyan-600/40",
        "animate-borderFlow",
        className
      )}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
    </Component>
  );
};

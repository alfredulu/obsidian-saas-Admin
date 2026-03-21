"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const ToggleSwitch = ({ checked, onChange, className }: ToggleSwitchProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={cn(
        "w-10 h-5 rounded-full relative p-1 transition-colors duration-200",
        checked ? "bg-neon-pink" : "panel-surface-strong",
        className
      )}
    >
      <div
        className={cn(
          "w-3 h-3 rounded-full bg-theme shadow-sm transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
};

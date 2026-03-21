"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "./ToastContext";
import { cn } from "@/lib/utils";

interface MoreOptionsButtonProps {
  onClick?: () => void;
  className?: string;
  options?: { label: string; onClick: () => void; icon?: React.ReactNode; variant?: 'default' | 'danger' }[];
}

export const MoreOptionsButton = ({ onClick, className, options }: MoreOptionsButtonProps) => {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMainClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (options && options.length > 0) {
      setIsOpen(!isOpen);
    } else if (onClick) {
      onClick();
    } else {
      showToast("Coming soon", "info");
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={handleMainClick}
        className={cn(
          "p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors text-muted-theme hover:text-theme",
          isOpen && "bg-[var(--color-hover)] text-theme",
          className
        )}
      >
        <MoreHorizontal size={16} className="opacity-60" />
      </button>

      {isOpen && options && (
        <div className="absolute right-0 mt-2 w-48 bg-obsidian border border-theme rounded-xl shadow-xl z-[100] p-1 animate-in fade-in zoom-in duration-200">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                option.onClick();
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors",
                option.variant === 'danger' 
                  ? "text-red-500 hover:bg-red-500/10" 
                  : "text-muted-theme hover:text-theme hover:bg-[var(--color-hover)]"
              )}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

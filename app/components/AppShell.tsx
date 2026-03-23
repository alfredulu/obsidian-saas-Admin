"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { RightSidebar } from "./RightSidebar";
import { CommandPalette } from "./CommandPalette";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  if (isAuthPage) {
    return <main className="min-h-screen theme-bg">{children}</main>;
  }

  return (
    <div className="flex h-screen overflow-hidden theme-bg">
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar />
      </Suspense>
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] flex-1 overflow-hidden">
          <main className="overflow-y-auto p-6 w-full">{children}</main>
          <RightSidebar />
        </div>
      </div>
      <CommandPalette />
    </div>
  );
}

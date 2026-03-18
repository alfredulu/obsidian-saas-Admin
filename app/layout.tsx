import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { RightSidebar } from "./components/RightSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Obsidian SaaS Admin",
  description: "Premium SaaS Admin Dashboard",
};

import { AuthProvider } from "./components/AuthContext";
import { SidebarProvider } from "./components/SidebarContext";
import { CommandPaletteProvider } from "./components/CommandPaletteContext";
import { CommandPalette } from "./components/CommandPalette";
import { ToastProvider } from "./components/ToastContext";
import { GlobalModalsProvider } from "./components/GlobalModalsContext";
import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.className}`}>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>
            <ToastProvider>
              <GlobalModalsProvider>
                <CommandPaletteProvider>
                  <div className="flex h-screen overflow-hidden theme-bg">
                    <Suspense fallback={<div>Loading...</div>}>
                      <Sidebar />
                    </Suspense>
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <TopBar />
                      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] flex-1 overflow-hidden">
                        <main className="overflow-y-auto p-6 w-full">
                          {children}
                        </main>
                        <RightSidebar />
                      </div>
                    </div>
                  </div>
                  <CommandPalette />
                </CommandPaletteProvider>
              </GlobalModalsProvider>
            </ToastProvider>
          </SidebarProvider>
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

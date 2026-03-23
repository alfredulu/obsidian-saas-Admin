import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Obsidian SaaS Admin",
  description: "Premium SaaS Admin Dashboard",
};

import { AuthProvider } from "./components/AuthContext";
import { SidebarProvider } from "./components/SidebarContext";
import { CommandPaletteProvider } from "./components/CommandPaletteContext";
import { ToastProvider } from "./components/ToastContext";
import { GlobalModalsProvider } from "./components/GlobalModalsContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { AppShell } from "./components/AppShell";
import { AuthGate } from "./components/AuthGate";

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
                  <AuthGate>
                    <AppShell>{children}</AppShell>
                  </AuthGate>
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

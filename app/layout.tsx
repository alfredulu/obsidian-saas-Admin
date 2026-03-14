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

import { SidebarProvider } from "./components/SidebarContext";
import { CommandPaletteProvider } from "./components/CommandPaletteContext";
import { CommandPalette } from "./components/CommandPalette";
import { ToastProvider } from "./components/ToastContext";
import { GlobalModalsProvider } from "./components/GlobalModalsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <ToastProvider>
            <GlobalModalsProvider>
              <CommandPaletteProvider>
                <div className="flex h-screen overflow-hidden bg-obsidian">
                  <Sidebar />
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
      </body>
    </html>
  );
}

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden bg-obsidian">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
              <main className="flex-1 overflow-y-auto p-6">
                {children}
              </main>
              <RightSidebar />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

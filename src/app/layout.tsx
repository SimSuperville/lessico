import type { Metadata } from "next";
import { Playfair_Display, Lora, Crimson_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { PostHogProvider } from "./providers";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lessico - Claude Code Resources",
  description: "A curated resource library for Claude Code users. Find slash commands, sub-agents, and cheat sheets to boost your productivity.",
  keywords: ["Claude Code", "AI coding", "slash commands", "productivity", "developer tools"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} ${lora.variable} ${crimsonPro.variable} antialiased min-h-screen`}
      >
        <PostHogProvider>
          <Header />
          <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </PostHogProvider>
      </body>
    </html>
  );
}

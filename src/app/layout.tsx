import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/UI/lib";
import { Toaster } from "@/UI/components/ui/sonner";
import { Menu } from "@/components/Menu";
import { Separator } from "@/UI/components/ui/separator";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tools, INC.",
  description: "Explore New Tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
          <Menu />
          <Separator className="mb-2" />
          {children}
        <Toaster />
      </body>
    </html>
  );
}

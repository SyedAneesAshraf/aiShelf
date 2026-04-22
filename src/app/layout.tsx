import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Shelf — AI Visibility for Shopify Merchants",
  description:
    "See exactly where your products are invisible to AI shopping agents and what to fix.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}

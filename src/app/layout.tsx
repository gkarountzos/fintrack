import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AppLayout } from "@/src/ui/Layout/appLayout";

export const metadata: Metadata = {
  title: "FinTrack - Personal Finance Tracker",
  description: "Track your weekly, monthly, and yearly expenses effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

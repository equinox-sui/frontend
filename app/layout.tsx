import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Equinox Agent — Self-repaying loans on Sui",
  description:
    "Deposit SUI. Pick a risk profile. The agent borrows, lends, and uses the spread to pay off your debt. You manage nothing.",
  metadataBase: new URL("https://equinox.agent"),
  openGraph: {
    title: "Equinox Agent",
    description:
      "Self-repaying loans on Sui. The spread does the work.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050504",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}

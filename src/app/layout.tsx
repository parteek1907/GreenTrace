import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GreenTrace | Your Carbon Twin",
  description: "Understand your footprint, simulate changes, and live lighter.",
  icons: {
    icon: "/favicon.svg",
  },
};
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
import BackToTop from "@/components/ui/BackToTop";
import MobileExperience from "@/components/dashboard/MobileExperience";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased bg-gt-bg text-gt-dark min-h-screen flex flex-col selection:bg-gt-primary selection:text-white`}
      >
        <div className="flex md:hidden w-full min-h-screen">
          <MobileExperience />
        </div>
        <div className="hidden md:flex flex-col min-h-screen w-full relative">
          {children}
          <BackToTop />
        </div>
      </body>
    </html>
  );
}

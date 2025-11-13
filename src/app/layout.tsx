import "../styles/globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "m4capital | Futuristic Modular Trading",
  description:
    "High-performance Forex & Digital Asset platform with immersive 3D UI and modular architecture.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "m4capital",
    description: "Futuristic modular trading platform.",
    url: "https://your-production-domain.com",
    siteName: "m4capital",
    images: [{ url: "/og-base.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://your-production-domain.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-slate-950 text-slate-200">
        <Providers>
          <AnimatedBackground />
          <NavBar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

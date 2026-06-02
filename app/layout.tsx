import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Sinhala } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-si",
  subsets: ["sinhala", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const kekara = localFont({
  src: "../public/fonts/kekara2017.ttf",
  variable: "--font-kekara",
  display: "swap",
});

const guardia = localFont({
  src: "../public/fonts/Guardia-Serious.otf",
  variable: "--font-guardia",
  display: "swap",
});

const sinhasarasavi = localFont({
  src: "../public/fonts/sinhasarasavi.ttf",
  variable: "--font-sinhasarasavi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Singharachchi LMS",
  description: "Premium A/L media learning platform by Singharachchi Sir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  suppressHydrationWarning
  className={`${geistSans.variable} ${geistMono.variable} ${notoSansSinhala.variable} ${kekara.variable} ${guardia.variable} ${sinhasarasavi.variable} h-full antialiased`}
>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

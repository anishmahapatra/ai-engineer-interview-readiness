import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Engineer Interview Readiness for Data Scientists",
  description:
    "Transition from Data Scientist to AI Engineer by mastering production-grade AI system design, RAG architecture, and interview-ready system thinking.",
  openGraph: {
    title: "AI Engineer Interview Readiness",
    description:
      "Master production-grade AI system design and crack AI Engineer interviews.",
    url: "https://interview.anish.studio",
    siteName: "AI Engineer Interview Readiness",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineer Interview Readiness",
    description:
      "Master production-grade AI system design and crack AI Engineer interviews.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

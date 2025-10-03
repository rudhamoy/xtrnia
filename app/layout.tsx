import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Xtrnia - Premier Interschool Sports Competitions Platform",
  description: "Join India's leading platform for interschool tournaments and competitions. Register your school for exciting sports events including Tug-of-War, Kabaddi, Basketball, and more. Compete, excel, and win prizes!",
  keywords: "interschool competitions, school sports tournaments, student competitions India, Tug-of-War competition, Kabaddi tournament, school sports events, extracurricular activities, sports competition platform",
  authors: [{ name: "Xtrnia" }],
  openGraph: {
    title: "Xtrnia - Where Schools Compete, Students Excel",
    description: "Premier platform for interschool tournaments across India. Register your school for exciting sports competitions with amazing prizes.",
    url: "https://xtrnia.com",
    siteName: "Xtrnia",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Xtrnia - Interschool Competitions Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xtrnia - Premier Interschool Sports Competitions",
    description: "Join India's leading platform for school sports tournaments. Compete, excel, and win prizes!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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

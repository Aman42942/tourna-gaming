import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/auth-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Elite Gaming Tournaments | Valorant, PUBG, BGMI, Free Fire",
    description: "Join world-class gaming tournaments with massive prize pools. Compete in Valorant, PUBG, BGMI, and Free Fire. Register your team now!",
    keywords: ["gaming tournaments", "esports", "valorant", "pubg", "bgmi", "free fire", "online gaming"],
    openGraph: {
        title: "Elite Gaming Tournaments",
        description: "Compete in premium gaming tournaments with huge prizes",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950`}
            >
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}

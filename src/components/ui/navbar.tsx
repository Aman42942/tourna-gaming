"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Trophy, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-rgb rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-xl bg-gradient-rgb bg-clip-text text-transparent">
                            TournaPro
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/tournaments"
                            className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                            Tournaments
                        </Link>
                        <Link
                            href="/about"
                            className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                            Pricing
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {session ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/dashboard"
                                    className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                                >
                                    <User className="w-4 h-4" />
                                    <span>{session.user?.name || "Profile"}</span>
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 text-red-400"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="glass px-6 py-2 rounded-lg hover:bg-white/10 transition-colors font-semibold"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="bg-gradient-rgb px-6 py-2 rounded-lg hover:scale-105 transition-transform font-semibold"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden glass p-2 rounded-lg"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-4 border-t border-border">
                        <Link
                            href="/tournaments"
                            className="block text-foreground hover:text-primary transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Tournaments
                        </Link>
                        <Link
                            href="/about"
                            className="block text-foreground hover:text-primary transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            How It Works
                        </Link>
                        <Link
                            href="/pricing"
                            className="block text-foreground hover:text-primary transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>

                        <div className="pt-4 space-y-3 border-t border-border">
                            {session ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="block glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <User className="w-4 h-4 inline mr-2" />
                                        {session.user?.name || "Profile"}
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut({ callbackUrl: "/" });
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full text-left glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-red-400"
                                    >
                                        <LogOut className="w-4 h-4 inline mr-2" />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login"
                                        className="block glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-center font-semibold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="block bg-gradient-rgb px-4 py-2 rounded-lg text-center font-semibold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

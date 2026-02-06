"use client";

import { motion } from "framer-motion";
import { Gamepad2, Trophy, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            {/* RGB Glow Effects */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="container mx-auto px-4 z-10">
                <div className="text-center space-y-8">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <div className="glass px-6 py-2 rounded-full border border-primary/50">
                            <div className="flex items-center gap-2 text-primary">
                                <Zap className="w-4 h-4 animate-pulse" />
                                <span className="text-sm font-semibold">World&apos;s #1 Gaming Tournament Platform</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold"
                    >
                        <span className="bg-gradient-rgb bg-clip-text text-transparent animate-glow-pulse">
                            Compete. Dominate. Win.
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
                    >
                        Join elite gaming tournaments in <span className="text-primary font-semibold">Valorant</span>,{" "}
                        <span className="text-secondary font-semibold">PUBG</span>,{" "}
                        <span className="text-accent font-semibold">BGMI</span>, and{" "}
                        <span className="text-neon-green font-semibold">Free Fire</span>.
                        Massive prize pools await!
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link href="/tournaments">
                            <button className="group relative px-8 py-4 bg-gradient-rgb rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-200 overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">
                                    <Trophy className="w-5 h-5" />
                                    Browse Tournaments
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                            </button>
                        </Link>

                        <Link href="/auth/register">
                            <button className="px-8 py-4 glass rounded-lg font-bold text-lg hover:bg-white/10 transition-colors duration-200 flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Create Team
                            </button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12"
                    >
                        {[
                            { icon: Users, label: "Active Players", value: "50K+" },
                            { icon: Trophy, label: "Tournaments", value: "1,000+" },
                            { icon: Gamepad2, label: "Prize Pool", value: "₹10M+" },
                        ].map((stat, index) => (
                            <div key={index} className="glass p-6 rounded-xl border-rgb-animated">
                                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-3xl font-bold text-glow">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-primary rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}

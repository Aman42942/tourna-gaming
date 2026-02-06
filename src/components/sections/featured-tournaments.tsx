"use client";

import { motion } from "framer-motion";
import { Trophy, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

const mockTournaments = [
    {
        id: "1",
        name: "Valorant Champions League",
        game: "Valorant",
        tier: "high",
        prizePool: 500000,
        participants: 156,
        startDate: "2026-02-15",
        status: "Registering",
        color: "from-red-500 to-pink-500",
    },
    {
        id: "2",
        name: "PUBG Grandmaster Series",
        game: "PUBG",
        tier: "medium",
        prizePool: 250000,
        participants: 289,
        startDate: "2026-02-20",
        status: "Registering",
        color: "from-yellow-500 to-orange-500",
    },
    {
        id: "3",
        name: "BGMI Grassroots Tournament",
        game: "BGMI",
        tier: "low",
        prizePool: 50000,
        participants: 512,
        startDate: "2026-02-10",
        status: "Registering",
        color: "from-blue-500 to-cyan-500",
    },
];

export default function FeaturedTournaments() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-rgb bg-clip-text text-transparent">
                            Featured Tournaments
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Join ongoing competitions and win big
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockTournaments.map((tournament, index) => (
                        <motion.div
                            key={tournament.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="glass p-6 rounded-2xl border-rgb hover:border-rgb-animated h-full flex flex-col space-y-4">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-2">{tournament.name}</h3>
                                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${tournament.color}`}>
                                            {tournament.game}
                                        </div>
                                    </div>
                                    <div className="glass px-3 py-1 rounded-full text-xs font-bold text-neon-green border border-neon-green/30">
                                        {tournament.status}
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Trophy className="w-5 h-5 text-neon-yellow" />
                                        <span className="text-sm">Prize Pool:</span>
                                        <span className="ml-auto text-lg font-bold text-neon-yellow">
                                            ₹{(tournament.prizePool / 1000).toFixed(0)}K
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Users className="w-5 h-5 text-primary" />
                                        <span className="text-sm">Participants:</span>
                                        <span className="ml-auto font-bold">{tournament.participants}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle className="w-5 h-5 text-neon-green" />
                                        <span className="text-sm">Starts:</span>
                                        <span className="ml-auto font-bold">
                                            {new Date(tournament.startDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link href={`/tournaments/${tournament.id}`}>
                                    <button className="w-full py-3 bg-gradient-rgb rounded-lg font-bold hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2">
                                        <Trophy className="w-5 h-5" />
                                        Register Now
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link href="/tournaments">
                        <button className="px-8 py-4 glass rounded-lg font-bold text-lg hover:bg-white/10 transition-colors duration-200">
                            View All Tournaments →
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

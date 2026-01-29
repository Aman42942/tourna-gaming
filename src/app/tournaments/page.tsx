"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Trophy, Users, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";

const games = ["All", "Valorant", "PUBG", "BGMI", "Free Fire"];
const tiers = ["All", "Grassroots", "Challenger", "Elite"];

// Mock tournament data
const mockTournaments = [
    {
        id: "1",
        name: "Valorant Champions League Season 5",
        game: "Valorant",
        tier: "Elite",
        perPersonFee: 5000,
        prizePool: 500000,
        maxTeams: 32,
        participants: 24,
        minPlayers: 5,
        maxPlayers: 5,
        startDate: "2026-02-15",
        status: "Registering",
        color: "from-red-500 to-pink-500",
    },
    {
        id: "2",
        name: "PUBG Mobile Grandmaster Pro League",
        game: "PUBG",
        tier: "Challenger",
        perPersonFee: 1000,
        prizePool: 250000,
        maxTeams: 64,
        participants: 48,
        minPlayers: 4,
        maxPlayers: 4,
        startDate: "2026-02-20",
        status: "Registering",
        color: "from-yellow-500 to-orange-500",
    },
    {
        id: "3",
        name: "BGMI Grassroots Championship",
        game: "BGMI",
        tier: "Grassroots",
        perPersonFee: 100,
        prizePool: 50000,
        maxTeams: 128,
        participants: 112,
        minPlayers: 4,
        maxPlayers: 4,
        startDate: "2026-02-10",
        status: "Registering",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: "4",
        name: "Free Fire Elite Invitational",
        game: "Free Fire",
        tier: "Elite",
        perPersonFee: 3000,
        prizePool: 300000,
        maxTeams: 24,
        participants: 18,
        minPlayers: 4,
        maxPlayers: 4,
        startDate: "2026-03-01",
        status: "Registering",
        color: "from-purple-500 to-pink-500",
    },
    {
        id: "5",
        name: "Valorant Grassroots Qualifiers",
        game: "Valorant",
        tier: "Grassroots",
        perPersonFee: 200,
        prizePool: 75000,
        maxTeams: 96,
        participants: 72,
        minPlayers: 5,
        maxPlayers: 5,
        startDate: "2026-02-12",
        status: "Registering",
        color: "from-red-500 to-pink-500",
    },
    {
        id: "6",
        name: "PUBG Challenger Series Spring",
        game: "PUBG",
        tier: "Challenger",
        perPersonFee: 1500,
        prizePool: 400000,
        maxTeams: 48,
        participants: 36,
        minPlayers: 4,
        maxPlayers: 4,
        startDate: "2026-02-18",
        status: "Registering",
        color: "from-yellow-500 to-orange-500",
    },
];

export default function TournamentsPage() {
    const [selectedGame, setSelectedGame] = useState("All");
    const [selectedTier, setSelectedTier] = useState("All");

    const filteredTournaments = mockTournaments.filter((tournament) => {
        const gameMatch = selectedGame === "All" || tournament.game === selectedGame;
        const tierMatch = selectedTier === "All" || tournament.tier === selectedTier;
        return gameMatch && tierMatch;
    });

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Header */}
            <section className="pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute top-10 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-4">
                            <span className="bg-gradient-rgb bg-clip-text text-transparent">
                                Live Tournaments
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Browse ongoing tournaments, find your perfect competition, and register your team
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass p-6 rounded-2xl border-rgb max-w-5xl mx-auto"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold">Filters</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Game Filter */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Game</label>
                                <div className="flex flex-wrap gap-2">
                                    {games.map((game) => (
                                        <button
                                            key={game}
                                            onClick={() => setSelectedGame(game)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedGame === game
                                                    ? "bg-gradient-rgb scale-105"
                                                    : "glass hover:bg-white/10"
                                                }`}
                                        >
                                            {game}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tier Filter */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Tournament Tier</label>
                                <div className="flex flex-wrap gap-2">
                                    {tiers.map((tier) => (
                                        <button
                                            key={tier}
                                            onClick={() => setSelectedTier(tier)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedTier === tier
                                                    ? "bg-gradient-rgb scale-105"
                                                    : "glass hover:bg-white/10"
                                                }`}
                                        >
                                            {tier}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tournament Listings */}
            <section className="py-12 relative">
                <div className="container mx-auto px-4">
                    <div className="mb-6">
                        <p className="text-muted-foreground">
                            Showing {filteredTournaments.length} tournament{filteredTournaments.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTournaments.map((tournament, index) => (
                            <motion.div
                                key={tournament.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="glass p-6 rounded-2xl border-rgb hover:border-rgb-animated h-full flex flex-col space-y-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${tournament.color} mb-2`}>
                                                {tournament.game}
                                            </div>
                                            <h3 className="text-xl font-bold mb-1">{tournament.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${tournament.tier === "Elite" ? "text-purple-400 bg-purple-400/10" :
                                                        tournament.tier === "Challenger" ? "text-yellow-400 bg-yellow-400/10" :
                                                            "text-green-400 bg-green-400/10"
                                                    }`}>
                                                    {tournament.tier}
                                                </div>
                                                <div className="glass px-2 py-0.5 rounded-full text-xs font-bold text-neon-green border border-neon-green/30">
                                                    {tournament.status}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground flex items-center gap-2">
                                                <Trophy className="w-4 h-4 text-neon-yellow" />
                                                Prize Pool:
                                            </span>
                                            <span className="font-bold text-neon-yellow">
                                                ₹{(tournament.prizePool / 1000).toFixed(0)}K
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-primary" />
                                                Per Person Fee:
                                            </span>
                                            <span className="font-bold">₹{tournament.perPersonFee}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground flex items-center gap-2">
                                                <Users className="w-4 h-4 text-primary" />
                                                Team Size:
                                            </span>
                                            <span className="font-bold">{tournament.minPlayers} players</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground flex items-center gap-2">
                                                <Users className="w-4 h-4 text-secondary" />
                                                Registered:
                                            </span>
                                            <span className="font-bold">{tournament.participants}/{tournament.maxTeams} teams</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-accent" />
                                                Starts:
                                            </span>
                                            <span className="font-bold">
                                                {new Date(tournament.startDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div>
                                        <div className="h-2 bg-border rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-rgb transition-all duration-300"
                                                style={{ width: `${(tournament.participants / tournament.maxTeams) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {tournament.maxTeams - tournament.participants} slots remaining
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <Link href={`/tournaments/${tournament.id}/register`}>
                                        <button className="w-full py-3 bg-gradient-rgb rounded-lg font-bold hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2">
                                            <Trophy className="w-5 h-5" />
                                            Register Team
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredTournaments.length === 0 && (
                        <div className="text-center py-12">
                            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">No tournaments found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your filters to see more tournaments
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

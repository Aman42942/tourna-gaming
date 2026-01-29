"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Plus, Trash2, Trophy, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import { calculateTeamFee, formatCurrency, getGameValidator } from "@/lib/utils";

// Mock tournament data - this should come from database
const mockTournament = {
    id: "1",
    name: "Valorant Champions League Season 5",
    game: "Valorant",
    tier: "Elite",
    perPersonFee: 5000,
    prizePool: 500000,
    minPlayers: 5,
    maxPlayers: 5,
    startDate: "2026-02-15",
    color: "from-red-500 to-pink-500",
};

interface Player {
    name: string;
    gameId: string;
}

export default function RegisterPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [teamName, setTeamName] = useState("");
    const [players, setPlayers] = useState<Player[]>([
        { name: "", gameId: "" },
        { name: "", gameId: "" },
        { name: "", gameId: "" },
        { name: "", gameId: "" },
        { name: "", gameId: "" },
    ]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const tournament = mockTournament; // In real app, fetch from database using params.id
    const totalFee = calculateTeamFee(tournament.perPersonFee, players.length);
    const validator = getGameValidator(tournament.game);

    const addPlayer = () => {
        if (players.length < tournament.maxPlayers) {
            setPlayers([...players, { name: "", gameId: "" }]);
        }
    };

    const removePlayer = (index: number) => {
        if (players.length > tournament.minPlayers) {
            setPlayers(players.filter((_, i) => i !== index));
        }
    };

    const updatePlayer = (index: number, field: "name" | "gameId", value: string) => {
        const newPlayers = [...players];
        newPlayers[index][field] = value;
        setPlayers(newPlayers);

        // Clear error for this field
        const errorKey = `player${index}_${field}`;
        if (errors[errorKey]) {
            const newErrors = { ...errors };
            delete newErrors[errorKey];
            setErrors(newErrors);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!teamName.trim()) {
            newErrors.teamName = "Team name is required";
        }

        players.forEach((player, index) => {
            if (!player.name.trim()) {
                newErrors[`player${index}_name`] = "Player name is required";
            }
            if (!player.gameId.trim()) {
                newErrors[`player${index}_gameId`] = `${tournament.game} ID is required`;
            } else if (!validator(player.gameId)) {
                let format = "";
                switch (tournament.game.toLowerCase()) {
                    case "valorant":
                        format = "Username#Tag";
                        break;
                    case "pubg":
                    case "bgmi":
                        format = "Account ID";
                        break;
                    case "freefire":
                    case "free fire":
                        format = "10-12 digit UID";
                        break;
                }
                newErrors[`player${index}_gameId`] = `Invalid format. Use: ${format}`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // In real app, create team and registration in database
        // Then redirect to payment page

        setTimeout(() => {
            router.push(`/tournaments/1/payment?teamName=${encodeURIComponent(teamName)}&fee=${totalFee}`);
        }, 1000);
    };

    const getGameIdPlaceholder = () => {
        switch (tournament.game.toLowerCase()) {
            case "valorant":
                return "PlayerName#1234";
            case "pubg":
            case "bgmi":
                return "PUBG Account ID";
            case "freefire":
            case "free fire":
                return "1234567890";
            default:
                return "Game ID";
        }
    };

    const getGameIdLabel = () => {
        switch (tournament.game.toLowerCase()) {
            case "valorant":
                return "Riot ID (Username#Tag)";
            case "pubg":
            case "bgmi":
                return "PUBG Account ID";
            case "freefire":
            case "free fire":
                return "Free Fire UID";
            default:
                return "Game ID";
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <section className="pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute top-10 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />

                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-rgb bg-clip-text text-transparent">
                                Register Your Team
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {tournament.name}
                        </p>
                    </motion.div>

                    {/* Tournament Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass p-6 rounded-2xl border-rgb mb-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <Trophy className="w-6 h-6 text-neon-yellow mx-auto mb-2" />
                                <div className="text-2xl font-bold text-neon-yellow">
                                    {formatCurrency(tournament.prizePool)}
                                </div>
                                <div className="text-sm text-muted-foreground">Prize Pool</div>
                            </div>
                            <div className="text-center">
                                <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="text-2xl font-bold">
                                    {formatCurrency(tournament.perPersonFee)}
                                </div>
                                <div className="text-sm text-muted-foreground">Per Person Fee</div>
                            </div>
                            <div className="text-center">
                                <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
                                <div className="text-2xl font-bold">{tournament.minPlayers} Players</div>
                                <div className="text-sm text-muted-foreground">Required per Team</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Registration Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="glass p-8 rounded-2xl border-rgb"
                    >
                        {/* Team Name */}
                        <div className="mb-6">
                            <label htmlFor="teamName" className="block text-lg font-semibold mb-2">
                                Team Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="teamName"
                                type="text"
                                value={teamName}
                                onChange={(e) => {
                                    setTeamName(e.target.value);
                                    if (errors.teamName) {
                                        const newErrors = { ...errors };
                                        delete newErrors.teamName;
                                        setErrors(newErrors);
                                    }
                                }}
                                className={`w-full px-4 py-3 glass rounded-lg border ${errors.teamName ? "border-red-500" : "border-border"
                                    } focus:border-primary outline-none transition-colors`}
                                placeholder="Team Awesome"
                            />
                            {errors.teamName && (
                                <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.teamName}
                                </div>
                            )}
                        </div>

                        {/* Players */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    Players ({players.length}/{tournament.maxPlayers})
                                </h3>
                                {players.length < tournament.maxPlayers && (
                                    <button
                                        type="button"
                                        onClick={addPlayer}
                                        className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 text-neon-green"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Player
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                {players.map((player, index) => (
                                    <div key={index} className="glass p-4 rounded-lg border border-border">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-semibold">Player {index + 1}</span>
                                            {players.length > tournament.minPlayers && (
                                                <button
                                                    type="button"
                                                    onClick={() => removePlayer(index)}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Player Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={player.name}
                                                    onChange={(e) => updatePlayer(index, "name", e.target.value)}
                                                    className={`w-full px-3 py-2 glass rounded-lg border ${errors[`player${index}_name`] ? "border-red-500" : "border-border"
                                                        } focus:border-primary outline-none transition-colors text-sm`}
                                                    placeholder="John Doe"
                                                />
                                                {errors[`player${index}_name`] && (
                                                    <div className="mt-1 text-red-400 text-xs">
                                                        {errors[`player${index}_name`]}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    {getGameIdLabel()} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={player.gameId}
                                                    onChange={(e) => updatePlayer(index, "gameId", e.target.value)}
                                                    className={`w-full px-3 py-2 glass rounded-lg border ${errors[`player${index}_gameId`] ? "border-red-500" : "border-border"
                                                        } focus:border-primary outline-none transition-colors text-sm`}
                                                    placeholder={getGameIdPlaceholder()}
                                                />
                                                {errors[`player${index}_gameId`] && (
                                                    <div className="mt-1 text-red-400 text-xs">
                                                        {errors[`player${index}_gameId`]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pricing Summary */}
                        <div className="glass p-6 rounded-lg border-rgb-animated mb-6">
                            <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Per Person Fee:</span>
                                    <span className="font-bold">{formatCurrency(tournament.perPersonFee)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Total Players:</span>
                                    <span className="font-bold">× {players.length}</span>
                                </div>
                                <div className="border-t border-border pt-2 mt-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold">Total Amount:</span>
                                        <span className="text-2xl font-bold text-neon-yellow">
                                            {formatCurrency(totalFee)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <Link href="/tournaments" className="flex-1">
                                <button
                                    type="button"
                                    className="w-full py-3 glass rounded-lg font-bold hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-3 bg-gradient-rgb rounded-lg font-bold hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? "Processing..." : "Proceed to Payment"}
                                <CheckCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.form>
                </div>
            </section>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const games = [
    {
        name: "Valorant",
        color: "from-red-500 to-pink-500",
        icon: "🎯",
        description: "Tactical 5v5 shooter",
    },
    {
        name: "PUBG",
        color: "from-yellow-500 to-orange-500",
        icon: "🔫",
        description: "Battle Royale",
    },
    {
        name: "BGMI",
        color: "from-blue-500 to-cyan-500",
        icon: "🎮",
        description: "Mobile Battle Royale",
    },
    {
        name: "Free Fire",
        color: "from-purple-500 to-pink-500",
        icon: "🔥",
        description: "Fast-paced Action",
    },
];

export default function GamesShowcase() {
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
                            Supported Games
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Compete in your favorite titles
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className="group relative"
                        >
                            <div className="glass p-8 rounded-2xl border-rgb h-full flex flex-col items-center text-center space-y-4 cursor-pointer">
                                <div className="text-6xl group-hover:scale-125 transition-transform duration-300">
                                    {game.icon}
                                </div>
                                <h3 className={`text-2xl font-bold bg-gradient-to-r ${game.color} bg-clip-text text-transparent`}>
                                    {game.name}
                                </h3>
                                <p className="text-muted-foreground">{game.description}</p>

                                {/* Hover Glow Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${game.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300 blur-xl -z-10`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

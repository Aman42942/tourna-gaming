"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Crown } from "lucide-react";

const tiers = [
    {
        name: "Grassroots",
        tier: "low",
        description: "Perfect for beginners and casual players",
        priceRange: "₹50 - ₹200",
        features: [
            "Low entry fees",
            "Beginner-friendly",
            "Quick registrations",
            "Instant match updates",
        ],
        icon: Sparkles,
        color: "from-green-500 to-emerald-500",
        popular: false,
    },
    {
        name: "Challenger",
        tier: "medium",
        description: "For semi-professional competitive teams",
        priceRange: "₹500 - ₹2,000",
        features: [
            "Moderate prize pools",
            "Verified players only",
            "Professional brackets",
            "Live match tracking",
        ],
        icon: Zap,
        color: "from-yellow-500 to-orange-500",
        popular: true,
    },
    {
        name: "Elite",
        tier: "high",
        description: "Premium tournaments for pro players",
        priceRange: "₹5,000+",
        features: [
            "Massive prize pools",
            "KYC verification",
            "Live streaming",
            "Premium support",
        ],
        icon: Crown,
        color: "from-purple-500 to-pink-500",
        popular: false,
    },
];

export default function PricingTiers() {
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
                            Tournament Tiers
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Choose the competition level that matches your skills
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.tier}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                    <div className="bg-gradient-rgb px-4 py-1 rounded-full text-sm font-bold">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className={`glass p-8 rounded-2xl border-rgb h-full flex flex-col space-y-6 ${tier.popular ? 'border-rgb-animated scale-105' : ''}`}>
                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center mx-auto`}>
                                    <tier.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Header */}
                                <div className="text-center">
                                    <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                                        {tier.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                                    <div className={`text-2xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                                        {tier.priceRange}
                                    </div>
                                    <div className="text-xs text-muted-foreground">per person</div>
                                </div>

                                {/* Features */}
                                <ul className="flex-1 space-y-3">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tier.color}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button className={`w-full py-3 rounded-lg font-bold hover:scale-105 transition-transform duration-200 bg-gradient-to-r ${tier.color}`}>
                                    Browse {tier.name} Tournaments
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

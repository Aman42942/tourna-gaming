"use client";

import { motion } from "framer-motion";
import { UserPlus, Users, CreditCard, CheckCircle } from "lucide-react";

const steps = [
    {
        icon: UserPlus,
        title: "Create Account",
        description: "Sign up with Google, Facebook, or Email in seconds",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: Users,
        title: "Build Your Team",
        description: "Enter team name and add all player details with game IDs",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: CreditCard,
        title: "Pay & Register",
        description: "Choose your tournament and complete payment via UPI, Cards, or Wallets",
        color: "from-yellow-500 to-orange-500",
    },
    {
        icon: CheckCircle,
        title: "Join Community",
        description: "Get instant confirmation and WhatsApp group invitation",
        color: "from-green-500 to-emerald-500",
    },
];

export default function HowItWorks() {
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
                            How It Works
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Get started in 4 simple steps
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Connection Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
                            )}

                            <div className="glass p-6 rounded-2xl border-rgb h-full flex flex-col items-center text-center space-y-4 relative z-10">
                                {/* Step Number */}
                                <div className={`absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center font-bold text-lg`}>
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                                    <step.icon className="w-10 h-10 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Success Message Preview */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 max-w-2xl mx-auto"
                >
                    <div className="glass p-8 rounded-2xl border-rgb-animated text-center space-y-4">
                        <CheckCircle className="w-16 h-16 text-neon-green mx-auto" />
                        <h3 className="text-2xl font-bold text-neon-green">Registration Successful!</h3>
                        <p className="text-lg text-muted-foreground">
                            &quot;You will be added soon in our group&quot;
                        </p>
                        <p className="text-sm text-muted-foreground">
                            You&apos;ll receive a WhatsApp invitation with tournament details within minutes.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

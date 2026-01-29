"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Users, DollarSign, Calendar, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";

// Mock admin data
const stats = [
    {
        label: "Total Revenue",
        value: "₹12,45,000",
        change: "+23% from last month",
        icon: DollarSign,
        color: "from-green-500 to-emerald-500",
    },
    {
        label: "Active Tournaments",
        value: "24",
        change: "6 starting this week",
        icon: Trophy,
        color: "from-yellow-500 to-orange-500",
    },
    {
        label: "Registered Teams",
        value: "342",
        change: "+156 this month",
        icon: Users,
        color: "from-blue-500 to-cyan-500",
    },
    {
        label: "Total Users",
        value: "1,847",
        change: "+89 this week",
        icon: TrendingUp,
        color: "from-purple-500 to-pink-500",
    },
];

const recentRegistrations = [
    { team: "Pro Squad", tournament: "Valorant Champions", amount: 25000, date: "2 hours ago" },
    { team: "Elite Gamers", tournament: "PUBG Masters", amount: 4000, date: "5 hours ago" },
    { team: "Fire Squad", tournament: "Free Fire Elite", amount: 12000, date: "1 day ago" },
];

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />

            <section className="pt-24 pb-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">
                                <span className="bg-gradient-rgb bg-clip-text text-transparent">
                                    Admin Dashboard
                                </span>
                            </h1>
                            <p className="text-muted-foreground">
                                Welcome back, {session?.user?.name || "Admin"}
                            </p>
                        </div>
                        <Link href="/admin/tournaments/create">
                            <button className="bg-gradient-rgb px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Create Tournament
                            </button>
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-6 rounded-2xl border-rgb"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                                <div className="text-xs text-neon-green">{stat.change}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Registrations */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass p-6 rounded-2xl border-rgb"
                    >
                        <h2 className="text-2xl font-bold mb-6">Recent Registrations</h2>
                        <div className="space-y-4">
                            {recentRegistrations.map((reg, index) => (
                                <div key={index} className="flex items-center justify-between p-4 glass rounded-lg">
                                    <div>
                                        <div className="font-bold">{reg.team}</div>
                                        <div className="text-sm text-muted-foreground">{reg.tournament}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-neon-yellow">₹{(reg.amount / 1000).toFixed(0)}K</div>
                                        <div className="text-xs text-muted-foreground">{reg.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                    >
                        <Link href="/admin/tournaments" className="glass p-6 rounded-2xl border-rgb hover:border-rgb-animated transition-all">
                            <Trophy className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-2">Manage Tournaments</h3>
                            <p className="text-sm text-muted-foreground">Create, edit, and delete tournaments</p>
                        </Link>
                        <Link href="/admin/users" className="glass p-6 rounded-2xl border-rgb hover:border-rgb-animated transition-all">
                            <Users className="w-12 h-12 text-secondary mb-4" />
                            <h3 className="text-xl font-bold mb-2">User Management</h3>
                            <p className="text-sm text-muted-foreground">View and manage registered users</p>
                        </Link>
                        <Link href="/admin/analytics" className="glass p-6 rounded-2xl border-rgb hover:border-rgb-animated transition-all">
                            <TrendingUp className="w-12 h-12 text-accent mb-4" />
                            <h3 className="text-xl font-bold mb-2">Analytics</h3>
                            <p className="text-sm text-muted-foreground">Revenue reports and insights</p>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Wallet, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { formatCurrency } from "@/lib/utils";

declare global {
    interface RazorpayResponse {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    }

    interface RazorpayOptions {
        key: string | undefined;
        amount: number;
        currency: string;
        name: string;
        description: string;
        order_id: string;
        handler: (response: RazorpayResponse) => void;
        prefill: {
            name: string;
        };
        theme: {
            color: string;
        };
        modal: {
            ondismiss: () => void;
        };
    }

    interface Window {
        Razorpay: new (options: RazorpayOptions) => {
            open: () => void;
        };
    }
}

export default function PaymentPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const teamName = searchParams.get("teamName") || "Team";
    const fee = parseInt(searchParams.get("fee") || "0");

    const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "stripe">("razorpay");
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Load Razorpay SDK
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleRazorpayPayment = async () => {
        setIsProcessing(true);

        try {
            // Create order on backend
            const response = await fetch("/api/payments/razorpay/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: fee,
                    tournamentId: params.id,
                    teamName,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create order");
            }

            // Initialize Razorpay
            const options: RazorpayOptions = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: "INR",
                name: "Elite Gaming Tournaments",
                description: `Registration: ${teamName}`,
                order_id: data.orderId,
                handler: function () {
                    // Payment successful
                    setShowSuccess(true);
                    setIsProcessing(false);
                },
                prefill: {
                    name: teamName,
                },
                theme: {
                    color: "#6366f1",
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error: unknown) {
            console.error("Payment error:", error);
            const message = error instanceof Error ? error.message : "Payment failed. Please try again.";
            alert(message);
            setIsProcessing(false);
        }
    };

    const handleStripePayment = async () => {
        setIsProcessing(true);

        try {
            const response = await fetch("/api/payments/stripe/create-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: fee,
                    tournamentId: params.id,
                    teamName,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create session");
            }

            // Redirect to Stripe checkout
            window.location.href = data.url;
        } catch (error: unknown) {
            console.error("Payment error:", error);
            const message = error instanceof Error ? error.message : "Payment failed. Please try again.";
            alert(message);
            setIsProcessing(false);
        }
    };

    const handlePayment = () => {
        if (paymentMethod === "razorpay") {
            handleRazorpayPayment();
        } else {
            handleStripePayment();
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="min-h-[80vh] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl w-full"
                    >
                        <div className="glass p-12 rounded-2xl border-rgb-animated text-center space-y-6">
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                            >
                                <CheckCircle className="w-24 h-24 text-neon-green mx-auto" />
                            </motion.div>

                            {/* Success Message */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h2 className="text-4xl font-bold text-neon-green mb-4">
                                    Registration Successful!
                                </h2>
                                <div className="glass p-6 rounded-xl border border-neon-green/30 mb-6">
                                    <p className="text-2xl font-semibold text-neon-green mb-2">
                                        &quot;You will be added soon in our group&quot;
                                    </p>
                                </div>
                                <p className="text-lg text-muted-foreground mb-2">
                                    Team: <span className="font-bold text-foreground">{teamName}</span>
                                </p>
                                <p className="text-muted-foreground">
                                    You&apos;ll receive a WhatsApp invitation with tournament details within minutes.
                                    Check your phone for the group link!
                                </p>
                            </motion.div>

                            {/* Next Steps */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="border-t border-border pt-6 space-y-3"
                            >
                                <h3 className="text-lg font-semibold mb-4">What&apos;s Next?</h3>
                                <div className="grid grid-cols-1 gap-3 text-sm text-left">
                                    <div className="flex items-start gap-3 glass p-4 rounded-lg">
                                        <div className="w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-neon-green font-bold text-xs">1</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Check WhatsApp</div>
                                            <div className="text-muted-foreground">
                                                You&apos;ll receive an invitation link to the tournament coordination group
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 glass p-4 rounded-lg">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-primary font-bold text-xs">2</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Join the Group</div>
                                            <div className="text-muted-foreground">
                                                Get match schedules, brackets, and updates from admins
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 glass p-4 rounded-lg">
                                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-secondary font-bold text-xs">3</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Prepare for Battle</div>
                                            <div className="text-muted-foreground">
                                                Practice with your team and get ready to dominate!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6">
                                <button
                                    onClick={() => router.push("/tournaments")}
                                    className="flex-1 py-3 glass rounded-lg font-bold hover:bg-white/10 transition-colors"
                                >
                                    Browse More Tournaments
                                </button>
                                <button
                                    onClick={() => router.push("/dashboard")}
                                    className="flex-1 py-3 bg-gradient-rgb rounded-lg font-bold hover:scale-105 transition-transform"
                                >
                                    View Dashboard
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />

            <section className="pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute top-10 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />

                <div className="container mx-auto px-4 relative z-10 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-rgb bg-clip-text text-transparent">
                                Complete Payment
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Team: {teamName}
                        </p>
                    </motion.div>

                    {/* Payment Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass p-8 rounded-2xl border-rgb mb-6"
                    >
                        <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Team Name:</span>
                                <span className="font-bold">{teamName}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Tournament:</span>
                                <span className="font-bold">Valorant Champions League</span>
                            </div>
                            <div className="border-t border-border pt-3 mt-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold">Total Amount:</span>
                                    <span className="text-3xl font-bold text-neon-yellow">
                                        {formatCurrency(fee)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Method Selection */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass p-8 rounded-2xl border-rgb mb-6"
                    >
                        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>

                        <div className="space-y-3">
                            {/* Razorpay */}
                            <button
                                onClick={() => setPaymentMethod("razorpay")}
                                className={`w-full p-4 rounded-lg border-2 transition-all ${paymentMethod === "razorpay"
                                        ? "border-primary bg-primary/10"
                                        : "border-border glass hover:border-primary/50"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                        <Wallet className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-bold">Razorpay (India)</div>
                                        <div className="text-sm text-muted-foreground">
                                            UPI, Cards, Wallets, Net Banking (0% fees on UPI!)
                                        </div>
                                    </div>
                                    {paymentMethod === "razorpay" && (
                                        <CheckCircle className="w-6 h-6 text-primary" />
                                    )}
                                </div>
                            </button>

                            {/* Stripe */}
                            <button
                                onClick={() => setPaymentMethod("stripe")}
                                className={`w-full p-4 rounded-lg border-2 transition-all ${paymentMethod === "stripe"
                                        ? "border-secondary bg-secondary/10"
                                        : "border-border glass hover:border-secondary/50"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-bold">Stripe (International)</div>
                                        <div className="text-sm text-muted-foreground">
                                            Credit/Debit Cards (All currencies accepted)
                                        </div>
                                    </div>
                                    {paymentMethod === "stripe" && (
                                        <CheckCircle className="w-6 h-6 text-secondary" />
                                    )}
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Security Notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass p-4 rounded-lg border border-neon-green/30 mb-6 flex items-start gap-3 text-sm"
                    >
                        <AlertCircle className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                        <div>
                            <div className="font-semibold text-neon-green mb-1">Secure Payment</div>
                            <div className="text-muted-foreground">
                                Your payment is processed securely through {paymentMethod === "razorpay" ? "Razorpay" : "Stripe"}.
                                We never store your card details.
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => router.back()}
                            disabled={isProcessing}
                            className="flex-1 py-3 glass rounded-lg font-bold hover:bg-white/10 transition-colors disabled:opacity-50"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="flex-1 py-3 bg-gradient-rgb rounded-lg font-bold hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Pay {formatCurrency(fee)}
                                    <CheckCircle className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

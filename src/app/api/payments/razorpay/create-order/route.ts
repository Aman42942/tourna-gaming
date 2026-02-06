import { NextResponse } from "next/server";
import Razorpay from "razorpay";

interface CreateOrderPayload {
    amount: number;
    tournamentId?: string;
    teamName?: string;
}

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(request: Request) {
    try {
        const payload = (await request.json()) as CreateOrderPayload;

        if (!payload || typeof payload.amount !== "number") {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        const { amount, tournamentId, teamName } = payload;

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                tournamentId,
                teamName,
            },
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error: unknown) {
        console.error("Razorpay order creation error:", error);
        const message = error instanceof Error ? error.message : "Failed to create order";
        return NextResponse.json(
            { message },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        // Verify signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json(
                { message: "Invalid signature" },
                { status: 400 }
            );
        }

        // TODO: Update registration status in database
        // await prisma.registration.update({...})

        // TODO: Send WhatsApp invitation
        // This would integrate with WhatsApp Business API

        return NextResponse.json({
            success: true,
            message: "Payment verified successfully",
        });
    } catch (error: any) {
        console.error("Payment verification error:", error);
        return NextResponse.json(
            { message: error.message || "Verification failed" },
            { status: 500 }
        );
    }
}

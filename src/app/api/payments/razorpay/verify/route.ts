import { NextResponse } from "next/server";
import crypto from "crypto";

interface VerifyPayload {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as VerifyPayload;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json(
                { message: "Missing payment verification fields" },
                { status: 400 }
            );
        }

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
    } catch (error: unknown) {
        console.error("Payment verification error:", error);
        const message = error instanceof Error ? error.message : "Verification failed";
        return NextResponse.json(
            { message },
            { status: 500 }
        );
    }
}

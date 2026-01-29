import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Calculate tournament fee based on per-person pricing
 */
export function calculateTeamFee(perPersonFee: number, playerCount: number): number {
    return perPersonFee * playerCount;
}

/**
 * Format currency for display (INR/USD)
 */
export function formatCurrency(amount: number, currency: "INR" | "USD" = "INR"): string {
    if (currency === "INR") {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount);
    }
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}

/**
 * Validate Riot ID format (Username#Tag)
 */
export function validateRiotId(riotId: string): boolean {
    const regex = /^.{3,16}#[a-zA-Z0-9]{3,5}$/;
    return regex.test(riotId);
}

/**
 * Validate PUBG/BGMI Account ID
 */
export function validatePubgId(pubgId: string): boolean {
    // PUBG IDs are typically alphanumeric
    const regex = /^[a-zA-Z0-9_-]{5,30}$/;
    return regex.test(pubgId);
}

/**
 * Validate Free Fire UID (10-12 digits)
 */
export function validateFreeFireUid(uid: string): boolean {
    const regex = /^\d{10,12}$/;
    return regex.test(uid);
}

/**
 * Get game-specific validation function
 */
export function getGameValidator(game: string): (id: string) => boolean {
    switch (game.toLowerCase()) {
        case "valorant":
            return validateRiotId;
        case "pubg":
        case "bgmi":
            return validatePubgId;
        case "freefire":
        case "free fire":
            return validateFreeFireUid;
        default:
            return () => true;
    }
}

/**
 * Get price tier color
 */
export function getTierColor(tier: "low" | "medium" | "high"): string {
    switch (tier) {
        case "low":
            return "text-neon-green";
        case "medium":
            return "text-neon-yellow";
        case "high":
            return "text-neon-pink";
        default:
            return "text-foreground";
    }
}

/**
 * Get price tier label
 */
export function getTierLabel(tier: "low" | "medium" | "high"): string {
    switch (tier) {
        case "low":
            return "Grassroots";
        case "medium":
            return "Challenger";
        case "high":
            return "Elite";
        default:
            return tier;
    }
}

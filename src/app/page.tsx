import Navbar from "@/components/ui/navbar";
import Hero from "@/components/sections/hero";
import FeaturedTournaments from "@/components/sections/featured-tournaments";
import GamesShowcase from "@/components/sections/games-showcase";
import HowItWorks from "@/components/sections/how-it-works";
import PricingTiers from "@/components/sections/pricing-tiers";

export default function Home() {
    return (
        <main className="relative">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <Hero />

            {/* Games Showcase */}
            <GamesShowcase />

            {/* Featured Tournaments */}
            <FeaturedTournaments />

            {/* Pricing Tiers */}
            <PricingTiers />

            {/* How It Works */}
            <HowItWorks />
        </main>
    );
}

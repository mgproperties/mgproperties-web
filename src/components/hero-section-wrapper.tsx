"use client";

import dynamic from "next/dynamic";

// Dynamically import the hero section to avoid SSR issues
const HeroSectionComponent = dynamic(() => import("./hero-section-client"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-secondary/90 flex items-center justify-center">
            <div className="text-white text-xl">Loading...</div>
        </div>
    ),
});

export default function HeroSection() {
    return <HeroSectionComponent />;
}

"use client";

import dynamic from "next/dynamic";

// Dynamically import the hero section to avoid SSR issues
const HeroSectionComponent = dynamic(() => import("./hero-section-client"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-secondary/90 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tr from-accent/8 to-primary/5 rounded-full blur-2xl animate-pulse delay-1000" />
                <div className="absolute inset-0 opacity-[0.03]">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>
            </div>

            {/* Loading Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    {/* Animated Logo/Icon */}
                    <div className="relative mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto flex items-center justify-center animate-bounce">
                            <div className="w-8 h-8 bg-white rounded-lg animate-pulse" />
                        </div>
                        <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-white/20 rounded-2xl animate-spin" />
                    </div>

                    {/* Loading Text */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white animate-pulse">
                            Loading Your Dream Home Experience
                        </h2>
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
                        </div>
                    </div>

                    {/* Skeleton Elements */}
                    <div className="mt-12 space-y-4 max-w-md mx-auto">
                        <div className="h-4 bg-white/10 rounded-full animate-pulse" />
                        <div className="h-4 bg-white/10 rounded-full w-3/4 mx-auto animate-pulse delay-100" />
                        <div className="h-4 bg-white/10 rounded-full w-1/2 mx-auto animate-pulse delay-200" />
                    </div>
                </div>
            </div>
        </div>
    ),
});

export default function HeroSection() {
    return <HeroSectionComponent />;
}

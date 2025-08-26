"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    UserRound,
    TrendingUp,
    Award,
    Landmark,
    Users,
    ArrowRight,
    Home,
    MapPin,
    Key,
    Heart,
} from "lucide-react";

export default function HeroSectionClient() {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-secondary via-secondary to-secondary/90 overflow-hidden">
            {/* Warm Geometric Background Elements */}
            <div className="absolute inset-0">
                {/* Soft geometric shapes */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl" />
                <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tr from-accent/8 to-primary/5 rounded-full blur-2xl" />

                {/* Subtle grid pattern */}
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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="text-center max-w-6xl mx-auto">
                    {/* Premium Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-accent-600 rounded-full text-white font-semibold mb-8 animate-fade-in hover:scale-105 transition-transform cursor-pointer shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" />
                        🏆 #1 Trusted Real Estate Platform
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </div>

                    {/* Hero Headlines - Editorial Style */}
                    <div className="mb-12 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-white mb-6">
                            <span className="block">Discover Your</span>
                            <span className="block bg-gradient-to-r from-accent via-accent-600 to-accent-700 bg-clip-text text-transparent">
                                Dream Home
                            </span>
                        </h1>
                        <div className="mt-8 text-xl md:text-2xl text-white/90 font-medium">
                            with our{" "}
                            <span className="text-accent font-bold animate-pulse">
                                With our Expert Guidance
                            </span>
                        </div>
                    </div>

                    {/* Service Highlights - Visual Elements */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 mb-16 max-w-5xl mx-auto shadow-2xl animate-fade-in border border-white/20">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                Your Real Estate Journey Starts Here
                            </h3>
                            <p className="text-slate-600">
                                Professional service, personalized solutions,
                                proven results
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: Home,
                                    title: "Find Properties",
                                    description:
                                        "Browse our curated selection of premium homes",
                                    gradient: "from-primary/10 to-accent/10",
                                },
                                {
                                    icon: MapPin,
                                    title: "Expert Guidance",
                                    description:
                                        "Local market knowledge and professional advice",
                                    gradient: "from-accent/10 to-primary/10",
                                },
                                {
                                    icon: Key,
                                    title: "Smooth Process",
                                    description:
                                        "Seamless transactions from start to finish",
                                    gradient: "from-primary/10 to-secondary/10",
                                },
                                {
                                    icon: Heart,
                                    title: "Perfect Match",
                                    description:
                                        "Find the home that's right for your lifestyle",
                                    gradient: "from-secondary/10 to-accent/10",
                                },
                            ].map((service, index) => (
                                <div
                                    key={index}
                                    className="group text-center p-6 rounded-2xl hover:shadow-lg transition-all hover:scale-105 cursor-pointer relative overflow-hidden"
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`}
                                    />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <service.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-800 mb-2">
                                            {service.title}
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Buttons - Sophisticated */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
                        <Link href="/properties">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white/30 text-white hover:bg-white hover:text-secondary transition-all px-12 py-6 text-xl rounded-2xl group backdrop-blur-sm bg-white/10 font-semibold"
                            >
                                <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                Browse Properties
                            </Button>
                        </Link>
                    </div>

                    {/* Stats - Layered Cards */}
                    <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto animate-fade-in">
                        {[
                            {
                                icon: Award,
                                value: "15+",
                                label: "Years Experience",
                                gradient: "from-accent to-accent-600",
                            },
                            {
                                icon: TrendingUp,
                                value: "10 000+",
                                label: "Valuations Conducted",
                                gradient: "from-primary to-primary-600",
                            },
                            {
                                icon: Landmark,
                                value: "5000+",
                                label: "Propeties Sold or Rented Out",
                                gradient: "from-secondary to-secondary-600",
                            },
                            {
                                icon: UserRound,
                                value: "98%",
                                label: "Client Satisfaction",
                                gradient: "from-secondary to-secondary-600",
                            },
                            {
                                icon: Users,
                                value: "20 000+",
                                label: "Clients",
                                gradient: "from-secondary to-secondary-600",
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer relative overflow-hidden w-full max-w-sm flex-shrink-0 md:w-80"
                            >
                                {/* Gradient overlay */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`}
                                />
                                <div className="relative z-10 text-center">
                                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <stat.icon className="h-10 w-10 text-primary" />
                                    </div>
                                    <div className="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-700 font-semibold text-lg">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

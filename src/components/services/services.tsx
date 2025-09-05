import { Card, CardContent } from "@/components/ui/card";
import {
    Home,
    Calculator,
    Handshake,
    Key,
    TrendingUp,
    Building,
    ArrowRight,
} from "lucide-react";

const services = [
    {
        icon: Calculator,
        title: "Property Valuations",
        description:
            "Get a comprehensive valuation report for your property, including market analysis and pricing strategies.",
        color: "from-primary to-primary-600",
    },
    {
        icon: Handshake,
        title: "Sales",
        description:
            "Expert guidance through the entire sales process, from listing to closing, ensuring maximum value for your property.",
        color: "from-accent to-accent-600",
    },
    {
        icon: Key,
        title: "Lettings/Rentals",
        description:
            "Comprehensive support for landlords and tenants, including property marketing, and tenant screening.",
        color: "from-secondary to-secondary-600",
    },
    {
        icon: Building,
        title: "Property Management",
        description:
            "Full-service property and lease management for landlords and real estate investors seeking passive income.",
        color: "from-primary to-accent",
    },
    {
        icon: TrendingUp,
        title: "Property Investment Consulting",
        description:
            "Strategic advice for real estate investors, including market trends, property selection, and portfolio management.",
        color: "from-accent to-primary",
    },
];

export function Services() {
    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-green-50/30 relative overflow-hidden">
            {/* Soft background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/3 rounded-full blur-2xl" />
                <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-tr from-accent/3 to-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Editorial Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full text-primary font-semibold mb-8">
                        Our Services
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800 leading-tight">
                        End-to-End Real Estate
                        <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Expertise
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        From property search to investment consulting, we
                        provide comprehensive services tailored to your unique
                        needs and goals
                    </p>
                </div>

                {/* Services Grid - Layered Cards */}
                <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-3xl overflow-hidden hover:scale-[1.02] w-full max-w-sm flex-shrink-0 md:w-80"
                        >
                            <CardContent className="p-8 relative">
                                {/* Gradient background accent */}
                                <div
                                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.color} opacity-10 rounded-bl-3xl group-hover:opacity-20 transition-opacity`}
                                />

                                {/* Icon */}
                                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <service.icon className="h-8 w-8 text-primary" />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors text-slate-800 leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {service.description}
                                </p>
                                {/* 
                                <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all cursor-pointer">
                                    <span>Learn more</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div> */}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

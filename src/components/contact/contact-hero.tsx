import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactHero() {
    return (
        <section className="relative py-32 bg-gradient-to-br from-secondary via-secondary to-secondary/90 overflow-hidden">
            {/* Warm geometric background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl" />
                <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tr from-accent/8 to-primary/5 rounded-full blur-2xl" />

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
                <div className="text-center">
                    {/* Premium badge */}
                    <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-accent-600 rounded-full text-white font-semibold mb-8">
                        Get In Touch
                    </Badge>

                    {/* Editorial headline */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                        Let's Find Your
                        <span className="block bg-gradient-to-r from-accent via-accent-600 to-accent-700 bg-clip-text text-transparent">
                            Perfect Home
                        </span>
                    </h1>

                    <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-600 mx-auto mb-8" />

                    {/* Subtitle */}
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-medium">
                            Ready to start your real estate journey? Our expert
                            team is here to guide you through every step of the
                            process with personalized service and professional
                            expertise.
                        </p>

                        <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                            Whether you're buying, selling, investing, or needing a valuation, we're
                            committed to making your real estate experience
                            seamless and successful.
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-4xl font-bold  bg-gradient-to-r from-accent via-accent-600 to-accent-700 bg-clip-text text-transparent mt-9 -mb-7 tracking-tight">
                        Main Office
                    </h1>
                    {/* Quick contact info */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Phone,
                                label: "Call Us",
                                value: "(+267) 3105497",
                            },
                            {
                                icon: Mail,
                                label: "Email Us",
                                value: "info@mgproperties.co.bw",
                            },
                            {
                                icon: MapPin,
                                label: "Visit Us",
                                value: "Plot 20695 Unit 7, Gaborone",
                            },
                            {
                                icon: Clock,
                                label: "Office Hours",
                                value: "Mon-Fri 8AM-5PM",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                            >
                                <item.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                                <div className="text-sm text-white/70 font-medium mb-1">
                                    {item.label}
                                </div>
                                <div className="text-white font-semibold">
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

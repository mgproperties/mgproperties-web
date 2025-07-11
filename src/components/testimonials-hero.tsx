import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, TrendingUp } from "lucide-react";

export function TestimonialsHero() {
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
                        Client Success Stories
                    </Badge>

                    {/* Editorial headline */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                        Real Stories from
                        <span className="block bg-gradient-to-r from-accent via-accent-600 to-accent-700 bg-clip-text text-transparent">
                            Real Clients
                        </span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-600 mx-auto mb-8" />
                    <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                        Discover how we've helped families, investors, and
                        businesses achieve their real estate goals with
                        personalized service and expert guidance
                    </p>

                    {/* Quick Stats */}
                    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl mx-auto mb-4 backdrop-blur-sm border border-white/20">
                                <Star className="h-8 w-8 text-accent" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">
                                4.9/5
                            </div>
                            <div className="text-white/80 text-sm">
                                Average Rating
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mx-auto mb-4 backdrop-blur-sm border border-white/20">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">
                                1,200+
                            </div>
                            <div className="text-white/80 text-sm">
                                Happy Clients
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl mx-auto mb-4 backdrop-blur-sm border border-white/20">
                                <Award className="h-8 w-8 text-accent" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">
                                98%
                            </div>
                            <div className="text-white/80 text-sm">
                                Satisfaction Rate
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mx-auto mb-4 backdrop-blur-sm border border-white/20">
                                <TrendingUp className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">
                                500+
                            </div>
                            <div className="text-white/80 text-sm">
                                Transactions
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}

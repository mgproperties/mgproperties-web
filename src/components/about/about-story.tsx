import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Heart, Target, Lightbulb, Box } from "lucide-react";

export function AboutStory() {
    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-green-50/30 relative overflow-hidden">
            {/* Soft background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/3 rounded-full blur-2xl" />
                <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-tr from-accent/3 to-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column - Story */}
                    <div>
                        <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full text-primary font-semibold mb-8">
                            Our Story
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-800 leading-tight">
                            Building Dreams,
                            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-3">
                                Creating Homes
                            </span>
                        </h2>

                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                In 2009, I embarked on a journey that has since
                                helped many people in Botswana. From first-time
                                homeowners nesting their young families, or the
                                budding corporate professionals looking to set
                                up in the cities, to the seasoned property
                                investors who, from that moment, have trusted
                                our word, to the institutional clients,
                                parastatals, and multinationals, we have built
                                our reputation on the values that have
                                differentiated us from the rest.
                            </p>

                            <p>
                                As we continue to set the standards for
                                excellence in the real estate industry in
                                Botswana, our aim is to expand into SADC while
                                maintaining the same core values, which have
                                remained unchanged since the first moment we
                                opened our doors.
                            </p>

                            <p>
                                Our belief in maintaining long-lasting
                                relationships with our numerous clients has been
                                paramount in our development.
                            </p>

                            <p>Thank you to all those who have trusted us.</p>

                            <p>Yours truly,</p>

                            <p>
                                Mpho Moremong-Gobe <br />
                                (Founder)
                            </p>
                        </div>
                        {/* Vision */}
                        <Card className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border-0 overflow-hidden">
                            <CardContent className="p-8">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl">
                                        <Box className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-4">
                                            Our Vision
                                        </h3>
                                        <p className="text-slate-700 leading-relaxed text-lg">
                                            To be the leading real estate
                                            experts in Botswana and Southern
                                            Africa region
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Mission Statement */}
                        <Card className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border-0 overflow-hidden">
                            <CardContent className="p-8">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl">
                                        <Target className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-4">
                                            Our Mission
                                        </h3>
                                        <p className="text-slate-700 leading-relaxed text-lg">
                                            Built by a high calibre team of
                                            professionals, MG Properties
                                            specilaizes in property valuations,
                                            estate agency, property management,
                                            and general property consultancy
                                            with high level of profellionalism,
                                            integrity and unique service
                                            delivery
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Values */}
                    <div className="space-y-8">
                        <div>
                            <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-full text-accent font-semibold mb-6">
                                Our Values
                            </Badge>
                            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 leading-tight">
                                What Drives
                                <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                                    Everything We Do
                                </span>
                            </h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: Home,
                                    title: "Integrity",
                                    description:
                                        "We build lasting relationships through honest communication and transparent business practices.",
                                    gradient: "from-accent/10 to-primary/10",
                                },
                                {
                                    icon: Lightbulb,
                                    title: "Honesty/Transparency",
                                    description:
                                        "We believe in open communication and transparency in all our dealings, ensuring trust and clarity.",
                                    gradient: "from-primary/10 to-secondary/10",
                                },
                                {
                                    icon: Heart,
                                    title: "Professionalism",
                                    description:
                                        "We uphold the highest standards of professionalism, ensuring our clients receive expert advice and exceptional service.",
                                    gradient: "from-primary/10 to-accent/10",
                                },
                                {
                                    icon: Heart,
                                    title: "Humility/Setho",
                                    description:
                                        "We approach every client with humility, understanding their unique needs and treating them with respect.",
                                    gradient: "from-primary/10 to-accent/10",
                                },
                                {
                                    icon: Heart,
                                    title: "Customer Focus",
                                    description:
                                        "Every decision we make is guided by what's best for our clients, not what's easiest for us.",
                                    gradient: "from-primary/10 to-accent/10",
                                },
                            ].map((value, index) => (
                                <Card
                                    key={index}
                                    className="bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] overflow-hidden group"
                                >
                                    <CardContent className="p-6 relative">
                                        <div
                                            className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-bl-2xl`}
                                        />
                                        <div className="flex items-start space-x-4">
                                            <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl group-hover:scale-110 transition-transform">
                                                <value.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-800 mb-3">
                                                    {value.title}
                                                </h4>
                                                <p className="text-slate-600 leading-relaxed">
                                                    {value.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

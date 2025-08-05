import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Bed,
    Bath,
    Square,
    MapPin,
    Heart,
    Share2,
    ArrowRight,
} from "lucide-react";
import Image from "next/image";

const properties = [
    {
        id: 1,
        title: "Modern Family Home",
        price: "$750,000",
        location: "Beverly Hills, CA",
        beds: 4,
        baths: 3,
        sqft: "2,500",
        image: "/placeholder.svg?height=300&width=400",
        status: "For Sale",
        featured: true,
    },
    {
        id: 2,
        title: "Downtown Luxury Condo",
        price: "$1,200,000",
        location: "Manhattan, NY",
        beds: 2,
        baths: 2,
        sqft: "1,800",
        image: "/placeholder.svg?height=300&width=400",
        status: "New Listing",
        featured: false,
    },
    {
        id: 3,
        title: "Suburban Villa",
        price: "$950,000",
        location: "Austin, TX",
        beds: 5,
        baths: 4,
        sqft: "3,200",
        image: "/placeholder.svg?height=300&width=400",
        status: "For Sale",
        featured: true,
    },
];

export function FeaturedProperties() {
    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-green-50/30 relative overflow-hidden">
            {/* Soft geometric background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/3 rounded-full blur-2xl" />
                <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tr from-accent/3 to-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Editorial Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full text-primary font-semibold mb-8">
                        Featured Properties
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800 leading-tight">
                        Handpicked Premium
                        <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Properties
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Discover our carefully curated selection of exceptional
                        homes that define luxury living and smart investments
                    </p>
                </div>

                {/* Properties Grid - Magazine Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <Card
                            key={property.id}
                            className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-3xl hover:scale-[1.02]"
                        >
                            <div className="relative overflow-hidden">
                                <Image
                                    src={property.image || "/placeholder.svg"}
                                    alt={property.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Premium Status Badge */}
                                <Badge
                                    className={`absolute top-4 left-4 px-4 py-2 rounded-xl font-semibold ${
                                        property.status === "New Listing"
                                            ? "bg-gradient-to-r from-accent to-accent-600 text-white"
                                            : "bg-white/90 text-slate-700 backdrop-blur-sm"
                                    }`}
                                >
                                    {property.status}
                                </Badge>

                                {/* Action buttons */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button
                                        size="icon"
                                        className="bg-white/90 hover:bg-white text-slate-700 rounded-xl shadow-lg backdrop-blur-sm"
                                    >
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        className="bg-white/90 hover:bg-white text-slate-700 rounded-xl shadow-lg backdrop-blur-sm"
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <CardContent className="p-8">
                                <div className="flex items-center text-slate-500 mb-4">
                                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                                    <span className="text-sm font-medium">
                                        {property.location}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors text-slate-800 leading-tight">
                                    {property.title}
                                </h3>

                                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-8">
                                    {property.price}
                                </div>

                                <div className="flex items-center justify-between text-slate-600 mb-8">
                                    <div className="flex items-center bg-gradient-to-r from-primary/5 to-accent/5 px-4 py-3 rounded-xl">
                                        <Bed className="h-4 w-4 mr-2 text-primary" />
                                        <span className="text-sm font-semibold">
                                            {property.beds}
                                        </span>
                                    </div>
                                    <div className="flex items-center bg-gradient-to-r from-primary/5 to-accent/5 px-4 py-3 rounded-xl">
                                        <Bath className="h-4 w-4 mr-2 text-primary" />
                                        <span className="text-sm font-semibold">
                                            {property.baths}
                                        </span>
                                    </div>
                                    <div className="flex items-center bg-gradient-to-r from-primary/5 to-accent/5 px-4 py-3 rounded-xl">
                                        <Square className="h-4 w-4 mr-2 text-primary" />
                                        <span className="text-sm font-semibold">
                                            {property.sqft}
                                        </span>
                                    </div>
                                </div>

                                <Button className="w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all rounded-2xl py-4 font-semibold">
                                    View Details
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-2 border-primary/30 text-slate-700 hover:bg-primary hover:text-white transition-all px-8 py-4 text-lg rounded-2xl font-semibold shadow-lg hover:shadow-xl"
                    >
                        View All Properties
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Bed,
    Bath,
    Square,
    MapPin,
    Calendar,
    Home,
    Mail,
    Phone,
    User,
    CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { PropertyImageCarousel } from "./property-image-carousel"; // Import the new carousel component

interface Property {
    propertyID: number;
    title: string;
    price: string;
    originalPrice?: string;
    location: string;
    beds: number;
    baths: number;
    sqm: number;
    images: string[];
    imageCount: number;
    status: string;
    featured: boolean;
    listedOn: string;
    daysOnMarket?: number;
    priceReduced: boolean;
    features: string[];
    description: string;
    openHouse?: string;
    agent: {
        name: string;
        role: string;
        image: string;
        phone: string;
        email: string;
    };
}

interface PropertyDetailProps {
    property: Property;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case "For Sale":
                return "bg-gradient-to-r from-primary to-primary-600 text-white";
            case "For Rent":
                return "bg-gradient-to-r from-secondary to-secondary-600 text-white";
            case "Under Offer":
                return "bg-gradient-to-r from-accent to-accent-600 text-white";
            case "Sold":
                return "bg-gradient-to-r from-slate-500 to-slate-600 text-white";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden">
            {/* Soft geometric background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/3 rounded-full blur-2xl" />
                <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tr from-accent/3 to-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {" "}
                {/* Reduced max-w to 6xl */}
                {/* Property Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-4">
                            {property.title}
                        </h1>
                        <div className="flex items-center text-slate-600 mb-4">
                            <MapPin className="h-5 w-5 mr-2 text-primary" />
                            <span className="text-lg font-medium">
                                {property.location}
                            </span>
                        </div>
                        <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {property.price}
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-4">
                        <Badge
                            className={`px-5 py-2 rounded-full text-lg font-semibold ${getStatusBadgeClass(
                                property.status
                            )}`}
                        >
                            {property.status}
                        </Badge>
                        {/* Removed Like and Share Buttons */}
                    </div>
                </div>
                {/* Property Image Carousel */}
                <div className="mb-12">
                    <PropertyImageCarousel
                        images={property.images}
                        title={property.title}
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Description & Features */}
                    <div className="lg:col-span-2">
                        {/* Property Overview (Refined UI) */}
                        <Card className="bg-white rounded-3xl border-0 shadow-lg mb-12">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                                    Property Overview
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-700">
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <Bed className="h-6 w-6 text-primary" />
                                        <span className="font-semibold text-lg">
                                            {property.beds} {property.beds === 1 ? 'Bedroom' : 'Bedrooms'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <Bath className="h-6 w-6 text-primary" />
                                        <span className="font-semibold text-lg">
                                            {property.baths} {property.baths === 1 ? 'Bathroom' : 'Bathrooms'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <Square className="h-6 w-6 text-primary" />
                                        <span className="font-semibold text-lg">
                                            {property.sqm} sqm
                                        </span>
                                    </div>
                                    {/* <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <Home className="h-6 w-6 text-primary" />
                                        <span className="font-semibold text-lg">
                                            {property.propertyType}
                                        </span>
                                    </div> */}
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <Calendar className="h-6 w-6 text-primary" />
                                        <span className="font-semibold text-lg">
                                            Listed: {new Date(property.listedOn).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long', 
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card className="bg-white rounded-3xl border-0 shadow-lg mb-12">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                                    Description
                                </h3>
                                <p className="text-slate-700 leading-relaxed text-lg">
                                    {property.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <Card className="bg-white rounded-3xl border-0 shadow-lg mb-12">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                                    Key Features
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {property.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center text-slate-700"
                                        >
                                            <CheckCircle className="h-5 w-5 text-primary mr-3" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Agent Contact */}
                    <div>
                        <Card className="bg-white rounded-3xl border-0 shadow-lg sticky top-28">
                            <CardContent className="p-8 text-center">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                                    Contact Agent
                                </h3>
                                <Image
                                    src={
                                        property.agent?.image ||
                                        "/placeholder.svg"
                                    }
                                    alt={property.agent?.name || "John Doe"}
                                    width={96}
                                    height={96}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary/20"
                                />
                                <h4 className="text-xl font-bold text-slate-800 mb-1">
                                    {property.agent?.name || "John Doe"}
                                </h4>
                                <p className="text-primary font-semibold mb-6">
                                    {property.agent?.role || "Agent"}
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-center gap-3 text-slate-700">
                                        <Phone className="h-5 w-5 text-primary" />
                                        <span>{property.agent?.phone || "71234567"}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-3 text-slate-700">
                                        <Mail className="h-5 w-5 text-primary" />
                                        <span>{property.agent?.email || "info@mgproperties.co.bw"}</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all rounded-2xl py-3 font-semibold group">
                                    <User className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    Contact Agent
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

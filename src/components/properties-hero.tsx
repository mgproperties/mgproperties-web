"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Search,
    MapPin,
    SlidersHorizontal,
    Grid3X3,
    Map,
    ChevronDown,
} from "lucide-react";

export function PropertiesHero() {
    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
    const [searchQuery, setSearchQuery] = useState("");

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
                <div className="text-center mb-12">
                    {/* Premium badge */}
                    <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-accent-600 rounded-full text-white font-semibold mb-8">
                        Property Listings
                    </Badge>

                    {/* Editorial headline */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                        Find Your Perfect
                        <span className="block bg-gradient-to-r from-accent via-accent-600 to-accent-700 bg-clip-text text-transparent">
                            Property
                        </span>
                    </h1>

                    <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-600 mx-auto mb-8" />

                    <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 font-medium max-w-4xl mx-auto">
                        Explore our curated collection of premium properties,
                        from luxury homes to smart investment opportunities
                    </p>
                </div>

                {/* Advanced Search Bar */}
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 max-w-6xl mx-auto shadow-2xl border border-white/20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                        {/* Location Search */}
                        <div className="lg:col-span-4 relative">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Location
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="City, neighborhood, or ZIP code"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md"
                                />
                            </div>
                        </div>

                        {/* Property Type */}
                        <div className="lg:col-span-2 relative">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Property Type
                            </label>
                            <select className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md appearance-none cursor-pointer">
                                <option value="">All Types</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="townhouse">Townhouse</option>
                                <option value="villa">Villa</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform translate-y-1 text-gray-500 h-5 w-5 pointer-events-none" />
                        </div>

                        {/* Price Range */}
                        <div className="lg:col-span-2 relative">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Price Range
                            </label>
                            <select className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md appearance-none cursor-pointer">
                                <option value="">Any Price</option>
                                <option value="0-500000">Under $500K</option>
                                <option value="500000-750000">
                                    $500K - $750K
                                </option>
                                <option value="750000-1000000">
                                    $750K - $1M
                                </option>
                                <option value="1000000-2000000">
                                    $1M - $2M
                                </option>
                                <option value="2000000+">$2M+</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform translate-y-1 text-gray-500 h-5 w-5 pointer-events-none" />
                        </div>

                        {/* Bedrooms */}
                        <div className="lg:col-span-2 relative">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Bedrooms
                            </label>
                            <select className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md appearance-none cursor-pointer">
                                <option value="">Any</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                                <option value="5">5+</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform translate-y-1 text-gray-500 h-5 w-5 pointer-events-none" />
                        </div>

                        {/* Search Button */}
                        <div className="lg:col-span-2 flex gap-2">
                            <Button
                                size="lg"
                                className="flex-1 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all rounded-2xl py-4 font-semibold group"
                            >
                                <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="px-4 py-4 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 rounded-2xl transition-all"
                            >
                                <SlidersHorizontal className="h-5 w-5 text-primary" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                        {[
                            "New Listings",
                            "Price Reduced",
                            "Open House",
                            "Virtual Tour",
                            "Luxury Homes",
                            "Investment Properties",
                        ].map((filter) => (
                            <Badge
                                key={filter}
                                variant="secondary"
                                className="px-4 py-2 hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors bg-gray-100 text-gray-600 rounded-xl font-medium"
                            >
                                {filter}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* View Toggle */}
                <div className="flex justify-center mt-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
                        <div className="flex gap-2">
                            <Button
                                variant={
                                    viewMode === "grid" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className={`rounded-xl px-4 py-2 font-semibold transition-all ${
                                    viewMode === "grid"
                                        ? "bg-white text-primary shadow-lg"
                                        : "text-white/80 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                <Grid3X3 className="h-4 w-4 mr-2" />
                                Grid View
                            </Button>
                            <Button
                                variant={
                                    viewMode === "map" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("map")}
                                className={`rounded-xl px-4 py-2 font-semibold transition-all ${
                                    viewMode === "map"
                                        ? "bg-white text-primary shadow-lg"
                                        : "text-white/80 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                <Map className="h-4 w-4 mr-2" />
                                Map View
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

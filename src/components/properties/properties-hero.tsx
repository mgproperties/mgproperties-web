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
import { useFilterContext } from "@/contexts/FilterContext";

export function PropertiesHero() {
    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const { filters, setFilters } = useFilterContext();

    // Local state for form inputs
    const [searchInputs, setSearchInputs] = useState({
        location: filters.location,
        propertyType: filters.propertyType,
        priceRange: filters.priceRange,
        bedrooms: filters.bedrooms,
    });

    const handleInputChange = (field: string, value: string) => {
        setSearchInputs((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSearch = () => {
        setFilters({
            ...filters,
            ...searchInputs,
        });
    };

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
                        Find the Perfect
                        <span className="block bg-gradient-to-r from-accent via-accent-600 to-accent-700 bg-clip-text text-transparent">
                            Property!
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
                                    value={searchInputs.location}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "location",
                                            e.target.value
                                        )
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
                            <select
                                value={searchInputs.propertyType}
                                onChange={(e) =>
                                    handleInputChange(
                                        "propertyType",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md appearance-none cursor-pointer"
                            >
                                <option value="">All Types</option>
                                <option value="Residential">Residential</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Multi-residential">
                                    Multi-residential
                                </option>
                                <option value="Agricultural">
                                    Agricultural
                                </option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform translate-y-1 text-gray-500 h-5 w-5 pointer-events-none" />
                        </div>

                        {/* Price Range */}
                        <div className="lg:col-span-2 relative">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Price Range
                            </label>
                            <select
                                value={searchInputs.priceRange}
                                onChange={(e) =>
                                    handleInputChange(
                                        "priceRange",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md appearance-none cursor-pointer"
                            >
                                <option value="">Any Price</option>
                                <option value="0-500000">Under P500K</option>
                                <option value="500000-750000">
                                    P500K - P750K
                                </option>
                                <option value="750000-1000000">
                                    P750K - P1M
                                </option>
                                <option value="1000000-2000000">
                                    P1M - P2M
                                </option>
                                <option value="2000000+">P2M+</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform translate-y-1 text-gray-500 h-5 w-5 pointer-events-none" />
                        </div>

                        {/* Bedrooms */}
                        <div className="lg:col-span-2 relative">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Bedrooms
                            </label>
                            <select
                                value={searchInputs.bedrooms}
                                onChange={(e) =>
                                    handleInputChange(
                                        "bedrooms",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md appearance-none cursor-pointer"
                            >
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
                                onClick={handleSearch}
                                className="flex-1 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all rounded-2xl py-4 font-semibold group"
                            >
                                <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            </Button>
                        </div>
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

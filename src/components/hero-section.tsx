"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Play, TrendingUp, Award, Users, ArrowRight, Star, ChevronDown } from "lucide-react"

const searchSuggestions = ["Beverly Hills, CA", "Manhattan, NY", "Austin, TX", "Miami Beach, FL", "Seattle, WA"]

const propertyTypes = ["House", "Condo", "Townhouse", "Villa"]
const priceRanges = ["$500K - $750K", "$750K - $1M", "$1M - $2M", "$2M+"]

export function HeroSection() {
  const [currentSuggestion, setCurrentSuggestion] = useState(0)
  const [searchFocused, setSearchFocused] = useState(false)
  const [selectedType, setSelectedType] = useState("House")
  const [selectedPrice, setSelectedPrice] = useState("$500K - $750K")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % searchSuggestions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
          {/* Trust Indicators - Floating */}
          <div className="flex justify-center gap-6 mb-8 opacity-0 animate-fade-in delay-300">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-white">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white">Award Winning</span>
            </div>
          </div>

          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-accent-600 rounded-full text-white font-semibold mb-8 animate-fade-in hover:scale-105 transition-transform cursor-pointer shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" />🏆 #1 Trusted Real Estate Platform
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
              in <span className="text-accent font-bold animate-pulse">{searchSuggestions[currentSuggestion]}</span>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Experience the future of real estate with our AI-powered platform.
            <span className="text-accent font-semibold"> Find, compare, and secure</span> your perfect property in
            minutes, not months.
          </p>

          {/* Modern Search Interface */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 mb-16 max-w-5xl mx-auto shadow-2xl animate-fade-in border border-white/20">
            {/* Search Tabs - Soft Modern */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {["Buy", "Rent", "Sell", "Invest"].map((tab) => (
                <Button
                  key={tab}
                  variant={tab === "Buy" ? "default" : "outline"}
                  className={`rounded-xl px-6 py-3 font-semibold transition-all ${
                    tab === "Buy"
                      ? "bg-primary hover:bg-primary-600 text-white shadow-lg"
                      : "hover:bg-primary/5 border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>

            {/* Search Fields - Layered Design */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
              {/* Location Search */}
              <div className="lg:col-span-5 relative">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                  <input
                    type="text"
                    placeholder={`Try "${searchSuggestions[currentSuggestion]}"`}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>

                {/* Search Suggestions Dropdown */}
                {searchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 animate-fade-in overflow-hidden">
                    {searchSuggestions.map((suggestion, index) => (
                      <div
                        key={suggestion}
                        className="px-4 py-3 hover:bg-primary/5 cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-gray-700">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Type */}
              <div className="lg:col-span-3 relative">
                <select
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg appearance-none cursor-pointer text-gray-700 hover:shadow-md transition-all"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 pointer-events-none" />
              </div>

              {/* Price Range */}
              <div className="lg:col-span-3 relative">
                <select
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg appearance-none cursor-pointer text-gray-700 hover:shadow-md transition-all"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 pointer-events-none" />
              </div>

              {/* Search Button */}
              <div className="lg:col-span-1">
                <Button
                  size="lg"
                  className="w-full h-full bg-primary hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all rounded-2xl group"
                >
                  <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {["New Listings", "Price Reduced", "Open House", "Virtual Tour"].map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="px-4 py-2 hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors bg-gray-100 text-gray-600 rounded-xl"
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA Buttons - Sophisticated */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent-600 text-white shadow-xl hover:shadow-2xl transition-all px-12 py-6 text-xl rounded-2xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center font-semibold">
                Explore Properties
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-secondary transition-all px-12 py-6 text-xl rounded-2xl group backdrop-blur-sm bg-white/10 font-semibold"
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Stats - Layered Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in">
            {[
              { icon: TrendingUp, value: "500+", label: "Properties Sold", gradient: "from-primary to-primary-600" },
              { icon: Award, value: "15+", label: "Years Experience", gradient: "from-accent to-accent-600" },
              { icon: Users, value: "98%", label: "Client Satisfaction", gradient: "from-secondary to-secondary-600" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer relative overflow-hidden"
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
                  <div className="text-gray-700 font-semibold text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

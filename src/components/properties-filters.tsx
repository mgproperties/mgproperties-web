"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, X, SlidersHorizontal } from "lucide-react"

export function PropertiesFilters() {
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <section className="py-8 bg-gradient-to-b from-slate-50 to-green-50/30 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Results Count & Active Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="text-slate-700 font-semibold">
              <span className="text-2xl text-primary">247</span> properties found
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <Badge
                    key={index}
                    className="bg-primary/10 text-primary border border-primary/20 rounded-xl px-3 py-1 font-medium"
                  >
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      className="ml-2 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveFilters([])}
                  className="text-slate-500 hover:text-slate-700 px-2 py-1 h-auto font-medium"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-10 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all hover:shadow-md cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="beds">Most Bedrooms</option>
                <option value="size">Largest First</option>
                <option value="featured">Featured</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 pointer-events-none" />
            </div>

            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-2 border-gray-200 hover:border-primary hover:bg-primary/5 rounded-2xl px-6 py-3 font-semibold transition-all"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <Card className="mt-6 bg-white rounded-3xl border-0 shadow-lg animate-fade-in">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Property Features */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Property Features</h4>
                  <div className="space-y-3">
                    {["Swimming Pool", "Garage", "Garden", "Fireplace", "Balcony", "Basement"].map((feature) => (
                      <label key={feature} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary/50 focus:ring-2"
                        />
                        <span className="ml-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                          {feature}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Property Age */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Property Age</h4>
                  <div className="space-y-3">
                    {["New Construction", "0-5 years", "5-10 years", "10-20 years", "20+ years"].map((age) => (
                      <label key={age} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="property-age"
                          className="w-5 h-5 text-primary border-gray-300 focus:ring-primary/50 focus:ring-2"
                        />
                        <span className="ml-3 text-slate-600 group-hover:text-slate-800 transition-colors">{age}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Square Footage */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Square Footage</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">Min Sq Ft</label>
                      <input
                        type="number"
                        placeholder="1,000"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">Max Sq Ft</label>
                      <input
                        type="number"
                        placeholder="5,000"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Listing Status */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Listing Status</h4>
                  <div className="space-y-3">
                    {["For Sale", "New Listing", "Price Reduced", "Open House", "Coming Soon"].map((status) => (
                      <label key={status} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary/50 focus:ring-2"
                        />
                        <span className="ml-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                          {status}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <Button variant="ghost" className="text-slate-500 hover:text-slate-700 font-medium">
                  Reset Filters
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(false)}
                    className="border-2 border-gray-200 hover:border-gray-300 rounded-2xl px-6 py-3 font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setShowFilters(false)}
                    className="bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-2xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

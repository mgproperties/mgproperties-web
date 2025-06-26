import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square, MapPin, Heart, Share2, Camera, Calendar, ArrowRight } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Modern Family Home",
    price: "$750,000",
    originalPrice: "$780,000",
    location: "Beverly Hills, CA",
    beds: 4,
    baths: 3,
    sqft: "2,500",
    images: ["/placeholder.svg?height=300&width=400"],
    imageCount: 12,
    status: "For Sale",
    featured: true,
    daysOnMarket: 5,
    priceReduced: true,
    openHouse: "Sat 2-4 PM",
    description: "Stunning modern home with open floor plan and premium finishes throughout.",
  },
  {
    id: 2,
    title: "Downtown Luxury Condo",
    price: "$1,200,000",
    location: "Manhattan, NY",
    beds: 2,
    baths: 2,
    sqft: "1,800",
    images: ["/placeholder.svg?height=300&width=400"],
    imageCount: 8,
    status: "New Listing",
    featured: false,
    daysOnMarket: 1,
    description: "Luxury high-rise condo with breathtaking city views and premium amenities.",
  },
  {
    id: 3,
    title: "Suburban Villa",
    price: "$950,000",
    location: "Austin, TX",
    beds: 5,
    baths: 4,
    sqft: "3,200",
    images: ["/placeholder.svg?height=300&width=400"],
    imageCount: 15,
    status: "For Sale",
    featured: true,
    daysOnMarket: 12,
    description: "Spacious villa with large backyard, perfect for families.",
  },
  {
    id: 4,
    title: "Waterfront Townhouse",
    price: "$1,450,000",
    location: "Miami Beach, FL",
    beds: 3,
    baths: 3,
    sqft: "2,200",
    images: ["/placeholder.svg?height=300&width=400"],
    imageCount: 10,
    status: "For Sale",
    featured: false,
    daysOnMarket: 8,
    openHouse: "Sun 1-3 PM",
    description: "Beautiful waterfront townhouse with private dock and stunning views.",
  },
  {
    id: 5,
    title: "Contemporary Loft",
    price: "$680,000",
    location: "Seattle, WA",
    beds: 2,
    baths: 2,
    sqft: "1,600",
    images: ["/placeholder.svg?height=300&width=400"],
    imageCount: 6,
    status: "For Sale",
    featured: false,
    daysOnMarket: 3,
    description: "Industrial-chic loft in trendy neighborhood with exposed brick and high ceilings.",
  },
  {
    id: 6,
    title: "Mountain View Estate",
    price: "$2,100,000",
    location: "Aspen, CO",
    beds: 6,
    baths: 5,
    sqft: "4,800",
    images: ["/placeholder.svg?height=300&width=400"],
    imageCount: 20,
    status: "For Sale",
    featured: true,
    daysOnMarket: 18,
    description: "Luxury mountain estate with panoramic views and world-class amenities.",
  },
]

export function PropertiesGrid() {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50/30 to-slate-50 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/3 rounded-full blur-2xl" />
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-tr from-accent/3 to-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <Card
              key={property.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-3xl hover:scale-[1.02] cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Status Badge */}
                <Badge
                  className={`absolute top-4 left-4 px-4 py-2 rounded-xl font-semibold ${
                    property.status === "New Listing"
                      ? "bg-gradient-to-r from-accent to-accent-600 text-white"
                      : property.priceReduced
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                        : "bg-white/90 text-slate-700 backdrop-blur-sm"
                  }`}
                >
                  {property.priceReduced ? "Price Reduced" : property.status}
                </Badge>

                {/* Featured Badge */}
                {property.featured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary-600 text-white px-3 py-1 rounded-xl font-semibold">
                    Featured
                  </Badge>
                )}

                {/* Image Count */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-sm font-medium flex items-center">
                  <Camera className="h-3 w-3 mr-1" />
                  {property.imageCount}
                </div>

                {/* Action buttons */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

              <CardContent className="p-6">
                {/* Location */}
                <div className="flex items-center text-slate-500 mb-3">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-medium">{property.location}</span>
                  <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded-lg">{property.daysOnMarket} days</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-slate-800 leading-tight">
                  {property.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-2">{property.description}</p>

                {/* Price */}
                <div className="flex items-center mb-6">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {property.price}
                  </div>
                  {property.originalPrice && (
                    <div className="ml-2 text-sm text-slate-400 line-through">{property.originalPrice}</div>
                  )}
                </div>

                {/* Property Details */}
                <div className="flex items-center justify-between text-slate-600 mb-6">
                  <div className="flex items-center bg-gradient-to-r from-primary/5 to-accent/5 px-3 py-2 rounded-xl">
                    <Bed className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-semibold">{property.beds} beds</span>
                  </div>
                  <div className="flex items-center bg-gradient-to-r from-primary/5 to-accent/5 px-3 py-2 rounded-xl">
                    <Bath className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-semibold">{property.baths} baths</span>
                  </div>
                  <div className="flex items-center bg-gradient-to-r from-primary/5 to-accent/5 px-3 py-2 rounded-xl">
                    <Square className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-semibold">{property.sqft} sqft</span>
                  </div>
                </div>

                {/* Open House */}
                {property.openHouse && (
                  <div className="flex items-center text-accent font-semibold text-sm mb-4 bg-accent/10 px-3 py-2 rounded-xl">
                    <Calendar className="h-4 w-4 mr-2" />
                    Open House: {property.openHouse}
                  </div>
                )}

                {/* View Details Button */}
                <Button className="w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all rounded-2xl py-3 font-semibold group">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More / Pagination */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-slate-600">
              Showing <span className="font-semibold text-primary">1-6</span> of{" "}
              <span className="font-semibold text-primary">247</span> properties
            </div>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 text-slate-700 hover:bg-primary hover:text-white transition-all px-8 py-4 text-lg rounded-2xl font-semibold shadow-lg hover:shadow-xl"
            >
              Load More Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {[1, 2, 3, "...", 41, 42].map((page, index) => (
              <Button
                key={index}
                variant={page === 1 ? "default" : "ghost"}
                size="sm"
                className={`w-10 h-10 rounded-xl font-semibold ${
                  page === 1
                    ? "bg-primary text-white shadow-lg"
                    : "text-slate-600 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { Navbar } from "@/components/layout/navbar";
import { PropertyDetail } from "@/components/properties/property-detail";
import { Footer } from "@/components/layout/footer";

// This is a placeholder for a real data fetch.
// In a production app, you would fetch property data based on params.id
const dummyProperty = {
    id: "1",
    title: "Elegant Suburban Oasis",
    price: "$750,000",
    location: "Beverly Hills, CA",
    beds: 4,
    baths: 3,
    sqm: "232", // Approximately 2500 sqft
    images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
    ],
    imageCount: 6,
    status: "For Sale",
    dateListed: "July 1, 2024",
    propertyType: "Single Family House",
    description:
        "Discover this exquisite modern family home nestled in a serene Beverly Hills neighborhood. Boasting an open-concept floor plan, this residence features high ceilings, abundant natural light, and premium finishes throughout. The gourmet kitchen is a chef's delight with state-of-the-art appliances and a large island. Enjoy seamless indoor-outdoor living with a spacious backyard, perfect for entertaining. Located in a top-rated school district with easy access to amenities and major highways. This property offers a perfect blend of luxury, comfort, and convenience, making it an ideal choice for families seeking an upscale lifestyle.",
    features: [
        "Gourmet Kitchen",
        "Hardwood Floors",
        "Smart Home System",
        "Two-Car Garage",
        "Landscaped Garden",
        "Central Air Conditioning",
        "Walk-in Closets",
        "Private Patio",
        "Energy Efficient Windows",
    ],
    agent: {
        name: "Sarah Mitchell",
        role: "Senior Agent",
        image: "/placeholder.svg?height=80&width=80",
        phone: "(555) 123-4567",
        email: "sarah@primerealty.com",
    },
};

export default function PropertyDetailPage({
    params,
}: {
    params: { id: string };
}) {
    // In a real application, you would fetch property data based on params.id
    // For this example, we'll use a dummy property.
    const property = dummyProperty;

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-slate-700">Property not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <PropertyDetail property={property} />
            <Footer />
        </div>
    );
}

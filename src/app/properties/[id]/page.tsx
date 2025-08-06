import { Navbar } from "@/components/layout/navbar";
import { PropertyDetail } from "@/components/properties/property-detail";
import { Footer } from "@/components/layout/footer";
import { notFound } from 'next/navigation';
import { headers } from "next/headers";

interface PropertyData {
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

function calculateDays(timestamp: string): number {
    const inputDate = new Date(timestamp);
    const today = new Date();

    // Convert both to UTC midnight to ignore time differences
    const utcInput = Date.UTC(
        inputDate.getUTCFullYear(),
        inputDate.getUTCMonth(),
        inputDate.getUTCDate()
    );

    const utcToday = Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate()
    );

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diff = Math.floor((utcToday - utcInput) / millisecondsPerDay);

    return diff + 1;
}

async function fetchProperty(propertyID: string): Promise<PropertyData | null> {
    try {
        
        const headersList = headers();
        const host = (await headersList).get('host');
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const baseUrl = `${protocol}://${host}`;
        console.log("Base URL: ", baseUrl);


        const response = await fetch(`${baseUrl}/api/properties?propertyID=${propertyID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Add cache control for better performance
            cache: 'no-store' // or 'force-cache' depending on your needs
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null; // Property not found
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const property: PropertyData = await response.json();
        
        // Add calculated daysOnMarket
        const propertyWithDays = {
            ...property,
            daysOnMarket: calculateDays(property.listedOn)
        };

        return propertyWithDays;
    } catch (error) {
        console.error("Error fetching property: ", error);
        return null;
    }
}

export default async function PropertyDetailPage({
    params,
}: {
    params: { id: string };
}) {
    console.log("The parameter: ", params);
    
    // Fetch the property data
    const property = await fetchProperty(params.id);
    
    // If property not found, trigger Next.js 404 page
    if (!property) {
        notFound();
    }

    // For development/testing, you can fallback to dummy data
    // const propertyToRender = property || dummyProperty;

    return (
        <div className="min-h-screen">
            <Navbar />
            <PropertyDetail property={property} />
            <Footer />
        </div>
    );
}
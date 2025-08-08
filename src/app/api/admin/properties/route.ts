import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db"; // Import the database connection

//Define the shape of form data

interface PropertyData {
    propertyID: number;
    title: string;
    price: string;
    originalPrice: string;
    location: string;
    beds: number;
    baths: number;
    sqm: number;
    images: string[];
    imageCount: number;
    status: string;
    featured: boolean;
    listedOn: string;
    propertyType: string;
    daysOnMarket: number;
    priceReduced: boolean;
    features: string[];
    description: string;
    openHouse: string;
    agent: string
}

export async function POST(request: NextRequest) {
    try {
        
        
        // Parse the JSON body from the request
        const body: PropertyData = await request.json();

        
        const result = await sql`
            INSERT INTO public.property (
                "title",
                "description",
                "price",
                "location",
                "beds",
                "baths",
                "sqm",
                "status",
                "originalPrice",
                "featured",
                "priceReduced",
                "features"
            ) VALUES (
                ${body.title},
                ${body.description},
                ${body.price},
                ${body.location},
                ${body.beds},
                ${body.baths},
                ${body.sqm},
                ${body.status},
                ${body.originalPrice},
                ${body.featured},
                ${body.priceReduced},
                ${body.features}
            )
            RETURNING "propertyID";
        `;

        return NextResponse.json(
            {
                result,
                success: true
            },
            { status: 201 }
        );
        
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}

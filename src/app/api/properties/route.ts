import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db"; // Import the database connection
import { StringToBoolean } from "class-variance-authority/types";

//Define the shape of form data

interface PropertyData {
    id: number;
    title: string;
    price: string;
    originalPrice: string;
    location: string;
    beds: number;
    baths: number;
    sqm: number;
    images: Array<String>;
    imageCount: number;
    status: string;
    featured: boolean;
    daysOnMarket: number;
    priceReduced: boolean;
    description: string;
}

export async function GET() {
    //get properties

    try {
        const result = await sql`SELECT * FROM public.property;`;
        return NextResponse.json(
            result,
            { status: 200 }
        );
    } catch (error) {
        console.error("Error getting property: ", error);
        return NextResponse.json(
            { error: "Error getting property." },
            { status: 500 }
        );
    }
}
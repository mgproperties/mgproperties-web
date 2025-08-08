import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db"; // Import the database connection

//Define the shape of form data

export async function GET() {

    try {
        const result = await sql`SELECT * FROM  public.inquiry;`;

        return NextResponse.json(
            result,
            { status: 200 }
        );
    } catch (error) {
        console.error('Error getting contact form submissions:', error);
        return NextResponse.json(
            { error: "Error getting contact form submissions." },
            { status: 500 }
        );
    }
}
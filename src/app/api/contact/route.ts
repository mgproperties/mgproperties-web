import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db"; // Import the database connection

//Define the shape of form data

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    propertyType: string;
    budget: string;
}

export async function POST(request: NextRequest) {
    try {
        
        
        // Parse the JSON body from the request
        const body: ContactFormData = await request.json();

        //validation
        if (!body.name || !body.email || !body.message){
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        //Email validation
        const emailRegex = /^[^\s@]+@[^\s]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: "Invalid email format." },
                { status: 400 }
            );
        }

        const result = await sql`
            INSERT INTO public.inquiry (
                "fullName",
                "email",
                "phone",
                "message",
                "budget",
                "propertyType",
                "subject"
            ) VALUES (
                ${body.name},
                ${body.email},
                ${body.phone},
                ${body.message},
                ${body.budget},
                ${body.propertyType},
                ${body.subject}
            )
            RETURNING *;
        `;

        

        // Log the form submission (in production, you'd save to database)
        console.log('New contact form submission:', {
            name: body.name,
            email: body.email,
            phone: body.phone,
            subject: body.subject,
            message: body.message,
            propertyType: body.propertyType,
            budget: body.budget,
            timestamp: new Date().toISOString()
        });

        //simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json(
            {
                message: "Thank you for contacting us! We will get back to you soon.",
                success: true
            },
            { status: 200 }
        );
        
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}

export async function GET() {

    //testing db connection
    try {
        const result = await sql`SELECT * FROM  public.inquiry;`;
        console.log('Database connection successful:', result);
        return NextResponse.json(
            { message: "Database connection successful.", result },
            { status: 200 }
        );
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json(
            { error: "Database connection failed." },
            { status: 500 }
        );
    }
}
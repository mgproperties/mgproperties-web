import { NextRequest, NextResponse } from "next/server";

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

        /* const insertQuery = `
            INSERT INTO public.inquiry (
                "fullName",
                "email",
                "message"
            ) VALUES ($1, $2, $3)
             RETURNING "inquiryID";
        `;

        const values = [body.name, body.email, body.message];

        const result = await query(insertQuery, values);
        const inquiryID = result.rows[0].inquiryID;

        console.log(`New inquiry created with ID: ${inquiryID}`); */

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
  return NextResponse.json(
    { message: 'Contact API is working!' },
    { status: 200 }
  );
}
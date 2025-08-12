// app/api/admin/properties/route.ts
import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db"; // Import the database connection
import { withAuth } from "@/lib/auth/api-auth";
import { createClient } from '@/utils/supabase/server'

//Define the shape of form data
interface PropertyData {
    propertyID?: number;
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
    agent_id: string;
}

// GET - Fetch all properties (Admin + Agent)
export async function GET(request: NextRequest) {
  return withAuth(request, async (req, user) => {
    try {
      const supabase = await createClient()

      // Get user's role first
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || !['admin', 'agent'].includes(profile.role)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }

      // Fetch all properties from your existing table structure
      const result = await sql`
        SELECT * FROM public.property 
        ORDER BY "propertyID" DESC
      `

      return NextResponse.json({
        properties: result,
        total: result.length,
        success: true
      })

    } catch (error) {
      console.error('Error fetching properties:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  })
}

// POST - Create/Update property (Admin + Agent)
export async function POST(request: NextRequest) {
    return withAuth(request, async (req, user) => {
        try {
            const supabase = await createClient()

            // Get user's role first
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()

            if (!profile || !['admin', 'agent'].includes(profile.role)) {
                return NextResponse.json(
                    { error: 'Insufficient permissions' },
                    { status: 403 }
                )
            }
            
            // Parse the JSON body from the request
            const body: PropertyData = await request.json();

            const safeAgentId = body.agent_id === '' ? null : body.agent_id;
            
            if(!body.propertyID){
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
                        "features",
                        "propertyType",
                        "agent_id"
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
                        ${body.features},
                        ${body.propertyType},
                        ${safeAgentId}
                    )
                    RETURNING "propertyID";
                `;

                return NextResponse.json(
                    {
                        result,
                        success: true,
                        message: 'Property created successfully'
                    },
                    { status: 201 }
                );
            } else {
                const result = await sql`
                    UPDATE public.property
                    SET "title" = ${body.title},
                        "description" = ${body.description},
                        "price" = ${body.price},
                        "location" = ${body.location},
                        "beds" = ${body.beds},
                        "baths" = ${body.baths},
                        "sqm" = ${body.sqm},
                        "status" = ${body.status},
                        "originalPrice" = ${body.originalPrice},
                        "featured" = ${body.featured},
                        "priceReduced" = ${body.priceReduced},
                        "features" = ${body.features},
                        "propertyType"= ${body.propertyType},
                        "agent_id" = ${safeAgentId}
                    WHERE "propertyID" = ${body.propertyID}
                    RETURNING "propertyID";
                `;

                return NextResponse.json(
                    {
                        result,
                        success: true,
                        message: 'Property updated successfully'
                    },
                    { status: 200 }
                );
            }   
        } catch (error) {
            console.error('Error processing properties (admin):', error);
            return NextResponse.json(
                { error: "An error occurred while processing your request." },
                { status: 500 }
            );
        }
    });
}

// DELETE - Delete property (Admin + Agent)
export async function DELETE(request: NextRequest) {
    return withAuth(request, async (req, user) => {
        try {
            const supabase = await createClient()

            // Get user's role first
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()

            if (!profile || !['admin', 'agent'].includes(profile.role)) {
                return NextResponse.json(
                    { error: 'Insufficient permissions' },
                    { status: 403 }
                )
            }
            
            // Parse the JSON body from the request
            const body: PropertyData = await request.json();
            
            if(body.propertyID){
                const result = await sql`
                    DELETE FROM public.property
                    WHERE "propertyID" = ${body.propertyID}
                `;

                return NextResponse.json(
                    {
                        result,
                        success: true,
                        message: 'Property deleted successfully'
                    },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    { error: "No property ID found" },
                    { status: 400 }
                );
            }    
        } catch (error) {
            console.error('Error processing properties (admin):', error);
            return NextResponse.json(
                { error: "An error occurred while processing your request." },
                { status: 500 }
            );
        }
    });
}
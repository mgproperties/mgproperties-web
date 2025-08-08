// app/api/properties/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

// Create Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Your Supabase project URL
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role key (more permissions than anon key)
);

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const propertyID = searchParams.get('propertyID');

    // Build the base query
    let query = supabase
      .from('property') // Main table
      .select(`
        *,
        property_image (
          image_url,
          image_order,
          is_primary
        ),
        propertyTypeJoin: propertyTypeID (
          propertyTypeName
        )
      `); // This joins with property_image table

    // If propertyID is provided, filter for that specific property
    if (propertyID) {
      query = query.eq('propertyID', propertyID);
    } else {
      // If no propertyID, return all properties ordered by newest first
      query = query.order('listedOn', { ascending: false });
    }

    const { data: properties, error } = await query;

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    // Handle case where specific property is not found
    if (propertyID && (!properties || properties.length === 0)) {
      return Response.json(
        { error: `Property with ID ${propertyID} not found` },
        { status: 404 }
      );
    }

    // Transform the data to make it frontend-friendly
    const propertiesWithImages = properties?.map((property: any) => {
            
      // Sort images by their order (primary first, then by image_order)
      const sortedImages = property.property_image
        ?.sort((a: any, b: any) => {
          // Primary image always comes first
          if (a.is_primary) return -1;
          if (b.is_primary) return 1;
          // Then sort by image_order
          return a.image_order - b.image_order;
        }) || [];

      // Convert storage paths to full public URLs
      const imageUrls = sortedImages.map((img: any) => {
        // Check if it's already a full URL
        if (img.image_url.startsWith('http')) {
          return img.image_url; // Return as-is if already a full URL
        }
        
        // Otherwise, get public URL from Supabase storage
        const { data } = supabase.storage
          .from('property-images') // Your bucket name
          .getPublicUrl(img.image_url); // The path stored in database
        
        return data.publicUrl;
      });

      return {
        ...property, // Keep all original property data
        propertyType: property.propertyTypeJoin?.propertyTypeName,
        images: imageUrls, // Add array of image URLs
        imageCount: imageUrls.length, // Add count for display
        // Remove the joined data since we've processed it
        property_image: undefined,
        propertyTypeJoin: undefined
      };
    }) || [];

    // If requesting a specific property, return just that property object
    // Otherwise return the array of properties
    const responseData = propertyID ? propertiesWithImages[0] : propertiesWithImages;

    return Response.json(responseData);

  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
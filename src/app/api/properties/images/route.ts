// app/api/properties/route.ts
import { createClient } from '@supabase/supabase-js';

// Create Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Your Supabase project URL
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role key (more permissions than anon key)
);

export async function GET() {
  try {
    // This is a JOIN query - it gets properties AND their linked images in one go
    const { data: properties, error } = await supabase
      .from('property') // Main table
      .select(`
        *,
        property_image (
          image_url,
          image_order,
          is_primary
        )
      `) // This joins with property_image table
      .order('listedOn', { ascending: false }); // Newest properties first

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    // Transform the data to make it frontend-friendly
    const propertiesWithImages = properties?.map((property: any) => {
      console.log(`Processing property ${property.propertyID}...`);
      
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
        images: imageUrls, // Add array of image URLs
        imageCount: imageUrls.length, // Add count for display
        // Remove the joined data since we've processed it
        property_image: undefined
      };
    }) || [];

    return Response.json(propertiesWithImages);

  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/api-auth";
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  return withAuth(request, async (req, user) => {
    try {
      const supabase = await createClient()

      // Check if user is an agent
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'agent') {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 })
      }

      // Use same structure as your existing properties API but filter by agent
      const { data: properties, error } = await supabase
        .from('property')
        .select(`
          *,
          property_image (
            image_url,
            image_order,
            is_primary
          )
        `)
        .eq('agent_id', user.id)
        .order('propertyID', { ascending: false })

      if (error) throw error

      // Transform data exactly like your existing API
      const propertiesWithImages = properties?.map((property: any) => {
        const sortedImages = property.property_image
          ?.sort((a: any, b: any) => {
            if (a.is_primary) return -1;
            if (b.is_primary) return 1;
            return a.image_order - b.image_order;
          }) || [];

        const imageUrls = sortedImages.map((img: any) => {
          if (img.image_url.startsWith('http')) {
            return img.image_url;
          }
          
          const { data } = supabase.storage
            .from('property-images')
            .getPublicUrl(img.image_url);
          
          return data.publicUrl;
        });

        return {
          ...property,
          images: imageUrls,
          imageCount: imageUrls.length,
          property_image: undefined,
        };
      }) || [];

      return NextResponse.json(propertiesWithImages)

    } catch (error) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
  })
}
import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Server-side client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // This works on server-side
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const propertyID = formData.get('propertyID') as string;
    const files = formData.getAll('files') as File[];

    if (!propertyID || files.length === 0) {
      return NextResponse.json({ error: 'Missing propertyID or files' }, { status: 400 });
    }

    // Upload files to storage
    const uploadPromises = files.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `property-${propertyID}/image-${Date.now()}-${index}.${fileExt}`;
      
      const { data, error } = await supabaseAdmin.storage
        .from('property-images')
        .upload(fileName, file);

      if (error) throw error;
      return data.path;
    });

    const imagePaths = await Promise.all(uploadPromises);

    // Insert image records
    const imageRecords = imagePaths.map((path, index) => ({
      property_id: parseInt(propertyID),
      image_url: path,
      image_order: index,
      is_primary: index === 0
    }));

    const { error } = await supabaseAdmin
      .from('property_image')
      .insert(imageRecords);

    if (error) throw error;

    return NextResponse.json({ success: true, imagePaths });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { propertyID } = await request.json();

    // Get image URLs to delete from storage
    const { data: images } = await supabaseAdmin
      .from('property_image')
      .select('image_url')
      .eq('property_id', propertyID);

    if (images && images.length > 0) {
      const filePaths = images.map(img => img.image_url);
      await supabaseAdmin.storage
        .from('property-images')
        .remove(filePaths);
    }

    // Delete from database
    await supabaseAdmin
      .from('property_image')
      .delete()
      .eq('property_id', propertyID);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Image delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
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

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const propertyID = formData.get('propertyID') as string;
    const files = formData.getAll('files') as File[];
    const existingImages = JSON.parse(formData.get('existingImages') as string || '[]');

    if (!propertyID) {
      return NextResponse.json({ error: 'Missing propertyID' }, { status: 400 });
    }

    // Get current images from database
    const { data: currentImages } = await supabaseAdmin
      .from('property_image')
      .select('image_url, id')
      .eq('property_id', propertyID);

    // Find images to delete (ones that are in DB but not in existingImages)
    const imagesToDelete = currentImages?.filter(img => {
      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-images/${img.image_url}`;
      return !existingImages.includes(imageUrl);
    }) || [];

    // Delete removed images from storage and database
    if (imagesToDelete.length > 0) {
      const filePaths = imagesToDelete.map(img => img.image_url);
      await supabaseAdmin.storage
        .from('property-images')
        .remove(filePaths);

      await supabaseAdmin
        .from('property_image')
        .delete()
        .in('id', imagesToDelete.map(img => img.id));
    }

    // Upload new files if any
    let newImagePaths: string[] = [];
    if (files.length > 0) {
      const uploadPromises = files.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `property-${propertyID}/image-${Date.now()}-${index}.${fileExt}`;
        
        const { data, error } = await supabaseAdmin.storage
          .from('property-images')
          .upload(fileName, file);

        if (error) throw error;
        return data.path;
      });

      newImagePaths = await Promise.all(uploadPromises);

      // Insert new image records
      const imageRecords = newImagePaths.map((path, index) => ({
        property_id: parseInt(propertyID),
        image_url: path,
        image_order: existingImages.length + index,
        is_primary: existingImages.length === 0 && index === 0
      }));

      const { error } = await supabaseAdmin
        .from('property_image')
        .insert(imageRecords);

      if (error) throw error;
    }

    return NextResponse.json({ success: true, newImagePaths });
  } catch (error) {
    console.error('Image update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
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
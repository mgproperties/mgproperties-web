import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadPropertyImages(
  propertyID: number,
  files: File[]
): Promise<string[]> {
  const uploadPromises = files.map(async (file, index) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `property-${propertyID}/image-${Date.now()}-${index}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(fileName, file);

    if (error) throw error;
    return data.path;
  });

  return Promise.all(uploadPromises);
}

export async function insertPropertyImages(
  propertyId: number,
  imagePaths: string[]
) {
  const imageRecords = imagePaths.map((path, index) => ({
    property_id: propertyId,
    image_url: path,
    image_order: index,
    is_primary: index === 0 // First image is primary
  }));

  const { error } = await supabase
    .from('property_images')
    .insert(imageRecords);

  if (error) throw error;
}

// Delete property images
export async function deletePropertyImages(propertyID: number) {
  // Delete from storage
  const { data: images } = await supabase
    .from('property_images')
    .select('image_url')
    .eq('property_id', propertyID);

  if (images) {
    const filePaths = images.map(img => img.image_url);
    await supabase.storage
      .from('property-images')
      .remove(filePaths);
  }

  // Delete from database
  await supabase
    .from('property_images')
    .delete()
    .eq('property_id', propertyID);
}
export async function uploadPropertyImages(
  propertyID: number,
  files: File[]
): Promise<string[]> {
  const formData = new FormData();
  formData.append('propertyID', propertyID.toString());
  
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await fetch('/api/admin/property-images', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }

  const result = await response.json();
  return result.imagePaths;
}

export async function updatePropertyImages(
  propertyID: number,
  files: File[],
  existingImages: string[]
): Promise<string[]> {
  const formData = new FormData();
  formData.append('propertyID', propertyID.toString());
  formData.append('existingImages', JSON.stringify(existingImages));
  
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await fetch('/api/admin/property-images', {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }

  const result = await response.json();
  return result.newImagePaths || [];
}

export async function deletePropertyImages(propertyID: number) {
  const response = await fetch('/api/admin/property-images', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ propertyID }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Delete failed');
  }
}

// Remove insertPropertyImages since it's now handled in the API route
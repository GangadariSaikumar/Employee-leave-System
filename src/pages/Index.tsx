
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import ImageUploader from '@/components/ImageUploader';
import Gallery from '@/components/Gallery';
import { toast } from "sonner";

interface UploadedImage {
  id: string;
  src: string;
  name: string;
  size: number;
  file: File;
}

const Index = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        const newImage: UploadedImage = {
          id: Date.now().toString(),
          src: e.target.result as string,
          name: file.name,
          size: file.size,
          file: file
        };
        
        setUploadedImages(prev => [newImage, ...prev]);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const handleImageClick = (imageId: string) => {
    const image = uploadedImages.find(img => img.id === imageId);
    if (image) {
      // Open a modal or do something with the selected image
      toast.info(`Selected image: ${image.name}`);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Image Upload</h1>
          <p className="text-lg text-muted-foreground">
            Drag & drop or select an image to upload
          </p>
        </div>

        <div className="grid gap-8">
          <ImageUploader 
            maxSize={10} 
            onImageUpload={handleImageUpload}
          />
          
          <Gallery 
            images={uploadedImages}
            onImageClick={handleImageClick}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;

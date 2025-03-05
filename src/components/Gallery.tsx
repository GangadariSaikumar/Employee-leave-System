
import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircleIcon, ImageIcon } from "lucide-react";

interface GalleryProps {
  images: Array<{
    id: string;
    src: string;
    name: string;
    size: number;
  }>;
  className?: string;
  onImageClick?: (imageId: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  className,
  onImageClick,
}) => {
  if (images.length === 0) {
    return (
      <div className={cn("mt-8 text-center p-8 border border-dashed rounded-lg", className)}>
        <div className="flex flex-col items-center justify-center gap-2">
          <AlertCircleIcon className="h-8 w-8 text-muted-foreground" />
          <h3 className="text-lg font-medium">No images yet</h3>
          <p className="text-sm text-muted-foreground">
            Upload images to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8", className)}>
      {images.map((image) => (
        <Card 
          key={image.id} 
          className="overflow-hidden cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-primary hover:shadow-lg animate-fade-in"
          onClick={() => onImageClick?.(image.id)}
        >
          <div className="aspect-square w-full overflow-hidden bg-secondary relative">
            <img 
              src={image.src} 
              alt={image.name} 
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <ImageIcon className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium truncate text-sm">{image.name}</span>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {(image.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Gallery;

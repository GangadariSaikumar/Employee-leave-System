
import React, { useState, useRef, useCallback } from 'react';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UploadIcon, ImageIcon, XIcon, CheckIcon, RefreshCwIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ImageUploaderProps {
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  onImageUpload?: (file: File) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  maxSize = 5, // Default 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  onImageUpload,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      toast.error(`Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`);
      return false;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File is too large. Maximum size is ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    setUploadedImage(file);
    
    // Simulate upload process
    simulateUpload(file);
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const totalTime = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = totalTime / interval;
    let currentStep = 0;
    
    const uploadInterval = setInterval(() => {
      currentStep++;
      const newProgress = Math.round((currentStep / steps) * 100);
      setUploadProgress(newProgress);
      
      if (currentStep >= steps) {
        clearInterval(uploadInterval);
        setIsUploading(false);
        setUploadProgress(100);
        
        // Call the callback
        if (onImageUpload) {
          onImageUpload(file);
        }
        
        toast.success(`Successfully uploaded ${file.name}`);
      }
    }, interval);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={acceptedTypes.join(',')}
        className="hidden"
        data-testid="file-input"
      />
      
      {!uploadedImage ? (
        <div
          className={cn(
            "upload-dropzone relative flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed p-12 transition-all duration-200 ease-in-out",
            isDragging 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : "border-border bg-background hover:bg-secondary/40",
            "cursor-pointer animate-fade-in"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
          tabIndex={0}
          role="button"
          aria-label="Upload image"
          data-testid="dropzone"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <UploadIcon className="h-8 w-8 text-primary animate-float" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Drag & drop your image here</h3>
              <p className="text-sm text-muted-foreground">
                or click to browse your files
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: {acceptedTypes.map(type => type.replace('image/', '.')).join(', ')} • Max size: {maxSize}MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Card className="overflow-hidden animate-scale-in">
          <CardContent className="p-0 relative">
            {imagePreview && (
              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-secondary">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-full w-full object-contain"
                />
                
                {isUploading && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-8">
                    <p className="font-medium">Uploading {uploadedImage.name}...</p>
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground">{uploadProgress}%</p>
                  </div>
                )}
                
                {!isUploading && (
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <Button 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                      variant="destructive"
                      className="rounded-full"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span className="font-medium truncate max-w-[200px]">
                    {uploadedImage.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {!isUploading && uploadProgress === 100 ? (
                    <span className="text-xs flex items-center gap-1 text-green-600">
                      <CheckIcon className="h-3 w-3" /> Uploaded
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {(uploadedImage.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  )}
                </div>
              </div>
              
              {!isUploading && (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                  >
                    <RefreshCwIcon className="h-3 w-3 mr-2" />
                    Upload another
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageUploader;

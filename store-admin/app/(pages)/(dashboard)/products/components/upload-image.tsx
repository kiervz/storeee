"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/app/components/ui/button";

interface UploadImageProps {
  index: number;
  disabled?: boolean;
  onChange: (index: number, url: string) => void;
  onRemove: (index: number, url: string) => void;
  value: string[];
}

const UploadImage: React.FC<UploadImageProps> = ({
  index,
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>(value ?? []);

  const onUpload = (result: any) => {
    setSelectedFiles((prev) => [...prev, result.info.secure_url]);
    onChange(index, result.info.secure_url);
  };

  const handleRemove = (urlToRemove: string) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((url) => url !== urlToRemove);
      return updatedFiles;
    });
    onRemove(index, urlToRemove);
  };

  return (
    <div className="flex justify-normal flex-col md:flex-row gap-3 h-auto">
      <CldUploadWidget onUpload={onUpload} uploadPreset="p2qrg0cl">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
      {selectedFiles.length > 0 && (
        <div className="flex justify-normal gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative">
              <Image
                src={file}
                width={0}
                height={0}
                alt="Preview"
                className="object-cover w-24 h-32 aspect-auto"
                sizes="auto"
                priority
                quality={80}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-[5px] right-[5px] cursor-pointer"
                onClick={() => handleRemove(file)}
              >
                <Trash />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImage;

"use client"

import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputFileProps {
}

export default function InputFile(props: InputFileProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveClick = () => {
    setSelectedFile(null);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div className="mt-2 relative">
          <Image
            src={selectedFile}
            alt="Preview"
            width={500}
            height={500}
          />
          <button
            onClick={handleRemoveClick}
            className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2"
            aria-label="Remove image"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
// components/ImageUploader.tsx
import React, { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">집 사진 업로드</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && (
        <div className="mt-4">
          <img src={image} alt="Preview" className="w-full max-w-md border" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader; 
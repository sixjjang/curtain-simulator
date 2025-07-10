import React, { useRef } from "react";

interface UploadSectionProps {
  onUpload: (url: string) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        onUpload(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">사진 업로드</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default UploadSection; 
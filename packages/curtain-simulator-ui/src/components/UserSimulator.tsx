import React, { useState } from "react";
import CurtainSimulator from "./CurtainSimulator";

const UserSimulator = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedPhoto(file);
    setPhotoURL(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">우리집 커튼 시뮬레이션</h2>

      {!photoURL && (
        <div className="border-2 border-dashed border-gray-300 p-8 rounded text-center">
          <p className="mb-4">창문이 보이도록 사진을 업로드해주세요</p>
          <input type="file" accept="image/*" onChange={handleUpload} />
        </div>
      )}

      {photoURL && (
        <CurtainSimulator />
      )}
    </div>
  );
};

export default UserSimulator; 
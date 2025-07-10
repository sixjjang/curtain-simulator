import React from "react";

interface TextureRendererProps {
  textureUrl: string;
  maskUrl: string;
  opacity?: number; // 투명도 조정
  brightness?: number; // 밝기 조정
}

const TextureRenderer: React.FC<TextureRendererProps> = ({
  textureUrl,
  maskUrl,
  opacity = 1,
  brightness = 1,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        maskImage: `url(${maskUrl})`,
        WebkitMaskImage: `url(${maskUrl})`,
        maskSize: "cover",
        WebkitMaskSize: "cover",
        backgroundImage: `url(${textureUrl})`,
        backgroundSize: "cover",
        opacity,
        filter: `brightness(${brightness})`,
      }}
    />
  );
};

export default TextureRenderer; 
import React from "react";

interface ColorOption {
  name: string;
  hex: string;
}

interface Props {
  colors: ColorOption[];
  selected: string;
  onChange: (hex: string) => void;
}

const ColorPicker: React.FC<Props> = ({ colors, selected, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {colors.map((color) => (
        <div
          key={color.hex}
          className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
            selected === color.hex ? "ring-2 ring-blue-500" : ""
          }`}
          style={{ backgroundColor: color.hex }}
          title={color.name}
          onClick={() => onChange(color.hex)}
        />
      ))}
    </div>
  );
};

export default ColorPicker; 
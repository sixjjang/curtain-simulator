import React, { useState } from "react";

// 예시 데이터 (실제는 API 또는 DB 연동)
const initialColors = [
  { name: "아이보리", code: "101-IVO", hex: "#f6f3e9", family: "화이트/베이지" },
  { name: "로즈핑크", code: "302-RPK", hex: "#e09ca5", family: "핑크/레드" },
];

const ColorList = () => {
  const [colors, setColors] = useState(initialColors);

  const handleDelete = (index: number) => {
    const newList = [...colors];
    newList.splice(index, 1);
    setColors(newList);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">컬러 목록</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">미리보기</th>
            <th className="border p-2">컬러명</th>
            <th className="border p-2">코드</th>
            <th className="border p-2">계열</th>
            <th className="border p-2">삭제</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, idx) => (
            <tr key={idx}>
              <td className="border p-2">
                <div className="w-8 h-4 rounded" style={{ backgroundColor: color.hex }} />
              </td>
              <td className="border p-2">{color.name}</td>
              <td className="border p-2">{color.code}</td>
              <td className="border p-2">{color.family}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleDelete(idx)}
                  className="text-red-500 hover:underline"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColorList; 
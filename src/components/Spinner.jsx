// Spinner.jsx
import React from "react";

export default function Spinner() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#0c0c1a]">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-[#FBBF24] rounded-full animate-spin"></div>
    </div>
  );
}

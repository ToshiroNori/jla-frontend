import React from "react";

export default function Spinner() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#F9F9F9]">
      <div className="w-16 h-16 border-4 border-[#E5E7EB] border-t-[#09090B] rounded-full animate-spin"></div>
    </div>
  );
}

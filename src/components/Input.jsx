import React from "react";

export function Input({ value, onChange, placeholder, className = "" }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-white dark:bg-[#262626] border border-gray-300 dark:border-[#0D0D0D] text-gray-800 dark:text-[#F2F2F2] placeholder-gray-400 dark:placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-[#1E6F9F] shadow-sm text-base px-4 py-4 rounded-lg flex-1 transition-colors ${className}`}
    />
  );
}

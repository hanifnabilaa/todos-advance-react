import React from "react";

export function Button({
  type = "button",
  onClick,
  children,
  disabled,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#1E6F9F] hover:bg-[#1A618B] text-white flex items-center justify-center gap-2 px-4 py-4 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed leading-none shadow-sm ${className}`}
    >
      {children}
    </button>
  );
}

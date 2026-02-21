import React from "react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-t border-gray-300 dark:border-[#333333] rounded-lg transition-colors">
      <svg
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        className="mb-4 text-gray-400 dark:text-[#333333] transition-colors"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M9 14h6"></path>
        <path d="M9 18h6"></path>
        <path d="M12 10h.01"></path>
      </svg>
      <div className="text-gray-500 text-base leading-relaxed dark:text-[#808080] transition-colors">
        <p className="font-bold text-gray-600 dark:text-[#808080]">
          Belum ada tugas untuk saat ini
        </p>
        <p>Silahkan tambah tugas baru pada form di atas.</p>
      </div>
    </div>
  );
}

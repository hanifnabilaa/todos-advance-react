import React from "react";
import { ClipboardList } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-t border-gray-300 dark:border-[#333333] rounded-lg transition-colors">
      <ClipboardList
        size={56}
        strokeWidth={1.5}
        className="mb-4 text-gray-400 dark:text-[#333333] transition-colors"
      />
      <div className="text-gray-500 text-base leading-relaxed dark:text-[#808080] transition-colors">
        <p className="font-bold text-gray-600 dark:text-[#808080]">
          Belum ada tugas untuk saat ini
        </p>
        <p>Silahkan tambah tugas baru pada form di atas.</p>
      </div>
    </div>
  );
}

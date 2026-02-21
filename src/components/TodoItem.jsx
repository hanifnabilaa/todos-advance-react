import React from "react";

export function TodoItem({ title, completed, onToggle, onDelete, id }) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg mb-3 shadow-sm transition-colors ${
        completed
          ? "bg-gray-100 dark:bg-[#262626] border border-transparent dark:border-transparent"
          : "bg-white dark:bg-[#262626] border border-gray-300 dark:border-[#333333]"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="mt-0.5 shrink-0"
      >
        {completed ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-[#5E60CE]"
          >
            <circle cx="10" cy="10" r="10" />
            <path
              d="M6 10l3 3 5-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-[#4EA8DE] cursor-pointer" />
        )}
      </button>

      <span
        className={`flex-1 text-sm leading-tight mt-0.5 transition-colors ${
          completed
            ? "text-gray-400 dark:text-[#808080] line-through"
            : "text-gray-700 dark:text-[#F2F2F2]"
        }`}
      >
        {title}
      </span>

      <button
        type="button"
        onClick={() => onDelete(id)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-[#F2F2F2] transition-colors shrink-0"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
}

import React from "react";

export function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="bg-gray-200 dark:bg-[#0D0D0D] h-[200px] flex items-center justify-center w-full relative transition-colors duration-200">
      <div className="flex items-center gap-3">
        <svg
          width="28"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4EA8DE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
        <h1 className="text-4xl font-black">
          <span className="text-[#4EA8DE]">to</span>
          <span className="text-[#5E60CE]">do</span>
        </h1>
      </div>

      <button
        type="button"
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F2F2F2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </header>
  );
}

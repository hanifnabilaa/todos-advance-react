import React from "react";
import { Rocket, Sun, Moon } from "lucide-react";

export function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="bg-gray-200 dark:bg-[#0D0D0D] h-[200px] flex items-center justify-center w-full relative transition-colors duration-200">
      <div className="flex items-center gap-3">
        <Rocket className="text-[#4EA8DE] mt-1" size={32} />
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
          <Sun className="text-[#F2F2F2]" size={24} />
        ) : (
          <Moon className="text-[#1A1A1A]" size={24} />
        )}
      </button>
    </header>
  );
}

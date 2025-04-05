import React from "react";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ 
  title, 
  background, 
  icon, 
  darkMode = false 
}) {
  return (
    <div 
      className={`rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:translate-y-[-5px] hover:shadow-md ${background} p-8`}
    >
      <div className="mb-6">
        <h2 className="text-2xl mb-3">
          <span className={`inline-block bg-[#B4FF4A] px-3 py-1 rounded-lg font-semibold ${darkMode ? 'text-[#1A1A1A]' : ''}`}>
            {title}
          </span>
        </h2>
      </div>
      <div className="flex justify-between items-end">
        <div className="learn-more-container">
          <button 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md ${
              darkMode 
                ? 'bg-white text-[#1A1A1A]' 
                : 'bg-[#1A1A1A] text-white'
            } font-medium`}
          >
            <span>Learn more</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="illustration-container">
          {icon}
        </div>
      </div>
    </div>
  );
}
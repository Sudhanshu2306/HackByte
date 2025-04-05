import React from "react";

export default function TestimonialCard({ text, author, position }) {
  return (
    <div className="testimonial-card flex flex-col items-center">
      <div className="speech-bubble relative mb-6 bg-transparent border border-[#B4FF4A] rounded-3xl p-6 h-48 max-w-2xl mx-auto">
        <p className="text-white text-lg leading-relaxed">{text}</p>
        <div className="speech-arrow absolute h-6 w-6 border-r border-b border-[#B4FF4A] bg-[#1A1A1A] transform rotate-45 -bottom-3 left-1/2 -ml-3"></div>
      </div>
      <div className="author-info text-center text-white mt-4">
        <h3 className="text-[#B4FF4A] font-semibold text-xl">{author}</h3>
        <p className="text-gray-300">{position}</p>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import TestimonialCard from "../Components/ui/TestimonialCard"
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Thanks to Tracify, we found our missing brother within days. The video search feature caught him walking past a local store’s camera — something no other service could do. We’re forever grateful!",
    author: "John Smith",
    position: "Marketing Director at XYZ Corp"
  },
  {
    id: 2,
    text: "Tracify isn't just a platform — it’s a miracle. We uploaded a blurry CCTV clip, and within hours, we got a match. No words can describe the joy of reuniting with my mother after months of searching",
    author: "Sarah Johnson",
    position: "CEO at Bright Solutions Inc."
  },
  {
    id: 3,
    text: "Other missing person platforms only looked at photos. Tracify’s video analysis tech helped us spot our cousin in a news channel’s street footage. Truly next-generation innovation!",
    author: "Michael Brown",
    position: "Sales Director at Tech Innovations"
  },
  {
    id: 4,
    text: "The family tracing feature is life-changing. Even though we couldn’t find my nephew immediately, Tracify connected us with distant relatives who were also searching. We rebuilt our family, thanks to this beautiful platform",
    author: "Emily Chen",
    position: "Digital Strategist at GrowFast Agency"
  },
  {
    id: 5,
    text: "Tracify gave us hope when we had none. The AI face match through videos was beyond anything we imagined. If you’re looking for a loved one, Tracify is the best place to start",
    author: "Robert Taylor",
    position: "Founder of Premium Boutique"
  }
];

export default function TestimonialPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container mx-auto px-4 py-12 h-4xl max-w-6xl">
      <div className="mb-8 flex gap-6 items-center ">
        <h1 className="text-3xl font-bold">
          <span className="inline-block bg-[#B4FF4A] px-3 py-1 rounded-lg font-semibold">
            Testimonials
          </span>
        </h1>
        <p className=" max-w-3xl font-semibold text-md">
          Hear from Our Satisfied Clients: Read Our Testimonials
          to Learn More about Our Digital Marketing Services
        </p>
      </div>

      <div className="relative bg-[#1A1A1A] rounded-3xl p-8 pb-20">
        <div className="testimonial-slider">
          <TestimonialCard
            key={testimonials[currentSlide].id}
            text={testimonials[currentSlide].text}
            author={testimonials[currentSlide].author}
            position={testimonials[currentSlide].position}
          />
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full ${
                index === currentSlide ? "bg-[#B4FF4A]" : "bg-white opacity-50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#B4FF4A] text-black p-2 rounded-full transition-all duration-500 ease-in-out delay-500"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#B4FF4A] text-black p-2 rounded-full transition-all duration-200 ease-in-out delay-100"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

      </div>
    </div>
  );
}
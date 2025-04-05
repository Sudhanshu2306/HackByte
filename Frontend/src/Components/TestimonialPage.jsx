import React, { useState } from "react";
import TestimonialCard from "../Components/ui/TestimonialCard"
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    author: "John Smith",
    position: "Marketing Director at XYZ Corp"
  },
  {
    id: 2,
    text: "Since partnering with Positivus, our social media engagement has increased by 200%. Their strategic approach and creative content have transformed our brand's online visibility. The team is always available and delivers results beyond expectations.",
    author: "Sarah Johnson",
    position: "CEO at Bright Solutions Inc."
  },
  {
    id: 3,
    text: "Positivus revamped our email marketing strategy, resulting in a 45% increase in open rates and 60% more conversions. Their data-driven approach and attention to detail have made a significant impact on our bottom line. I wouldn't hesitate to recommend them.",
    author: "Michael Brown",
    position: "Sales Director at Tech Innovations"
  },
  {
    id: 4,
    text: "Our PPC campaigns were underperforming until we brought in Positivus. Within just 3 months, they optimized our ads and reduced our cost per acquisition by 38% while increasing qualified leads. Their expertise in digital advertising is unmatched.",
    author: "Emily Chen",
    position: "Digital Strategist at GrowFast Agency"
  },
  {
    id: 5,
    text: "The SEO work done by Positivus has helped us reach the first page of Google for our most important keywords. Their holistic approach to optimization and content creation has delivered sustainable growth month after month.",
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
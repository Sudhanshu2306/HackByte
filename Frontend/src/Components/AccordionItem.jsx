import { useRef, useEffect } from "react";

const AccordionItem = ({ id, number, title, content, isOpen, toggleSection }) => {
  const contentRef = useRef(null);
  
  // Calculate actual height for smooth transitions
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.maxHeight = "0px";
      }
    }
  }, [isOpen]);

  return (
    <div 
      className="rounded-xl overflow-hidden border border-gray-200 shadow-sm" 
      data-section-id={id}
    >
      <div
        className={`${
          isOpen ? "bg-[#B4FF4A]" : "bg-[#F2F2F2]"
        } p-6 cursor-pointer relative`}
        onClick={() => toggleSection(id)}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`content-${id}`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-4xl font-bold">{number}</span>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <button
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
            aria-label={`Toggle ${title} section`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSection(id);
            }}
          >
            <span className="text-2xl font-bold">{isOpen ? "-" : "+"}</span>
          </button>
        </div>
      </div>
      
      <div
        ref={contentRef}
        id={`content-${id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "bg-[#B4FF4A]" : "bg-[#F2F2F2]"
        }`}
        style={{ maxHeight: "0px" }}
      >
        <div className="px-6 pb-6">
          <p className="text-gray-800 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;

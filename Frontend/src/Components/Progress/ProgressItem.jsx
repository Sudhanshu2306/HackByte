import React from "react";

/**
 * Props:
 * - icon: React icon component
 * - time: string (time label)
 * - title: string (title of the activity)
 * - description: string (text shown on hover)
 * - position: "top" | "bottom" (where to position the tooltip)
 */
function ProgressItem({ icon: Icon, time, title, description, position = "top" }) {
  // Depending on the position, adjust tooltip placement:
  const tooltipPositionClass =
    position === "top"
      ? "bottom-full mb-2"
      : "top-full mt-2";
  const tooltipTransformOrigin =
    position === "top" ? "origin-bottom" : "origin-top";

  return (
    <div className="relative group flex flex-col items-center ">
      {/* Icon container with 3D hover effect */}
      <div
        className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center border-4 border-[#94ed18] transition-transform duration-300 transform-gpu shadow-xl hover:shadow-2xl cursor-pointer"
        style={{ perspective: "500px" }}
      >
        <Icon size={24} />
      </div>

      {/* Time label */}
      <span className="mt-2 text-sm font-semibold text-gray-600">
        {time}
      </span>

      {/* Tooltip that appears on hover */}
      <div
        className={`
          absolute left-1/2 transform -translate-x-1/2 ${tooltipPositionClass}
          bg-white text-gray-800 text-sm px-3 py-2 rounded-md opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none shadow-xl min-w-[100px]
        `}
        style={{ perspective: "500px", transformStyle: "preserve-3d" }}
      >
        <div
          className={`
            transform-gpu transition-transform duration-300 ${tooltipTransformOrigin} 
            group-hover:rotate-x-0 rotate-x-90
          `}
          style={{ transformOrigin: "center" }}
        >
          <h3 className="font-semibold">{title}</h3>
          <p className=" w-40 text-xs">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProgressItem;

import React from "react";
import ProgressItem from "./ProgressItem";
import { MdFaceRetouchingNatural } from "react-icons/md";
import { BsDatabaseFillLock } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsPersonFillExclamation } from "react-icons/bs";

function ProgressLine() {
  // Sample timeline data
  const timelineData = [
    {
      step: "Face Recognition",
      icon: MdFaceRetouchingNatural,
      title: "Upload",
      description: "Upload the Image, find if someone's missing",
    },
    {
      step: "Database Search",
      icon: BsDatabaseFillLock,
      title: "Searching",
      description: "Scans the Database for similar faces",
    },
    {
        step: "Fill Missing Report",
        icon: BsPersonFillExclamation,
        title: "Report",
        description: "Add details and photo of the missing person",
      },
    {
      step: "Where are we all?",
      icon: FaMapLocationDot,
      title: "Location Tracking",
      description: "Track your family members in a dynamic radius",
    },
    {
      step: "Immediate Notification",
      icon: IoNotifications,
      title: "Broadcasting",
      description: "Everyone in the app's radius gets a notification.",
    },
    {
        step: "Hand-over",
        icon: BsPersonLinesFill,
        title: "Online E-FIR",
        description: "Report if you find someone missing",
      },
  ];

  return (
    <div className="w-full p-10 flex flex-col">
      <div className="mb-6 flex items-center gap-6 justify-center ">
        <div className="inline-block bg-[#B4FF4A] px-4 py-2 rounded-lg mb-1">
          <h1 className="text-2xl font-bold">Walk Through</h1>
        </div>
        <p className="text-gray-800 max-w-2xl text-md font-semibold">
          A quick quide how to use the app
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative w-full flex items-center justify-center p-5 mt-8 mb-5">
        {/* Horizontal line */}
        <div className="absolute top-1/2 w-[80%] h-[2px] bg-gray-300" />

        {/* Timeline items arranged horizontally */}
        <div className="flex w-[80%] justify-between">
          {timelineData.map((item, index) => {
            // Alternate the position: even index items are above (top) and odd items below (bottom)
            const position = index % 2 === 0 ? "top" : "bottom";
            return (
              <ProgressItem
                key={index}
                icon={item.icon}
                time={item.step}
                title={item.title}
                description={item.description}
                position={position}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressLine;

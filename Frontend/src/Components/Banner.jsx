import React from "react";
import Globe from "./Globe.jsx";

const Banner = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-50 flex justify-center justify-between">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12">

        {/* Text Section */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Tracify: Find Lost Loved Ones
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Help reunite families by uploading photos of suspected lost persons.
            Our system matches images against a database to find potential matches and bring them home.
          </p>
          <div className="mt-4">
            <button className="bg-[#CCFF33] text-black px-5 py-2 rounded-md text-sm font-medium hover:bg-[#B3E02D]">
              Find a Person
            </button>
          </div>
        </div>

        {/* Globe Section */}
        <div className="flex-1 flex justify-center max-w-[600px] max-h-[350px]">
          <Globe />
        </div>

      </div>
    </div>
  );
};

export default Banner;

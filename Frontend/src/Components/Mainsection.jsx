import React from 'react';
import RightComponent from './RightComponent';
const Mainsection = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Tracify: Find Lost Loved Ones
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Help reunite families by uploading photos of suspected lost persons. Our system matches images against a database to find potential matches and bring them home.
          </p>
          <div className="mt-8">
            <button className="bg-[#CCFF33]  text-black px-6 py-3 rounded-md text-base font-medium hover:bg-[#B3E02D]">
              Find a Person
            </button>
          </div>
        </div>
        <div>
          <RightComponent />
        </div>
      </div>
    </div>
  );

}
export default Mainsection;
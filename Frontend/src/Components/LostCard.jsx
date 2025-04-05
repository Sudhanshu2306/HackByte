import React, { useState } from 'react';

function LostCard({ members }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const shortDescription = members.description.split(' ').slice(0, 2).join(' ');

  return (
    <div className="relative flex w-[20rem] h-[10rem] items-center justify-around bg-gray- shadow-lg rounded-2xl p-2">
      {/* Profile Image */}
      <div className="w-[10rem] h-[10rem] rounded-xl bg-gray flex justify-center items-center bg-gray-100 ">
        <img src={members.image_url} alt={members.name} className="w-[8rem] h-[8rem] object-cover rounded-2xl" />
      </div>

      {/* User Info */}
      <div className="ml-3  flex flex-col  gap-2 ">
        <h2 className="text-md font-semibold text-center">{members.name}</h2>
        <p className="text-gray-500 text-sm text-center">Age: {members.age}</p>

        {/* Description Section */}
        <div className=" text-center text-black  p-2 rounded-lg  bg-gray-100 text-xs">
         {shortDescription}
          {members.description.split(' ').length > 2 && (
            <button
              onClick={toggleDescription}
              className="text-blue-500 ml-1"
            >
              More...
            </button>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-1">
          <button className="bg-[#B4FF4A] hover:bg-[#AFFF30] text-black px-2 py-1 rounded-md">
            Find Me
          </button>
        </div>
      </div>

      {/* Popup Description */}
      {showFullDescription && (
        <div className="absolute top-0 left-0 w-full h-full bg-white shadow-lg rounded-2xl p-2 z-10">
          <h2 className="text-md font-semibold text-center mb-2">{members.name}</h2>
          <p className="text-gray-700">{members.description}</p>
          <button
            onClick={toggleDescription}
            className="mt-2 bg-gray-200 px-3 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default LostCard;
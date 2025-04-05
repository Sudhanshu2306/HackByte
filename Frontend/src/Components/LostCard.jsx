import React, { useState } from 'react';

function LostCard({ members }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const shortDescription =
    members.description.split(' ').slice(0, 12).join(' ') + '...';

  return (
    <div className="relative w-[22rem] min-h-[16rem] bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 transition-all hover:shadow-xl">
      <div className="flex p-4 gap-4">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={members.image_url}
            alt={`${members.firstName} ${members.lastName}`}
            className="w-[7rem] h-[7rem] rounded-lg object-cover border border-gray-300"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between flex-grow">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">
              {members.firstName} {members.lastName}
            </h2>
            <p className="text-xs text-gray-700">
              {showFullDescription ? members.description : shortDescription}
              {members.description.split(' ').length > 12 && (
                <button
                  onClick={toggleDescription}
                  className="text-blue-500 hover:underline ml-1 text-xs"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </button>
              )}
            </p>
            <p className="text-xs text-gray-600"><strong>Phone:</strong> {members.phoneNumber}</p>
            <p className="text-xs text-gray-600"><strong>Zip:</strong> {members.zipCode}</p>
            <p className={`text-xs font-semibold ${members.resolved ? 'text-green-600' : 'text-red-600'}`}>
              Status: {members.resolved ? 'Resolved' : 'Unresolved'}
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-3">
            <a
              href="/report"
              className="block text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all"
            >
              Report / Found
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LostCard;

import React from "react";
import { CheckCircle } from "lucide-react"; // Import green tick icon

export default function PersonCardResolved({ member }) {
  if (!member) return null; // Prevent errors if member is null

  return (
    <div className="border-2 rounded-lg shadow-md p-4 flex items-center justify-between max-w-sm bg-white">
      {/* Profile Image */}
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border">
        <img
          src={member.imgUrl}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="ml-4 flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold text-center">{member.name}</h2>
        <p className="text-gray-500 text-sm text-center">{member.age}</p>
        <div className="text-gray-400 text-sm text-center">
          Contact Details: {member.contactDetails}
        </div>
      </div>

      {/* Resolved Badge */}
      <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
        <CheckCircle size={20} className="text-green-600" />
        <span className="text-sm font-medium">Founded</span>
      </div>
    </div>
  );
}

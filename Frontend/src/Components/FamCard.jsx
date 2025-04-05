import { FaHeart, FaComment } from "react-icons/fa";

export default function FamCard({member}) {
  return (
    <div className="border rounded-lg shadow-md p-4 flex items-center max-w-sm">
      {/* Profile Image */}
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-1">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Mark Anthony"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Info Section */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{member.name}</h2>
        
        </div>
        <p className="text-gray-500 text-sm">{member.age}</p>
        <div className="text-gray-400 text-xs">Tracking Status</div>
        
      </div>
      
     
    </div>
  );
}

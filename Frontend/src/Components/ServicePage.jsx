import ServiceCard from "../Components/ui/ServiceCard";

export default function ServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 flex gap-6 items-center">
        <h1 className="text-3xl font-bold ">
          <span className="inline-block bg-[#B4FF4A] px-3 py-1 rounded-lg font-semibold">Unique Features</span>
        </h1>
        <p className="text-lg max-w-3xl">
          Our platform doesn’t just find missing individuals — it also helps reconnect family members. Using facial recognition combined with relationship mapping
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard
          title="Face Recognition"
          background="bg-[#F2F2F2]"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="180" r="60" stroke="#333" strokeWidth="8" fill="none" />
              <line x1="240" y1="220" x2="290" y2="270" stroke="#333" strokeWidth="8" strokeLinecap="round" />
              <line x1="190" y1="120" x2="190" y2="140" stroke="#333" strokeWidth="4" strokeLinecap="round" />
              <line x1="190" y1="220" x2="190" y2="240" stroke="#333" strokeWidth="4" strokeLinecap="round" />
              <line x1="120" y1="180" x2="140" y2="180" stroke="#333" strokeWidth="4" strokeLinecap="round" />
              <line x1="240" y1="180" x2="260" y2="180" stroke="#333" strokeWidth="4" strokeLinecap="round" />
              <circle cx="320" cy="300" r="20" fill="#333" />
              <circle cx="320" cy="70" r="15" fill="#333" />
              <path d="M100 100 L120 120" stroke="#333" strokeWidth="2" strokeLinecap="round" />
              <path d="M250 100 L270 80" stroke="#333" strokeWidth="2" strokeLinecap="round" />
              <path d="M120 250 L100 270" stroke="#333" strokeWidth="2" strokeLinecap="round" />
              <circle cx="350" cy="150" r="15" fill="#333" />
            </svg>
          }
        />
        <ServiceCard
          title="Matches Image/Video with DB"
          background="bg-[#B4FF4A]"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 400 400" fill="none">
              <rect x="100" y="100" width="180" height="130" rx="5" fill="#fff" stroke="#333" strokeWidth="6" />
              <rect x="120" y="120" width="140" height="20" rx="3" fill="#eee" />
              <rect x="120" y="150" width="140" height="60" rx="3" fill="#eee" />
              <path d="M290 180 L320 180 L305 200 Z" fill="#333" />
              <circle cx="290" cy="240" r="30" stroke="#333" strokeWidth="6" fill="none" />
              <path d="M280 230 L300 250" stroke="#333" strokeWidth="6" strokeLinecap="round" />
              <path d="M300 230 L280 250" stroke="#333" strokeWidth="6" strokeLinecap="round" />
            </svg>
          }
        />
        <ServiceCard
          title="Location Tracking"
          background="bg-[#1A1A1A]"
          darkMode={true}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                fill="#fff"
              />
            </svg>
          }
        />

      </div>
    </div>
  );
}
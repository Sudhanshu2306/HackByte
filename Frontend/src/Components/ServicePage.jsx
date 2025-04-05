import ServiceCard from "../Components/ui/ServiceCard";

export default function ServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 flex gap-6 items-center">
        <h1 className="text-3xl font-bold ">
          <span className="inline-block bg-[#B4FF4A] px-3 py-1 rounded-lg font-semibold">Unique Features</span>
        </h1>
        <p className="text-lg max-w-3xl">
          At our digital marketing agency, we offer a range of services to
          help businesses grow and succeed online. These services include:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard 
          title="Search engine optimization"
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
          title="Pay-per-click advertising"
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
          title="Social Media Marketing"
          background="bg-[#1A1A1A]"
          darkMode={true}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 400 400" fill="none">
              <rect x="130" y="120" width="80" height="100" rx="5" fill="#fff" stroke="#fff" strokeWidth="4" />
              <rect x="220" y="90" width="80" height="100" rx="5" fill="#fff" stroke="#fff" strokeWidth="4" />
              <rect x="80" y="180" width="80" height="100" rx="5" fill="#fff" stroke="#fff" strokeWidth="4" />
              <path d="M150 170 L150 150 L190 150 L190 170" stroke="#fff" strokeWidth="4" fill="none" />
              <circle cx="170" cy="150" r="15" fill="#fff" />
              <path d="M240 140 L240 120 L280 120 L280 140" stroke="#fff" strokeWidth="4" fill="none" />
              <circle cx="260" cy="120" r="15" fill="#fff" />
              <path d="M100 230 L100 210 L140 210 L140 230" stroke="#fff" strokeWidth="4" fill="none" />
              <circle cx="120" cy="210" r="15" fill="#fff" />
              <path d="M160 180 L180 160" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
              <path d="M230 150 L250 130" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
              <path d="M130 220 L110 200" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
              <path d="M360 200 L340 200 L340 160 L360 160" stroke="#fff" strokeWidth="3" fill="none" />
              <path d="M350 180 L365 180" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              <path d="M350 170 L365 170" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              <path d="M350 190 L365 190" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          }
        />
        <ServiceCard 
          title="Email Marketing"
          background="bg-[#F2F2F2]"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 400 400" fill="none">
              <path d="M100 150 L230 230 L360 150" stroke="#333" strokeWidth="6" fill="none" />
              <rect x="100" y="150" width="260" height="160" rx="10" stroke="#333" strokeWidth="6" fill="none" />
              <circle cx="300" cy="120" r="40" stroke="#333" strokeWidth="6" fill="none" />
              <circle cx="150" cy="320" r="40" stroke="#333" strokeWidth="6" fill="none" />
              <path d="M280 100 L320 140" stroke="#333" strokeWidth="6" strokeLinecap="round" />
              <path d="M130 300 L170 340" stroke="#333" strokeWidth="6" strokeLinecap="round" />
              <path d="M150 280 L100 350" stroke="#333" strokeWidth="4" strokeLinecap="round" />
              <path d="M300 160 L350 80" stroke="#333" strokeWidth="4" strokeLinecap="round" />
            </svg>
          }
        />
      </div>
    </div>
  );
}
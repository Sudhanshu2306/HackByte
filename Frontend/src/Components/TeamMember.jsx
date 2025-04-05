import { FaLinkedin, FaGithub} from "react-icons/fa";
const TeamMember = ({ name, title, experience, photo,link }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden relative">
              {/* Blob shape for the photo */}
              <div className="absolute w-24 h-24 bg-[#C1FF72] -top-2 -left-2" style={{
                WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M47.5,-61.7C60.5,-53.5,69.4,-37.7,73.5,-21C77.7,-4.2,77.2,13.4,70.3,28.6C63.4,43.8,50.2,56.5,35.1,62.7C19.9,68.9,2.7,68.6,-14.9,66.1C-32.5,63.5,-50.6,58.7,-62.8,47C-75.1,35.2,-81.6,16.6,-80.2,-1.4C-78.8,-19.4,-69.5,-36.6,-56.6,-44.8C-43.7,-53,-27.3,-52.1,-11.8,-53C3.8,-53.9,18.4,-56.6,31.9,-62.4C45.4,-68.2,56.9,-77.1,68.7,-77.6C80.5,-78.1,92.5,-70.2,94.5,-58.7C96.4,-47.2,88.3,-32.2,86.2,-16.9C84.2,-1.6,88.2,13.1,86.3,28.2C84.4,43.3,76.5,58.8,63.9,68.5C51.4,78.3,34.2,82.2,17.8,81.4C1.4,80.5,-14.2,74.9,-28.5,68.4C-42.7,61.8,-55.7,54.4,-66.6,43.5C-77.5,32.6,-86.3,18.3,-88.4,2.1C-90.4,-14.1,-85.7,-32.2,-75.8,-45.8C-65.9,-59.5,-50.9,-68.6,-35.6,-75.5C-20.3,-82.4,-4.8,-87.1,10.7,-88.5C26.2,-89.9,41.7,-88,47.4,-73.8C53.1,-59.6,49.1,-33.1,47.5,-31.1C45.9,-29.1,46.8,-51.6,47.5,-61.7Z' transform='translate(100 100)'/%3E%3C/svg%3E\")",
                maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M47.5,-61.7C60.5,-53.5,69.4,-37.7,73.5,-21C77.7,-4.2,77.2,13.4,70.3,28.6C63.4,43.8,50.2,56.5,35.1,62.7C19.9,68.9,2.7,68.6,-14.9,66.1C-32.5,63.5,-50.6,58.7,-62.8,47C-75.1,35.2,-81.6,16.6,-80.2,-1.4C-78.8,-19.4,-69.5,-36.6,-56.6,-44.8C-43.7,-53,-27.3,-52.1,-11.8,-53C3.8,-53.9,18.4,-56.6,31.9,-62.4C45.4,-68.2,56.9,-77.1,68.7,-77.6C80.5,-78.1,92.5,-70.2,94.5,-58.7C96.4,-47.2,88.3,-32.2,86.2,-16.9C84.2,-1.6,88.2,13.1,86.3,28.2C84.4,43.3,76.5,58.8,63.9,68.5C51.4,78.3,34.2,82.2,17.8,81.4C1.4,80.5,-14.2,74.9,-28.5,68.4C-42.7,61.8,-55.7,54.4,-66.6,43.5C-77.5,32.6,-86.3,18.3,-88.4,2.1C-90.4,-14.1,-85.7,-32.2,-75.8,-45.8C-65.9,-59.5,-50.9,-68.6,-35.6,-75.5C-20.3,-82.4,-4.8,-87.1,10.7,-88.5C26.2,-89.9,41.7,-88,47.4,-73.8C53.1,-59.6,49.1,-33.1,47.5,-31.1C45.9,-29.1,46.8,-51.6,47.5,-61.7Z' transform='translate(100 100)'/%3E%3C/svg%3E\")",
              }}>
                <img 
                  src={photo} 
                  alt={name} 
                  className="w-20 h-20 object-cover grayscale relative z-10" 
                  style={{ filter: "contrast(1.1) brightness(0.9)" }}
                />
              </div>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-600">{title}</p>
          </div>
        </div>
        <div className="flex gap-4">
            <a href={link.linkedin} target="_blank" className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
            <FaLinkedin />
            </a>
            <a href={link.github} target="_blank" className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
            <FaGithub  />
            </a>
        </div>
        
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-2">
        <p className="text-gray-700">{experience}</p>
      </div>
    </div>
  );
};

export default TeamMember;
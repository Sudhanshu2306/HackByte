import TeamMember from "../Components/TeamMember";

// Placeholder image URLs - replace with actual images
import uj from "../assets/images/uj.jpg";
import sh from "../assets/images/sh.jpg";
import su from "../assets/images/su.jpg";
import st from "../assets/images/st.jpg";
const Team = () => {
  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Shubham Patel",
      title: "CEO and Founder",
      experience: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy",
      photo: sh,
      link :{
        linkedin: "https://www.linkedin.com/in/shub17/",
        github: "https://github.com/Sp-177"
      }
    },
    {
      id: 2,
      name: "Ujjwal Agrawal",
      title: "Director of Operations",
      experience: "7+ years of experience in project management and team leadership. Strong organizational and communication skills",
      photo: uj,
      link :{
       linkedin: "https://www.linkedin.com/in/ujjwal-agrawal-9267b1253/",
        github: "https://github.com/ujjwalagrawal-1"
      }
    },
    {
      id: 3,
      name: "Sudhanshu raj",
      title: "Senior SEO Specialist",
      experience: "5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization",
      photo: su,
      link :{
         linkedin: "https://www.linkedin.com/in/sudhanshu-raj2306/",
        github: "https://github.com/Sudhanshu2306"
      }
    },
    {
      id: 4,
      name: "Siddhant Tomar",
      title: "PPC Manager",
      experience: "3+ years of experience in paid search advertising. Skilled in campaign management and optimization",
      photo: st,
      link :{
        linkedin: "https://www.linkedin.com/in/siddhant-tomar-9b3aab261/",
        github: "https://github.com/siddhanttomar2003"
      }
    }
  ];

  return (
    <div className="bg-white p-4 md:p-8 max-w-6xl mx-auto relative">
      {/* Decorative radial lines */}
      <div className="radial-lines"></div>
      
      <div className="mb-6 flex items-center gap-6 ">
        <div className="inline-block bg-[#B4FF4A] px-4 py-2 rounded-lg mb-1">
          <h1 className="text-2xl font-bold">Team</h1>
        </div>
        <p className="text-gray-800 max-w-2xl text-md font-semibold">
          Meet the skilled and experienced team behind our successful digital marketing strategies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {teamMembers.map((member) => (
          <TeamMember
            key={member.id}
            name={member.name}
            title={member.title}
            experience={member.experience}
            photo={member.photo}
            link={member.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
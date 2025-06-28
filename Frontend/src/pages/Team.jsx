import TeamMember from "../Components/TeamMember";

// Placeholder image URLs - replace with actual images
import uj from "../assets/images/uj.png";
import su from "../assets/images/su.jpg";
import st from "../assets/images/st.png";
const Team = () => {
  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Ujjwal Agrawal",
      title: "FullStack Developer",
      experience: "2+ years of experience in Fullstack Development (React & Express)",
      photo: uj,
      link: {
        linkedin: "https://www.linkedin.com/in/ujjwal-agrawal-9267b1253/",
        github: "https://github.com/ujjwalagrawal-1",
      },
    },
    {
      id: 2,
      name: "Sudhanshu raj",
      title: "AI and Frontend Developer",
      experience: "2+ years of experience in Frontend",
      photo: su,
      link: {
        linkedin: "https://www.linkedin.com/in/sudhanshu-raj2306/",
        github: "https://github.com/Sudhanshu2306",
      },
    },
    {
      id: 3,
      name: "Siddhant Tomar",
      title: "Frontend Developer and UI Designer",
      experience: "2+ years of experience in ReactJs",
      photo: st,
      link: {
        linkedin: "https://www.linkedin.com/in/siddhant-tomar-9b3aab261/",
        github: "https://github.com/siddhanttomar2003",
      },
    },
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
          Meet the skilled and experienced team behind our successful digital
          marketing strategies
        </p>
      </div>

      <div
        className={`grid gap-6 mt-8 ${
          teamMembers.length === 4 ? "grid-cols-4" : "grid-cols-2"
        }`}
      >
        {teamMembers.length === 3 ? (
          <>
            {/* First two members */}
            {teamMembers.slice(0, 2).map((member) => (
              <TeamMember
                key={member.id}
                name={member.name}
                title={member.title}
                experience={member.experience}
                photo={member.photo}
                link={member.link}
              />
            ))}
            {/* Center the third one */}
            <div className="col-span-2 flex justify-center">
              <TeamMember
                key={teamMembers[2].id}
                name={teamMembers[2].name}
                title={teamMembers[2].title}
                experience={teamMembers[2].experience}
                photo={teamMembers[2].photo}
                link={teamMembers[2].link}
              />
            </div>
          </>
        ) : (
          teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              name={member.name}
              title={member.title}
              experience={member.experience}
              photo={member.photo}
              link={member.link}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Team;

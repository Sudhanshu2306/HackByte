import { useState } from "react";
import AccordionItem from "./AccordionItem";

const WorkingProcess = () => {
  const [openSection, setOpenSection] = useState("section-1");

  const toggleSection = (sectionId) => {
    if (sectionId === openSection) {
      // Allow closing the currently open section
      setOpenSection(null);
    } else {
      setOpenSection(sectionId);
    }
  };

  const processSteps = [
    {
      id: "section-1",
      number: "01",
      title: "Upload Photo or Video",
      content:
        "Users can upload a photo or video of the missing person or suspected individual. Our system scans the uploaded media against the database to identify potential matches.",
    },
    {
      id: "section-2",
      number: "02",
      title: "Search and Match",
      content:
        "Our advanced AI-powered system analyzes the uploaded media and searches through the database to find the closest matches, helping to quickly locate missing individuals.",
    },
    {
      id: "section-3",
      number: "03",
      title: "Retrieve Contact Information",
      content:
        "Once a match is found, the system retrieves the registered contact details of the missing person or their family members to facilitate immediate communication and reunion.",
    },
    {
      id: "section-4",
      number: "04",
      title: "Real-time Location Tracking",
      content:
        "Families can set a safe radius for their loved ones. If the individual moves outside the designated area, the system sends instant alerts and displays their location on an interactive map.",
    },
  ];
  

  return (
    <div className="bg-white p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-6">
        <div className="inline-block bg-[#B4FF4A] px-4 py-2 rounded-lg mb-1">
          <h1 className="text-2xl font-bold">Our Working Process</h1>
        </div>
        <p className="text-gray-800 text-md font-semibold">
          Step-by-Step Guide to Achieving Your Business Goals
        </p>
      </div>

      <div className="space-y-4">
        {processSteps.map((step) => (
          <AccordionItem
            key={step.id}
            id={step.id}
            number={step.number}
            title={step.title}
            content={step.content}
            isOpen={openSection === step.id}
            toggleSection={toggleSection}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkingProcess;
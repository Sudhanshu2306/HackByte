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
      title: "Consultation",
      content:
        "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
    },
    {
      id: "section-2",
      number: "02",
      title: "Research and Strategy Development",
      content:
        "Based on our initial consultation, we'll conduct thorough market research and develop a comprehensive strategy tailored to your specific goals. This includes competitor analysis, identifying market opportunities, and creating an actionable roadmap.",
    },
    {
      id: "section-3",
      number: "03",
      title: "Implementation",
      content:
        "After finalizing the strategy, we move into the implementation phase where we put our plans into action. This includes executing marketing campaigns, developing necessary assets, and closely monitoring progress to ensure optimal results.",
    },
    {
      id: "section-4",
      number: "04",
      title: "Monitoring and Optimization",
      content:
        "We continuously monitor the performance of your campaigns and initiatives, making data-driven adjustments to optimize results. Regular reporting and analysis ensure you're always informed about progress toward your business goals.",
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

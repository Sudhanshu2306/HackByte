import { useState } from "react";

const ContactForm = () => {
  const [formType, setFormType] = useState("sayHi");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleRadioChange = (type) => {
    setFormType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formType, formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="bg-[#F2F2F2] p-6 md:p-8 rounded-xl relative overflow-hidden">
      <div className="flex space-x-6 mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            className="sr-only"
            name="formType"
            checked={formType === "sayHi"}
            onChange={() => handleRadioChange("sayHi")}
          />
          <span 
            className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
              formType === "sayHi"
                ? "border-[#C1FF72] bg-[#B4FF4A]"
                : "border-gray-400 bg-white"
            }`}
          >
            {formType === "sayHi" && (
              <span className="w-3 h-3 rounded-full bg-white"></span>
            )}
          </span>
          Say Hi
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            className="sr-only"
            name="formType"
            checked={formType === "getQuote"}
            onChange={() => handleRadioChange("getQuote")}
          />
          <span
            className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
              formType === "getQuote"
                ? "border-[#B4FF4A] bg-[#B4FF4A]"
                : "border-gray-400 bg-white"
            }`}
          >
            {formType === "getQuote" && (
              <span className="w-3 h-3 rounded-full bg-white"></span>
            )}
          </span>
          Get a Quote
        </label>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="mb-5">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C1FF72]"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C1FF72]"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 mb-2">
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C1FF72]"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#171717] text-white py-4 px-6 rounded-md hover:bg-black transition-colors font-medium"
        >
          Send Message
        </button>
      </form>

      {/* Decorative star elements */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="relative w-64 h-64">
          {/* Black star/diamond */}
          <div className="w-24 h-24 bg-[#171717] transform rotate-45 absolute right-10 top-4"></div>
          
          {/* Green star/diamond */}
          <div className="w-14 h-14 bg-[#C1FF72] transform rotate-45 absolute right-8 bottom-20"></div>
          
          {/* Radial lines - using the CSS class */}
          <div className="absolute inset-0 radial-lines"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
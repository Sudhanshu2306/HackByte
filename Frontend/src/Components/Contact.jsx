import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="bg-white p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6 flex gap-6 items-center">
        <div className="inline-block bg-[#B4FF4A] px-4 py-2 rounded-lg mb-1">
          <h1 className="text-2xl font-bold">Contact Us</h1>
        </div>
        <p className="text-gray-800 text-md font-semibold">
          Digital Marketing Needs
        </p>
      </div>

      <div className=" mx-auto">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
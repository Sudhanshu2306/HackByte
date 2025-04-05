import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import axios from "axios";

export default function FileUpload({ userId }) {
  const [file, setFile] = useState(null);
  const [formEnabled, setFormEnabled] = useState(false);
  const navigate = useNavigate();
  const [embedding,setembedding] = useState([]);

  const handleVerify = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);
    console.log("File Uploading FormData:");
    formData.forEach((value, key) => console.log(key, value));
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(response);
      // if(response.status === 400){
      //   response.status(200).json({
      //     message : "Please Provide Valide Image :("
      //   })
      // }
      if (response.data.match === true) {
        navigate("/resolved", { state: { matchId: response.data.match_id } });
      } else {
        alert("❌ No Match Found. Please fill out the form.");
        console.log("embedding are",response.data.embedding);
        setFormEnabled(true);
        setembedding(response.data.embedding);
      }
    } catch (error) {
      console.error(
        "❌ Upload error:",
        error.response ? error.response.data : error.message
      );
      alert("Error uploading file. Please try again.");
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    aadharNumber: "",
    dateReported: "",
    zipCode: "",
    phoneNumber: "",
    bounty: "",
    description: "",
    embedding : [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.aadharNumber) {
      alert("Please fill in all required fields.");
      return;
    }
    formData.embedding = embedding;
    console.log("formData wefiwsefs" , formData);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if(key === "embedding"){
        formDataToSend.append(key, JSON.stringify(value));
      }
      else  {
      formDataToSend.append(key, value);
      }
    });
    formDataToSend.append('second',file); 
    try {
      await axios.post("http://localhost:3001/api/v1/users/submit", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials : true
      });

      alert("✅ Form submitted successfully!");

      setFormEnabled(false);
    } catch (error) {
      console.error("❌ Form submission error:", error.response ? error.response.data : error.message);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl">
        <ImageUploader setFile={setFile} />
        <div className="flex items-center justify-center mt-4">
          <button
            className=" bg-violet-800 text-gray-50 p-1 text-center rounded-lg h-10 w-28 "
            onClick={handleVerify}
            disabled={!file}
          >
            Verify
          </button>
        </div>

        {formEnabled && (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Aadhar Number</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Aadhar Number"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="dateReported"
                  value={formData.dateReported}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Zip Code"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="(+91)"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Bounty</label>
                <input
                  type="text"
                  name="bounty"
                  value={formData.bounty}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="₹ INR"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Enter Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-600 mt-6 text-white py-2 px-4 rounded-lg w-full"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

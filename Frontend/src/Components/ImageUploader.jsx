import React, { useState } from 'react';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";

function ImageUploader({setFile}) {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    try {
      const uploadedFiles = Array.from(event.target.files);
      const allowedTypes = ["image/jpeg", "image/png", "image/heic"];

      uploadedFiles.forEach(file => {
        if (!allowedTypes.includes(file.type)) {
          throw new Error("Only JPEG, PNG, and HEIC image files are allowed.");
        }
      });

      if (files.length + uploadedFiles.length > 2) {
        alert("You can only upload one image.");
        return;
      }
      
      const newFiles = uploadedFiles;
      
      // console.log(newFiles[0]);
      setFile(newFiles[0]);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      
      // Simulate file upload completion
      setTimeout(() => {
        setFiles((prevFiles) => prevFiles.map((file) => ({
          ...file,
          status: "completed",
        })));
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Upload files</h2>
        <button className="text-gray-400 hover:text-gray-600">&times;</button>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">Select and upload the lost person's image and aadhar card </p>
      
      <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 block">
        <AiOutlineCloudUpload className="text-gray-400 mx-auto text-4xl" />
        <p className="text-sm text-gray-500 mt-2">Choose a file or drag & drop it here</p>
        <p className="text-xs text-gray-400">JPEG, PNG, HEIC formats, up to 50MB</p>
        <input type="file" className="hidden" onChange={handleFileUpload} />
        {/* <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Browse File</button> */}
      </label>

      <div className="mt-6 space-y-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center p-3 border rounded-lg bg-gray-100 relative">
            <FaFilePdf className="text-red-500 text-2xl mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">{file.size}</p>
              {file.status === "uploading" ? (
                <div className="w-full h-2 bg-gray-300 rounded-full mt-2">
                  <div className="h-2 bg-blue-500 rounded-full w-1/2"></div>
                </div>
              ) : (
                <p className="text-green-500 text-xs font-medium mt-1">● Completed</p>
              )}
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600 absolute right-3 top-3" 
              onClick={() => handleRemoveFile(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
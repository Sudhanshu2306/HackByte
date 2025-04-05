import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AchievementItem from "../Components/AchievementItem";
import { defaultAchievements } from "../lib/profile-data";
import { Backendurl } from "../../Private/backend";

const ProfilePage = () => {
  const { user , setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name,
    avatar: user.avatar,
  });
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle Input Change (for name)
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Photo Change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setFormData((prev) => ({ ...prev, avatar: imageUrl })); // Preview image
    }
  };

  // Handle Save Changes (Update Name & Avatar)
  const handleSaveChanges = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (file) {
      formDataToSend.append("UserImage", file);
    }

    setUploading(true);
    try {
      const response = await axios.patch(
        `${Backendurl}/api/v1/users/update-account`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials : true
        }
      );
      alert("Profile updated successfully!");
      setUser(response.data);

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-[#F5F5FC] min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Form */}
          <div className="w-full md:w-7/12">
            {/* Profile Photo */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border border-gray-300">
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-xs hover:bg-gray-300"
                  >
                    Choose File
                  </label>
                </div>
              </div>
            </div>

            {/* ID & Name in Same Line */}
            <div className="mb-4 flex gap-4">
              {/* ID (Read-only) */}
              <div className="w-1/2">
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  ID
                </label>
                <input
                  type="text"
                  value={user._id}
                  className="w-full p-2 bg-gray-200 rounded-md text-gray-700 text-xs"
                  disabled
                />
              </div>

              {/* Name (Editable) */}
              <div className="w-1/2">
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-100 rounded-md text-gray-700 text-xs"
                />
              </div>
            </div>

            {/* Email (Disabled) */}
            <div className="mb-4">
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                className="w-full p-2 bg-gray-200 rounded-md text-gray-700 text-xs"
                disabled
              />
            </div>

            {/* Role (Disabled) */}
            <div className="mb-6">
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                value={user.role}
                className="w-full p-2 bg-gray-200 rounded-md text-gray-700 text-xs"
                disabled
              />
            </div>

            {/* Save Changes Button */}
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              disabled={uploading}
            >
              {uploading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Achievements Section */}
          <div className="w-full md:w-5/12">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="text-lg font-semibold mb-4">Achievements</h2>
              {achievements.length > 0 ? (
                achievements.map((achievement) => (
                  <AchievementItem
                    key={achievement.id}
                    achievement={achievement}
                  />
                ))
              ) : (
                <p className="text-gray-500">No achievements found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
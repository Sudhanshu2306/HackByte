import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Backendurl } from '../../Private/backend';
import { Upload } from 'lucide-react';

// const Backendurl = import.meta.env.BACKEND_URL;
function SignUp() {
  const { isLoggedIn, storeTokenInLS } = useAuth();
  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    role: '',
    headEmail: '',
    avatar: '',
    termsAccepted: false,
    aadharCardNo: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.role) newErrors.role = 'Please select a role';
    if (formData.role === 'family member' && !formData.headEmail) newErrors.headEmail = 'Head Email is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms & policy';
    if (!formData.aadharCardNo) newErrors.aadharCardNo = 'Aadhar Card Number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const requestData = { ...formData };
        requestData.avatar = requestData.avatar || `https://avatar.iran.liara.run/username?username=${requestData.name}`;
        if (requestData.role === "family member") {
          requestData.familyHeadEmail = requestData.headEmail;
        } else {
          delete requestData.familyHeadEmail;
        }

        const response = await axios.post(`${Backendurl}/api/v1/users/register`, requestData, { withCredentials: true });
        storeTokenInLS(response.data.data.accessToken);
      } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className="flex h-auto min-h-screen w-full">
      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-10 mt-4">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-semibold mb-6">Get Started Now</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input type="text" name="name" className="w-full p-2 border rounded-lg" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email address</label>
              <input type="email" name="email" className="w-full p-2 border rounded-lg" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Age</label>
              <input type="number" name="age" className="w-full p-2 border rounded-lg" placeholder="Enter your age" value={formData.age} onChange={handleChange} />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Password</label>
              <input type="password" name="password" className="w-full p-2 border rounded-lg" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-1">Aadhar Card Number</label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="aadharCardNo"
                  className="w-full p-2 pr-10 border rounded-lg"
                  placeholder="Enter your Aadhar number"
                  value={formData.aadharCardNo}
                  onChange={handleChange}
                />
                <label className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                  <Upload size={20} className="text-gray-500 hover:text-gray-700" />
                </label>
              </div>
              {errors.aadharCardNo && <p className="text-red-500 text-sm">{errors.aadharCardNo}</p>}
            </div>


            <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Signup</button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 bg-cover bg-center fixed right-0 top-0 h-full"
        style={{ backgroundImage: "url('https://tracki.com/cdn/shop/articles/important-information-regarding-missing-persons-884435_dfc22d65-f353-43cd-8a78-ae270ed35d88.jpg?v=1737454248')" }}>
      </div>
    </div>
  );
}

export default SignUp;

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Backendurl } from "../../Private/backend";

function SignIn() {
  const { storeTokenInLS , isLoggedIn} = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${Backendurl}/api/v1/users/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const token = response.data.data.accessToken;
      storeTokenInLS(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center px-10 bg-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-500 mb-6">Enter your credentials to access your account</p>

        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md mt-1 mb-4"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="flex justify-between items-center">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <a href="#" className="text-blue-500 text-sm ml-2">Forgot password?</a>
          </div>

          <div className="flex items-center mt-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-700">Remember for 30 days</label>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-orange-600 text-white p-2 rounded-md hover:bg-orange-700"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
        </p>
      </div>

      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://png.pngtree.com/template/20220407/ourmid/pngtree-missing-person-poster-wanted-disappeared-image_961496.jpg')" }}></div>
    </div>
  );
}

export default SignIn;
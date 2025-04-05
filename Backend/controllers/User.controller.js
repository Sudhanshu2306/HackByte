import { User } from "../models/User.js";
import { Lost } from "../models/Lost.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { errorhandler } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

/**
 * Register User
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, age, password, role, headEmail , avatar} = req.body;
    if (!name || !email || !age || !password || !role) {
        return res.status(400).json(new errorhandler(400, "All fields are required"));
    }

    let familyId = null;

    if (role === "family head") {
        // Assign family head's own _id as familyId
        familyId = null; // Initially null, will be updated after user creation
    } else if (role === "family member") {
        if (!headEmail) {
            return res.status(400).json(new errorhandler(400, "Family member must provide a family head email"));
        }

        const familyHead = await User.findOne({ email: headEmail });
        if (!familyHead || familyHead.role !== "family head") {
            return res.status(400).json(new errorhandler(400, "Invalid family head email"));
        }

        familyId = familyHead._id; 
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json(new errorhandler(400, "User already exists"));
    }

    const user = await User.create({
        name,
        email,
        age,
        password,
        role,
        avatar : avatar,
        familyId
    });

    // If user is a family head, update their familyId to their own _id
    if (role === "family head") {
        user.familyId = user._id;
        await user.save();
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(201)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "None" })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "None" })
        .json(new ApiResponse(201, { accessToken, refreshToken, user }, "User registered successfully"));
});


/**
 * Login User
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json(new errorhandler(400, "All fields are required"));
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
        return res.status(401).json(new errorhandler(401, "Invalid credentials"));
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "None" })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "None" })
        .json(new ApiResponse(200, { accessToken, refreshToken, user }, "User logged in successfully"));
});

/**
 * Logout User
 */
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });
    return res.status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "User logged out"));
});

/**
 * Refresh Access Token
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        return res.status(401).json(new errorhandler(401, "Unauthorized request"));
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decodedToken.id);
        if (!user || user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json(new errorhandler(401, "Invalid refresh token"));
        }
        const accessToken = user.generateAccessToken();
        return res.status(200)
            .cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "None" })
            .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
    } catch (error) {
        return res.status(401).json(new errorhandler(401, "Invalid refresh token"));
    }
});

/**
 * Get User Profile
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
        return res.status(404).json(new errorhandler(404, "User not found"));
    }
    return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

/**
 * Fetch Entire Family by Family Head ID
 */
const fetchFamily = asyncHandler(async (req, res) => {
    const { familyId } = req.params; // Pass familyId in the URL
    // console.log(familyId);
    // Fetch all family members (excluding the family head)
    const familyMembers = await User.find({ familyId : familyId }).select("-password -refreshToken");
    // console.log(familyMembers);
    if (!familyMembers.length) {
        return res.status(404).json(new errorhandler(404, "No family members found"));
    }

    return res.status(200).json(new ApiResponse(200, { familyMembers }, "Family members fetched successfully"));
});

/**
 * Change Password
 */
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user || !(await user.isPasswordCorrect(oldPassword))) {
        return res.status(400).json(new errorhandler(400, "Invalid old password"));
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

/**
 * Update Account Details
 */
const updateAccountDetails = asyncHandler(async (req, res) => {
    let updateFields = { ...req.body };

    // Prevent updating restricted fields
    delete updateFields.email;
    delete updateFields.password;
    delete updateFields.role;

    // Handle Image Upload
    if (req.files && req.files.UserImage) {
        const User_Image_local_path = req.files.UserImage[0].path;

        // Upload the image to Cloudinary and get only the URL
        const avatarUrl = await uploadOnCloudinary(User_Image_local_path);
        updateFields.avatar = avatarUrl.url;
    }
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json(new errorhandler(400, "No changes detected"));
    }

    // Update the user details in the database
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updateFields },
        { new: true }
    ).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));
});

// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
//   });
//   const upload = multer({ storage });

const uploadFile = asyncHandler(async (req, res) => {
    // console.log("hii");
    try {
        if (!req.files || !req.files.image[0]) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        
        const {userId} = req.body;
        console.log("userId",userId);
        const imagePath = req.files.image[0].path;
        console.log("Image path is ",imagePath);


        const formData = new FormData();
        formData.append("image", fs.createReadStream(imagePath));
        console.log(formData);
        const response = await axios.post("http://127.0.0.1:5001/process", formData,{
            headers: formData.getHeaders(),
        });

        if (response.data.match) {
            return res.status(200).json({ match: true, match_id: response.data.match_id });
        } else {
            // console.log("❌ No match found");
            console.log("embedding",response.data.embedding);
            return res.status(200).json({embedding : response.data.embedding, match: false });
        }

    } catch (error) {
        console.error("Upload error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const submitForm = asyncHandler(async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        aadharNumber,
        dateReported,
        zipCode,
        phoneNumber,
        bounty,
        description,
        embedding
      } = req.body;
  
      if (!firstName || !aadharNumber || !embedding) {
        return res.status(400).json({
          success: false,
          message: "❌ Required fields are missing.",
        });
      }
  
      // Parse embedding if it comes as a JSON string
      let parsedEmbedding;
      try {
        parsedEmbedding = typeof embedding === "string" ? JSON.parse(embedding) : embedding;
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "❌ Embedding must be valid JSON.",
        });
      }
  
      // Handle image upload
      let imageUrl = "";
      if (req.files?.second?.[0]?.path) {
        imageUrl = await uploadOnCloudinary(req.files.second[0].path);
      }
  
      const lostPerson = new Lost({
        firstName,
        lastName,
        aadharCardNumber: aadharNumber,
        dateReported: new Date(),
        zipCode,
        phoneNumber,
        bounty: bounty || "0",
        description,
        imageEmbedding: parsedEmbedding,
        image_url: imageUrl.url,
      });
      await lostPerson.save();
      return res.status(201).json({
        success: true,
        message: "✅ Data successfully added to the server!",
        lostPerson,
      });
  
    } catch (error) {
      console.error("❌ Upload error:", error.message);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });
  
  const fetchLost = asyncHandler(async (req, res) => {
    try {
      const lostPeople = await Lost.find(); // Fetch all records
      console.log(lostPeople);
      return res.status(200).json({
        success: true,
        count: lostPeople.length,
        data: lostPeople,
      });
    } catch (error) {
      console.error("Error fetching lost people:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });


export { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    updateAccountDetails,
    fetchFamily,
    uploadFile,
    submitForm,
    fetchLost
};

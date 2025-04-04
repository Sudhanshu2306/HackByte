import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { errorhandler } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

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

export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
}

import { Router } from "express";
import {
  changeCurrentPassword,
  fetchFamily,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  uploadFile,
  submitForm,
  fetchLost
} from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/authMiddlewares.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getUserProfile);
router.route("/update-account").patch(
  verifyJWT,
  upload.fields([
    {
      name: "UserImage",
      maxCount: 1,
    }
  ]),
  updateAccountDetails
);
router.route("/getfamily/:familyId").get(verifyJWT, fetchFamily);
router.route("/upload").post(upload.fields([
  {
    name: "image",
    maxCount: 1,
  }
]),uploadFile);
router.route("/submit").post(upload.fields([
  {
    name: "second",
    maxCount: 1,
  }
]),submitForm);
router.route("/get_lost").get(verifyJWT,fetchLost);

export default router;
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET 
//   });/
cloudinary.config({ 
    cloud_name:`dknepsil5`, 
    api_key:`658282917952454`, 
    api_secret: `PCV7pOIM-pn8JhoWIt41ipwyH1s`
  });
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        console.log(localFilePath);
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary }
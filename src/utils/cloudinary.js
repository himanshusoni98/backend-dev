import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilepath) => {
    try {
        if (!localFilepath) {
            return null;
        }

        console.log("Uploading file to Cloudinary:", localFilepath);
        
        const response = await cloudinary.uploader.upload(localFilepath, {
            resource_type: "auto"
        });

        console.log("File uploaded successfully:", response);
        fs.unlinkSync(localFilepath);
        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        if (fs.existsSync(localFilepath)) {
            fs.unlinkSync(localFilepath);
        }
        return null;
    }
}

export default uploadOnCloudinary;

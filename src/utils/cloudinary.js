import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadColoudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (err) {
        fs.unlinkSync(localFilePath)
        return null
    }
}
export {uploadColoudinary}
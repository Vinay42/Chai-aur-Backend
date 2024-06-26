import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:  process.env.CLOUDINARY_CLOUD_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null

        //upload the file in cloudinary

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // File has been uploaded successfull
        // console.log("File is uploaded in Cloudinary",response.url)
        fs.unlinkSync(localFilePath)
        return response
    }
    catch{
        fs.unlinkSync(localFilePath)  // Remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}
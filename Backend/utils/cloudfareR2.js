import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import fs from "fs";
import path from "path";
import ApiError from "./ApiError.js";

// Create only ONE client for the entire application
const s3Client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

/*
|--------------------------------------------------------------------------
| Upload Video to Cloudflare R2
|--------------------------------------------------------------------------
*/
export const uploadVideoToR2 = async (videoFile) => {
    try {

        if (!videoFile) {
            throw new ApiError(400, "Video file is required");
        }
        if (!fs.existsSync(videoFile.path)) {
            throw new Error("File does not exist");
        }
        // Read file from disk
        const fileStream = fs.createReadStream(videoFile.path);

        // Generate unique file name
        const fileName = `videos/${Date.now()}-${path.basename(videoFile.originalname)}`;
        const params = {
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileName,
            Body: fileStream,
            ContentType: videoFile.mimetype,
        };

        await s3Client.send(new PutObjectCommand(params));

        // Remove local temp file after successful upload
        fs.unlinkSync(videoFile.path);

        return {
            url: `${process.env.R2_PUBLIC_URL}/${fileName}`,
            key: fileName,
        };
    } catch (error) {
        // Delete temp file if upload fails
        if (
            videoFile &&
            videoFile.path &&
            fs.existsSync(videoFile.path)
        ) {
            fs.unlinkSync(videoFile.path);
        }

        throw new ApiError(
            500,
            `Error uploading video to Cloudflare R2: ${error.message}`
        );
    }
};

/*
|--------------------------------------------------------------------------
| Delete Video from Cloudflare R2
|--------------------------------------------------------------------------
*/

export const deleteVideoFromR2 = async (key) => {
    try {
        if (!key) {
            throw new ApiError(400, "Video key is required");
        }

        const params = {
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
        };

        await s3Client.send(new DeleteObjectCommand(params));

        return true;
    } catch (error) {
        throw new ApiError(
            500,
            `Error deleting video from Cloudflare R2: ${error.message}`
        );
    }
};
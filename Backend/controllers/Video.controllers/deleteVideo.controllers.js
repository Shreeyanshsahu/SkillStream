import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

import { deleteVideoFromR2 } from "../../utils/cloudfareR2.js";
import { deleteFromCloudinary } from "../../utils/cloudinary.js";
import { Video } from "../../models/video.model.js";
import { User } from "../../models/user.model.js";
import { Category } from "../../models/category.model.js";
const getPublicId = (url) => {

    const pathname = new URL(url).pathname;

    const parts = pathname.split("/");

    const uploadIndex = parts.indexOf("upload");

    const publicId = parts
        .slice(uploadIndex + 2)
        .join("/")
        .replace(/\.[^/.]+$/, "");

    return publicId;
};
export const deleteVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        // Find the video by ID and ensure it belongs to the authenticated user
        const video = await Video.findOne({ _id: videoId, owner: userId });
        if (!video) {
            throw new ApiError(404, 'Video not found or you do not have permission to delete it.');
        }
        const key = video.videoFile.replace(
            `${process.env.R2_PUBLIC_URL}/`,
            ""
        );
        // Delete the video from Cloudflare R2
        await deleteVideoFromR2(key);
        // Delete the thumbnail from Cloudinary if it exists
        if (video.thumbnail) {
            
            const publicId = getPublicId(video.thumbnail);
            await deleteFromCloudinary(publicId);
        }
        // Delete the video document from MongoDB
        await Video.deleteOne({ _id: videoId });

        res.status(200).json(new ApiResponse(200, null, 'Video deleted successfully.'));
    } catch (error) {
        console.error('Error deleting video:', error);
        res.status(500).json(new ApiResponse(500, null, 'An error occurred while deleting the video.'));
    }
};
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
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

export const updateThumbnail = async (req, res) => {
    try {
        const { videoId } = req.params;
        const thumbnailFile = req.file;
        const userId = req.user.id; // Assuming you have user authentication and the user ID is available in req.user

        // Check if the user is the owner of the video

        if (!thumbnailFile) {
            throw new ApiError(400, "Thumbnail file is required");
        }

        const video = await Video.findById(videoId);
        if (!video) {
            throw new ApiError(404, "Video not found");
        }
        if (video.owner.toString() !== userId) {
            throw new ApiError(403, "You are not authorized to update this video's thumbnail");
        }
        // Delete the old thumbnail from Cloudinary if it exists
        if (video.thumbnail) {
            const publicId = getPublicId(video.thumbnail);
            await deleteFromCloudinary(publicId);
        }

        // Upload the new thumbnail to Cloudinary
        const uploadResult = await uploadOnCloudinary(thumbnailFile.path);
        video.thumbnail = uploadResult.secure_url;
        await video.save();

        return res.status(200).json(new ApiResponse(200, video, "Thumbnail updated successfully"));
    } catch (error) {
        console.error("Error updating thumbnail:", error);
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message || "Internal Server Error"));
    }
};

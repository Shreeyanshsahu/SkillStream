// this middleware checks if the video 
// is visible to the user based on their subscription status 
// and the video's visibility settings.
// GET  /videos/:videoId this middleware is only for the GET video route to 
// check if the user can view the video or not

import { Video } from "../models/video.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import validateObjectId from "../validators/validators.js";

export const checkVideoVisibility = asyncHandler(async (req, res, next) => {
    const videoId = req.params.videoId;
    validateObjectId(videoId);

    const video = await Video.findById(videoId).select("visibility owner");

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    // If the video is public, allow access
    if (video.visibility === "public") {
        return next();
    }

    if (video.visibility === "unlisted") {
        return next();
    }
    // If the video is private, check if the user is the owner
    if (video.visibility === "private") {
        const userId = req.user._id.toString(); // Assuming req.user is populated by the auth middleware
        if (video.owner.toString() !== userId) {
            throw new ApiError(403, "You are not authorized to view this private video");
        }
        return next();
    }

    // If none of the above conditions are met, deny access
    throw new ApiError(403, "You are not authorized to view this video");
});
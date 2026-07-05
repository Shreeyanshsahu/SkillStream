import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadVideoToR2 } from "../../utils/cloudfareR2.js";
import { deleteVideoFromR2 } from "../../utils/cloudfareR2.js";
import { Video } from "../../models/video.model.js";
import { User } from "../../models/user.model.js";

export const updateVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;
        const videoFile = req.file; // Assuming the video file is sent in the request
        if (!videoFile) {
            throw new ApiError(400, 'No video file provided.');
        }
        // Find the video by ID and ensure it belongs to the authenticated user
        const video = await Video.findOne({ _id: videoId, owner: userId });
        if (!video) {
            throw new ApiError(404, 'Video not found or you do not have permission to delete it.');
        }
        if(video.owner.toString() !== userId) {
            throw new ApiError(403, "You are not authorized to update this video");
        }
        const key = video.videoFile.replace(
            `${process.env.R2_PUBLIC_URL}/`,
            ""
        );
        // Delete the video from Cloudflare R2
        await deleteVideoFromR2(key);

        const newvideo = await uploadVideoToR2(videoFile);
        if (!newvideo) {
            throw new ApiError(500, 'Failed to upload the new video.');
        }
        // Update the video document with the new video URL
        video.videoFile = newvideo.url;
        await video.save();
        res.status(200).json(new ApiResponse(200, null, 'Video updated successfully.'));
    } catch (error) {
        console.error('Error updating video:', error);
        res.status(500).json(new ApiResponse(500, null, 'An error occurred while updating the video.'));
    }

};
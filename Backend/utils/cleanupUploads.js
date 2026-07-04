import { deleteFromCloudinary } from "./cloudinary.js";
import {deleteVideoFromR2} from "./cloudfareR2.js";

export const cleanupUploads = async ({
    videoKey,
    thumbnailPublicId,
}) => {
    try {
        if (thumbnailPublicId) {
            await deleteFromCloudinary(thumbnailPublicId);
        }

        if (videoKey) {
            await deleteVideoFromR2(videoKey);
        }
    } catch (error) {
        console.error("Cleanup failed:", error.message);
    }
};
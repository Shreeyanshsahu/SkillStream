import { deleteFromCloudinary } from "./cloudinary.js";
import {deleteVideoFromR2} from "./cloudfareR2.js";

export const cleanupUploads = async ({videokey, thumbnailpublicid}) => {
    try {
        if (videokey) {
            await deleteVideoFromR2(videokey);
        }
        if (thumbnailpublicid) {
            await deleteFromCloudinary(thumbnailpublicid);
        }
    } catch (error) {
        console.error("Error cleaning up uploads:", error.message);
    }
}
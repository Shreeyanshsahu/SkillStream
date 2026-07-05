import { uploadVideoToR2 } from "../../utils/cloudfareR2.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
    validateCategory,
    validateDescription,
    validateThumbnailFile,
    validateTitle,
    validateUpdate,
    validateVisibility,
    validateVideoFile
} from "../../validators/videos.validators.js";
import { validateCategoryDB } from "../../validators/database.validator.js";
import { validateObjectId } from "../../validators/validators.js";
import { ApiError } from "../../utils/ApiError.js";
import { Video } from "../../models/Video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Category } from "../../models/category.model.js";
import { getVideoMetadata } from "../../utils/videoMetadata.js";
import {cleanupUploads} from "../../utils/cleanupUploads.js";


const uploadVideo = asyncHandler(async (req, res) => {
    try {
        const { title, description, category, visibility } = req.body;

    const videoFile = req.files.video?.[0]; // Assuming video is uploaded as a file
    const thumbnailFile = req.files?.thumbnail?.[0];// Assuming thumbnail is also uploaded as a file
    // Validate the input fields
    const titleError = await validateTitle(title);
    const descriptionError = await validateDescription(description);
    const categoryError = await validateCategoryDB(category);
    const visibilityError = await validateVisibility(visibility);
    const videoFileError = await validateVideoFile(videoFile);
    const thumbnailFileError = await validateThumbnailFile(thumbnailFile);

    if (titleError || descriptionError || categoryError || visibilityError || videoFileError || thumbnailFileError) {
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: {
                title: titleError,
                description: descriptionError,
                category: categoryError,
                visibility: visibilityError,
                videoFile: videoFileError,
                thumbnailFile: thumbnailFileError
            }
        });
    }
    const metadata = await getVideoMetadata(videoFile);

    let cloudinaryResult ;
    let r2Result;

    try{
    // Upload the video file to Cloudinary
    cloudinaryResult = await uploadOnCloudinary(thumbnailFile.path);
    // Upload the video file to Cloudflare R2
    r2Result = await uploadVideoToR2(videoFile);
    }catch (error) {
        await cleanupUploads([thumbnailFile.path, videoFile.path]);
        console.error("Error uploading files:", error);
        throw new ApiError(500, "File upload failed");
    }
    if (!cloudinaryResult) {
        throw new ApiError(500, "Thumbnail upload failed");
    }

    if (!r2Result) {
        throw new ApiError(500, "Video upload failed");
    }
    const ownerId = req.user._id;
    const categoryDoc = await Category.findOne({ name: category });

    if (!categoryDoc) {
        throw new ApiError(404, "Category not found");
    }


    const video = await Video.create({
        title,
        description,
        owner: ownerId,
        category: categoryDoc._id,
        isPublished: visibility === 'public' ? true : false,

        thumbnail: cloudinaryResult.secure_url
        ,

        videoFile: r2Result.url,

        duration: metadata.duration
    });
    return res.status(201).json(new ApiResponse(201, video, "Video uploaded successfully")
    );
    } catch (error) {
        console.error("Error in uploadVideo controller:", error);
        throw new ApiError(500, "Internal Server Error");
    }

    // Return the results
});

export { uploadVideo };

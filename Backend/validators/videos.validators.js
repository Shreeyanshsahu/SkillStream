import {ApiError} from "../utils/ApiError.js";
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
export const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
/*
|--------------------------------------------------------------------------
|  Visibility Validation
|--------------------------------------------------------------------------
*/
export const validateVisibility = (visibility) => {
    if (!visibility || visibility.trim() === "") {
        throw new ApiError(
            400,
            "Visibility is required"
        );
    }
    if (visibility !== "public" && visibility !== "private" && visibility !== "unlisted") {
        throw new ApiError(
            400,
            "Visibility must be public, private or unlisted"
        );
    }
};
/*
|--------------------------------------------------------------------------
|  Title Validation
|--------------------------------------------------------------------------
*/
export const validateTitle = (title) => {
    if (!title || title.trim() === "") {
        throw new ApiError(
            400,
            "Title is required"
        );
    }
};
/*
|--------------------------------------------------------------------------
|  Description Validation
|--------------------------------------------------------------------------
*/
export const validateDescription = (description) => {
    if (!description || description.trim() === "") {
        throw new ApiError(
            400,
            "Description is required"
        );
    }
};
/*
|--------------------------------------------------------------------------
|  Category Validation
|--------------------------------------------------------------------------
*/
export const validateCategory = (category) => {
    if (!category) {
        throw new ApiError(
            400,
            "Category is required"
        );
    }
};
/*
|--------------------------------------------------------------------------
| Video Upload Validation
|--------------------------------------------------------------------------
*/

export const validateVideoUpload = (video, thumbnail, title, description, category, visibility) => {
    validateTitle(title);
    validateDescription(description);
    validateCategory(category);
    validateVisibility(visibility);
    validateVideoFile(video);
    validateThumbnailFile(thumbnail);
    if (!video) {
        throw new ApiError(
            400,
            "User forgot the file."
        );
    }
};

/*
|--------------------------------------------------------------------------
| Update Validation
|--------------------------------------------------------------------------
*/

export const validateUpdate = (video, thumbnail, title,description,category,visibility) => {
    if (title)
        validateTitle(title);

    if (description)
        validateDescription(description);

    if (category)
        validateCategory(category);

    if (visibility)
        validateVisibility(visibility);

    if (video)
        validateVideoFile(video);

    if (thumbnail)
        validateThumbnailFile(thumbnail);
}


/*
|--------------------------------------------------------------------------
| Video File Validation:Purpose: Validate the uploaded video file.

Checks:

File exists
MIME type
Maximum upload size
(Optional) Metadata integrity
|--------------------------------------------------------------------------
*/

export const validateVideoFile = (video) => {
    if (!video) {
        throw new ApiError(
            400,
            "Video file is required"
        );
    }

    const allowedMimeTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (!allowedMimeTypes.includes(video.mimetype)) {
        throw new ApiError(
            400,
            "Invalid video file type. Allowed types: MP4, WebM, Ogg"
        );
    }

    const maxSizeInBytes = MAX_VIDEO_SIZE;
    if (video.size > maxSizeInBytes) {
        throw new ApiError(
            400,
            "Video file size exceeds the maximum limit of 100MB"
        );
    }
    if (!video.originalname || !video.mimetype || !video.size) {
        throw new ApiError(
            400,
            "Video file metadata is incomplete or corrupted"
        );
    }
};

/*
|--------------------------------------------------------------------------
| Thumbnail File Validation
|--------------------------------------------------------------------------
*/

export const validateThumbnailFile = (thumbnail) => {
    if (!thumbnail) {
        throw new ApiError(
            400,
            "Thumbnail file is required"
        );
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(thumbnail.mimetype)) {
        throw new ApiError(
            400,
            "Invalid thumbnail file type. Allowed types: JPEG, PNG, WebP"
        );
    }

    const maxSizeInBytes = MAX_THUMBNAIL_SIZE;
    if (thumbnail.size > maxSizeInBytes) {
        throw new ApiError(
            400,
            "Thumbnail file size exceeds the maximum limit of 5MB"
        );
    }
};

/*
|--------------------------------------------------------------------------
| Pagination Validation
|--------------------------------------------------------------------------
*/

export const validatePagination = (page, limit) => {
    if (page && (isNaN(page) || page < 1)) {
        throw new ApiError(
            400,
            "Page must be a positive number"
        );
    }

    if (limit && (isNaN(limit) || limit < 1 || limit > 50)) {
        throw new ApiError(
            400,
            "Limit must be a positive number and not exceed 50"
        );
    }
};

/*
|--------------------------------------------------------------------------
| Text Search Validation
|--------------------------------------------------------------------------
*/
export const validateTextSearch = (search) => {
    if (!search || search.trim() === "") {
        throw new ApiError(
            400,
            "Search query is required"
        );
    }

    if (search.trim().length < 4) {
        throw new ApiError(
            400,
            "Search query must be at least 4 characters long"
        );
    }
    if (search.trim().length > 100) {
        throw new ApiError(
            400,
            "Search query must not exceed 100 characters"
        );
    }
}

/*
|--------------------------------------------------------------------------
| Sort Option  Validation
|--------------------------------------------------------------------------
*/

export const validateSortOption = (sort) => {
    const allowedSortOptions = ["newest", "oldest", "most_viewed", "least_viewed"];
    if (sort && !allowedSortOptions.includes(sort)) {
        throw new ApiError(
            400,
            `Invalid sort option. Allowed options: ${allowedSortOptions.join(", ")}`
        );
    }
};


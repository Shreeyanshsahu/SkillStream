import ffmpeg from "fluent-ffmpeg";
import ffprobe from "ffprobe-static";

import ApiError from "./ApiError.js";

ffmpeg.setFfprobePath(ffprobe.path);

export const getVideoMetadata = (videoFile) => {

    return new Promise((resolve, reject) => {

        if (!videoFile || !videoFile.path) {
            return reject(
                new ApiError(400, "Video file is required")
            );
        }

        ffmpeg.ffprobe(videoFile.path, (err, metadata) => {

            if (err) {
                return reject(
                    new ApiError(
                        500,
                        "Unable to read video metadata"
                    )
                );
            }

            const videoStream =
                metadata.streams.find(
                    stream => stream.codec_type === "video"
                );

            resolve({

                duration:
                    Number(metadata.format.duration),

                size:
                    Number(metadata.format.size),

                width:
                    videoStream?.width || null,

                height:
                    videoStream?.height || null

            });

        });

    });

};
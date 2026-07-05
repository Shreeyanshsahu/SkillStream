import { Router } from 'express';
const router = Router();
import upload from '../middlewares/multer.middleware.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import { uploadVideo } from '../controllers/Video.controllers/uploadVideo.controllers.js';
import { searchVideos } from '../controllers/Video.controllers/searchVideo.controllers.js';
import { watchVideo } from '../controllers/Video.controllers/watchVideo.controllers.js';
import { getRecommendedVideos } from "../controllers/Video.controllers/recommendVideo.controllers.js";
import {updateThumbnail} from '../controllers/Video.controllers/updateThumbnail.controllers.js';
import { deleteVideo } from '../controllers/Video.controllers/deleteVideo.controllers.js';
import { togglePublish } from '../controllers/Video.controllers/togglePublish.controllers.js';
import { updateVideoDetails } from '../controllers/Video.controllers/updateVideoDetails.controllers.js';
import { updateVideo } from '../controllers/Video.controllers/updateVideo.controllers.js';



router.route('/search').get(
    verifyJWT, 
    searchVideos
);

router.route('/uploadvideo').post(
    verifyJWT,
    upload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 }
    ]),
    uploadVideo
)

router.route('/watch/:videoId').get(
    verifyJWT,
    watchVideo
)

router.get("/recommendations", 
    verifyJWT,
    getRecommendedVideos);

router.route('/updatethumbnail/:videoId').patch(
    verifyJWT,
    upload.single('thumbnail'),
    updateThumbnail
)
router.route('/deletevideo/:videoId').delete(
    verifyJWT,
    deleteVideo
)

router.route('/togglepublish/:videoId').patch(
    verifyJWT,
    togglePublish
)

router.route('/updatevideodetails/:videoId').patch(
    verifyJWT,
    updateVideoDetails
)

router.route('/updatevideo/:videoId').patch(
    verifyJWT,
    upload.single('video'),
    updateVideo
)
console.log("Video upload route is working");
export default router;
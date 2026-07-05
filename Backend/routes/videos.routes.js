import { Router } from 'express';
const router = Router();
import upload from '../middlewares/multer.middleware.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import { uploadVideo } from '../controllers/Video.controllers/uploadVideo.controllers.js';
import { searchVideos } from '../controllers/Video.controllers/searchVideo.controllers.js';
import { watchVideo } from '../controllers/Video.controllers/watchVideo.controllers.js';
import { getRecommendedVideos } from "../controllers/Video.controllers/recommendVideo.controllers.js";

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

router.get("/recommendations", getRecommendedVideos);

console.log("Video upload route is working");
export default router;
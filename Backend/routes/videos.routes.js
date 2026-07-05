import { Router } from 'express';
const router = Router();
import upload from '../middlewares/multer.middleware.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import { uploadVideo } from '../controllers/Video.controllers/uploadVideo.controllers.js';
router.route('/uploadvideo').post(
    verifyJWT,
    upload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 }
    ]),
    uploadVideo
)
console.log("Video upload route is working");
export default router;
import { Router } from 'express';
const router = Router();
import verifyJWT from '../middlewares/auth.middleware.js';
import {toggleLike} from '../controllers/Likes.controllers.js/toggleLike.controllers.js';
import {getLikedVideos} from '../controllers/Likes.controllers.js/getLikedVideos.controllers.js';

router.post('/:videoId', verifyJWT, toggleLike);
router.get('/', verifyJWT, getLikedVideos);

console.log('Like routes loaded successfully');
export default router;  
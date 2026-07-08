import { Router } from 'express';
const router = Router();
import verifyJWT from '../middlewares/auth.middleware.js';
import { createComment} from '../controllers/Comments.controllers/createComment.controllers.js';
import { deleteComment } from '../controllers/Comments.controllers/deleteComment.controllers.js';
import { getVideoComments } from '../controllers/Comments.controllers/getVideoComments.controllers.js';
import { updateComment } from '../controllers/Comments.controllers/updateComment.controllers.js';

router.route('/createcomment/:videoId').post(
    verifyJWT,
    createComment
);

router.route('/:videoId').get(
    verifyJWT,
    getVideoComments
);

router.route('/updatecomment/:commentId').patch(
    verifyJWT,
    updateComment
);

router.route('/deletecomment/:commentId').delete(
    verifyJWT,
    deleteComment
);



console.log("Comment routes loaded");
export default router;
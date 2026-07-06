import { Router } from 'express';
const router = Router();
import verifyJWT from '../middlewares/auth.middleware.js';

import { toggleUpvotePosts } from '../controllers/Upvote.controllers.js/toggleUpvotePosts.controllers.js';
import { toggleUpvoteComments } from '../controllers/Upvote.controllers.js/toggleUpvoteComment.controllers.js';

router.post('/posts/:postId', verifyJWT, toggleUpvotePosts);
router.post('/comments/:commentId', verifyJWT, toggleUpvoteComments);
console.log('Upvote routes loaded successfully');
export default router;
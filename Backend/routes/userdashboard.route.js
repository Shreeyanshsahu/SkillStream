import {Router} from 'express';
import {getUserDashboard} from '../controllers/Dashboard.controllers/userDashboard.controllers.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyJWT, getUserDashboard);

console.log('User dashboard routes loaded successfully');
export default router;
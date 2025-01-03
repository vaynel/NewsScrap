import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import * as controller from '../controllers/userController';

const userRouter = Router();

userRouter.get('/', controller.getAllUsers);
userRouter.post('/', controller.createUser);
userRouter.get('/profile', authenticateToken, controller.getUserProfile);

export default userRouter;

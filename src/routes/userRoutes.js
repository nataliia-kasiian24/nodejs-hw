import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.use(authenticate);

router.patch(
  '/me/avatar',
  upload.single('avatar'),
  userController.updateUserAvatar,
);

export default router;

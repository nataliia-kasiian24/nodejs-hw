import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import * as authController from '../controllers/authController.js';
import { registerUserSchema, loginUserSchema, requestResetEmailSchema } from '../validations/authValidation.js';

const router = Router();

router.post(
  '/register',
  celebrate({
    [Segments.BODY]: registerUserSchema,
  }),
  authController.registerUser
);

router.post(
  '/login',
  celebrate({ [Segments.BODY]: loginUserSchema }),
  authController.loginUser
);

router.post(
  '/request-reset-email',
  celebrate({ [Segments.BODY]: requestResetEmailSchema }),
  authController.requestResetEmail
);

router.post('/refresh', authController.refreshUserSession);

router.post('/logout', authController.logoutUser);

export default router;
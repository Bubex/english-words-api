import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import WordController from '../controllers/WordController';
import { SigninDTO, SignupDTO } from '../dtos/AuthDTO';
import {
  authMiddleware,
  cacheMiddleware,
  validationMiddleware,
} from '../middlewares';

const router = Router();

router.get('/', (_, res) => {
  res.json({ message: 'English Dictionary' });
});

router.post('/auth/signup', validationMiddleware(SignupDTO), (req, res) =>
  AuthController.signup(req, res),
);
router.post('/auth/signin', validationMiddleware(SigninDTO), (req, res) =>
  AuthController.signin(req, res),
);

router.get('/entries/en', authMiddleware, cacheMiddleware, (req, res) =>
  WordController.listWords(req, res),
);
router.get('/entries/en/:word', authMiddleware, cacheMiddleware, (req, res) =>
  WordController.getWordDetails(req, res),
);
router.post('/entries/en/:word/favorite', authMiddleware, (req, res) =>
  WordController.addFavorite(req, res),
);
router.delete('/entries/en/:word/unfavorite', authMiddleware, (req, res) =>
  WordController.removeFavorite(req, res),
);

router.get('/user/me', authMiddleware, (req, res) =>
  UserController.getProfile(req, res),
);
router.get('/user/me/history', authMiddleware, (req, res) =>
  UserController.getHistory(req, res),
);
router.get('/user/me/favorites', authMiddleware, (req, res) =>
  UserController.getFavorites(req, res),
);

export default router;

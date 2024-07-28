"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const WordController_1 = __importDefault(require("../controllers/WordController"));
const AuthDTO_1 = require("../dtos/AuthDTO");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', (_, res) => {
    res.json({ message: 'English Dictionary' });
});
router.post('/auth/signup', (0, middlewares_1.validationMiddleware)(AuthDTO_1.SignupDTO), (req, res) => AuthController_1.default.signup(req, res));
router.post('/auth/signin', (0, middlewares_1.validationMiddleware)(AuthDTO_1.SigninDTO), (req, res) => AuthController_1.default.signin(req, res));
router.get('/entries/en', middlewares_1.authMiddleware, middlewares_1.cacheMiddleware, (req, res) => WordController_1.default.listWords(req, res));
router.get('/entries/en/:word', middlewares_1.authMiddleware, middlewares_1.cacheMiddleware, (req, res) => WordController_1.default.getWordDetails(req, res));
router.post('/entries/en/:word/favorite', middlewares_1.authMiddleware, (req, res) => WordController_1.default.addFavorite(req, res));
router.delete('/entries/en/:word/unfavorite', middlewares_1.authMiddleware, (req, res) => WordController_1.default.removeFavorite(req, res));
router.get('/user/me', middlewares_1.authMiddleware, (req, res) => UserController_1.default.getProfile(req, res));
router.get('/user/me/history', middlewares_1.authMiddleware, (req, res) => UserController_1.default.getHistory(req, res));
router.get('/user/me/favorites', middlewares_1.authMiddleware, (req, res) => UserController_1.default.getFavorites(req, res));
exports.default = router;
//# sourceMappingURL=index.js.map
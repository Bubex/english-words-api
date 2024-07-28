"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const WordController_1 = __importDefault(require("../controllers/WordController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ message: 'English Dictionary' });
});
router.post('/auth/signup', AuthController_1.default.signup);
router.post('/auth/signin', AuthController_1.default.signin);
router.get('/entries/en', WordController_1.default.listWords);
router.get('/entries/en/:word', middlewares_1.authMiddleware, WordController_1.default.getWordDetails);
router.post('/entries/en/:word/favorite', middlewares_1.authMiddleware, WordController_1.default.addFavorite);
router.delete('/entries/en/:word/unfavorite', middlewares_1.authMiddleware, WordController_1.default.removeFavorite);
router.get('/user/me', middlewares_1.authMiddleware, UserController_1.default.getProfile);
router.get('/user/me/history', middlewares_1.authMiddleware, UserController_1.default.getHistory);
router.get('/user/me/favorites', middlewares_1.authMiddleware, UserController_1.default.getFavorites);
exports.default = router;
//# sourceMappingURL=index.js.map
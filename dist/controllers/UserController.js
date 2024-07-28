"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
class UserController {
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findUnique({
                where: { id: req.userId },
                select: { id: true, name: true, email: true },
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user);
        });
    }
    getHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const history = yield prisma_1.default.history.findMany({
                where: { userId: req.userId },
                include: {
                    word: true,
                },
                orderBy: {
                    viewedAt: 'desc',
                },
            });
            return res.json({
                results: history.map(entry => ({
                    word: entry.word.word,
                    added: entry.viewedAt,
                })),
                totalDocs: history.length,
            });
        });
    }
    getFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const favorites = yield prisma_1.default.favorite.findMany({
                where: { userId: req.userId },
                include: {
                    word: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return res.json({
                results: favorites.map(entry => ({
                    word: entry.word.word,
                    added: entry.createdAt,
                })),
                totalDocs: favorites.length,
            });
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map
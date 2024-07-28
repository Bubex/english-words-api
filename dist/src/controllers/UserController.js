"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
class UserController {
    async getProfile(req, res) {
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.userId },
            select: { id: true, name: true, email: true },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    async getHistory(req, res) {
        const history = await prisma_1.default.history.findMany({
            where: { userId: req.userId },
            include: {
                word: true,
            },
            orderBy: {
                viewedAt: 'desc',
            },
        });
        return res.json({
            results: history.map((entry) => ({
                word: entry.word.word,
                added: entry.viewedAt,
            })),
            totalDocs: history.length,
        });
    }
    async getFavorites(req, res) {
        const favorites = await prisma_1.default.favorite.findMany({
            where: { userId: req.userId },
            include: {
                word: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return res.json({
            results: favorites.map((entry) => ({
                word: entry.word.word,
                added: entry.createdAt,
            })),
            totalDocs: favorites.length,
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map
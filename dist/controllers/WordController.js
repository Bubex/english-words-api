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
class WordController {
    listWords(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search, limit = 10, page: queryPage = 1 } = req.query;
            const take = parseInt(limit);
            const skip = (parseInt(queryPage) - 1) * take;
            const page = parseInt(queryPage);
            const words = yield prisma_1.default.word.findMany({
                where: {
                    word: {
                        contains: search,
                    },
                },
                take,
                skip,
            });
            const totalDocs = yield prisma_1.default.word.count({
                where: {
                    word: {
                        contains: search,
                    },
                },
            });
            const totalPages = Math.ceil(totalDocs / take);
            const hasNext = page < totalPages;
            const hasPrev = page > 1;
            return res.json({
                results: words.map(word => word.word),
                totalDocs,
                page,
                totalPages,
                hasNext,
                hasPrev,
            });
        });
    }
    getWordDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { word } = req.params;
            const wordDetails = yield prisma_1.default.word.findUnique({
                where: { word },
            });
            if (!wordDetails) {
                return res.status(404).json({ message: 'Word not found' });
            }
            yield prisma_1.default.history.create({
                data: {
                    wordId: wordDetails.id,
                    userId: req.userId,
                },
            });
            return res.json(wordDetails);
        });
    }
    addFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { word } = req.params;
            const wordDetails = yield prisma_1.default.word.findUnique({
                where: { word },
            });
            if (!wordDetails) {
                return res.status(404).json({ message: 'Word not found' });
            }
            const favorite = yield prisma_1.default.favorite.create({
                data: {
                    wordId: wordDetails.id,
                    userId: req.userId,
                },
            });
            return res.status(201).json(favorite);
        });
    }
    removeFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { word } = req.params;
            const wordDetails = yield prisma_1.default.word.findUnique({
                where: { word },
            });
            if (!wordDetails) {
                return res.status(404).json({ message: 'Word not found' });
            }
            yield prisma_1.default.favorite.deleteMany({
                where: {
                    wordId: wordDetails.id,
                    userId: req.userId,
                },
            });
            return res.status(204).send();
        });
    }
}
exports.default = new WordController();
//# sourceMappingURL=WordController.js.map
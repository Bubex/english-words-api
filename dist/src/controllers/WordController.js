"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const FavoriteRepository_1 = require("./../repositories/FavoriteRepository");
const HistoryRepository_1 = require("../repositories/HistoryRepository");
const WordRepository_1 = require("../repositories/WordRepository");
const cursor_1 = require("../utils/cursor");
class WordController {
    constructor() {
        this.wordRepository = new WordRepository_1.WordRepository();
        this.historyRepository = new HistoryRepository_1.HistoryRepository();
        this.favoriteRepository = new FavoriteRepository_1.FavoriteRepository();
    }
    async listWords(req, res) {
        const { search, limit = 10, cursor } = req.query;
        const take = parseInt(limit);
        const decodedCursor = cursor ? (0, cursor_1.decodeCursor)(cursor) : undefined;
        const words = await this.wordRepository.findWords(search, take, decodedCursor);
        const nextCursor = words.length === take ? (0, cursor_1.encodeCursor)(words[words.length - 1].word) : null;
        const hasNext = words.length === take;
        return res.json({
            results: words.map((word) => word.word),
            previous: cursor ? (0, cursor_1.encodeCursor)(words[0].word) : null,
            next: nextCursor,
            hasNext,
            hasPrev: !!cursor,
        });
    }
    async getWordDetails(req, res) {
        const { word } = req.params;
        const wordDetails = await this.wordRepository.getWord(word);
        if (!wordDetails) {
            return res.status(404).json({ message: 'Word not found' });
        }
        const { data } = await axios_1.default.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        this.historyRepository.createHistory(wordDetails.id, req.userId);
        return res.json(data);
    }
    async addFavorite(req, res) {
        const { word } = req.params;
        const wordDetails = await this.wordRepository.getWord(word);
        if (!wordDetails) {
            return res.status(404).json({ message: 'Word not found' });
        }
        const favorite = await this.favoriteRepository.createFavorite(wordDetails.id, req.userId);
        return res.status(201).json(favorite);
    }
    async removeFavorite(req, res) {
        const { word } = req.params;
        const wordDetails = await this.wordRepository.getWord(word);
        if (!wordDetails) {
            return res.status(404).json({ message: 'Word not found' });
        }
        await this.favoriteRepository.deleteFavorite(wordDetails.id, req.userId);
        return res.status(204).send();
    }
}
exports.default = new WordController();
//# sourceMappingURL=WordController.js.map
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
const node_fetch_1 = __importDefault(require("node-fetch"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const URL = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json';
const importWords = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, node_fetch_1.default)(URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = yield response.json();
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new Error('Invalid JSON structure');
        }
        const wordsDictionary = data;
        for (const word in wordsDictionary) {
            if (wordsDictionary.hasOwnProperty(word)) {
                yield prisma.word.upsert({
                    where: { word: word },
                    update: {},
                    create: {
                        word: word,
                        definition: wordsDictionary[word],
                    },
                });
            }
        }
        console.log('Words imported successfully');
    }
    catch (error) {
        console.error('Error importing words:', error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
importWords();
//# sourceMappingURL=importWords.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
const URL = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json';
const BATCH_SIZE = 5000;
const importWords = async () => {
    try {
        const { data, status, statusText } = await axios_1.default.get(URL);
        if (status !== 200) {
            throw new Error(`Failed to fetch data: ${statusText}`);
        }
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new Error('Invalid JSON structure');
        }
        const wordsDictionary = data;
        const words = Object.keys(wordsDictionary);
        const totalBatches = Math.ceil(words.length / BATCH_SIZE);
        for (let i = 0; i < words.length; i += BATCH_SIZE) {
            const batch = words.slice(i, i + BATCH_SIZE);
            const upsertOperations = batch.map((word) => {
                return prisma.word.upsert({
                    where: { word: word },
                    update: {},
                    create: { word: word },
                });
            });
            await prisma.$transaction(upsertOperations);
            console.log(`Batch ${i / BATCH_SIZE + 1}/${totalBatches} processed successfully`);
        }
        console.log('All words imported successfully');
    }
    catch (error) {
        console.error('Error importing words:', error);
    }
    finally {
        await prisma.$disconnect();
    }
};
importWords();
//# sourceMappingURL=importWords.js.map
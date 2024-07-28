"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordRepository = void 0;
const client_1 = require("@prisma/client");
class WordRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient || new client_1.PrismaClient();
    }
    async findWords(search, take, cursor) {
        return this.prisma.word.findMany({
            where: { word: { contains: search } },
            take,
            ...(cursor && { cursor: { word: cursor } }),
            skip: 1,
        });
    }
    async countWords(search) {
        return this.prisma.word.count({
            where: { word: { contains: search } },
        });
    }
    async getWord(word) {
        return this.prisma.word.findUnique({
            where: { word },
        });
    }
}
exports.WordRepository = WordRepository;
//# sourceMappingURL=WordRepository.js.map
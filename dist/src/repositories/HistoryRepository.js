"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRepository = void 0;
const client_1 = require("@prisma/client");
class HistoryRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient || new client_1.PrismaClient();
    }
    async createHistory(wordId, userId) {
        return this.prisma.history.create({
            data: {
                wordId,
                userId,
            },
        });
    }
}
exports.HistoryRepository = HistoryRepository;
//# sourceMappingURL=HistoryRepository.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteRepository = void 0;
const client_1 = require("@prisma/client");
class FavoriteRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient || new client_1.PrismaClient();
    }
    async createFavorite(wordId, userId) {
        return this.prisma.favorite.create({
            data: {
                wordId,
                userId,
            },
        });
    }
    async deleteFavorite(wordId, userId) {
        await this.prisma.favorite.deleteMany({
            where: {
                wordId,
                userId,
            },
        });
    }
}
exports.FavoriteRepository = FavoriteRepository;
//# sourceMappingURL=FavoriteRepository.js.map
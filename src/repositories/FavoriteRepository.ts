import { Favorite, PrismaClient } from '@prisma/client';

export class FavoriteRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async createFavorite(wordId: string, userId: string): Promise<Favorite> {
    return this.prisma.favorite.create({
      data: {
        wordId,
        userId,
      },
    });
  }

  async deleteFavorite(wordId: string, userId: string): Promise<void> {
    await this.prisma.favorite.deleteMany({
      where: {
        wordId,
        userId,
      },
    });
  }
}

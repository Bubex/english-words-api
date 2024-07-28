import { History, PrismaClient } from '@prisma/client';

export class HistoryRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async createHistory(wordId: string, userId: string): Promise<History> {
    return this.prisma.history.create({
      data: {
        wordId,
        userId,
      },
    });
  }
}

import { PrismaClient, Word } from '@prisma/client';

export class WordRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async findWords(
    search: string,
    take: number,
    cursor?: string,
  ): Promise<Word[]> {
    return this.prisma.word.findMany({
      where: { word: { contains: search } },
      take,
      ...(cursor && { cursor: { word: cursor } }),
      skip: 1,
    });
  }

  async countWords(search: string): Promise<number> {
    return this.prisma.word.count({
      where: { word: { contains: search } },
    });
  }

  async getWord(word: string): Promise<Word | null> {
    return this.prisma.word.findUnique({
      where: { word },
    });
  }
}

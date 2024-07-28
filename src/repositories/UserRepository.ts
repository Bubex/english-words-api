import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: { name, email, password },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}

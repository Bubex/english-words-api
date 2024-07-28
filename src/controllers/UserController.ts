import { Response } from 'express';

import prisma from '../config/prisma';
import { IRequest } from '../types/IRequest';

class UserController {
  async getProfile(req: IRequest, res: Response) {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  }

  async getHistory(req: IRequest, res: Response) {
    const history = await prisma.history.findMany({
      where: { userId: req.userId! },
      include: {
        word: true,
      },
      orderBy: {
        viewedAt: 'desc',
      },
    });

    return res.json({
      results: history.map((entry) => ({
        word: entry.word.word,
        added: entry.viewedAt,
      })),
      totalDocs: history.length,
    });
  }

  async getFavorites(req: IRequest, res: Response) {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.userId! },
      include: {
        word: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.json({
      results: favorites.map((entry) => ({
        word: entry.word.word,
        added: entry.createdAt,
      })),
      totalDocs: favorites.length,
    });
  }
}

export default new UserController();

import axios from 'axios';
import { Response } from 'express';

import { FavoriteRepository } from './../repositories/FavoriteRepository';
import { HistoryRepository } from '../repositories/HistoryRepository';
import { WordRepository } from '../repositories/WordRepository';
import { IRequest } from '../types/IRequest';
import { decodeCursor, encodeCursor } from '../utils/cursor';

class WordController {
  private wordRepository: WordRepository;
  private historyRepository: HistoryRepository;
  private favoriteRepository: FavoriteRepository;

  constructor() {
    this.wordRepository = new WordRepository();
    this.historyRepository = new HistoryRepository();
    this.favoriteRepository = new FavoriteRepository();
  }

  async listWords(req: IRequest, res: Response) {
    const { search, limit = 10, cursor } = req.query;
    const take = parseInt(limit as string);
    const decodedCursor = cursor ? decodeCursor(cursor as string) : undefined;

    const words = await this.wordRepository.findWords(
      search as string,
      take,
      decodedCursor,
    );

    const nextCursor =
      words.length === take ? encodeCursor(words[words.length - 1].word) : null;
    const hasNext = words.length === take;

    return res.json({
      results: words.map((word) => word.word),
      previous: cursor ? encodeCursor(words[0].word) : null,
      next: nextCursor,
      hasNext,
      hasPrev: !!cursor,
    });
  }

  async getWordDetails(req: IRequest, res: Response) {
    const { word } = req.params;

    const wordDetails = await this.wordRepository.getWord(word);

    if (!wordDetails) {
      return res.status(404).json({ message: 'Word not found' });
    }

    const { data } = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );

    this.historyRepository.createHistory(wordDetails.id, req.userId!);

    return res.json(data);
  }

  async addFavorite(req: IRequest, res: Response) {
    const { word } = req.params;

    const wordDetails = await this.wordRepository.getWord(word);

    if (!wordDetails) {
      return res.status(404).json({ message: 'Word not found' });
    }

    const favorite = await this.favoriteRepository.createFavorite(
      wordDetails.id,
      req.userId!,
    );

    return res.status(201).json(favorite);
  }

  async removeFavorite(req: IRequest, res: Response) {
    const { word } = req.params;

    const wordDetails = await this.wordRepository.getWord(word);

    if (!wordDetails) {
      return res.status(404).json({ message: 'Word not found' });
    }

    await this.favoriteRepository.deleteFavorite(wordDetails.id, req.userId!);

    return res.status(204).send();
  }
}

export default new WordController();

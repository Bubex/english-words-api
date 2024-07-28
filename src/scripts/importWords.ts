import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const URL =
  'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json';
const BATCH_SIZE = 1000;

const importWords = async () => {
  try {
    console.log('Iniciando importação...');
    const { data, status, statusText } = await axios.get(URL);

    console.log('Lista de palavras carregada...');
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${statusText}`);
    }

    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      throw new Error('Invalid JSON structure');
    }

    const wordsDictionary = data as Record<string, string>;
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
      console.log(
        `Batch ${i / BATCH_SIZE + 1}/${totalBatches} processed successfully`,
      );
    }

    console.log('All words imported successfully');
  } catch (error) {
    console.error('Error importing words:', error);
  } finally {
    await prisma.$disconnect();
  }
};

importWords();

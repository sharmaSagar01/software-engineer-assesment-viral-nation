import { PrismaClient } from '@prisma/client';
import { verifyAccessToken } from './utils';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

const createContext = async ({ req }): Promise<Context> => {
  const token = req.headers.authorization || '';
  const userId = verifyAccessToken(token);
  return { prisma, userId };
};

export default createContext;

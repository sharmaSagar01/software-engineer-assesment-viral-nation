import { PrismaClient } from '@prisma/client';
import { verifyAccessToken } from './utils';
import { Context } from '../types/Context';

const prisma = new PrismaClient();

const createContext = async ({ req }): Promise<Context> => {
  const token = req.headers.authorization || '';
  const userId = verifyAccessToken(token);
  return { prisma, userId };
};

export default createContext;

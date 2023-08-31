import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const SALT = 10;
const ACCESS_TOKEN_EXPIRTY_DATE = process.env.EXPIRY_DATE || '7d';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const compareHash = async (password: string, hashed: string) =>
  await compare(password, hashed);

export const hashData = async (password: string) => await hash(password, SALT);

export const createAccessToken = (userId: number) => {
  const data = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRTY_DATE,
  });
  return data;
};

export const verifyAccessToken = (token: string) => {
  try {
    token = token.replace('Bearer ', '');
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return payload.userId;
  } catch (err) {
    return null;
  }
};

const { hash, compare } = require("bcryptjs");

const SALT = parseInt(process.env.SALT) || 10;

export const compareHash = async (password: string, hashed: string) =>
  await compare(password, hashed);

export const hashData = async (password: string) => await hash(password, SALT);

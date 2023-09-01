import { UserInputError } from 'apollo-server-express';
import { Context } from '../types/Context';
import { compareHash, createAccessToken, hashData } from '../utils/utils';
import { GraphQLError } from 'graphql';
import { Id } from '../types/Id';

export const Mutation = {
  register: async (
    _,
    data: {
      name: string;
      email: string;
      password: string;
    },
    { prisma }: Context
  ) => {
    data.password = await hashData(data.password);
    return await prisma.user.create({
      data,
    });
  },

  login: async (
    _,
    { email, password }: { email: string; password: string },
    { prisma }: Context
  ) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UserInputError('Invalid email or password', {
        errorCode: 'INVALID_CREDENTIALS',
      });
    }
    const passwordMatches = await compareHash(password, user.password);

    if (!passwordMatches) {
      throw new UserInputError('Invalid email or password', {
        errorCode: 'INVALID_CREDENTIALS',
      });
    }
    return {
      accessToken: createAccessToken(user.id),
    };
  },

  changePassword: async (
    _,
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    { prisma, userId }: Context
  ) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new GraphQLError('You are not authorized to perform this action.', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    const passwordMatches = await compareHash(oldPassword, user.password);

    if (!passwordMatches) {
      throw new Error(`Old password not matching`);
    }

    if (oldPassword === newPassword) {
      throw new Error(`old password and new password are same`);
    }

    user.password = await hashData(newPassword);

    return await prisma.user.update({
      data: user,
      where: {
        email: user.email,
      },
    });
  },

  createMovie: async (
    _,
    data: {
      title: string;
      description: string;
      directorName: string;
      releaseDate: Date;
    },
    { prisma, userId }: Context
  ) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new GraphQLError('Invalid Access Token', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    return await prisma.movie.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  },

  updateMovie: async (
    _,
    {
      id,
      ...data
    }: {
      id: number;
      title: string;
      description: string;
      directorName: string;
      releaseDate: Date;
    },
    { prisma, userId }: Context
  ) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new GraphQLError('Invalid Access Token', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    if (user.id !== userId) {
      throw new GraphQLError('You are not authorized to perform this action.', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    return await prisma.movie.update({
      where: {
        id,
      },
      data,
    });
  },

  deleteMovie: async (_, args: Id, { prisma, userId }: Context) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new GraphQLError('Invalid Access Token', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    if (user.id !== userId) {
      throw new GraphQLError('You are not authorized to perform this action.', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    await prisma.movie.delete({ where: { id: args.id } });
    return true;
  },
};

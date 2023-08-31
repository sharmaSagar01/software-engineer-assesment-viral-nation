import { DateTime } from './scalar';
import { Context } from './context';
import { compareHash, hashData, createAccessToken } from './utils';
import { GraphQLError } from 'graphql';
import { UserInputError } from 'apollo-server-express';

interface Id {
  id: number;
}

interface Query {
  limit: number;
  offset: number;
  contains?: string;
  releaseDate?: {
    lte?: Date;
    gte?: Date;
  };
  orderBy?: string;
  sortOrder: string;
}

const resolvers = {
  DateTime: DateTime,

  Query: {
    profile: async (_, __, { prisma, userId }: Context) => {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new GraphQLError(
          'You are not authorized to perform this action.',
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          }
        );
      }
      return user;
    },

    movie: async (_, { id }: Id, { prisma }: Context) => {
      return await prisma.movie.findUniqueOrThrow({
        where: {
          id,
        },
      });
    },

    movies: async (
      _,
      {
        limit: take,
        offset: skip,
        contains,
        releaseDate,
        orderBy,
        sortOrder,
      }: Query,
      { prisma }: Context
    ) => {
      return await prisma.movie.findMany({
        take,
        skip,
        where: {
          title: {
            contains,
          },
          description: {
            contains,
          },
          releaseDate,
        },
        orderBy: {
          [orderBy]: sortOrder,
        },
      });
    },
  },

  Mutation: {
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
      {
        oldPassword,
        newPassword,
      }: { oldPassword: string; newPassword: string },
      { prisma, userId }: Context
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new GraphQLError(
          'You are not authorized to perform this action.',
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          }
        );
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
        data,
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

      await prisma.movie.delete({ where: { id: args.id } });
      return true;
    },
  },
};

export default resolvers;

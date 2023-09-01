import { GraphQLError } from 'graphql';
import { Id } from '../types/Id';
import { Context } from '../types/Context';
import { IQuery } from '../types/Query';

export const Query = {
  //  Retrieves the profile information for the athorized user
  profile: async (_, __, { prisma, userId }: Context) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    if (!user) {
      throw new GraphQLError('You are not authorized to perform this action.', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    return user;
  },

  // Retrieve the movie by id

  movie: async (_, { id }: Id, { prisma }: Context) => {
    return await prisma.movie.findUniqueOrThrow({
      where: {
        id,
      },
    });
  },

  // gives the description of user for the movie
  users: async (_, { limit, offset }: IQuery, { prisma }: Context) => {
    return await prisma.user.findMany({
      take: limit,
      skip: offset,
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
    }: IQuery,
    { prisma }: Context
  ) => {
    return await prisma.movie.findMany({
      take,
      skip,
      where: {
        OR: [
          {
            title: {
              contains: contains,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: contains,
              mode: 'insensitive',
            },
          },
          {
            releaseDate,
          },
        ],
      },
      orderBy: {
        [orderBy]: sortOrder,
      },
    });
  },
};

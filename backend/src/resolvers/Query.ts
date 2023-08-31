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

  // Retrieve all the movies filter, order, sort, pagination

  // movies: async (
  //   _,
  //   {
  //     limit: take,
  //     offset: skip,
  //     contains,
  //     releaseDate,
  //     orderBy,
  //     sortOrder,
  //   }: IQuery,
  //   { prisma }: Context
  // ) => {
  //   const where: any = {};

  //   if (contains) {
  //     where.OR = [
  //       {
  //         title: {
  //           contains,
  //           mode: 'insensitive',
  //         },
  //         description: {
  //           contains,
  //           mode: 'insensitive',
  //         },
  //       },
  //     ];
  //   }
  //   if (releaseDate) {
  //     where.releaseDate = releaseDate;
  //   }

  //   return await prisma.movie.findMany({
  //     take,
  //     skip,
  //     where,
  //     orderBy: {
  //       [orderBy]: sortOrder,
  //     },
  //   });
  // },
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
};

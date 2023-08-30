import { DateTime } from './scalar';
import { Context } from './context';
import { compareHash, hashData } from './utils';

interface Id {
  id: number;
}

const resolvers = {
  DateTime: DateTime,
  Query: {
    user: async (_, { id }: Id, { prisma }: Context) => {
      console.log(id);
      return await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
    },

    movie: async (_, { id }: Id, { prisma }: Context) => {
      return await prisma.movie.findUniqueOrThrow({
        where: {
          id,
        },
      });
    },

    getMovies: async (
      _,
      { limit: take, offset: skip }: { limit: number; offset: number },
      { prisma }: Context
    ) => {
      return await prisma.movie.findMany({
        take,
        skip,
      });
    },
  },

  Mutation: {
    createUser: async (
      _,
      data: {
        userName: string;
        email: string;
        password: string;
      },
      { prisma }: Context
    ) => {
      console.log(data.password);
      data.password = await hashData(data.password);
      console.log(data.password);
      return await prisma.user.create({
        data,
      });
    },

    loginUser: async (
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
        throw new Error(`User not found`);
      }
      const passwordMatches = compareHash(password, user.password);

      if (!passwordMatches) {
        throw new Error(`Invalid Password`);
      }
      return user;
    },

    logoutUser: async () => {
      //perform logout actions
    },

    createMovie: async (
      _,
      data: {
        movieName: string;
        description: string;
        directorName: string;
        releaseDate: string;
      },
      { prisma }: Context
    ) => {
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
        movieName: string;
        description: string;
        directorName: string;
        releaseDate: string;
      },
      { prisma }: Context
    ) => {
      return await prisma.movie.update({
        where: {
          id,
        },
        data,
      });
    },

    deleteMovie: async (_, args: Id, { prisma }: Context) => {
      await prisma.movie.delete({ where: { id: args.id } });
      return true;
    },
  },
};

export default resolvers;

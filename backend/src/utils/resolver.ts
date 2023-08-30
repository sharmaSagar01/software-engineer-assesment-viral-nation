import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getUserById: async (args: { id: number }) => {
      return await prisma.user.findUnique({
        where: {
          id: args.id || undefined,
        },
      });
    },

    getMovieById: async (args: { id: number }) => {
      return await prisma.movie.findUnique({
        where: {
          id: args.id || undefined,
        },
      });
    },

    getMovies: async (args: { limit: number; offset: number }) => {
      return await prisma.movie.findMany({
        take: args.limit,
        skip: args.offset,
      });
    },
  },

  Mutation: {
    createUser: async (args: {
      userName: string;
      email: string;
      password: string;
    }) => {
      return await prisma.user.create({
        data: {
          userName: args.userName,
          email: args.email,
          password: args.password,
        },
      });
    },

    loginUser: async (args: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        throw new Error(`User not found`);
      }
      const passwordMatches = ''; // Compare password using your hasing function

      if (!passwordMatches) {
        throw new Error(`Invalid Password`);
      }
      return user;
    },

    logoutUser: async () => {
      //perform logout actions
    },

    createMovie: async (args: {
      movieName: string;
      description: string;
      directorName: string;
      releaseDate: string;
    }) => {
      return await prisma.movie.create({
        data: {
          movieName: args.movieName,
          description: args.description,
          directorName: args.directorName,
          releaseDate: args.releaseDate,
        },
      });
    },

    updateMovie: async (args: {
      id: number;
      movieName: string;
      description: string;
      directorName: string;
      releaseDate: string;
    }) => {
      return await prisma.movie.update({
        where: {
          id: args.id,
        },
        data: {
          movieName: args.movieName,
          description: args.description,
          directorName: args.directorName,
          releaseDate: args.releaseDate,
        },
      });
    },

    deleteMovie: async (args: { id: number }) => {
      await prisma.movie.delete({ where: { id: args.id } });
      return true;
    },
  },
};

export default resolvers;

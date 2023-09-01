import { Context } from '../types/Context';

const User = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  email: (parent) => parent.email,
  movies: (parent, _, { prisma }: Context) => {
    return prisma.user
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .movies();
  },
};
const Movie = {
  id: (parent) => parent.id,
  title: (parent) => parent.title,
  description: (parent) => parent.description,
  directorName: (parent) => parent.directorName,
  releaseDate: (parent) => parent.releaseDate,
  user: (parent, _, { prisma }: Context) => {
    return prisma.movie
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .user();
  },
};

export { User, Movie };

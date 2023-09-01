## Prisma Schema

### User Model

- `id`: An auto-incrementing unique identifier for the user.
- `name`: The name of the user.
- `email`: The email address of the user, marked as unique to ensure there are no duplicate emails.
- `password`: The user's password.
- `createdAt`: The timestamp when the user record was created.
- `updatedAt`: The timestamp when the user record was last updated.
- `movies`: A relation to the `Movie` model representing the movies associated with the user.

### Movie Model

- `id`: An auto-incrementing unique identifier for the movie.
- `title`: The title of the movie.
- `description`: An optional description of the movie.
- `directorName`: The name of the movie's director.
- `releaseDate`: The release date of the movie.
- `createdAt`: The timestamp when the movie record was created.
- `updatedAt`: The timestamp when the movie record was last updated.
- `userId`: The ID of the user who created the movie, establishing a relationship with the `User` model.

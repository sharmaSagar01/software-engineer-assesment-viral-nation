# GraphQL Schema for Movie-Related Application

## Scalar Type

- `DateTime`: Represents a date and time value.

## Object Types

### User

Represents a user in the application.

Fields:
- `id`: Unique identifier for the user.
- `name`: Name of the user.
- `email`: Email address of the user.
- `createdAt`: Date and time when the user was created.
- `updatedAt`: Date and time when the user was last updated.
- `movies`: List of movies associated with the user.

### Movie

Represents a movie in the application.

Fields:
- `id`: Unique identifier for the movie.
- `title`: Title of the movie.
- `description`: Description of the movie.
- `directorName`: Name of the movie's director.
- `releaseDate`: Date and time when the movie was released.
- `user`: User who created the movie.

### Login

Represents the result of a successful login.

Fields:
- `accessToken`: Token generated upon successful login for authentication.

## Query Type

- `profile`: Retrieves the profile information of the currently authenticated user.
- `users`: Retrieves a list of users based on who created that movie.
- `movie`: Retrieves a specific movie by its ID.
- `movies`: Retrieves a list of movies based on various filtering and sorting options.

## Mutation Type

- `register`: Allows users to register by providing their name, email, and password.
- `login`: Allows users to log in using their email and password, returning an access token upon successful login.
- `changePassword`: Allows users to change their password by providing the old and new passwords.
- `createMovie`: Allows users to create a new movie by providing title, description, director name, and release date.
- `updateMovie`: Allows users to update an existing movie's information.
- `deleteMovie`: Allows users to delete a movie by its ID.

## Input Types

- `DateRange`: Represents a date range with optional greater-than-equal (gte) and less-than-equal (lte) constraints.

## Enums

- `SortOrder`: Represents the sorting order (ascending or descending) for query results.
- `OrderBy`: Represents the fields by which query results can be ordered.

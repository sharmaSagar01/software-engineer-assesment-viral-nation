# Movie Library 

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)

## Description

Create a CRUD API with search and filter capabilities using Apollo GraphQL and PostgreSQL (Prisma ORM) for managing a list of movies. The project includes creating database tables with relationships, implementing GraphQL endpoints, and ensuring strong typing with TypeScript.

Key Features:

- Sign up as a user with user data including ID, User Name, Email ID, and hashed Password.
- Login to obtain a JWT token for authentication.
- Change Password functionality.
- Query a list of all movies.
- Query a movie by its ID.
- Create a new movie with details like Movie Name, Description, Director Name, and Release Date.
- Update existing movie records.
- Delete movies.
- Authorization and authentication mechanisms in place:
- User registration with hashed passwords.
- JWT token-based authentication.
- Restricted access for authenticated users to perform CRUD operations on movies.

The project is implemented using Node.js, Apollo GraphQL, Prisma ORM, and TypeScript. Once completed, the code should be pushed to a GitHub repository for sharing and review.

Overall, this project focuses on building a secure and efficient GraphQL API for managing movies with user authentication and authorization features.

## Prerequisites

Before you start, make sure you have the following prerequisites installed on your system:

- [Node.js] Version 16.20.2 (https://nodejs.org/): Make sure you have Node.js installed. You can download it from the official website.

## Getting Started


```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install
# or
yarn install

# Set up environment variables 
 - POSTGRES_DB
 - POSTGRES_USER
 - POSTGRES_PASSWORD
 - DATABASE_URL
 - EXPIRY_DATE
 - ACCESS_TOKEN_SECRET
 - PORT
 - POSTGRES_HOST

# Run the docker file 

docker compose up -d  ## Will run the docker container with the postgres database image and will run in the background

# Run the below command for prisma to setup the Database
npm run db:migrate
npm run db: generate

# Runt the below command to run prisma studio
npm run db:studio

# Start the development server
npm run dev
# or
yarn dev
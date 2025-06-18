# Chatty

A Node.js backend system for a real-time chat application using Socket.IO, enabling users to sign up, sign in, and engage in one-on-one chats with other users, with data stored in MongoDB Atlas.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)


## Features
- User sign-up and sign-in with secure JWT-based authentication.
- Real-time one-on-one chat functionality powered by Socket.IO.
- Retrieve chat history between two users.
- Fetch a list of all users (excluding the current user) to initiate chats.

## Tech Stack
- **Node.js**: Server-side runtime environment (v22.11.0).
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB Atlas**: Cloud-based NoSQL database for storing user and chat data.
- **Mongoose**: ODM for MongoDB to manage data schemas.
- **JWT**: JSON Web Tokens for secure user authentication.
- **Socket.IO**: Real-time bidirectional communication for chat functionality.

## Prerequisites
- **Node.js**: v22.11.0
- **MongoDB Atlas**: A configured MongoDB Atlas cluster
- **npm**: Included with Node.js for package management
- **Git**: For cloning the repository

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/iamtanaybanerjee/chatty.git
   ```
2. Navigate to the project directory:
   ```bash
   cd chatty
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables

## Usage
- Ensure you have a MongoDB Atlas cluster set up and accessible.
- Start the application:
  ```bash
  npm run dev
  ```
- The backend API will be available at http://localhost:5001
- Connect a frontend client to the Socket.IO server for real-time chat functionality.

## Environment Variables
Create a .env file in the root directory with the following variables:
```bash
MONGODB_URI=[Your MongoDB Atlas connection string]
JWT_SECRET=[A secure key for signing JWTs (e.g., a random string)]
```

## API Endpoints
Below is a summary of the available API endpoints.

| Method | Endpoint                              | Description                              | Body (if applicable)                  |
|--------|---------------------------------------|------------------------------------------|---------------------------------------|
| POST   | `/auth/register`                      | Register a user                          | `{"username": "username", "password": "123"}` |
| POST   | `/auth/login`                         | Login user                               | `{"username": "username", "password": "123"}` |
| GET    | `/messages?sender=username1&receiver=username2` | Get all messages between username1 and username2 | None                                  |
| GET    | `/users?currentUser=username`         | Get all users' usernames except current user | None                                  |



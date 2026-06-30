# Lista de Hábitos App
========================

## Stack
* Node.js
* Express.js
* MongoDB
* Docker

## Installation
To install the app, run the following commands:
```bash
npm install
```
## Docker
To build and run the app using Docker, run the following commands:
```bash
docker build -t lista-de-habitos .
docker run -p 5000:5000 lista-de-habitos
```
## Endpoints
The following endpoints are available:
### Authentication
* **POST /api/auth/register**: Register a new user
* **POST /api/auth/login**: Login user
### Habits
* **GET /api/habits**: List habits (authenticated users only)
* **POST /api/habits**: Create habit (authenticated users only)
* **GET /api/habits/:id**: Get habit by id (authenticated users only)
* **PUT /api/habits/:id**: Update habit (authenticated users only)
* **DELETE /api/habits/:id**: Delete habit (authenticated users only)

## Main Model
The main model is `Habit` with the following fields:
* `name: String`
* `description: String`
* `frequency: String`
* `createdAt: Date`

## Security
The app uses the following security measures:
* Authentication is required for all habit endpoints
* Passwords are hashed and stored securely
* The app uses HTTPS (TLS) encryption
* The app uses a secure connection to the MongoDB database
* The app follows best practices for secure coding and data validation
* Environment variables are used to store sensitive data such as the MongoDB URI
Note: The `MONGO_URI` environment variable should be set to a secure MongoDB connection string.
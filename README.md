# Book Tracker Backend API

A flexible and reusable backend for a **Book Tracking and Note Sharing App**, built with **Express**, **Prisma ORM**, **PostgreSQL**, and **Docker**.  
Users can create accounts, track their books, write notes, and choose whether to make their notes private or public to share with others.

---

## Tech Stack

- **Express.js** – Web framework for building APIs  
- **Prisma ORM** – Modern ORM for database access  
- **PostgreSQL** – Relational database  
- **Docker** – Containerization for easy setup and deployment  
- **dotenv** – Environment variable management  
- **CORS** – Secure frontend-backend communication  

---

## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/book-tracker-backend.git
cd book-tracker-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start PostgreSQL with Docker
```bash
docker-compose up -d
```

### 4. Configure environment variables
Create a **`.env`** file in the root directory and add the following:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/book_tracker?schema=public"
PORT=5000
JWT_SECRET=your_secret_key
```
- **`DATABASE_URL`**: connection string for Prisma to access PostgreSQL
- **`PORT`**: port where the Express server runs
- **`JWT_SECRET`**: secret key for signing authentication tokens

### 5. Initialize Prisma
Generate Prisma client and apply migrations to create database tables.
```bash
npx prisma migrate dev --name init
npx prisma generate
```
If you need to inspect your database visually, run:
```bash
npx prisma studio
```
Then open [http://localhost:5555](http://localhost:5555).

---

## Running the Server
Start the development server:
```bash
npm run dev
```
Or start in production mode:
```bash
npm start
```
By default, the API will be available at:
```bash
http://localhost:5000
```


## Features

- **Authentication System**
  - User registration and login via `authController` and `authRoutes`
  - JWT-based authentication handled by `authMiddleware`

- **Book Management**
  - Add, edit, delete, and fetch books
  - Manage books under different categories and subcategories

- **Category & Subcategory**
  - Categorize books using categories and subcategories
  - CRUD operations for both categories and subcategories

- **Like System**
  - Users can like or unlike books
  - Fetch books liked by a user

- **Reading Status**
  - Track user reading progress (e.g., *Reading*, *Completed*, *To Read*)

- **User Management**
  - Manage user information and access levels

---

## API Endpoints Overview

### Auth Routes (`/api/auth`)

| Method | Endpoint     | Description                        |
|--------|---------------|------------------------------------|
| POST   | `/signup`     | Register a new user                |
| POST   | `/login`      | Authenticate user and get a JWT    |

---

### Book Routes (`/api/books`)

| Method | Endpoint  | Description            |
|--------|------------|------------------------|
| GET    | `/`        | Get all books          |
| POST   | `/`        | Add a new book         |
| GET    | `/:id`     | Get a specific book    |
| PUT    | `/:id`     | Update book details    |
| DELETE | `/:id`     | Delete a book          |

---

### Category Routes (`/api/categories`)

| Method | Endpoint  | Description          |
|--------|------------|----------------------|
| GET    | `/`        | Get all categories   |
| POST   | `/`        | Add a new category   |
| PUT    | `/:id`     | Update a category    |
| DELETE | `/:id`     | Delete a category    |

---

### Subcategory Routes (`/api/subcategories`)

| Method | Endpoint  | Description            |
|--------|------------|------------------------|
| GET    | `/`        | Get all subcategories  |
| POST   | `/`        | Add a new subcategory  |
| PUT    | `/:id`     | Update a subcategory   |
| DELETE | `/:id`     | Delete a subcategory   |

---

### Like Routes (`/api/likes`)

| Method | Endpoint          | Description                |
|--------|--------------------|----------------------------|
| POST   | `/`                | Like a book                |
| DELETE | `/:bookId`         | Unlike a book              |
| GET    | `/user/:userId`    | Get liked books of a user  |

---

### Reading Status Routes (`/api/reading-status`)

| Method | Endpoint          | Description                          |
|--------|--------------------|--------------------------------------|
| POST   | `/`                | Set reading status                   |
| GET    | `/user/:userId`    | Get all reading statuses for a user  |
| PUT    | `/:id`             | Update reading status                |
| DELETE | `/:id`             | Remove a reading status              |


## Contributing

Contributions are welcome!  
If you’d like to help improve this project, here’s how you can get started:

1. **Fork** the repository  
2. **Create a new branch** for your feature or fix  
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes
   ```bash
   Commit your changes
   ```
   
4. Push your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request describing your improvements

---

Your feedback and ideas help make this project better for everyone!

⭐ If you like this project, don’t forget to give it a star on GitHub!






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
-**`DATABASE_URL`**: connection string for Prisma to access PostgreSQL
-**`PORT`**: port where the Express server runs
-**`JWT_SECRET`**: secret key for signing authentication tokens

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
Then open (http://localhost:5555)[http://localhost:5555].

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





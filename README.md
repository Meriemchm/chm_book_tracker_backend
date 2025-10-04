📚 Book Tracker Backend

A flexible and reusable backend for a Book Tracking and Note Sharing App, built with Express, Prisma ORM, PostgreSQL, and Docker.
Users can create accounts, track their books, write notes, and choose whether to make their notes private or public to share with others.

Tech Stack

Express.js – Web framework for building APIs

Prisma ORM – Modern ORM for database access

PostgreSQL – Relational database

Docker – Containerization for easy setup and deployment

dotenv – Environment variable management

CORS – Secure frontend-backend communication

Setup & Installation

1. Clone the repository
git clone https://github.com/yourusername/book-tracker-backend.git
cd book-tracker-backend

2. Install dependencies
npm install

3. Start PostgreSQL with Docker

Make sure Docker is running, then start the container:

docker-compose up -d


This will start a PostgreSQL database on port 5432.

4. Configure environment variables

Create a .env file in the root directory:

DATABASE_URL="postgresql://admin:admin123@localhost:5432/booktracker?schema=public"
PORT=5000

5. Setup Prisma

Generate the Prisma client and migrate the database:

npx prisma migrate dev --name init

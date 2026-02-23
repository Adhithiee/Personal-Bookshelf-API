# Personal Bookshelf API

A professional, modular RESTful API built with Node.js, Express, and PostgreSQL. This project showcases fundamental and advanced Node.js concepts, including modular routing, input validation, and global error handling.

## 🚀 Features
- **Full CRUD Operations**: Create, Read, Update, and Delete books.
- **Relational Database**: Powered by PostgreSQL for robust data storage.
- **Modular Architecture**: Clean code structure using Express Router.
- **Input Validation**: Server-side checks to ensure data integrity.
- **Global Error Handling**: Centralized middleware for consistent error responses.
- **Request Logging**: Real-time traffic monitoring with Morgan.

## 🛠️ Technology Stack
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Environment**: Dotenv
- **Logging**: Morgan

## 📋 Prerequisites
- Node.js installed
- PostgreSQL installed and running

## ⚙️ Setup Instructions

1. **Clone/Initialize the project**
   ```bash
   npm install
   ```

2. **Database Setup**
   Open your PostgreSQL shell and run:
   ```sql
   CREATE DATABASE bookshelf_db;
   
   CREATE TABLE books (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       author VARCHAR(255) NOT NULL,
       published_year INTEGER,
       isbn VARCHAR(20) UNIQUE
   );
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=bookshelf_db
   PORT=3000
   ```

4. **Run the Server**
   ```bash
   node index.js
   ```

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/books` | Add a new book |
| `GET` | `/books` | Get all books |
| `GET` | `/books/:id` | Get a book by ID |
| `PUT` | `/books/:id` | Update a book's details |
| `DELETE` | `/books/:id` | Remove a book |

## 🧪 Testing with PowerShell
```powershell
# Add a book
Invoke-RestMethod -Uri http://localhost:3000/books -Method Post -Body '{"title": "The Hobbit", "author": "J.R.R. Tolkien", "published_year": 1937, "isbn": "9780007525492"}' -ContentType "application/json"

# Get all books
Invoke-RestMethod -Uri http://localhost:3000/books -Method Get
```

---
Developed as a learning project for Personal Bookshelf Management.

# 📚 Library Management API

A RESTful API built with 🚀Express, 🚀TypeScript, and ;🚀MongoDB to manage books and borrowing functionality in a library system.

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB database
- npm or yarn

### Clone and Install

```bash
git clone https://github.com/imran007-Programming/Library_Management_Api.git
cd library-management-api
npm install
```

Details of API

🚀 Base URL (Deployed on Vercel)

Link:https://library-management-api-five-lyart.vercel.app/

Details of evey api

GET (/api/books)

2. Get All Books
   GET /api/books

Retrieve a list of books with optional filtering, sorting, and limiting.

Query parameters:

filter (string) - Filter by genre (e.g., FANTASY)

sortBy (asc or desc) - Sort by ISBN ascending or descending

limit (number) - Limit number of results

Example Response:

````json
{
"success": true,
"message": "Books retrieved successfully",
"data": [
{
"_id": "685463dc614f8cf930a7cb1e",
"title": "The Life of Marie Curie",
"author": "Clara Davis",
"genre": "BIOGRAPHY",
"isbn": "9780553380167",
"description": "A look at the extraordinary life of the Nobel-winning scientist.",
"copies": 2,
"available": true,
"createdAt": "2025-06-19T19:24:12.539Z",
"updatedAt": "2025-06-21T20:39:06.373Z"
},
...
]
}

### POST (/api/books)

in this a post method can add a book in the database with all books details like title,author,genre,isbn,description,copies,available.

and response will look like this
```json
{
"title": "The everythings we know",
"author": "Stephen Hawking",
"genre": "SCIENCE",
"isbn": "9780553380163",
"description": "An overview of cosmology and black holes.",
"copies": 5,
"available": true

}



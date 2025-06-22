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

```json

{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "685463dc614f8cf930a7cb1e",
      "title": "The Life of Marie Curie",
      "author": "Clara Davis",
      "genre": "FANTASY",
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
```


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
```



### GET (/api/books/685463dc614f8cf930a7cb1e)
get a book by its id.This api get a specefic book by its id.
and api response look like this.
```json
{
    "success": true,
    "message": "Book retrieved successfully",
    "data": {
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
    }
}
```



### PUT (/api/books/685463dc614f8cf930a7cb1e)
this api represent a update api where a books field can be uploded by it id.
like if the request is 
```json
{
   "copies":"30"
}
```

Response will be:
```json
{
    "success": true,
    "message": "Book updated successfully",
    "data": {
        "_id": "685463dc614f8cf930a7cb1e",
        "title": "The Life of Marie Curie",
        "author": "Clara Davis",
        "genre": "BIOGRAPHY",
        "isbn": "9780553380167",
        "description": "A look at the extraordinary life of the Nobel-winning scientist.",
        "copies": 30,
        "available": true,
        "createdAt": "2025-06-19T19:24:12.539Z",
        "updatedAt": "2025-06-22T07:50:38.085Z"
    }
}
```

### DELETE(/api/books/685463dc614f8cf930a7cb1e)
in this api can delete a book by its id,
response look like :

```json

 {"success": true,
    "message": "Book deleted successfully",
    "data": {
        "_id": "685463dc614f8cf930a7cb1e",
        "title": "The Life of Marie Curie",
        "author": "Clara Davis",
        "genre": "BIOGRAPHY",
        "isbn": "9780553380167",
        "description": "A look at the extraordinary life of the Nobel-winning scientist.",
        "copies": 30,
        "available": true,
        "createdAt": "2025-06-19T19:24:12.539Z",
        "updatedAt": "2025-06-22T07:50:38.085Z"
    }
}
```

### POST(/api/books/borrow)
this api can borrow a book by its id,quantity,and dueDate,

Request look like:
```json
{
  "book": "685463dc614f8cf930a7cb1f",
  "quantity": 1,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

```

Rsponse will be:

```json
{
    "success": true,
    "message": "Book borrowed successfully",
    "data": {
        "book": "685463dc614f8cf930a7cb1f",
        "quantity": 1,
        "dueDate": "2025-07-18T00:00:00.000Z",
        "_id": "6857b71dbcfe0b648f4c0909",
        "createdAt": "2025-06-22T07:56:13.853Z",
        "updatedAt": "2025-06-22T07:56:13.853Z"
    }
}


```

And if the book copies is getting value 0 then its available will be false from true,

```json
{
    "success": true,
    "message": "Book retrieved successfully",
    "data": {
        "_id": "685463dc614f8cf930a7cb1f",
        "title": "Dragons and Castles",
        "author": "Lily Adams",
        "genre": "FANTASY",
        "isbn": "9780553380168",
        "description": "A magical world filled with dragons and ancient spells.",
        "copies": 0,
        "available": false,
        "createdAt": "2025-06-19T19:24:12.539Z",
        "updatedAt": "2025-06-22T07:57:46.754Z"
    }
}

```

and again if the book copies increase from 0 to 2 or any value then its availabe value will true from false..

```json
{
   "copies":2
}
```


```json
{
    "success": true,
    "message": "Book updated successfully",
    "data": {
        "_id": "685463dc614f8cf930a7cb1f",
        "title": "Dragons and Castles",
        "author": "Lily Adams",
        "genre": "FANTASY",
        "isbn": "9780553380168",
        "description": "A magical world filled with dragons and ancient spells.",
        "copies": 2,
        "available": true,
        "createdAt": "2025-06-19T19:24:12.539Z",
        "updatedAt": "2025-06-22T08:00:31.024Z"
    }
}

```


### GET(/api/borrow) 
its a aggregation method, where the borrow book total quantity and its title,isbn number will get.

### Response will be:

```json
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "totalQuantity": 2,
            "book": {
                "title": "Dragons and Castles",
                "isbn": "9780553380168"
            }
        },
        {
            "totalQuantity": 4,
            "book": {
                "title": "Legends of Eloria",
                "isbn": "9780553380172"
            }
        },
        {
            "totalQuantity": 1,
            "book": {
                "title": "Ancient Civilizations",
                "isbn": "9780553380166"
            }
        }
    ]
}

```